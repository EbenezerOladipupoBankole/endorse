import React, { useState, useEffect } from 'react';
import { CheckCircle, FileText, Users, Zap, Shield, Clock, ChevronRight, Menu, X, Check, Star, UploadCloud, PenTool, Send, Plus, ArrowUp, MessageSquare, Twitter, Linkedin, Instagram, ChevronDown } from 'lucide-react';
import endorseLogo from './assets/endorse.webp'; // Import your logo

export default function LandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check for cookie consent on mount
    if (localStorage.getItem('cookiesAccepted') !== 'true') {
      setShowCookieBanner(true);
    }

    // Add event listener to close dropdown on outside click
    const handleOutsideClick = (event) => {
      // Check if the click is outside the dropdown-related elements
      if (openDropdown && !event.target.closest('.nav-item-dropdown')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openDropdown]);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  const handleNavigate = (page) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  const handleDropdownToggle = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null); // Close if already open
    } else {
      setOpenDropdown(dropdownName); // Open the clicked one
    }
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
          
          {/* Tools Dropdown */}
          <div className="nav-item-dropdown">
            <button onClick={() => handleDropdownToggle('tools')} className="dropdown-toggle font-medium">
              Tools
              <ChevronDown size={16} />
            </button>
            <div className={`dropdown-menu ${openDropdown === 'tools' ? 'open' : ''}`}>
              <a href="/tools/pdf-to-word" className="dropdown-item">PDF to Word</a>
              <a href="/tools/pdf-to-excel" className="dropdown-item">PDF to Excel</a>
              <a href="/tools/pdf-to-ppt" className="dropdown-item">PDF to PowerPoint</a>
              <a href="/tools/compress-pdf" className="dropdown-item">Compress PDF</a>
              <a href="/tools/merge-pdf" className="dropdown-item">Merge PDF</a>
              <a href="/tools/split-pdf" className="dropdown-item">Split PDF</a>
            </div>
          </div>

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
          
          {/* Mobile Tools Dropdown */}
          <div className="mobile-nav-dropdown">
            <button onClick={() => handleDropdownToggle('mobile-tools')} className="mobile-dropdown-toggle">
              Tools
              <ChevronDown size={16} className={`transition-transform ${openDropdown === 'mobile-tools' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mobile-dropdown-menu ${openDropdown === 'mobile-tools' ? 'open' : ''}`}>
              <a href="/tools/pdf-to-word" className="dropdown-item">PDF to Word</a>
              <a href="/tools/pdf-to-excel" className="dropdown-item">PDF to Excel</a>
              <a href="/tools/pdf-to-ppt" className="dropdown-item">PDF to PowerPoint</a>
              <a href="/tools/compress-pdf" className="dropdown-item">Compress PDF</a>
              <a href="/tools/merge-pdf" className="dropdown-item">Merge PDF</a>
              <a href="/tools/split-pdf" className="dropdown-item">Split PDF</a>
            </div>
          </div>

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
  const HeroSection = () => {
    const [typedText, setTypedText] = useState('');
    const words = ["Sign", "Manage", "Automate"];

    useEffect(() => {
      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const type = () => {
        const currentWord = words[wordIndex];
        if (isDeleting) {
          setTypedText(currentWord.substring(0, charIndex--));
          if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
          }
        } else {
          setTypedText(currentWord.substring(0, charIndex++));
          if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause at end of word
            return;
          }
        }
      };

      const typingInterval = setInterval(type, isDeleting ? 100 : 150);
      return () => clearInterval(typingInterval);
    }, []);

    return (
      <section className="hero-section">
      <div className="hero-content">
        {/* Decorative shapes for visual flair */}
        <div className="deco-shape shape-1"></div>
        <div className="deco-shape shape-2"></div>
        <div className="deco-shape shape-3"></div>
        <div className="deco-shape shape-4"><Plus size={16} /></div>

        <div className="hero-badge">
          <Star className="w-5 h-5 text-accent-yellow" fill="currentColor" />
          <span>Rated 4.9/5 by thousands of users</span>
        </div>
        <h1 className="hero-title">
          The Smartest Way to <span className="typed-text-container">{typedText}<span className="cursor">|</span></span> Documents
        </h1>
        <p className="hero-subtitle">
          Endorse combines legally-binding e-signatures with powerful AI tools to streamline your entire document workflow. From creation to completion, do it all in one place.
        </p>
        <div className="hero-actions">
          <button onClick={() => handleNavigate('signup')} className="btn-primary flex items-center" style={{ padding: '1rem 2rem', fontSize: '1.125rem', gap: '0.5rem' }}>
            Get Started for Free
            <ChevronRight className="w-5 h-5" />
          </button>
          <button onClick={() => setIsVideoModalOpen(true)} className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Watch Demo
          </button>
        </div>
        <p className="hero-meta">Free 14-day trial • No credit card required</p>
        <div className="hero-trusted-by">
          <p>Trusted by teams at:</p>
          <div className="hero-trusted-logos">
            <img src="https://via.placeholder.com/100x30?text=Innovate" alt="Innovate Inc." />
            <img src="https://via.placeholder.com/100x30?text=Quantum" alt="Quantum Corp" />
            <img src="https://via.placeholder.com/100x30?text=Apex" alt="Apex Solutions" />
            <img src="https://via.placeholder.com/100x30?text=Stellar" alt="Stellar Co." />
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <HeroDashboardCard />
      </div>
    </section>
    );
  };

  // Hero Visual Component
  const HeroDashboardCard = () => {
    return (
      <div className="hero-visual-card">
        <div className="card-header">
          <div className="card-title">Document Views</div>
          <div className="live-badge">
            <div className="live-dot"></div>
            Live
          </div>
        </div>
        <div className="graph-container">
          <svg viewBox="0 0 300 100" className="graph-svg">
            <defs>
              <linearGradient id="graph-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="graph-fill" d="M0,70 C30,20 70,80 100,60 S170,10 200,40 S270,80 300,50 L300,100 L0,100 Z" />
            <path className="graph-line" d="M0,70 C30,20 70,80 100,60 S170,10 200,40 S270,80 300,50" />
          </svg>
        </div>
      </div>
    );
  };

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
    const [activeFeature, setActiveFeature] = useState(0);
    const features = [
      { icon: <Zap />, title: "AI Contract Generation", description: "Describe your needs in plain English and let our AI draft a professional, legally-sound contract for you in seconds.", image: "https://via.placeholder.com/600x400/eff6ff/1d4ed8?text=AI+Drafting" },
      { icon: <FileText />, title: "Smart Document Editor", description: "Easily place signature fields, text boxes, and date stamps. Our AI suggests placements to save you time.", image: "https://via.placeholder.com/600x400/fef2f2/b91c1c?text=Smart+Editor" },
      { icon: <Users />, title: "Seamless Collaboration", description: "Invite multiple signers, set signing orders, and track progress in real-time with automated reminders.", image: "https://via.placeholder.com/600x400/f0fdf4/166534?text=Collaboration" },
      { icon: <Shield />, title: "Bank-Grade Security", description: "Your documents are protected with AES-256 encryption and a complete, tamper-proof audit trail for legal compliance.", image: "https://via.placeholder.com/600x400/ecfdf5/059669?text=Secure+Vault" },
      { icon: <Clock />, title: "Automated Workflows", description: "Set up templates and automated sequences to handle recurring documents, saving you hours of manual work.", image: "https://via.placeholder.com/600x400/fefce8/a16207?text=Automation" },
      { icon: <CheckCircle />, title: "Legally Binding", description: "Endorse signatures are compliant with eIDAS, ESIGN, and UETA regulations, making them legally binding worldwide.", image: "https://via.placeholder.com/600x400/faf5ff/7e22ce?text=Legally+Binding" }
    ];

    return (
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Go Beyond Signing. Automate Your Workflow.</h2>
          <p className="section-subtitle">Endorse is more than just an e-signature tool. It's an all-in-one platform designed to accelerate your business.</p>
        </div>

        <div className="features-interactive-layout">
          <div className="features-list">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`feature-list-item ${activeFeature === idx ? 'active' : ''}`}
                onClick={() => setActiveFeature(idx)}
                onMouseEnter={() => setActiveFeature(idx)}
              >
                <div className="feature-icon">
                  {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="feature-image-panel">
            <div className="feature-image-container">
              {features.map((feature, idx) => (
                <img
                  key={idx}
                  src={feature.image}
                  alt={feature.title}
                  className={`feature-image ${activeFeature === idx ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Comparison Section
  const ComparisonSection = () => {
    const comparisonData = [
      { feature: 'Legally Binding E-Signatures', endorse: true, traditional: true },
      { feature: 'Complete Audit Trail', endorse: true, traditional: true },
      { feature: 'Custom Branding', endorse: true, traditional: 'add-on' },
      { feature: 'AI Contract Generation', endorse: true, traditional: false },
      { feature: 'AI Field Placement', endorse: true, traditional: false },
      { feature: 'API & Integrations', endorse: 'enterprise', traditional: 'enterprise' },
    ];

    const renderCheck = (value) => {
      if (value === true) return <Check className="w-6 h-6 text-emerald-600" />;
      if (value === false) return <X className="w-6 h-6 text-red-400" />;
      return <span className="text-xs font-semibold uppercase">{value}</span>;
    };

    return (
      <section className="comparison-section">
        <div className="section-header">
          <h2 className="section-title">A Smarter Way to Work</h2>
          <p className="section-subtitle">Endorse goes beyond basic e-signatures, offering intelligent tools that traditional platforms can't match.</p>
        </div>
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="endorse-col">Endorse (with AI)</th>
                <th>Traditional E-Sign Tools</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index}>
                  <td>{item.feature}</td>
                  <td className="endorse-col">{renderCheck(item.endorse)}</td>
                  <td>{renderCheck(item.traditional)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <div className="step-card" style={{ animationDelay: '0.1s' }}>
          <div className="step-number">1</div>
          <div className="feature-icon"><UploadCloud size={32} /></div>
          <h3 className="step-title">Upload Your Document</h3>
          <p className="text-slate-600">Securely upload any PDF. Our system will process it instantly.</p>
        </div>
        <div className="step-card" style={{ animationDelay: '0.2s' }}>
          <div className="step-number">2</div>
          <div className="feature-icon"><PenTool size={32} /></div>
          <h3 className="step-title">Add Fields & Signers</h3>
          <p className="text-slate-600">Drag and drop signature, text, and date fields. Assign them to signers with one click.</p>
        </div>
        <div className="step-card" style={{ animationDelay: '0.3s' }}>
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
    const [billingCycle, setBillingCycle] = useState('monthly');

    const plans = [
      { name: "Starter", price: { monthly: "0", yearly: "0" }, period: "/ month", description: "For individuals and personal projects.", cta: "Start for Free", popular: false },
      { name: "Professional", price: { monthly: "29", yearly: "23" }, period: "/ month", description: "For professionals and small teams.", cta: "Start Free Trial", popular: true },
      { name: "Enterprise", price: { monthly: "Custom", yearly: "Custom" }, period: "", description: "For large organizations with custom needs.", cta: "Contact Sales", popular: false }
    ];

    const features = [
      { category: "Core Features", items: [
        { name: "Documents per month", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
        { name: "Legally Binding Signatures", starter: true, pro: true, enterprise: true },
        { name: "Complete Audit Trail", starter: "7-day", pro: "Full", enterprise: "Full" },
      ]},
      { category: "AI & Automation", items: [
        { name: "AI Contract Generation", starter: false, pro: true, enterprise: true },
        { name: "AI Smart Field Placement", starter: false, pro: true, enterprise: true },
        { name: "Automated Workflows", starter: false, pro: false, enterprise: true },
      ]},
      { category: "Team & Business", items: [
        { name: "Team Collaboration", starter: false, pro: true, enterprise: true },
        { name: "Custom Branding", starter: false, pro: true, enterprise: true },
        { name: "Priority Support", starter: false, pro: true, enterprise: true },
        { name: "Dedicated Account Manager", starter: false, pro: false, enterprise: true },
        { name: "API Access & SSO", starter: false, pro: false, enterprise: true },
      ]}
    ];

    const renderCheck = (value) => {
      if (value === true) return <Check className="w-6 h-6 text-emerald-600" />;
      if (value === false) return <span className="text-slate-400">-</span>;
      return <span className="text-sm font-medium text-slate-700">{value}</span>;
    };

    return (
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">Choose the plan that's right for you. All paid plans come with a 14-day free trial.</p>

          <div className="pricing-toggle">
            <button
              className={billingCycle === 'monthly' ? 'active' : ''}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <div className="toggle-switch" onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}>
              <div className={`toggle-knob ${billingCycle === 'yearly' ? 'active' : ''}`}></div>
            </div>
            <button
              className={billingCycle === 'yearly' ? 'active' : ''}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
            </button>
            <span className="save-badge">Save 20%</span>
          </div>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, idx) => (
            <div key={idx} className={`pricing-card ${plan.popular ? 'popular' : ''}`} style={{ position: 'relative' }}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-price">
                {plan.price[billingCycle] !== "Custom" && "$"}
                {plan.price[billingCycle]}
                {plan.period && <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b', marginLeft: '0.25rem' }}>{plan.period}</span>}
              </p>
              <p className="plan-description">{plan.description}</p>
              <button onClick={() => handleNavigate('signup')} className={plan.popular ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', marginTop: '1.5rem' }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-comparison-container">
          <h3 className="comparison-title">Compare All Features</h3>
          <div className="pricing-comparison-table">
            {features.map((category, catIdx) => (
              <React.Fragment key={catIdx}>
                <div className="comparison-category-header">
                  {category.category}
                </div>
                {catIdx === 0 && (
                  <div className="comparison-plan-header">
                    <div></div> {/* Empty cell for feature name column */}
                    <div>Starter</div>
                    <div>Professional</div>
                    <div>Enterprise</div>
                  </div>
                )}
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="comparison-row">
                    <div className="feature-name">{item.name}</div>
                    <div className="feature-value">
                      {renderCheck(item.starter)}
                    </div>
                    <div className="feature-value">
                      {renderCheck(item.pro)}
                    </div>
                    <div className="feature-value">
                      {renderCheck(item.enterprise)}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
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
      <div className="final-cta-card">
        <div className="cta-deco-shape cta-shape-1"></div>
        <div className="cta-deco-shape cta-shape-2"></div>
        <div className="final-cta-content">
          <h2 className="final-cta-title">Ready to Streamline Your Workflow?</h2>
          <p className="final-cta-subtitle">Join thousands of businesses that trust Endorse to get their documents signed faster. Start your free 14-day trial today.</p>
          <button onClick={() => handleNavigate('signup')} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            Sign Up for Free
          </button>
        </div>
      </div>
    </section>
  );

  // Footer
    const Footer = () => {
        const SocialIcon = ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon">{children}</a>;

        return (
            <footer className="landing-footer">
                <div className="footer-top">
                    <img src={endorseLogo} alt="Endorse Logo" className="logo-img" style={{ height: '3rem' }} />
                    <div className="footer-center">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <button onClick={() => handleNavigate('about')} className="footer-link-button">About</button>
                        <a href="#">Security</a>
                    </div>
                    <div className="social-links">
                        <SocialIcon href="#"><Twitter size={20} /></SocialIcon>
                        <SocialIcon href="#"><Linkedin size={20} /></SocialIcon>
                        <SocialIcon href="#"><Instagram size={20} /></SocialIcon>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 Endorse. All rights reserved.</p>
                    <div className="footer-legal-links"><a href="#">Terms of Service</a><a href="#">Privacy Policy</a></div>
                </div>
            </footer>
        );
    };

  // Video Modal Component
  const VideoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="video-modal-overlay" onClick={onClose}>
        <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="video-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
          <div className="video-responsive">
            {/* Replace with your actual video embed URL */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  // Chatbot Component
  const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
      { sender: 'bot', text: "Hi there! I'm the Endorse assistant. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');

    const getBotResponse = (input) => {
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("pricing") || lowerInput.includes("cost")) {
        return "We have a free Starter plan! Our paid Professional plan is $29/month, or $23/month if you pay yearly. We also have custom Enterprise plans.";
      }
      if (lowerInput.includes("security") || lowerInput.includes("secure")) {
        return "Security is our top priority! All documents are protected with AES-256 encryption and a complete, tamper-proof audit trail for legal compliance.";
      }
      if (lowerInput.includes("ai") || lowerInput.includes("artificial intelligence")) {
        return "Our AI can help you generate contracts from a simple description and also suggests where to place signature fields to save you time!";
      }
      if (lowerInput.includes("legally binding")) {
        return "Yes, absolutely. Endorse signatures are compliant with eIDAS, ESIGN, and UETA regulations, making them legally binding worldwide.";
      }
      return "I'm not sure I understand. You can ask me about pricing, security, AI features, or if our signatures are legally binding.";
    };

    const handleSendMessage = (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const userMessage = { sender: 'user', text: inputValue };
      setMessages(prev => [...prev, userMessage]);

      setTimeout(() => {
        const botResponse = { sender: 'bot', text: getBotResponse(inputValue) };
        setMessages(prev => [...prev, botResponse]);
      }, 500);

      setInputValue('');
    };

    return (
      <div className="chatbot-container" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 1000 }}>
        <div className={`chat-window ${isOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <h3>Endorse Assistant</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              <Send size={18} />
            </button>
          </form>
        </div>
        <button className="chatbot-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>
      </div>
    );
  };

  // Cookie Consent Banner
  const CookieConsentBanner = ({ onAccept }) => (
    <div className={`cookie-consent-banner ${showCookieBanner ? 'visible' : ''}`}>
      <p className="cookie-text">
        We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies. 
        <a href="#" className="cookie-link">Learn more</a>.
      </p>
      <button onClick={onAccept} className="btn-primary" style={{ padding: '0.5rem 1.5rem', flexShrink: 0 }}>
        Accept
      </button>
    </div>
  );


  // Main Render
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Navigation />
      <main>
        <HeroSection />
        <SocialProof />
        <HowItWorksSection />
        <FeaturesSection />
        <ComparisonSection />
        <TestimonialSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
        <Footer />
        <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
        <Chatbot />
        <CookieConsentBanner onAccept={handleAcceptCookies} />
      </main>
    </div>
  );
}