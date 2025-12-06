// c:/Users/HomePC/endorse/endorse-backend/server.js
require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const https = require('https');

const app = express();

// Configure CORS to allow your frontend to make requests to this server.
// IMPORTANT: In production, you should restrict this to your frontend's actual domain.
app.use(cors({
  origin: 'http://localhost:5173' // Assuming your React app runs on port 5173
}));

// Configure Cloudinary with the credentials from your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// This is the single endpoint your frontend will call to get a signature
app.get('/api/sign-upload', (req, res) => {
  const timestamp = Math.round((new Date).getTime() / 1000);

  // These are the parameters that will be signed
  const params_to_sign = {
    timestamp: timestamp,
    folder: 'endorse-uploads' // This folder must match the one on the frontend
  };

  try {
    // Generate the secure signature
    const signature = cloudinary.utils.api_sign_request(params_to_sign, process.env.CLOUDINARY_API_SECRET);
    res.status(200).json({
      signature,
      timestamp
    });
  } catch (error) {
    console.error('Error signing upload request:', error);
    res.status(500).json({ error: 'Failed to sign upload request' });
  }
});

// New endpoint to proxy the PDF and fix CORS issues
app.get('/api/get-pdf', (req, res) => {
  const pdfUrl = req.query.url;

  if (!pdfUrl) {
    return res.status(400).send('PDF URL is required');
  }

  // Fetch the PDF from the Cloudinary URL
  https.get(pdfUrl, (pdfRes) => {
    // Set headers to ensure the browser treats it as a PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    
    // Pipe the PDF content directly to the client's response
    pdfRes.pipe(res);
  }).on('error', (e) => {
    console.error(`Error fetching PDF: ${e.message}`);
    res.status(500).send('Failed to fetch PDF');
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
