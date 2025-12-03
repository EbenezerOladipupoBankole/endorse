import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  const handleNavigateSignup = () => {
    window.location.hash = '#signup';
  };

  return (
    <div className="about-page">
      <header className="about-header">
        <div className="about-header-content">
          <button onClick={() => window.location.hash = '#home'} className="back-to-home-btn">
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </header>

      <main className="about-main">
        <section className="about-hero-section">
          <div>
            <h1 className="about-hero-title">Our mission is to simplify digital agreements.</h1>
            <p className="about-hero-subtitle">
              We believe that technology should empower, not complicate. Endorse was born from a simple idea: to create a secure, intuitive, and efficient platform for managing documents and signatures, so you can focus on what truly matters—building relationships and growing your business.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop"
            alt="Team collaborating in a modern office"
            className="about-hero-image"
          />
        </section>

        <section className="values-section">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide our work and culture.</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <h3 className="feature-title">Simplicity</h3>
              <p>We are obsessed with making complex processes easy and intuitive. Every feature is designed with the user experience as our top priority.</p>
            </div>
            <div className="value-card">
              <h3 className="feature-title">Security</h3>
              <p>Your trust is our most important asset. We employ state-of-the-art security measures to ensure your documents are always safe and confidential.</p>
            </div>
            <div className="value-card">
              <h3 className="feature-title">Innovation</h3>
              <p>We are constantly exploring new technologies, like AI, to push the boundaries of what’s possible and deliver more value to our users.</p>
            </div>
          </div>
        </section>

        <section className="founder-profile">
          <div className="founder-story">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
              alt="Bankole Ebenezer, Founder"
              className="founder-avatar"
            />
            <h2 className="section-title">A Note from Our Founder</h2>
            <p className="mt-4 founder-quote">
              "I started Endorse after years of frustration with clunky, overpriced e-signature software. I knew there had to be a better way. My goal was to build a tool that was not only powerful and secure but also a joy to use. We're just getting started, and I'm so excited for you to be a part of our journey."
            </p>
            <p className="mt-6 font-semibold text-slate-800">- Bankole Ebenezer, Founder</p>
          </div>
        </section>
      </main>
    </div>
  );
}
