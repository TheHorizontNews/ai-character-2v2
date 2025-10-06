import React from 'react';
import { Star, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlatformCard.css';

const PlatformCard = ({ platform }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="platform-card"
      onClick={() => navigate(`/platform/${platform.slug}`)}
    >
      <div className="platform-image">
        <img src={platform.image} alt={platform.name} />
        <div className="platform-overlay">
          <button className="view-btn">
            View Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="platform-content">
        <div className="platform-header">
          <h3 className="platform-name">{platform.name}</h3>
          <span className="platform-category">{platform.category}</span>
        </div>
        
        <p className="platform-tagline">{platform.tagline}</p>
        
        <div className="platform-stats">
          <div className="stat">
            <Star size={14} fill="#ffd700" color="#ffd700" />
            <span>{platform.rating}</span>
          </div>
          <div className="stat">
            <Users size={14} />
            <span>{platform.users}</span>
          </div>
        </div>
        
        <div className="platform-pricing">
          <span className="pricing-label">Pricing:</span>
          <span className="pricing-value">{platform.pricing}</span>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;