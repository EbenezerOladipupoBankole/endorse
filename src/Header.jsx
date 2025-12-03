import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
    // State to manage if the mobile menu is open or closed
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    // State for the mobile "Solutions" dropdown
    const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    // Ref to get the height of the mobile dropdown for animation
    const mobileDropdownRef = useRef(null);
    // State for the desktop "Solutions" dropdown
    const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

    // Function to toggle the main mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function to toggle the mobile dropdown
    const toggleMobileDropdown = () => {
        // Only allow toggling the dropdown if the main mobile menu is open
        if (isMobileMenuOpen) {
            setMobileDropdownOpen(!isMobileDropdownOpen);
        }
    };

    // Close desktop dropdown when clicking outside
    useEffect(() => {
        const closeDropdown = () => setDesktopDropdownOpen(false);
        if (isDesktopDropdownOpen) {
            window.addEventListener('click', closeDropdown);
        }
        return () => {
            window.removeEventListener('click', closeDropdown);
        };
    }, [isDesktopDropdownOpen]);

    // Close mobile menu when screen resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="landing-header">
            <div className="header-content">
                <a href="/" className="logo-text">Endorse</a>

                {/* Desktop Navigation */}
                <nav className="landing-nav">
                    <a href="/features">Features</a>
                    <div className="nav-item-dropdown">
                        <button 
                            type="button" 
                            className="dropdown-toggle" 
                            onClick={(e) => {
                                // Prevent the window click listener from closing the menu immediately
                                e.stopPropagation(); // Prevent window click event from closing it immediately
                                setDesktopDropdownOpen(!isDesktopDropdownOpen);
                            }}
                        >
                            <span>Solutions</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                        </button>
                        <div className={`dropdown-menu ${isDesktopDropdownOpen ? 'open' : ''}`}>
                            <a href="/analytics" className="dropdown-item">Analytics</a>
                            <a href="/engagement" className="dropdown-item">Engagement</a>
                            <a href="/security" className="dropdown-item">Security</a>
                        </div>
                    </div>
                    <a href="/pricing">Pricing</a>
                    <a href="/login" className="btn-secondary">Sign In</a>
                    <a href="/signup" className="btn-primary">Get Started</a>
                </nav>

                {/* Mobile Menu Button (Hamburger) */}
                <button 
                    className="mobile-menu-btn" 
                    aria-label="Open navigation menu" 
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="28" height="28">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <a href="/features">Features</a>
                <div className="mobile-dropdown">
                    <button 
                        type="button" 
                        className={`mobile-dropdown-toggle ${isMobileDropdownOpen ? 'open' : ''}`} 
                        onClick={toggleMobileDropdown}
                        aria-expanded={isMobileDropdownOpen}
                    >
                        <span>Solutions</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                    </button>
                    <div 
                        ref={mobileDropdownRef}
                        className="mobile-dropdown-menu" 
                        style={{ 
                            maxHeight: isMobileDropdownOpen ? `${mobileDropdownRef.current.scrollHeight}px` : '0px' 
                        }}>
                        <a href="/analytics" className="mobile-dropdown-item">Analytics</a>
                        <a href="/engagement" className="mobile-dropdown-item">Engagement</a>
                        <a href="/security" className="mobile-dropdown-item">Security</a>
                    </div>
                </div>
                <a href="/pricing">Pricing</a>
                <a href="/login" className="btn-primary" style={{ textAlign: 'center', marginTop: '1rem' }}>Sign In</a>
            </div>
        </header>
    );
};

export default Header;