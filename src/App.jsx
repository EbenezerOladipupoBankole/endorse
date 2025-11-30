import React, { useState } from 'react';
import DashboardPage from './DashboardPage';
import DocumentEditorPage from './DocumentEditorPage';
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';

// This is a simple router to switch between pages.
// In a larger application, you would use a library like React Router.
function App() {
  const [page, setPage] = useState('home');

  // We can navigate by listening to a custom event.
  // This is a simple way to allow child components to change the page.
  React.useEffect(() => {
    const handleNavigate = (event) => {
      setPage(event.detail);
    };

    window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  if (page === 'editor') {
    return <DocumentEditorPage />;
  }

  if (page === 'dashboard') {
    return <DashboardPage />;
  }

  if (page === 'login') {
    return <LoginPage />;
  }

  if (page === 'about') {
    return <AboutPage />;
  }

  // Default to the landing page
  return <LandingPage />;
}

export default App;