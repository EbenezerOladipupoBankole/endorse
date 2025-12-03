import React, { useState } from 'react';
import DashboardPage from './DashboardPage';
import DocumentEditorPage from './DocumentEditorPage';
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ContactPage from './ContactPage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// This is a simple router to switch between pages.
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null); // Start with no page determined

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // --- Centralized Routing Logic ---
      const currentHash = window.location.hash || '#home';
      const isAuthPage = currentHash === '#login' || currentHash === '#signup';
      const isProtectedPage = currentHash === '#dashboard' || currentHash === '#editor';

      if (currentUser && isAuthPage) {
        // Logged-in user on auth page -> redirect to dashboard
        window.location.hash = '#dashboard';
      } else if (!currentUser && isProtectedPage) {
        // Logged-out user on protected page -> redirect to login
        window.location.hash = '#login';
      } else {
        // Otherwise, set the page normally
        setPage(currentHash);
      }
    });

    const handleHashChange = () => setPage(window.location.hash || '#home');
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Show a loading indicator while Firebase checks auth status
  if (loading) {
    // You can replace this with a proper spinner component
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (page === '#editor') {
    return user ? <DocumentEditorPage user={user} /> : <LoginPage />;
  }

  if (page === '#dashboard') {
    return user ? <DashboardPage user={user} /> : <LoginPage />;
  }

  if (page === '#login') {
    return <LoginPage />;
  }

  if (page === '#signup') {
    return <SignupPage />;
  }

  if (page === '#about') {
    return <AboutPage />;
  }

  if (page === '#contact') {
    return <ContactPage />;
  }

  // Default to the landing page
  return <LandingPage />;
}

export default App;