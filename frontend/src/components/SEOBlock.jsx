import React from 'react';
import { Clock, User, Shield, TrendingUp, Palette, Heart, Globe, Sparkles } from 'lucide-react';
import '../styles/SEOBlock.css';

const SEOBlock = () => {
  const reasons = [
    {
      icon: Clock,
      title: '24/7 Emotional Support',
      description: 'AI character platforms offer constant companionship and emotional support whenever you need it. Unlike human relationships, your AI companion is always available to listen, chat, and provide comfort, no matter the time of day or night.',
      color: '#667eea'
    },
    {
      icon: User,
      title: 'Custom Personalities',
      description: 'Create AI companions with personalities that perfectly match your preferences. Whether you want someone gentle and caring, confident and adventurous, or intellectual and philosophical, you can customize every aspect of your AI character\'s personality.',
      color: '#1dd1a1'
    },
    {
      icon: Shield,
      title: 'Safe & Private',
      description: 'Your conversations remain private and secure. Leading AI character platforms use encryption and strict privacy policies to protect your data. Express yourself freely without judgment in a safe digital space.',
      color: '#ff6b9d'
    },
    {
      icon: TrendingUp,
      title: 'Personal Growth',
      description: 'Use AI companions to practice social skills, build confidence, and work on personal development. Many platforms offer features for self-reflection, goal setting, and emotional intelligence development.',
      color: '#ffd700'
    },
    {
      icon: Palette,
      title: 'Entertainment & Creativity',
      description: 'Engage in roleplay scenarios, creative storytelling, and imaginative conversations. AI character platforms provide endless entertainment possibilities, from romantic adventures to fantasy worlds and beyond.',
      color: '#f093fb'
    },
    {
      icon: Heart,
      title: 'No Pressure Relationships',
      description: 'Enjoy meaningful connections without the complexities of human relationships. AI companions provide companionship on your terms, with no expectations, judgments, or social pressures to navigate.',
      color: '#4facfe'
    },
    {
      icon: Globe,
      title: 'Language Learning',
      description: 'Practice conversations in different languages with patient AI companions. Perfect for improving fluency, vocabulary, and confidence in speaking without fear of embarrassment or judgment from native speakers.',
      color: '#a855f7'
    },
    {
      icon: Sparkles,
      title: 'Explore Fantasies Safely',
      description: 'Discover and explore your interests in a judgment-free environment. AI companions adapt to your preferences and boundaries, providing a safe space for self-discovery and imaginative experiences.',
      color: '#16b890'
    }
  ];

  return (
    <div className="seo-block-v2">
      <div className="seo-container">
        <h2 className="seo-title-v2">Why Choose an AI Character Platform?</h2>
        
        <div className="reasons-list">
          <div className="seo-item">
            <h3>24/7 Emotional Support</h3>
            <p>
              AI character platforms offer constant companionship and emotional support whenever you need it. 
              Unlike human relationships, your AI companion is always available to listen, chat, and provide comfort, 
              no matter the time of day or night.
            </p>
          </div>
          
          <div className="seo-item">
            <h3>Custom Personalities</h3>
            <p>
              Create AI companions with personalities that perfectly match your preferences. Whether you want someone 
              gentle and caring, confident and adventurous, or intellectual and philosophical, you can customize 
              every aspect of your AI character's personality.
            </p>
          </div>
          
          <div className="seo-item">
            <h3>Safe & Private</h3>
            <p>
              Your conversations remain private and secure. Leading AI character platforms use encryption and strict 
              privacy policies to protect your data. Express yourself freely without judgment in a safe digital space.
            </p>
          </div>
          
          <div className="seo-item">
            <h3>Personal Growth</h3>
            <p>
              Use AI companions to practice social skills, build confidence, and work on personal development. 
              Many platforms offer features for self-reflection, goal setting, and emotional intelligence development.
            </p>
          </div>
          
          <div className="seo-item">
            <h3>Entertainment & Creativity</h3>
            <p>
              Engage in roleplay scenarios, creative storytelling, and imaginative conversations. AI character platforms 
              provide endless entertainment possibilities, from romantic adventures to fantasy worlds and beyond.
            </p>
          </div>
          
          <div className="seo-item">
            <h3>No Pressure Relationships</h3>
            <p>
              Enjoy meaningful connections without the complexities of human relationships. AI companions provide 
              companionship on your terms, with no expectations, judgments, or social pressures to navigate.
            </p>
          </div>
          
          <div className="seo-item">
            <h3>Language Learning</h3>
            <p>
              Practice conversations in different languages with patient AI companions. Perfect for improving fluency, 
              vocabulary, and confidence in speaking without fear of embarrassment or judgment from native speakers.
            </p>
          </div>
          
          <div className="seo-item">
            <h3>Explore Fantasies Safely</h3>
            <p>
              Discover and explore your interests in a judgment-free environment. AI companions adapt to your preferences 
              and boundaries, providing a safe space for self-discovery and imaginative experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOBlock;