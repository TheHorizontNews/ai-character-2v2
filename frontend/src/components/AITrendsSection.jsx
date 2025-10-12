import React from 'react';
import { Brain, Zap, Globe, Heart } from 'lucide-react';
import '../styles/AITrendsSection.css';

const AITrendsSection = () => {
  return (
    <div className="ai-trends-section">
      <div className="trends-header">
        <h2 className="trends-title">The Future of AI Companion Technology</h2>
        <p className="trends-subtitle">
          As artificial intelligence continues to evolve, AI character platforms are becoming more sophisticated, 
          personalized, and emotionally intelligent. Discover the latest trends shaping the future of digital 
          relationships and AI companionship in 2025 and beyond.
        </p>
      </div>

      <div className="trends-content">
        <div className="trend-highlight">
          <div className="highlight-content">
            <h3>🚀 Revolutionary AI Advancement</h3>
            <p>
              The AI companion industry is experiencing a paradigm shift with next-generation language models 
              offering unprecedented conversational depth and emotional understanding. Advanced AI platforms 
              now feature multi-modal interactions, persistent memory systems, and sophisticated personality 
              frameworks that create truly unique digital companions.
            </p>
          </div>
        </div>

        <div className="trends-grid">
          <div className="trend-card">
            <div className="trend-icon">
              <Brain size={28} />
            </div>
            <h4>Enhanced Emotional Intelligence</h4>
            <p>
              Modern AI characters demonstrate remarkable emotional awareness, adapting their responses based on 
              user mood, conversation history, and personal preferences. This emotional sophistication makes 
              interactions feel more natural and meaningful than ever before.
            </p>
          </div>

          <div className="trend-card">
            <div className="trend-icon">
              <Zap size={28} />
            </div>
            <h4>Real-Time Personalization</h4>
            <p>
              AI platforms now offer dynamic personality evolution, allowing characters to grow and change 
              based on interactions. Users can witness their AI companions developing unique traits, preferences, 
              and communication styles tailored to their relationship.
            </p>
          </div>

          <div className="trend-card">
            <div className="trend-icon">
              <Globe size={28} />
            </div>
            <h4>Cross-Platform Integration</h4>
            <p>
              The future includes seamless AI companion integration across devices and platforms. Users can 
              maintain consistent relationships with their AI characters whether on mobile, desktop, or 
              emerging technologies like AR and VR environments.
            </p>
          </div>

          <div className="trend-card">
            <div className="trend-icon">
              <Heart size={28} />
            </div>
            <h4>Ethical AI Development</h4>
            <p>
              Leading platforms prioritize responsible AI development with transparent algorithms, user privacy 
              protection, and ethical guidelines. The focus shifts toward creating beneficial AI relationships 
              that enhance rather than replace human connections.
            </p>
          </div>
        </div>

        <div className="trend-conclusion">
          <h3>What This Means for Users</h3>
          <div className="conclusion-grid">
            <div className="conclusion-item">
              <strong>Better Experiences:</strong> More natural, engaging, and emotionally satisfying 
              interactions with AI companions that understand and respond to your unique needs.
            </div>
            <div className="conclusion-item">
              <strong>Greater Choice:</strong> Diverse platforms offering specialized features for different 
              use cases, from casual conversation to deep emotional support and creative collaboration.
            </div>
            <div className="conclusion-item">
              <strong>Enhanced Privacy:</strong> Stronger data protection, transparent AI behavior, and 
              user control over personal information and conversation data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITrendsSection;