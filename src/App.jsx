import React, { useState } from 'react';
import DashboardPage from './DashboardPage';
import DocumentEditorPage from './DocumentEditorPage';
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import ContactPage from './ContactPage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// This is a simple router to switch between pages.
// In a larger application, you would use a library like React Router.
function App() {
  const [page, setPage] = useState(window.location.hash || '#home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash || '#home'); // Always update the page state from the hash
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // This effect should only run once

  // Listen for authentication state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // This effect also runs only once to set up the listener

  // This effect handles the routing logic based on auth state
  React.useEffect(() => {
    if (loading) return; // Don't do anything while checking auth

    const isAuthPage = page === '#login' || page === '#signup';
    const isProtectedPage = page === '#dashboard' || page === '#editor';

    if (user && isAuthPage) {
      // If a logged-in user tries to go to the login page, redirect to dashboard
      window.location.hash = '#dashboard';
    } else if (!user && isProtectedPage) {
      // If a logged-out user tries to access a protected page, redirect to login
      window.location.hash = '#login';
    }
  }, [user, page, loading]);

  // Show a loading indicator while Firebase checks auth status
  if (loading) {
    // You can replace this with a proper spinner component
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (page === '#editor') {
    // This is a protected route
    return user ? <DocumentEditorPage user={user} /> : <LoginPage />;
  }

  if (page === '#dashboard') {
    // This is a protected route
    return user ? <DashboardPage user={user} /> : <LoginPage />;
  }

  if (page === '#login') {
    return <LoginPage />;
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