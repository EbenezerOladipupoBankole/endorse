import React, { useState, useRef, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from './firebase'; // Assuming firebase.js is in the same directory

// --- Configuration ---
// Securely access environment variables provided by Vite
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const UPLOAD_FOLDER = 'endorse-uploads'; // Must match the folder in server.js

const FileUpload = ({ user, onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadResult, setUploadResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUploadResult(null);
        setUploadProgress(0);
        setUploadStatus(''); // Clear previous status

        // --- Client-Side Validation ---
        if (file) {
            const TEN_MB = 10 * 1024 * 1024; // Changed from 5MB to 10MB
            if (file.size > TEN_MB) {
                setUploadStatus('Error: File is larger than 10MB.');
                return;
            }
            if (file.type !== 'application/pdf') {
                setUploadStatus('Error: Only PDF files are allowed.'); // Corrected message
                return;
            }
        }

        if (file) {
            setSelectedFile(file);
            setUploadStatus(`Selected: ${file.name}`);
            setUploadResult(null);
            setUploadProgress(0);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file first.');
            return;
        }

        if (!user || !user.uid) {
            setUploadStatus('Error: User not logged in. Cannot upload.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        setUploadStatus('Preparing...');

        try {
            // 1. Get signature from your backend
            const signatureResponse = await fetch(`${BACKEND_URL}/api/sign-upload`);
            if (!signatureResponse.ok) {
                throw new Error(`Failed to get signature: ${signatureResponse.statusText}`);
            }
            const { signature, timestamp } = await signatureResponse.json();

            // 2. Prepare form data for Cloudinary
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('api_key', CLOUDINARY_API_KEY);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('folder', UPLOAD_FOLDER);

            // 3. Upload using XMLHttpRequest to support progress tracking
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
            setUploadStatus('Uploading...');

            const uploadedFileData = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', cloudinaryUrl, true);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentCompleted = Math.round((event.loaded * 100) / event.total);
                        setUploadProgress(percentCompleted);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        const errorData = JSON.parse(xhr.responseText);
                        reject(new Error(`Upload failed: ${errorData.error.message}`));
                    }
                };

                xhr.onerror = () => {
                    reject(new Error('Upload failed due to a network error.'));
                };

                xhr.send(formData);
            });

            // Save the uploaded file details to Firestore
            const newDocData = {
                userId: user.uid,
                name: selectedFile.name,
                url: uploadedFileData.secure_url,
                size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
                type: 'PDF',
                status: 'draft',
                signers: [{ email: user.email, status: 'pending' }],
                signedBy: 0,
                date: serverTimestamp(),
            };
            const docRef = await addDoc(collection(db, "documents"), newDocData);
            const finalDoc = { id: docRef.id, ...newDocData };

            // Set final state before navigating away
            setUploadResult(uploadedFileData);
            setUploadStatus('Upload successful! Redirecting...');
            // Clear the input for the next upload
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            
            // Notify parent component of success
            if (onUploadSuccess) {
                // Pass the newly created document's ID and data to the callback
                onUploadSuccess(finalDoc);
            }


            // You can now save the URL to your database if needed
            console.log('File uploaded:', uploadedFileData.secure_url);

        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus(`Error: ${error.message}`);
            setUploadProgress(0);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="card">
            <h3 className="card-title text-2xl font-bold text-slate-900 mb-3">Upload Document</h3>
            <p className="card-subtitle">Upload a PDF or image file for processing.</p>

            <div className="upload-area mt-4 space-y-4">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="application/pdf" 
                    className="input-field"
                    disabled={isUploading}
                />
                <button onClick={handleUpload} className="btn-primary w-full" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload File'}
                </button>
            </div>
            {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
            )}
            {uploadStatus && <p className="mt-4 text-sm text-slate-600">{uploadStatus}</p>}
            {/* 
              The success message and button have been removed.
              The onUploadSuccess callback now handles the navigation immediately,
              providing a smoother user experience.
            */}
        </div>
    );
};

export default FileUpload;