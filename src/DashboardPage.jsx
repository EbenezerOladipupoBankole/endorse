import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle, FileText, Upload, Clock, CheckSquare, 
  Search, Filter, Plus, MoreVertical, Download, 
  Trash2, Eye, Send, Folder, Bell, Settings, 
  LogOut, User, Menu, X, TrendingUp, Users, Check,
  FileSignature, Zap, ChevronRight, Calendar
} from 'lucide-react'; 
import { signOut } from "firebase/auth";
import { auth, db } from './firebase'; // Import db
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore"; // Import firestore functions
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 

export default function DashboardPage({ user }) { // Accept the user prop
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  // NOTE: In a real application, these would also be fetched from your backend.
  // For now, they are placeholders.
  const stats = [
    { label: "Documents This Month", value: "0", change: "", icon: <FileText className="w-6 h-6" />, color: "emerald" },
    { label: "Pending Signatures", value: "0", change: "", icon: <Clock className="w-6 h-6" />, color: "amber" },
    { label: "Completed", value: "0", change: "", icon: <CheckSquare className="w-6 h-6" />, color: "blue" },
    { label: "AI Contracts Created", value: "0", change: "", icon: <Zap className="w-6 h-6" />, color: "purple" }
  ];

  const recentActivity = [];

  // Function to get user initials from display name
  const getInitials = (name) => {
    if (!name) return "?";
    const names = name.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}` : names[0][0];
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener in App.jsx will handle the redirect.
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleShowNotifications = () => {
    // In a real app, this would open a dropdown or a modal.
    alert('Showing notifications...');
  };

  // Effect to handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to fetch user's documents from Firestore
  useEffect(() => {
    if (user && user.uid) {
      setLoadingDocs(true);
      const docsCollection = collection(db, 'documents');
      // This query finds documents where the userId field matches the logged-in user's ID.
      const q = query(docsCollection, where("userId", "==", user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userDocs = [];
        querySnapshot.forEach((doc) => {
          userDocs.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(userDocs);
        setLoadingDocs(false);
      }, (error) => {
        console.error("Error fetching documents: ", error);
        setLoadingDocs(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setDocuments([]); // Clear documents if no user is logged in
    }
  }, [user]); // Rerun this effect when the user object changes

  // Function to handle view change and close sidebar on mobile
  const handleViewChange = (view) => {
    setCurrentView(view);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };
  const Sidebar = ({ user, sidebarOpen }) => (
    <div 
      className={`sidebar ${!sidebarOpen && 'collapsed'} ${sidebarOpen && window.innerWidth <= 768 && 'open'}`}
    >
      <div className="sidebar-content">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <span className="dashboard-logo-text">Endorse</span>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => handleViewChange('dashboard')}
            className={`sidebar-btn ${currentView === 'dashboard' ? 'sidebar-btn-active' : 'sidebar-btn-inactive'}`}
          >
            <FileText className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => handleViewChange('upload')}
            className={`sidebar-btn ${currentView === 'upload' ? 'sidebar-btn-active' : 'sidebar-btn-inactive'}`}
          >
            <Upload className="w-5 h-5 mr-3" />
            <span>Upload Document</span>
          </button>

          <button 
            onClick={() => handleViewChange('ai-contract')}
            className={`sidebar-btn ${currentView === 'ai-contract' ? 'sidebar-btn-active' : 'sidebar-btn-inactive'}`}
          >
            <Zap className="w-5 h-5 mr-3" />
            <span>AI Contract Creator</span>
          </button>

          <button 
            className="sidebar-btn sidebar-btn-inactive"
          >
            <Folder className="w-5 h-5 mr-3" />
            <span>My Documents</span>
          </button>

          <button 
            className="sidebar-btn sidebar-btn-inactive"
          >
            <Users className="w-5 h-5 mr-3" />
            <span>Team</span>
          </button>
        </nav>

        <div className="mt-auto pt-6">
          <button 
            onClick={() => handleViewChange('settings')}
            className={`sidebar-btn ${currentView === 'settings' ? 'sidebar-btn-active' : 'sidebar-btn-inactive'}`}
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          {user.photoURL ? (
            <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
          ) : (
            <div className="user-avatar">
              {getInitials(user.displayName)}
            </div>
          )}
          <div className="user-details">
            <p className="user-name">{user.displayName || "New User"}</p>
            <p className="user-plan">Free Plan</p> {/* Placeholder plan */}
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const TopNav = ({ sidebarOpen, setSidebarOpen, handleShowNotifications }) => (
    <div className={`top-nav ${!sidebarOpen && 'collapsed'}`} >
      <div className="flex items-center justify-between px-6 h-20">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-2xl font-bold text-slate-900">
            {currentView === 'dashboard' && 'Dashboard'}
            {currentView === 'upload' && 'Upload Document'}
            {currentView === 'ai-contract' && 'AI Contract Creator'}
            {currentView === 'settings' && 'Settings'}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={handleShowNotifications} className="relative p-2 hover:bg-slate-100 rounded-lg transition" aria-label="Notifications">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="btn-primary hidden md:flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Document</span>
          </button>
        </div>
      </div>
    </div>
  );
  // Stats Cards
  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="card">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
              {stat.icon}
            </div>
            <span className="text-sm text-slate-500">{stat.change}</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
          <p className="text-sm text-slate-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
  // Documents Table
  const DocumentsTable = () => {
    const getStatusColor = (status) => {
      switch(status) {
        case 'completed': return 'badge-success';
        case 'pending': return 'badge-warning';
        case 'draft': return 'badge-info'; // Using info for draft
        default: return 'bg-slate-100 text-slate-700';
      }
    };

    const getStatusIcon = (status) => {
      switch(status) {
        case 'completed': return <CheckCircle className="w-4 h-4" />;
        case 'pending': return <Clock className="w-4 h-4" />;
        case 'draft': return <FileText className="w-4 h-4" />;
        default: return <FileText className="w-4 h-4" />;
      }
    };

    const filteredDocs = documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="card">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h2 className="text-xl font-semibold text-slate-900">Recent Documents</h2>
            
            <div className="flex items-center space-x-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field appearance-none pr-10"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Signers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {!loadingDocs && filteredDocs.map((doc) => (
                <tr 
                  key={doc.id} 
                  className="hover:bg-slate-50 transition cursor-pointer"
                  onClick={() => {
                    setSelectedDoc(doc);
                    handleViewChange('editor');
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-center bg-emerald-50 rounded-lg text-emerald-600 mr-3">
                        <FileSignature className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <p className="text-xs text-slate-500">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${getStatusColor(doc.status)}`}>
                      <span className="mr-1.5">{getStatusIcon(doc.status)}</span>
                      <span className="capitalize">{doc.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {doc.signedBy || 0} of {doc.signers ? doc.signers.length : 0} signed
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-emerald-600 h-1.5 rounded-full" 
                        style={{ width: `${doc.signers && doc.signers.length > 0 ? (doc.signedBy / doc.signers.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {doc.date ? new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="table-actions">
                      <button className="table-action-btn" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="table-action-btn" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="table-action-btn" title="Send">
                        <Send className="w-4 h-4" />
                      </button>
                      <button 
                        className="table-action-btn delete" 
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          if (window.confirm(`Are you sure you want to delete "${doc.name}"?`)) {
                            const docRef = doc(db, "documents", doc.id);
                            deleteDoc(docRef);
                            // Note: This doesn't delete the file from Storage. 
                            // That would require another function call.
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loadingDocs && (
          <div className="p-12 text-center">
            <div role="status" className="flex items-center justify-center">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5424 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="text-slate-500 ml-3">Loading your documents...</span>
            </div>
          </div>
        )}

        {!loadingDocs && filteredDocs.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No documents found</p>
          </div>
        )}
      </div>
    );
  };
  // Recent Activity Panel
  const RecentActivity = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      {recentActivity.length > 0 ? (<div className="space-y-4">
        {recentActivity.map((activity, idx) => (
          <div key={idx} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
            <div className="w-8 h-8 flex-center bg-emerald-50 rounded-full text-emerald-600 flex-shrink-0">
              <FileSignature className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">
                <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()} <span className="font-medium">{activity.document}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>) : (
        <div className="p-6 text-center text-slate-500">
          No recent activity to show.
        </div>
      )}
      {recentActivity.length > 0 && (
        <button className="w-full mt-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium flex-center space-x-1">
          <span>View All Activity</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
  // Quick Actions Panel
  const QuickActions = () => (
    <div className="gradient-emerald rounded-xl shadow-lg p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={() => setCurrentView('upload')}
          className="w-full flex items-center space-x-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition backdrop-blur-sm"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Document</span>
        </button>
        <button 
          onClick={() => setCurrentView('ai-contract')}
          className="w-full flex items-center space-x-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition backdrop-blur-sm"
        >
          <Zap className="w-5 h-5" />
          <span>Create with AI</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition backdrop-blur-sm">
          <Send className="w-5 h-5" />
          <span>Send for Signature</span>
        </button>
      </div>
    </div>
  );
  // Main Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      <StatsCards />
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DocumentsTable />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
  // Upload View (Placeholder)
  const UploadView = () => {
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
 
    const handleChooseFile = () => {
      fileInputRef.current.click();
    };
 
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) return;
 
      // Basic validation
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are supported.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError('File size cannot exceed 10MB.');
        return;
      }
 
      uploadFile(file);
    };
 
    const uploadFile = (file) => {
      if (!user) {
        setError("You must be logged in to upload a file.");
        return;
      }
 
      setIsUploading(true);
      setError('');
      setUploadProgress(0);
 
      const storage = getStorage();
      const storageRef = ref(storage, `documents/${user.uid}/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
 
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          setError('An error occurred during upload. Please try again.');
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // File uploaded, now create Firestore document
            try {
              await addDoc(collection(db, "documents"), {
                userId: user.uid,
                name: file.name,
                url: downloadURL,
                size: `${(file.size / 1024).toFixed(2)} KB`,
                type: 'PDF',
                status: 'draft',
                // Initialize signers as an array with the uploader as the first signer
                signers: [{ email: user.email, status: 'signed' }],
                // signedBy can be derived from the signers array length
                signedBy: 1, 
                date: serverTimestamp(), // Use server timestamp
              });
              // Success! Go back to the dashboard
              handleViewChange('dashboard');
            } catch (e) {
              console.error("Error adding document to Firestore: ", e);
              setError('Failed to save the document after upload.');
              setIsUploading(false);
            }
          });
        }
      );
    };
 
    return (
      <div className="card p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 flex-center bg-blue-50 rounded-full mx-auto mb-6">
            <Upload className="w-10 h-10 text-blue-600" />
          </div>
          {!isUploading ? (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Upload Document</h2>
              <p className="text-slate-600 mb-8">Drag and drop your PDF file here, or click to browse</p>
              <button onClick={handleChooseFile} className="btn-primary">
                Choose File
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />
              {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
              <p className="text-sm text-slate-500 mt-4">Supported formats: PDF (Max 10MB)</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Uploading...</h2>
              <p className="text-slate-600 mb-8">Please wait while your document is being uploaded.</p>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <p className="text-sm font-medium text-slate-700 mt-2">{Math.round(uploadProgress)}%</p>
            </>
          )}
        </div>
      </div>
    );
  };
  // AI Contract View (Placeholder)
  const AIContractView = () => {
    const [contractType, setContractType] = useState('Employment Contract');
    const [description, setDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContract, setGeneratedContract] = useState('');
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleGenerateContract = async () => {
      if (!description) {
        setError('Please describe your needs for the contract.');
        return;
      }

      setIsGenerating(true);
      setError('');
      setGeneratedContract('');

      // In a real application, you would send this data to your backend
      // which then calls the AI service (e.g., OpenAI, Gemini).
      try {
        // Simulating a network request to a backend endpoint
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Mock response from the AI
        const mockResponse = `
## ${contractType}

**Generated on:** ${new Date().toLocaleDateString()}

**Parties:**
- [Your Company Name] ("The Company")
- [Employee/Contractor Name] ("The Individual")

**Based on your description:**
${description}

---

### 1. Position and Duties
The Individual will serve as a Senior Software Engineer. Duties will include designing, developing, and maintaining software applications as directed by The Company.

### 2. Compensation
The Company will pay The Individual a salary of $120,000 per year, payable in bi-weekly installments.

### 3. Work Arrangement
This is a remote position. The Individual is expected to be available during standard business hours in their local time zone.

*(Disclaimer: This is an AI-generated document. It is not legal advice. Please consult with a legal professional before use.)*
        `;
        setGeneratedContract(mockResponse);
      } catch (e) {
        setError('An unexpected error occurred. Please try again.');
        console.error(e);
      } finally {
        setIsGenerating(false);
      }
    };

    const handleSaveContract = async () => {
      if (!generatedContract || !user) {
        setError("Cannot save an empty contract or user not found.");
        return;
      }
      setIsSaving(true);
      setError('');

      try {
        const docData = {
          userId: user.uid,
          name: contractType,
          content: generatedContract, // Storing the text content
          size: `${(generatedContract.length / 1024).toFixed(2)} KB`,
          type: 'AI Generated',
          status: 'draft',
          // Initialize signers array with the creator as the first signer
          signers: [{ email: user.email, status: 'pending' }],
          signedBy: 0,
          date: serverTimestamp(),
        };
        // Create a new document in the 'documents' collection
        const docRef = await addDoc(collection(db, "documents"), docData);

        // After saving, navigate to the editor view for the new document.
        // This simulates opening the document to sign it.
        const newDoc = { id: docRef.id, ...docData };
        setSelectedDoc(newDoc);
        handleViewChange('editor');
      } catch (e) {
        console.error("Error saving document: ", e);
        setError("Failed to save the contract. Please try again.");
      } finally {
        setIsSaving(false);
      }
    };

    return (
      <div className="card p-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 flex-center bg-purple-50 rounded-full mx-auto mb-6">
              <Zap className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">AI Contract Creator</h2>
            <p className="text-slate-600">Describe the contract you need and let AI generate it for you</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contract Type</label>
              <select value={contractType} onChange={(e) => setContractType(e.target.value)} className="input-field">
                <option>Employment Contract</option>
                <option>NDA</option>
                <option>Service Agreement</option>
                <option>Freelance Contract</option>
                <option>Lease Agreement</option>
                <option>Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Describe Your Needs</label>
              <textarea
                rows={6}
                className="input-field resize-none"
                placeholder="Example: I need an employment contract for a senior software engineer position with a $120,000 salary, remote work option, and 3 weeks vacation..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

            <button 
              onClick={handleGenerateContract} 
              disabled={isGenerating}
              className="btn-primary w-full flex-center space-x-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Generate Contract with AI</span>
                </>
              )}
            </button>
          </div>

          {generatedContract && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Generated Contract</h3>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">{generatedContract}</pre>
              </div>
              <button 
                onClick={handleSaveContract}
                disabled={isSaving}
                className="btn-secondary mt-4 w-full md:w-auto flex-center disabled:bg-slate-200 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save and Edit"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  // Settings View (Placeholder)
  const SettingsView = () => (
    <div className="card p-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 flex-center bg-slate-100 rounded-full mx-auto mb-6">
          <Settings className="w-10 h-10 text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Settings</h2>
        <p className="text-slate-600">
          This is where user profile settings, billing information, and application preferences will go.
          This view is currently under construction.
        </p>
      </div>
    </div>
  );
  // Main Render
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Overlay for mobile - keep it to close the sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          aria-hidden="true"
        ></div>
      )}
      <Sidebar user={user} sidebarOpen={sidebarOpen} />
      <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleShowNotifications={handleShowNotifications} />
      
      <main className={`dashboard-main ${!sidebarOpen && 'collapsed'}`}>
        <div className="max-w-7xl mx-auto">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'upload' && <UploadView />}
          {currentView === 'ai-contract' && <AIContractView />}
          {currentView === 'settings' && <SettingsView />}
          {currentView === 'editor' && <DocumentEditorView document={selectedDoc} />}
        </div>
      </main>
    </div>
  );
}