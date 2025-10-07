import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Heart, Users, Crown, Sparkles, Menu, X, ChevronRight, Compass } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'explore', icon: Compass, label: 'Explore Topics', path: '/explore' },
    { id: 'featured', icon: Sparkles, label: 'Featured', path: '/category/featured' },
    { id: 'trending', icon: TrendingUp, label: 'Trending', path: '/category/trending' },
    { id: 'premium', icon: Crown, label: 'Premium', path: '/category/premium' },
    { id: 'romantic', icon: Heart, label: 'Romantic', path: '/category/romantic' },
    { id: 'community', icon: Users, label: 'Community', path: '/category/community' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (item) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.includes(item.path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar desktop-sidebar">
        <div className="sidebar-logo" onClick={() => handleNavClick('/')}>
          <div className="logo-icon">AI</div>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${isActive(item) ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
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
          <div className="mobile-logo" onClick={() => handleNavClick('/')}>
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
                className={`mobile-menu-item ${isActive(item) ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
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