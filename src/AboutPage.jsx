import React from 'react';
import { Target, Users, ShieldCheck, HeartHandshake, ArrowLeft } from 'lucide-react';
import endorseLogo from './assets/endorse.webp';
// import founderImage from './assets/founder.jpg'; // This line is causing the error, so we'll comment it out for now.

export default function AboutPage() {
  const handleNavigateHome = () => {
    window.location.hash = '#home';
  };

  const handleNavigateSignup = () => {
    window.location.hash = '#signup';
  };

  const founder = {
    name: "Ebenezer Bankole",
    title: "Owner",
    avatar: endorseLogo, // Using the logo as a temporary placeholder to fix the error.
    story: "Ebenezer Bankole is the Founder and CEO of Endorse. He’s currently studying Software Development (Bsc) at Brigham Young University–Idaho, where his growing love for programming has pushed him to think bigger and build things that solve real problems. That spirit led to Endorse a fresh, modern e-signature platform designed to make signing and approvals feel simple, quick, and truly stress free for businesses."
  };

  const values = [
    { icon: <Target />, title: "Innovation", description: "We constantly push the boundaries of what's possible, integrating cutting-edge AI to solve real-world problems." },
    { icon: <ShieldCheck />, title: "Security", description: "The trust of our users is paramount. We are committed to bank-grade security in every feature we build." },
    { icon: <Users />, title: "Customer-Centricity", description: "We listen, we learn, and we build for our customers. Your success is our ultimate metric." },
    { icon: <HeartHandshake />, title: "Integrity", description: "We believe in doing business the right way—with transparency, honesty, and a commitment to ethical practices." },
  ];

  return (
    <div className="about-page">
      <header className="about-header">
        <div className="about-header-content">
          <img src={endorseLogo} alt="Endorse Logo" className="logo-img" style={{ height: '4rem' }} />
          <button onClick={handleNavigateHome} className="back-to-home-btn">
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </header>

      <main className="about-main">
        <section className="about-hero-section">
          <h1 className="about-hero-title">Our Mission: To Revolutionize Digital Trust.</h1>
          <p className="about-hero-subtitle">
            We started Endorse with a simple belief: the tools we use to make agreements should be as intelligent, secure, and efficient as the teams that use them. In a world that's moving faster than ever, the friction of traditional document workflows holds businesses back. Printing, signing, scanning, and chasing signatures is a relic of the past.
          </p>
          <p className="about-hero-subtitle">
            Endorse was born to change that. We're not just another e-signature tool. We are an AI-powered platform dedicated to streamlining the entire lifecycle of your most important documents, empowering you to focus on what truly matters: growing your business and building relationships.
          </p>
        </section>

        <section className="values-section">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide every decision we make.</p>
          </div>
          <div className="values-grid">
            {values.map((value, idx) => (
              <div key={idx} className="value-card">
                <div className="feature-icon">
                  {React.cloneElement(value.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="feature-title">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="team-section">
          <div className="section-header">
            <h2 className="section-title">Meet the Founder</h2>
            <p className="section-subtitle">The passionate mind behind Endorse.</p>
          </div>
          <div className="founder-profile">
            <img src={founder.avatar} alt={founder.name} className="team-avatar" style={{ width: '150px', height: '150px' }} />
            <h3 className="team-name">{founder.name}</h3>
            <p className="team-title">{founder.title}</p>
            <p className="founder-story">{founder.story}</p>
          </div>
        </section>

        <section className="final-cta-section">
          <h2 className="final-cta-title">Join Us on Our Mission</h2>
          <p className="final-cta-subtitle">Experience the future of document workflows. Start your free trial and see how Endorse can transform your business.</p>
          <button onClick={handleNavigateSignup} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            Get Started for Free
          </button>
        </section>
      </main>
    </div>
  );
}
