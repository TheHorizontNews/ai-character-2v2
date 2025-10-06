import React, { useState } from 'react';
import { Home, TrendingUp, Heart, Users, Crown, Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', section: 'hero' },
    { id: 'featured', icon: Sparkles, label: 'Featured', section: 'featured' },
    { id: 'categories', icon: Users, label: 'Categories', section: 'categories' },
    { id: 'comparison', icon: TrendingUp, label: 'Comparison', section: 'comparison' },
    { id: 'premium', icon: Crown, label: 'Premium', section: 'premium' },
    { id: 'romantic', icon: Heart, label: 'Romantic', section: 'romantic' },
  ];

  const handleNavClick = (sectionId) => {
    // Scroll to section
    const sectionMap = {
      'hero': 0,
      'featured': 800,
      'categories': 2000,
      'comparison': 3000,
      'premium': 2300,
      'romantic': 4500
    };
    
    window.scrollTo({
      top: sectionMap[sectionId] || 0,
      behavior: 'smooth'
    });
    
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
    
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar desktop-sidebar">
        <div className="sidebar-logo" onClick={() => handleNavClick('hero')}>
          <div className="logo-icon">AI</div>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.section)}
                title={item.label}
              >
                <Icon size={24} />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="mobile-header-content">
          <div className="mobile-logo" onClick={() => handleNavClick('hero')}>
            <div className="logo-icon">AI</div>
            <span>AI Character Review</span>
          </div>
          
          <button 
            className="burger-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-menu-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`mobile-menu-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.section)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                <ChevronRight size={18} className="chevron" />
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;