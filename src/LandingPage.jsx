import React, { useState, useEffect } from 'react';
import { CheckCircle, FileText, Users, Zap, Shield, Clock, ChevronRight, Menu, X, Check, Star, UploadCloud, PenTool, Send, Plus, ArrowUp, MessageSquare } from 'lucide-react';
import endorseLogo from './assets/endorse.webp'; // Import your logo

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showBackToTop && window.pageYOffset > 400) {
        setShowBackToTop(true);
      } else if (showBackToTop && window.pageYOffset <= 400) {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showBackToTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                  <button onClick={() => setIsVideoModalOpen(true)} className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                      Watch Demo
                  </button>
              </div>
              <p className="hero-meta">Free 14-day trial • No credit card required</p>
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

    const plans = {
      monthly: [
        { name: "Starter", price: "0", period: "/ month", description: "For individuals and personal projects.", features: ["3 documents per month", "Basic signature fields", "Email support", "7-day audit trail"], cta: "Start for Free", popular: false },
        { name: "Professional", price: "29", period: "/ month", description: "For professionals and small teams.", features: ["Unlimited documents", "AI contract generation", "Custom branding", "Priority support", "Team collaboration"], cta: "Start Free Trial", popular: true },
        { name: "Enterprise", price: "Custom", period: "", description: "For large organizations with custom needs.", features: ["Everything in Pro", "Dedicated account manager", "API access & SSO", "On-premise option"], cta: "Contact Sales", popular: false }
      ],
      yearly: [
        { name: "Starter", price: "0", period: "/ month", description: "For individuals and personal projects.", features: ["3 documents per month", "Basic signature fields", "Email support", "7-day audit trail"], cta: "Start for Free", popular: false },
        { name: "Professional", price: "23", period: "/ month", description: "For professionals and small teams.", features: ["Unlimited documents", "AI contract generation", "Custom branding", "Priority support", "Team collaboration"], cta: "Start Free Trial", popular: true },
        { name: "Enterprise", price: "Custom", period: "", description: "For large organizations with custom needs.", features: ["Everything in Pro, plus...", "Dedicated account manager", "API access & SSO", "On-premise option"], cta: "Contact Sales", popular: false }
      ]
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
          {plans[billingCycle].map((plan, idx) => (
            <div key={idx} className={`pricing-card ${plan.popular ? 'popular' : ''}`} style={{ position: 'relative' }}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-price">
                {plan.price !== "Custom" && "$"}
                {plan.price}
                {plan.period && <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b', marginLeft: '0.25rem' }}>{plan.period}</span>}
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
                                <li><button onClick={() => handleNavigate('contact')} className="footer-link-button">Contact</button></li>
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

  // Black Friday Banner with Countdown
  const BlackFridayBanner = () => {
    const calculateTimeLeft = () => {
      const difference = +new Date('2025-11-28T00:00:00') - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map(interval => {
      if (!timeLeft[interval] && timeLeft[interval] !== 0) {
        return null;
      }
      return (
        <div key={interval} className="countdown-segment">
          <span className="countdown-number">{String(timeLeft[interval]).padStart(2, '0')}</span>
          <span className="countdown-label">{interval}</span>
        </div>
      );
    });

    return (
      <div className="black-friday-banner">
        <p className="banner-text"><span>Black Friday Sale!</span> Get 50% off all plans. Ends in:</p>
        <div className="countdown-timer">{timerComponents.length ? timerComponents : <span>Deal has ended!</span>}</div>
      </div>
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

  // Back to Top Button
  const BackToTopButton = () => (
    <button
      onClick={scrollToTop}
      className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
      aria-label="Go to top"
      title="Go to top"
    >
      <ArrowUp size={24} />
    </button>
  );

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
      <div className="chatbot-container">
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

  // Main Render
  return (
    <div style={{ backgroundColor: 'white' }}>
      <BlackFridayBanner />
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
        <BackToTopButton />
        <Chatbot />
      </main>
    </div>
  );
}