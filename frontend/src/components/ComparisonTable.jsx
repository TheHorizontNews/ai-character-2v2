import React, { useState } from 'react';
import { Check, X, Star, Zap, Image, Mic, Users, Smartphone, Shield, DollarSign } from 'lucide-react';
import '../styles/ComparisonTable.css';

const ComparisonTable = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const platforms = [
    {
      name: 'Lovescape',
      color: '#1dd1a1',
      rating: 4.8,
      price: 'Freemium',
      features: {
        freeAccess: true,
        voiceChat: true,
        imageGen: true,
        customPersonality: true,
        multipleChars: true,
        mobileApp: true,
        privacy: true,
        support24: true
      }
    },
    {
      name: 'Character.AI',
      color: '#667eea',
      rating: 4.7,
      price: 'Free',
      features: {
        freeAccess: true,
        voiceChat: false,
        imageGen: false,
        customPersonality: true,
        multipleChars: true,
        mobileApp: true,
        privacy: true,
        support24: true
      }
    },
    {
      name: 'Replika',
      color: '#f093fb',
      rating: 4.6,
      price: 'Freemium',
      features: {
        freeAccess: true,
        voiceChat: true,
        imageGen: false,
        customPersonality: true,
        multipleChars: false,
        mobileApp: true,
        privacy: true,
        support24: true
      }
    },
    {
      name: 'Nomi.ai',
      color: '#4facfe',
      rating: 4.7,
      price: '$15/mo',
      features: {
        freeAccess: false,
        voiceChat: true,
        imageGen: true,
        customPersonality: true,
        multipleChars: true,
        mobileApp: true,
        privacy: true,
        support24: true
      }
    },
    {
      name: 'Candy AI',
      color: '#fa709a',
      rating: 4.4,
      price: '$20/mo',
      features: {
        freeAccess: false,
        voiceChat: true,
        imageGen: true,
        customPersonality: true,
        multipleChars: false,
        mobileApp: true,
        privacy: true,
        support24: true
      }
    }
  ];

  const featureList = [
    { key: 'freeAccess', label: 'Free Access', icon: DollarSign },
    { key: 'voiceChat', label: 'Voice Chat', icon: Mic },
    { key: 'imageGen', label: 'Image Generation', icon: Image },
    { key: 'customPersonality', label: 'Custom Personality', icon: Zap },
    { key: 'multipleChars', label: 'Multiple Characters', icon: Users },
    { key: 'mobileApp', label: 'Mobile App', icon: Smartphone },
    { key: 'privacy', label: 'Privacy Protection', icon: Shield },
    { key: 'support24', label: '24/7 Support', icon: Star }
  ];

  return (
    <div className="comparison-section">
      <div className="comparison-header">
        <h2 className="comparison-title">Platform Comparison</h2>
        <p className="comparison-subtitle">Compare features across top AI character platforms</p>
      </div>
      
      <div className="comparison-grid">
        {platforms.map((platform, idx) => (
          <div
            key={idx}
            className={`comparison-card ${selectedPlatform === idx ? 'selected' : ''}`}
            onClick={() => setSelectedPlatform(selectedPlatform === idx ? null : idx)}
            style={{ '--platform-color': platform.color }}
          >
            <div className="comparison-card-header">
              <div className="platform-name-box">
                <h3>{platform.name}</h3>
                <div className="platform-rating">
                  <Star size={14} fill={platform.color} color={platform.color} />
                  <span>{platform.rating}</span>
                </div>
              </div>
              <div className="platform-price">{platform.price}</div>
            </div>
            
            <div className="comparison-features">
              {featureList.map((feature) => {
                const Icon = feature.icon;
                const hasFeature = platform.features[feature.key];
                return (
                  <div key={feature.key} className={`feature-row ${hasFeature ? 'has-feature' : 'no-feature'}`}>
                    <div className="feature-icon-label">
                      <Icon size={16} />
                      <span>{feature.label}</span>
                    </div>
                    {hasFeature ? (
                      <Check size={18} className="check" />
                    ) : (
                      <X size={18} className="x" />
                    )}
                  </div>
                );
              })}
            </div>
            
            <button className="compare-cta">View Details</button>
          </div>
        ))}
      </div>
      
      <div className="comparison-legend">
        <p>Click on any platform card to highlight it</p>
      </div>
    </div>
  );
};

export default ComparisonTable;