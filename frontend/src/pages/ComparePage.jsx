import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { GitCompare, Star, Users, TrendingUp, Heart, Crown, Gamepad2 } from 'lucide-react';
import '../styles/ComparePage.css';

const ComparePage = () => {
  const navigate = useNavigate();

  const handleComparisonClick = (url) => {
    navigate(url);
  };
  const popularComparisons = [
    {
      id: 'lovescape-vs-character-ai',
      platform1: { 
        name: 'Lovescape', 
        image: 'https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg',
        rating: 4.8,
        pricing: 'Premium'
      },
      platform2: { 
        name: 'Character.AI', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg',
        rating: 4.7,
        pricing: 'Free'
      },
      title: 'Lovescape vs Character.AI',
      description: 'Premium customization vs community variety',
      featured: true,
      url: '/compare/lovescape-vs-character-ai'
    },
    {
      id: 'lovescape-vs-replika',
      platform1: { 
        name: 'Lovescape', 
        image: 'https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg',
        rating: 4.8,
        pricing: 'Premium'
      },
      platform2: { 
        name: 'Replika', 
        image: 'https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85',
        rating: 4.6,
        pricing: 'Freemium'
      },
      title: 'Lovescape vs Replika',
      description: 'Customization vs wellness focus',
      url: '/compare/lovescape-vs-replika'
    },
    {
      id: 'lovescape-vs-nomi-ai',
      platform1: { 
        name: 'Lovescape', 
        image: 'https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg',
        rating: 4.8,
        pricing: 'Premium'
      },
      platform2: { 
        name: 'Nomi.ai', 
        image: 'https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85',
        rating: 4.7,
        pricing: 'Premium'
      },
      title: 'Lovescape vs Nomi.ai',
      description: 'Privacy-first vs visual features',
      url: '/compare/lovescape-vs-nomi-ai'
    },
    {
      id: 'character-ai-vs-replika',
      platform1: { 
        name: 'Character.AI', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg',
        rating: 4.7,
        pricing: 'Free'
      },
      platform2: { 
        name: 'Replika', 
        image: 'https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85',
        rating: 4.6,
        pricing: 'Freemium'
      },
      title: 'Character.AI vs Replika',
      description: 'Community characters vs personal AI',
      url: '/compare/character-ai-vs-replika'
    },
    {
      id: 'replika-vs-nomi-ai',
      platform1: { 
        name: 'Replika', 
        image: 'https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85',
        rating: 4.6,
        pricing: 'Freemium'
      },
      platform2: { 
        name: 'Nomi.ai', 
        image: 'https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85',
        rating: 4.7,
        pricing: 'Premium'
      },
      title: 'Replika vs Nomi.ai',
      description: 'Mental wellness vs visual AI',
      url: '/compare/replika-vs-nomi-ai'
    },
    {
      id: 'character-ai-vs-nomi-ai',
      platform1: { 
        name: 'Character.AI', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg',
        rating: 4.7,
        pricing: 'Free'
      },
      platform2: { 
        name: 'Nomi.ai', 
        image: 'https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85',
        rating: 4.7,
        pricing: 'Premium'
      },
      title: 'Character.AI vs Nomi.ai',
      description: 'Free community vs premium features',
      url: '/compare/character-ai-vs-nomi-ai'
    }
  ];

  const categoryGroups = [
    {
      title: '🏆 Premium Platforms',
      description: 'High-end AI companions with advanced features',
      platforms: ['Lovescape', 'Nomi.ai', 'Kindroid', 'Paradot']
    },
    {
      title: '💕 Romance-Focused',
      description: 'Platforms designed for romantic relationships',
      platforms: ['DreamGF', 'Candy AI', 'Romantic AI', 'Kupid AI']
    },
    {
      title: '🌟 Popular & Free',
      description: 'Widely-used platforms with free access',
      platforms: ['Character.AI', 'Chai AI', 'Replika', 'Poe']
    },
    {
      title: '🎭 Creative & NSFW',
      description: 'Platforms with creative freedom and adult content',
      platforms: ['Janitor AI', 'Tavern AI', 'SoulGen', 'DreamBF']
    }
  ];

  const featuresWeCompare = [
    {
      icon: '🎨',
      title: 'Customization',
      features: ['Character appearance', 'Personality traits', 'Voice options', 'Conversation style']
    },
    {
      icon: '💬',
      title: 'Conversation Quality',
      features: ['Response intelligence', 'Memory retention', 'Context awareness', 'Natural language']
    },
    {
      icon: '💰',
      title: 'Pricing & Value',
      features: ['Free tier limitations', 'Premium features', 'Cost per feature', 'Value for money']
    },
    {
      icon: '🔒',
      title: 'Privacy & Safety',
      features: ['Data encryption', 'Privacy policies', 'Content moderation', 'User safety']
    },
    {
      icon: '📱',
      title: 'Technical Features',
      features: ['Mobile app quality', 'API availability', 'Platform stability', 'Update frequency']
    },
    {
      icon: '👥',
      title: 'Community & Support',
      features: ['User community', 'Customer support', 'Documentation', 'User feedback']
    }
  ];

  return (
    <div className="page-container">
      <Sidebar />
      
      <main className="main-content">
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <GitCompare size={24} />
              <span>Compare Platforms</span>
            </div>
            <h1 className="hero-title">AI PLATFORM COMPARISON</h1>
            <p className="hero-subtitle">
              Find the perfect AI companion by comparing features, pricing, and capabilities side-by-side
            </p>
          </div>
        </div>

        {/* Popular Comparisons */}
        <section className="section">
          <h2 className="section-title">🔥 Popular Comparisons</h2>
          <div className="comparisons-grid">
            {popularComparisons.map((comparison) => (
              <div 
                key={comparison.id}
                className={`comparison-card ${comparison.featured ? 'featured' : ''}`}
                onClick={() => handleComparisonClick(comparison.url)}
              >
                <div className="comparison-platforms">
                  <img src={comparison.platform1.image} alt={comparison.platform1.name} />
                  <span className="vs">vs</span>
                  <img src={comparison.platform2.image} alt={comparison.platform2.name} />
                </div>
                
                <h3>{comparison.title}</h3>
                <p>{comparison.description}</p>
                
                <div className="comparison-stats">
                  <span>
                    ⭐ {comparison.platform1.rating} vs {comparison.platform2.rating}
                  </span>
                  <span>
                    {comparison.platform1.pricing} vs {comparison.platform2.pricing}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Categories */}
        <section className="section">
          <h2 className="section-title">Compare by Category</h2>
          <div className="category-groups">
            {categoryGroups.map((group, index) => (
              <div key={index} className="category-group">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="platform-tags">
                  {group.platforms.map((platform, idx) => (
                    <span key={idx} className="platform-tag">{platform}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features We Compare */}
        <section className="section">
          <h2 className="section-title">What We Compare</h2>
          <div className="features-grid">
            {featuresWeCompare.map((category, index) => (
              <div key={index} className="feature-category">
                <div className="feature-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <ul>
                  {category.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon Statistics */}
        <section className="section">
          <h2 className="section-title">🔜 More Comparisons Coming Soon</h2>
          <p className="coming-soon-text">
            We're expanding our comparison database to include all 210 possible platform combinations. 
            Each comparison features detailed analysis, interactive charts, and expert recommendations.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">Live Comparisons</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">204</div>
              <div className="stat-label">Coming Soon</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">21</div>
              <div className="stat-label">Total Platforms</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">210</div>
              <div className="stat-label">Total Possible</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComparePage;