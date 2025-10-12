import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Star, Zap, Image, Mic, Users, Smartphone, Shield, Crown, Trophy, TrendingUp } from 'lucide-react';
import '../styles/ComparisonTable.css';

const ComparisonTable = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [activeTab, setActiveTab] = useState('top5');

  const allPlatforms = [
    { name: 'Lovescape', rank: 1, color: '#1dd1a1', rating: 9.8, price: 'Freemium', category: 'top5', badge: '🥇', features: { voiceChat: true, visualization: 5, nsfw: true, customization: 5, quality: 5, realism: 5 } },
    { name: 'Character.AI', rank: 2, color: '#667eea', rating: 8.9, price: 'Free', category: 'top5', features: { voiceChat: false, visualization: 0, nsfw: false, customization: 4, quality: 4, realism: 4 } },
    { name: 'Replika', rank: 3, color: '#f093fb', rating: 8.6, price: 'Freemium', category: 'top5', features: { voiceChat: true, visualization: 3, nsfw: 'limited', customization: 4, quality: 4, realism: 4 } },
    { name: 'Anima AI', rank: 4, color: '#4facfe', rating: 8.4, price: '$9.99/mo', category: 'top5', features: { voiceChat: true, visualization: 3, nsfw: 'limited', customization: 4, quality: 4, realism: 4 } },
    { name: 'Nomi.ai', rank: 5, color: '#fa709a', rating: 8.3, price: '$15/mo', category: 'top5', features: { voiceChat: false, visualization: 2, nsfw: false, customization: 4, quality: 4, realism: 5 } },
    
    { name: 'Chai AI', rank: 6, color: '#ffd93d', rating: 8.1, price: 'Freemium', category: 'premium', features: { voiceChat: false, visualization: 0, nsfw: 'possible', customization: 3, quality: 3, realism: 3 } },
    { name: 'Inworld AI', rank: 7, color: '#6bcf7f', rating: 8.0, price: 'Developer', category: 'premium', features: { voiceChat: false, visualization: 0, nsfw: false, customization: 5, quality: 5, realism: 4 } },
    { name: 'Tavern AI', rank: 8, color: '#c77dff', rating: 7.9, price: 'Free', category: 'premium', features: { voiceChat: false, visualization: 0, nsfw: 'optional', customization: 3, quality: 3, realism: 4 } },
    { name: 'Janitor AI', rank: 9, color: '#ff6b9d', rating: 7.8, price: 'Free', category: 'premium', features: { voiceChat: false, visualization: 0, nsfw: true, customization: 3, quality: 3, realism: 3 } },
    { name: 'Poe (Quora)', rank: 10, color: '#89b0ae', rating: 7.7, price: 'Freemium', category: 'premium', features: { voiceChat: false, visualization: 0, nsfw: false, customization: 2, quality: 3, realism: 3 } },
    
    { name: 'DreamGF', rank: 11, color: '#ff6fb5', rating: 7.6, price: '$9.99/mo', category: 'romantic', features: { voiceChat: 'limited', visualization: 3, nsfw: true, customization: 3, quality: 4, realism: 3 } },
    { name: 'Candy AI', rank: 12, color: '#ff85a6', rating: 7.5, price: '$12.99/mo', category: 'romantic', features: { voiceChat: 'limited', visualization: 3, nsfw: true, customization: 3, quality: 3, realism: 3 } },
    { name: 'SoulGen', rank: 13, color: '#ff99c8', rating: 7.4, price: '$9.99/mo', category: 'romantic', features: { voiceChat: 'limited', visualization: 3, nsfw: true, customization: 3, quality: 3, realism: 3 } },
    { name: 'DreamBF', rank: 14, color: '#77b5fe', rating: 7.3, price: '$9.99/mo', category: 'romantic', features: { voiceChat: 'limited', visualization: 2, nsfw: true, customization: 2, quality: 3, realism: 3 } },
    { name: 'Kindroid', rank: 15, color: '#a0c4ff', rating: 7.2, price: 'Free', category: 'romantic', features: { voiceChat: false, visualization: 0, nsfw: false, customization: 3, quality: 3, realism: 4 } },
    { name: 'Kupid AI', rank: 17, color: '#ffc2d1', rating: 7.0, price: '$6.99/mo', category: 'romantic', features: { voiceChat: false, visualization: 2, nsfw: 'limited', customization: 2, quality: 2, realism: 2 } },
    { name: 'Romantic AI', rank: 20, color: '#ffafcc', rating: 6.7, price: '$4.99/mo', category: 'romantic', features: { voiceChat: false, visualization: 0, nsfw: 'limited', customization: 2, quality: 2, realism: 2 } },
    
    { name: 'PolyBuzz', rank: 16, color: '#9d4edd', rating: 7.1, price: 'Free', category: 'emerging', features: { voiceChat: false, visualization: 0, nsfw: 'limited', customization: 2, quality: 2, realism: 2 } },
    { name: 'AI Mirror', rank: 18, color: '#5390d9', rating: 6.9, price: 'Free', category: 'emerging', features: { voiceChat: false, visualization: 4, nsfw: false, customization: 2, quality: 1, realism: 1 } },
    { name: 'Paradot', rank: 19, color: '#48bfe3', rating: 6.8, price: 'Freemium', category: 'emerging', features: { voiceChat: true, visualization: 2, nsfw: false, customization: 2, quality: 2, realism: 2 } },
    { name: 'Talkie AI', rank: 21, color: '#64dfdf', rating: 6.6, price: 'Freemium', category: 'emerging', features: { voiceChat: 'limited', visualization: 3, nsfw: 'limited', customization: 2, quality: 2, realism: 2 } }
  ];

  const tabs = [
    { id: 'top5', label: 'Top 5 Platforms', icon: Trophy, count: 5 },
    { id: 'premium', label: 'Premium Tier', icon: Crown, count: 5 },
    { id: 'romantic', label: 'Romantic Focus', icon: Star, count: 7 },
    { id: 'emerging', label: 'Emerging', icon: TrendingUp, count: 4 }
  ];

  const filteredPlatforms = allPlatforms.filter(p => p.category === activeTab);

  const featureList = [
    { key: 'voiceChat', label: 'Voice Chat', icon: Mic },
    { key: 'visualization', label: 'Visualization', icon: Image },
    { key: 'nsfw', label: '18+ Content', icon: Shield },
    { key: 'customization', label: 'Customization', icon: Zap },
    { key: 'quality', label: 'Character Quality', icon: Star },
    { key: 'realism', label: 'Realism', icon: Users }
  ];

  const renderFeatureValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? <Check size={18} className="check" /> : <X size={18} className="x" />;
    }
    if (typeof value === 'number') {
      return (
        <div className="star-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={i < value ? '#ffd700' : 'none'} color={i < value ? '#ffd700' : '#444'} />
          ))}
        </div>
      );
    }
    if (value === 'limited') {
      return <span className="limited-badge">Limited</span>;
    }
    if (value === 'optional' || value === 'possible') {
      return <span className="optional-badge">Optional</span>;
    }
    return <X size={18} className="x" />;
  };

  return (
    <div className="comparison-section">
      <div className="comparison-header">
        <h2 className="comparison-title">Platform Comparison</h2>
        <p className="comparison-subtitle">Compare all 21 AI character platforms by category</p>
      </div>
      
      <div className="comparison-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              <span className="tab-count">{tab.count}</span>
            </button>
          );
        })}
      </div>
      
      <div className="comparison-grid">
        {filteredPlatforms.map((platform, idx) => (
          <div
            key={idx}
            className={`comparison-card ${selectedPlatform === idx ? 'selected' : ''}`}
            onClick={() => setSelectedPlatform(selectedPlatform === idx ? null : idx)}
            style={{ '--platform-color': platform.color }}
          >
            <div className="comparison-card-header">
              <div className="platform-name-box">
                {platform.badge && <span className="rank-badge">{platform.badge}</span>}
                <h3>{platform.name}</h3>
                <div className="platform-rating">
                  <Star size={14} fill={platform.color} color={platform.color} />
                  <span>{platform.rating}/10</span>
                </div>
              </div>
              <div className="platform-price">{platform.price}</div>
            </div>
            
            <div className="comparison-features">
              {featureList.map((feature) => {
                const Icon = feature.icon;
                const value = platform.features[feature.key];
                return (
                  <div key={feature.key} className="feature-row">
                    <div className="feature-icon-label">
                      <Icon size={16} />
                      <span>{feature.label}</span>
                    </div>
                    {renderFeatureValue(value)}
                  </div>
                );
              })}
            </div>
            
            <button className="compare-cta">View Details</button>
          </div>
        ))}
      </div>
      
      <div className="comparison-legend">
        <p>Showing {filteredPlatforms.length} platforms • Click tabs to explore different categories</p>
      </div>
    </div>
  );
};

export default ComparisonTable;