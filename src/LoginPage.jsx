import React, { useState } from 'react';
import { CheckCircle, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from './firebase'; // Import the auth instance

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      setSuccess('');
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
      setError('');
      setSuccess('');
      const result = await signInWithPopup(auth, provider);
      // The user is signed in. `App.jsx` will handle the redirect.
      console.log('Google Sign-In successful:', result.user);
    } catch (error) {
      // Handle Errors here.
      console.error("Google Sign-In Error:", error.code, error.message);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }
    setError('');
    setSuccess('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('If an account exists for this email, a password reset link has been sent. Please check your inbox and spam folder.');
    } catch (error) {
      setError('Failed to send password reset email. Please check the address and try again.');
      console.error("Password Reset Error:", error);
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
            {/* Google Logo SVG */}
            <svg className="social-btn-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
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

        {success && (
          <div className="auth-success-message">
            {success}
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
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
              <a href="#" onClick={handlePasswordReset} className="auth-link text-sm font-medium">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
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