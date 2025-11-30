import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import endorseLogo from './assets/endorse.webp';

export default function ContactPage() {
  const handleNavigate = (page) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  const contactInfo = [
    { icon: <Mail size={24} />, title: "Email Us", text: "Our team is here to help.", link: "support@endorse.com", href: "mailto:support@endorse.com" },
    { icon: <Phone size={24} />, title: "Call Us", text: "Mon-Fri from 8am to 5pm.", link: "+1 (555) 000-0000", href: "tel:+15550000000" },
    { icon: <MapPin size={24} />, title: "Visit Us", text: "123 Innovation Drive, Tech City, 12345", link: "Get Directions", href: "#" }
  ];

  return (
    <div className="contact-page">
      <header className="about-header">
        <div className="about-header-content">
          <img src={endorseLogo} alt="Endorse Logo" className="logo-img" style={{ height: '4rem' }} />
          <button onClick={() => handleNavigate('home')} className="back-to-home-btn">
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </header>

      <main className="contact-main">
        <div className="section-header">
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">We’d love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.</p>
        </div>

        <div className="contact-content-grid">
          {/* Left Side: Contact Form */}
          <div className="contact-form-container card">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" className="input-field" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" className="input-field" placeholder="you@company.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" className="input-field" rows="6" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="contact-info-container">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-info-item">
                <div className="feature-icon">
                  {item.icon}
                </div>
                <div className="contact-info-details">
                  <h3 className="contact-info-title">{item.title}</h3>
                  <p className="contact-info-text">{item.text}</p>
                  <a href={item.href} className="contact-info-link">{item.link}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}