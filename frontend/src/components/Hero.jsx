import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>Discover AI Companions</span>
        </div>
        
        <h1 className="hero-title">
          AI CHARACTER PLATFORMS
        </h1>
        
        <p className="hero-subtitle">
          DISCOVER. COMPARE. CHOOSE. CONNECT.
        </p>
        
        <p className="hero-description">
          Your comprehensive guide to AI character creation platforms. Compare features, 
          read reviews, and find the perfect AI companion for your needs.
        </p>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="stat-value">21+</div>
            <div className="stat-label">Platforms</div>
          </div>
          <div className="hero-stat">
            <div className="stat-value">50M+</div>
            <div className="stat-label">Users</div>
          </div>
          <div className="hero-stat">
            <div className="stat-value">4.5</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;