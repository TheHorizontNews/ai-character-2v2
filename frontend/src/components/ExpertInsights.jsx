import React from 'react';
import { TrendingUp, Users, Star, Shield } from 'lucide-react';
import '../styles/ExpertInsights.css';

const ExpertInsights = () => {
  return (
    <div className="expert-insights-section">
      <div className="insights-header">
        <h2 className="insights-title">Expert Insights on AI Character Platforms</h2>
        <p className="insights-subtitle">
          Our comprehensive analysis of the AI companion landscape reveals key trends and user preferences 
          that help define the best platforms for different needs. Based on extensive testing and user feedback, 
          we've identified crucial factors for selecting the right AI character platform.
        </p>
      </div>

      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-icon">
            <TrendingUp size={32} />
          </div>
          <h3>Market Trends 2025</h3>
          <p>
            The AI character platform market is experiencing unprecedented growth, with premium customization 
            and voice features leading user demand. Privacy-focused platforms are gaining significant traction 
            as users become more conscious of data security in AI interactions.
          </p>
        </div>

        <div className="insight-card">
          <div className="insight-icon">
            <Users size={32} />
          </div>
          <h3>User Preferences</h3>
          <p>
            Our research shows 78% of users prioritize character customization, while 65% value natural 
            conversation quality. Community features and cross-platform compatibility are increasingly 
            important for long-term user engagement and satisfaction.
          </p>
        </div>

        <div className="insight-card">
          <div className="insight-icon">
            <Star size={32} />
          </div>
          <h3>Platform Excellence</h3>
          <p>
            Top-rated platforms consistently deliver three key elements: advanced AI models, intuitive user 
            interfaces, and robust privacy protection. The best services balance innovation with reliability, 
            ensuring users can build meaningful AI relationships safely.
          </p>
        </div>

        <div className="insight-card">
          <div className="insight-icon">
            <Shield size={32} />
          </div>
          <h3>Safety & Ethics</h3>
          <p>
            Leading AI character platforms implement strict ethical guidelines, content moderation, and 
            transparent data handling practices. Users increasingly choose platforms that prioritize 
            responsible AI development and clear privacy policies over purely feature-rich options.
          </p>
        </div>
      </div>

      <div className="insights-footer">
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-number">21</span>
            <span className="stat-label">Platforms Analyzed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">User Reviews</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">210</span>
            <span className="stat-label">Comparisons Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertInsights;