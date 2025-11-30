import React from 'react';
import { CheckCircle, Mail } from 'lucide-react';

export default function LoginPage() {
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
          <h2 className="auth-title">Sign in to your account</h2>
          <p className="auth-subtitle">
            Or{' '}
            <button onClick={() => handleNavigate('signup')} className="auth-link">
              create an account
            </button>
          </p>
        </div>

        <div className="social-logins">
          <button className="social-btn">
            {/* In a real app, you'd use an SVG icon here */}
            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px', height: '16px' }} />
            Sign in with Google
          </button>
          <button className="social-btn">
            <Mail className="w-4 h-4" />
            Sign in with Email
          </button>
        </div>

        <div className="auth-separator">
          OR
        </div>

        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleNavigate('dashboard'); }}>
          <div>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required className="input-field" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password">Password</label>
              <button type="button" className="auth-link" style={{ fontSize: '0.875rem' }}>
                Forgot password?
              </button>
            </div>
            <input id="password" name="password" type="password" required className="input-field" />
          </div>

          <div>
            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}