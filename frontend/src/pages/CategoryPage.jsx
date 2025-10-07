import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, Crown, Heart, TrendingUp, Sparkles, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PlatformCard from '../components/PlatformCard';
import Footer from '../components/Footer';
import { aiPlatforms } from '../data/mockData';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const categoryConfig = {
    premium: {
      title: 'Premium Platforms',
      subtitle: 'High-quality AI character platforms with advanced features',
      icon: Crown,
      color: '#ffd700',
      filter: (p) => ['Premium', 'Developer'].includes(p.category),
      description: 'Discover premium AI character platforms offering cutting-edge features, superior quality, and professional-grade experiences. These platforms provide the best technology and customization options.'
    },
    romantic: {
      title: 'Romantic AI Platforms',
      subtitle: 'AI companions focused on romantic relationships and connections',
      icon: Heart,
      color: '#ff6b9d',
      filter: (p) => p.category === 'Romance',
      description: 'Explore AI platforms designed specifically for romantic relationships, virtual dating, and emotional connections. Perfect for those seeking AI companions for romance and intimacy.'
    },
    trending: {
      title: 'Trending Platforms',
      subtitle: 'Most popular AI character platforms right now',
      icon: TrendingUp,
      color: '#1dd1a1',
      filter: (p) => parseFloat(p.rating) >= 4.5,
      description: 'The hottest AI character platforms of 2025. These trending services are gaining massive popularity for their innovative features and exceptional user experiences.'
    },
    featured: {
      title: 'Featured Platforms',
      subtitle: 'Editor\'s choice - best AI character platforms',
      icon: Sparkles,
      color: '#667eea',
      filter: (p) => ['Premium', 'Popular', 'Wellness'].includes(p.category),
      description: 'Our handpicked selection of the best AI character platforms. These featured services excel in quality, innovation, and user satisfaction.'
    },
    community: {
      title: 'Community Favorites',
      subtitle: 'User-recommended AI character platforms',
      icon: Users,
      color: '#4facfe',
      filter: (p) => p.category === 'Community' || p.users.includes('M'),
      description: 'Platforms loved by the community. These AI character services have built strong user bases through exceptional features and reliable performance.'
    }
  };

  const config = categoryConfig[category] || categoryConfig.featured;
  const Icon = config.icon;
  const filteredPlatforms = aiPlatforms.filter(config.filter);

  return (
    <div className="home-page">
      <Sidebar />
      
      <main className="main-content">
        <div className="category-page">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            <span>Back to home</span>
          </button>
          
          <div className="category-hero" style={{ '--category-color': config.color }}>
            <div className="category-icon-large">
              <Icon size={48} />
            </div>
            <h1 className="category-title">{config.title}</h1>
            <p className="category-subtitle">{config.subtitle}</p>
            <p className="category-description">{config.description}</p>
            
            <div className="category-stats">
              <div className="category-stat">
                <div className="stat-value">{filteredPlatforms.length}</div>
                <div className="stat-label">Platforms</div>
              </div>
              <div className="category-stat">
                <div className="stat-value">
                  {filteredPlatforms.reduce((sum, p) => sum + parseFloat(p.users.replace(/[^0-9.]/g, '')), 0).toFixed(0)}M+
                </div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="category-stat">
                <div className="stat-value">
                  {(filteredPlatforms.reduce((sum, p) => sum + p.rating, 0) / filteredPlatforms.length).toFixed(1)}
                </div>
                <div className="stat-label">Avg Rating</div>
              </div>
            </div>
          </div>
          
          <div className="category-content">
            <div className="platforms-header">
              <h2>All {config.title}</h2>
              <div className="sort-options">
                <button className="sort-btn active">Highest Rated</button>
                <button className="sort-btn">Most Popular</button>
                <button className="sort-btn">Newest</button>
              </div>
            </div>
            
            <div className="platforms-grid">
              {filteredPlatforms
                .sort((a, b) => b.rating - a.rating)
                .map((platform) => (
                  <PlatformCard key={platform.id} platform={platform} />
                ))}
            </div>
            
            {filteredPlatforms.length === 0 && (
              <div className="no-platforms">
                <Icon size={64} color="#333" />
                <h3>No platforms found</h3>
                <p>Check back soon for more platforms in this category.</p>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default CategoryPage;