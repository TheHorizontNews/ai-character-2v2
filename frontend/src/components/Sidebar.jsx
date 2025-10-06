import React from 'react';
import { Home, Search, TrendingUp, Heart, Users, Crown, Settings, HelpCircle } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'popular', icon: Heart, label: 'Popular' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'premium', icon: Crown, label: 'Premium' },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">AI</div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
              title={item.label}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="sidebar-item"
              title={item.label}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;