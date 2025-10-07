import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Crown, Heart, TrendingUp, Users, Code, Mic, Palette } from 'lucide-react';
import '../styles/CategorySection.css';

const iconMap = {
  Sparkles,
  Crown,
  Heart,
  TrendingUp,
  Users,
  Code,
  Mic,
  Palette
};

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Premium', icon: 'Crown', color: '#ffd700', route: 'premium' },
    { name: 'Romantic', icon: 'Heart', color: '#ff6b9d', route: 'romantic' },
    { name: 'Trending', icon: 'TrendingUp', color: '#1dd1a1', route: 'trending' },
    { name: 'Community', icon: 'Users', color: '#4facfe', route: 'community' },
    { name: 'Featured', icon: 'Sparkles', color: '#667eea', route: 'featured' },
  ];

  const handleCategoryClick = (route) => {
    navigate(`/category/${route}`);
  };

  return (
    <div className="category-section">
      <h2 className="category-title">Explore by Category</h2>
      <div className="category-grid">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          return (
            <div
              key={category.name}
              className="category-card"
              onClick={() => handleCategoryClick(category.route)}
              style={{ '--category-color': category.color }}
            >
              <div className="category-icon">
                <Icon size={28} />
              </div>
              <div className="category-name">{category.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;