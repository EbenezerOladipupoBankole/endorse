import React, { useState } from 'react';
import { CheckCircle, FileText, Users, Zap, Shield, Clock, ChevronRight, Menu, X, Check, Star, UploadCloud, PenTool, Send, Plus } from 'lucide-react';
import endorseLogo from './assets/endorse.webp'; // Import your logo

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  // Navigation Component
  const Navigation = () => (
    <header className="landing-header">
      <div className="header-content">
        <div className="flex items-center">
          <img src={endorseLogo} alt="Endorse Logo" className="logo-img" />
        </div>

        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <button onClick={() => handleNavigate('about')} className="font-medium" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>About</button>
          <button onClick={() => handleNavigate('login')} className="font-medium" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Login
          </button>
          <button onClick={() => handleNavigate('signup')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
            Sign Up Free
          </button>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav" style={{ display: 'flex' }}>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <button onClick={() => { handleNavigate('about'); setMobileMenuOpen(false); }} className="text-left" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0.5rem 0', fontWeight: 500, color: '#475569' }}>About</button>
          <button onClick={() => handleNavigate('login')} className="text-left" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0.5rem 0' }}>
            Login
          </button>
          <button onClick={() => handleNavigate('signup')} className="btn-primary" style={{ width: '100%' }}>
            Get Started
          </button>
        </div>
      )}
    </header>
  );

  // Hero Section
  const HeroSection = () => (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <Star className="w-5 h-5 text-accent-yellow" fill="currentColor" />
          <span>Rated 4.9/5 by thousands of users</span>
        </div>

        <h1 className="hero-title">
          The Smartest Way to Sign & Manage Documents
        </h1>

        <p className="hero-subtitle">
          Endorse combines legally-binding e-signatures with powerful AI tools to streamline your entire document workflow. From creation to completion, do it all in one place.
        </p>

        <div className="hero-actions">
          <button onClick={() => handleNavigate('signup')} className="btn-primary flex items-center" style={{ padding: '1rem 2rem', fontSize: '1.125rem', gap: '0.5rem' }}>
            Get Started for Free
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Watch Demo
          </button>
        </div>

        <p className="hero-meta">
          Free 14-day trial • No credit card required
        </p>
      </div>
    </section>
  );

  // Social Proof Section
  const SocialProof = () => (
    <section className="social-proof-section">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h3 className="social-proof-title">
          Trusted by the world's most innovative companies
        </h3>
        <div className="social-proof-logos">
          {/* Replace with your actual partner logos */}
          <img src="https://via.placeholder.com/120x40?text=Logo1" alt="Company Logo 1" />
          <img src="https://via.placeholder.com/120x40?text=Logo2" alt="Company Logo 2" />
          <img src="https://via.placeholder.com/120x40?text=Logo3" alt="Company Logo 3" />
          <img src="https://via.placeholder.com/120x40?text=Logo4" alt="Company Logo 4" />
          <img src="https://via.placeholder.com/120x40?text=Logo5" alt="Company Logo 5" />
        </div>
      </div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => {
    const features = [
      { icon: <Zap />, title: "AI Contract Generation", description: "Describe your needs in plain English and let our AI draft a professional, legally-sound contract for you in seconds." },
      { icon: <FileText />, title: "Smart Document Editor", description: "Easily place signature fields, text boxes, and date stamps. Our AI suggests placements to save you time." },
      { icon: <Users />, title: "Seamless Collaboration", description: "Invite multiple signers, set signing orders, and track progress in real-time with automated reminders." },
      { icon: <Shield />, title: "Bank-Grade Security", description: "Your documents are protected with AES-256 encryption and a complete, tamper-proof audit trail for legal compliance." },
      { icon: <Clock />, title: "Automated Workflows", description: "Set up templates and automated sequences to handle recurring documents, saving you hours of manual work." },
      { icon: <CheckCircle />, title: "Legally Binding", description: "Endorse signatures are compliant with eIDAS, ESIGN, and UETA regulations, making them legally binding worldwide." }
    ];

    return (
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">
            Go Beyond Signing. Automate Your Workflow.
          </h2>
          <p className="section-subtitle">
            Endorse is more than just an e-signature tool. It's an all-in-one platform designed to accelerate your business.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
              </div>
              <h3 className="feature-title">
                {feature.title}
              </h3>
              <p>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // How It Works Section
  const HowItWorksSection = () => (
    <section className="how-it-works-section">
      <div className="section-header">
        <h2 className="section-title">Get Documents Signed in 3 Simple Steps</h2>
        <p className="section-subtitle">Our intuitive platform makes it easy to go from document to signed agreement in minutes.</p>
      </div>
      <div className="how-it-works-grid">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="feature-icon"><UploadCloud size={32} /></div>
          <h3 className="step-title">Upload Your Document</h3>
          <p className="text-slate-600">Securely upload any PDF. Our system will process it instantly.</p>
        </div>
        <div className="step-card">
          <div className="step-number">2</div>
          <div className="feature-icon"><PenTool size={32} /></div>
          <h3 className="step-title">Add Fields & Signers</h3>
          <p className="text-slate-600">Drag and drop signature, text, and date fields. Assign them to signers with one click.</p>
        </div>
        <div className="step-card">
          <div className="step-number">3</div>
          <div className="feature-icon"><Send size={32} /></div>
          <h3 className="step-title">Send & Track</h3>
          <p className="text-slate-600">Send the document to all parties and monitor its progress in real-time from your dashboard.</p>
        </div>
      </div>
    </section>
  );

  // Testimonial Section
  const TestimonialSection = () => (
    <section className="testimonial-section">
      <div className="testimonial-content">
        <p className="testimonial-quote">"Endorse has revolutionized our onboarding process. What used to take days of printing, scanning, and emailing now takes about 15 minutes. The AI contract generator is a game-changer."</p>
        <p className="testimonial-author">Jane Smith, <span>HR Director at Innovate Inc.</span></p>
      </div>
    </section>
  );

  // Pricing Section
  const PricingSection = () => {
    const plans = [
      {
        name: "Starter",
        price: "0",
        period: "per month",
        description: "For individuals and personal projects.",
        features: ["3 documents per month", "Basic signature fields", "Email support", "7-day audit trail"],
        cta: "Start for Free",
        popular: false
      },
      {
        name: "Professional",
        price: "29",
        period: "per month",
        description: "For professionals and small teams.",
        features: ["Unlimited documents", "AI contract generation", "Custom branding", "Priority support", "Team collaboration"],
        cta: "Start Free Trial",
        popular: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large organizations with custom needs.",
        features: ["Everything in Pro", "Dedicated account manager", "API access & SSO", "On-premise option"],
        cta: "Contact Sales",
        popular: false
      }
    ];

    return (
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">Choose the plan that's right for you. All paid plans come with a 14-day free trial.</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, idx) => (
            <div key={idx} className={`pricing-card ${plan.popular ? 'popular' : ''}`} style={{ position: 'relative' }}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-price">
                {plan.price !== "Custom" && "$"}
                {plan.price}
            {plan.period && <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b', marginLeft: '0.25rem' }}>/ {plan.period}</span>}
              </p>
              <p className="plan-description">{plan.description}</p>
          <button onClick={() => handleNavigate('signup')} className={plan.popular ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%' }}>
                {plan.cta}
              </button>
              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex-center" style={{ justifyContent: 'flex-start' }}>
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // FAQ Section
  const FAQSection = () => {
    const faqs = [
      { q: "Are the signatures legally binding?", a: "Yes. Endorse complies with the U.S. ESIGN Act, UETA, and eIDAS regulations in the EU, making our electronic signatures legally binding worldwide." },
      { q: "What kind of security do you use?", a: "We take security very seriously. All documents are encrypted in transit and at rest using AES-256 encryption. We also provide a complete, tamper-proof audit trail for every document." },
      { q: "Can I use my own branding?", a: "Absolutely. Our Professional and Enterprise plans allow you to add your own company logo and brand colors to the signing experience for a seamless look and feel." },
      { q: "What happens if I cancel my subscription?", a: "If you cancel your subscription, you will still have access to all your signed documents. You can download them at any time. You will only lose the ability to send new documents for signature." }
    ];
    const [openFAQ, setOpenFAQ] = useState(0);

    return (
      <section className="faq-section">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.</p>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}>
                <span>{faq.q}</span>
                <span>{openFAQ === idx ? <X size={20} /> : <Plus size={20} />}</span>
              </button>
              {openFAQ === idx && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Final CTA Section
  const FinalCTASection = () => (
    <section className="final-cta-section">
      <h2 className="final-cta-title">Ready to Streamline Your Workflow?</h2>
      <p className="final-cta-subtitle">Join thousands of businesses that trust Endorse to get their documents signed faster. Start your free 14-day trial today.</p>
      <button onClick={() => handleNavigate('signup')} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
        Sign Up for Free
      </button>
    </section>
  );

  // Footer
    const Footer = () => {
        // A simple placeholder for social icons. In a real app, you'd use an icon library.
        const SocialIcon = ({ children }) => <div className="social-icon">{children}</div>;

        return (
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-grid">
                        {/* Column 1: Brand and Social */}
                        <div className="footer-column brand-column">
                            <div className="flex items-center" style={{ marginBottom: '1rem' }}>
                                <img src={endorseLogo} alt="Endorse Logo" className="logo-img" />
                            </div>
                            <p>AI-powered digital signatures for modern teams.</p>
                            <div className="social-links">
                                <SocialIcon>T</SocialIcon>
                                <SocialIcon>L</SocialIcon>
                                <SocialIcon>G</SocialIcon>
                            </div>
                        </div>

                        {/* Column 2: Product Links */}
                        <div className="footer-column">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#">Security</a></li>
                                <li><a href="#">Integrations</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Company Links */}
                        <div className="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><button onClick={() => handleNavigate('about')} className="footer-link-button">About Us</button></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Newsletter Signup */}
                        <div className="footer-column newsletter-column">
                            <h4>Stay Updated</h4>
                            <p>Get the latest product news and updates.</p>
                            <div className="newsletter-form">
                                <input type="email" placeholder="Enter your email" />
                                <button>
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2025 Endorse. All rights reserved.</p>
                        <div className="footer-legal-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };

  // Main Render
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Navigation />
      <main>
        <HeroSection />
        <SocialProof />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  );
}