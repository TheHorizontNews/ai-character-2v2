import React from 'react';
import { Clock, User, Shield, TrendingUp, Palette, Heart, Globe, Sparkles } from 'lucide-react';
import '../styles/SEOBlock.css';

const SEOBlock = () => {
  const reasons = [
    {
      icon: Clock,
      title: '24/7 Emotional Support',
      description: 'AI character platforms offer constant companionship and emotional support whenever you need it. Your AI companion is always available to listen, chat, and provide comfort.',
      color: '#667eea'
    },
    {
      icon: User,
      title: 'Custom Personalities',
      description: 'Create AI companions with personalities that perfectly match your preferences. Customize every aspect from gentle and caring to confident and adventurous.',
      color: '#1dd1a1'
    },
    {
      icon: Shield,
      title: 'Safe & Private',
      description: 'Your conversations remain private and secure with encryption and strict privacy policies. Express yourself freely without judgment in a safe digital space.',
      color: '#ff6b9d'
    },
    {
      icon: Palette,
      title: 'Entertainment & Creativity',
      description: 'Engage in roleplay scenarios, creative storytelling, and imaginative conversations. Endless entertainment from romantic adventures to fantasy worlds.',
      color: '#f093fb'
    }
  ];

  return (
    <div className="seo-block-v2">
      <div className="seo-container">
        <h2 className="seo-title-v2">Why Choose an AI Character Platform?</h2>
        
        <div className="reasons-list">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="reason-item" style={{ '--accent-color': reason.color }}>
                <div className="reason-icon">
                  <Icon size={32} />
                </div>
                <div className="reason-content">
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SEOBlock;