import React, { useState, useRef } from 'react';
import { 
  CheckCircle, FileText, Upload, Clock, CheckSquare, 
  Search, Filter, Plus, MoreVertical, Download, 
  Trash2, Eye, Send, Folder, Bell, Settings, 
  LogOut, User, Menu, X, TrendingUp, Users, 
  FileSignature, Zap, ChevronRight, Calendar
} from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from './firebase';

export default function DashboardPage({ user }) { // Accept the user prop
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock documents data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Employment Contract - Sarah Johnson",
      status: "completed",
      date: "2024-11-28",
      type: "Contract",
      signers: 2,
      signedBy: 2,
      size: "245 KB"
    },
    {
      id: 2,
      name: "NDA - Tech Corp Partnership",
      status: "pending",
      date: "2024-11-27",
      type: "NDA",
      signers: 3,
      signedBy: 1,
      size: "189 KB"
    },
    {
      id: 3,
      name: "Service Agreement Q4 2024",
      status: "pending",
      date: "2024-11-26",
      type: "Agreement",
      signers: 2,
      signedBy: 1,
      size: "312 KB"
    },
    {
      id: 4,
      name: "Freelance Invoice #2024-089",
      status: "draft",
      date: "2024-11-25",
      type: "Invoice",
      signers: 1,
      signedBy: 0,
      size: "156 KB"
    },
    {
      id: 5,
      name: "Lease Agreement - Office Space",
      status: "completed",
      date: "2024-11-20",
      type: "Lease",
      signers: 2,
      signedBy: 2,
      size: "423 KB"
    }
  ]);

  // Stats data
  const stats = [
    {
      label: "Documents This Month",
      value: "24",
      change: "+12%",
      icon: <FileText className="w-6 h-6" />,
      color: "emerald"
    },
    {
      label: "Pending Signatures",
      value: "7",
      change: "3 urgent",
      icon: <Clock className="w-6 h-6" />,
      color: "amber"
    },
    {
      label: "Completed",
      value: "142",
      change: "+8 this week",
      icon: <CheckSquare className="w-6 h-6" />,
      color: "blue"
    },
    {
      label: "AI Contracts Created",
      value: "18",
      change: "+5 this week",
      icon: <Zap className="w-6 h-6" />,
      color: "purple"
    }
  ];

  // Recent activity
  const recentActivity = [
    { action: "Signed", document: "Employment Contract", user: "Sarah Johnson", time: "2 hours ago" },
    { action: "Sent", document: "NDA Document", user: "You", time: "5 hours ago" },
    { action: "Viewed", document: "Service Agreement", user: "Mike Chen", time: "1 day ago" },
    { action: "Created", document: "Invoice #089", user: "You", time: "2 days ago" }
  ];

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

  const Sidebar = ({ user, sidebarOpen }) => (
    <div className={`sidebar ${
      sidebarOpen ? 'w-64' : 'w-0 -ml-64' // Width is controlled by state
    }`}>
      <div className="sidebar-content">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <span className="dashboard-logo-text">Endorse</span>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`sidebar-btn ${currentView === 'dashboard' ? 'sidebar-btn-active' : 'sidebar-btn-inactive'}`}
          >
            <FileText className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => setCurrentView('upload')}
            className={`sidebar-btn ${currentView === 'upload' ? 'sidebar-btn-active' : 'sidebar-btn-inactive'}`}
          >
            <Upload className="w-5 h-5 mr-3" />
            <span>Upload Document</span>
          </button>

          <button 
            onClick={() => setCurrentView('ai-contract')}
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
            onClick={() => setCurrentView('settings')}
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

  const TopNav = ({ sidebarOpen, setSidebarOpen }) => (
    <div className={`top-nav ${sidebarOpen ? 'md:left-64' : 'md:left-0'}`}>
      <div className="flex items-center justify-between px-6 h-20">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
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
              {filteredDocs.map((doc) => (
                <tr 
                  key={doc.id} 
                  className="hover:bg-slate-50 transition cursor-pointer"
                  onClick={() => {
                    // Dispatch a custom event to navigate
                    window.dispatchEvent(new CustomEvent('navigate', { detail: 'editor' }));
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
                      {doc.signedBy} of {doc.signers} signed
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-emerald-600 h-1.5 rounded-full" 
                        style={{ width: `${(doc.signedBy / doc.signers) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
                      <button className="table-action-btn delete" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocs.length === 0 && (
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
      <div className="space-y-4">
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
      </div>
      <button className="w-full mt-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium flex-center space-x-1">
        <span>View All Activity</span>
        <ChevronRight className="w-4 h-4" />
      </button>
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

    const handleChooseFile = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        alert(`File selected: ${file.name}`);
        // Here you would typically start the upload process
      }
    };

    return (
      <div className="card p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 flex-center bg-blue-50 rounded-full mx-auto mb-6">
            <Upload className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Upload Document</h2>
          <p className="text-slate-600 mb-8">Drag and drop your PDF file here, or click to browse</p>
          <button onClick={handleChooseFile} className="btn-primary">
            Choose File
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />
          <p className="text-sm text-slate-500 mt-4">Supported formats: PDF (Max 10MB)</p>
        </div>
      </div>
    );
  };
  // AI Contract View (Placeholder)
  const AIContractView = () => (
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
            <select className="input-field">
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
            ></textarea>
          </div>

          <button 
            onClick={() => alert('Generating AI Contract... (This is a placeholder)')} 
            className="btn-primary w-full flex-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Generate Contract with AI</span>
          </button>
        </div>
      </div>
    </div>
  );
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
      <Sidebar user={user} sidebarOpen={sidebarOpen} />
      <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className={`pt-24 pb-8 px-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'upload' && <UploadView />}
          {currentView === 'ai-contract' && <AIContractView />}
          {currentView === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
}