import React from 'react';
import { Star, Users, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlatformCard.css';

const PlatformCard = ({ platform }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="platform-card-v2"
      onClick={() => navigate(`/platform/${platform.slug}`)}
    >
      <div className="card-gradient-border"></div>
      
      <div className="platform-image-v2">
        <div className="image-wrapper">
          <img src={platform.image} alt={platform.name} />
        </div>
        <div className="image-gradient-overlay"></div>
        
        <div className="floating-badge">
          <Star size={14} fill="#ffd700" color="#ffd700" />
          <span>{platform.rating}</span>
        </div>
      </div>
      
      <div className="platform-content-v2">
        <div className="content-header">
          <div className="header-top">
            <h3 className="platform-name-v2">{platform.name}</h3>
            <span className="platform-category-v2">{platform.category}</span>
          </div>
          <p className="platform-tagline-v2">{platform.tagline}</p>
        </div>
        
        <div className="platform-stats-v2">
          <div className="stat-item">
            <Users size={16} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{platform.users}</span>
              <span className="stat-label">Users</span>
            </div>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <TrendingUp size={16} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{platform.pricing}</span>
              <span className="stat-label">Pricing</span>
            </div>
          </div>
        </div>
        
        <button className="view-details-btn">
          <span>View Details</span>
          <ArrowRight size={18} className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default PlatformCard;