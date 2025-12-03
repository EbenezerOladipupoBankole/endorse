import React, { useState } from 'react';
import { CheckCircle, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Import the auth instance

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On success, the onAuthStateChanged listener in App.jsx will handle the redirect.
    } catch (err) {
      // Provide user-friendly error messages
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error("Email/Password Sign-In Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The user is signed in. `App.jsx` will handle the redirect.
      console.log('Google Sign-In successful:', result.user);
    } catch (error) {
      // Handle Errors here.
      console.error("Google Sign-In Error:", error.code, error.message);
    }
  };

  const handleNavigateToHome = () => {
    window.location.hash = '#home';
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div
            className="dashboard-logo-icon mx-auto mb-4 cursor-pointer"
            onClick={handleNavigateToHome}
            title="Back to Home"
          >
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            Don't have an account?{' '}
            <a href="#signup" className="auth-link">
              Sign up
            </a>
          </p>
        </div>

        <div className="social-logins">
          <button onClick={handleGoogleLogin} className="social-btn">
            {/* A generic browser icon is used as a placeholder for the Google logo */}
            <Chrome className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>
          {/* You could add other social logins here, e.g., GitHub, Facebook */}
        </div>

        <div className="auth-separator">
          <span>OR</span>
        </div>

        {error && (
          <div className="auth-error-message">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex-center space-x-2">
            {loading ? <span>Signing In...</span> : <span>Sign In</span>}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}