import React from 'react';
import { CheckCircle, Mail } from 'lucide-react';

export default function SignUpPage() {
  const handleNavigate = (page) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-icon" style={{ marginBottom: '1rem' }}>
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">
            Already have an account?{' '}
            <button onClick={() => handleNavigate('login')} className="auth-link">
              Sign in
            </button>
          </p>
        </div>

        <div className="social-logins">
          <button className="social-btn">
            {/* In a real app, you'd use an SVG icon here */}
            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px', height: '16px' }} />
            Sign up with Google
          </button>
          <button className="social-btn">
            <Mail className="w-4 h-4" />
            Sign up with Email
          </button>
        </div>

        <div className="auth-separator">
          OR
        </div>

        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleNavigate('dashboard'); }}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" required className="input-field" />
          </div>

          <div>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required className="input-field" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required className="input-field" />
          </div>

          <div>
            <button type="submit" className="btn-primary w-full">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}