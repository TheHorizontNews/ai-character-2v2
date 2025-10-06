import React from 'react';
import { Sparkles, Crown, Heart, Brain, Users, Code, Mic, Palette } from 'lucide-react';
import '../styles/CategorySection.css';

const iconMap = {
  Sparkles,
  Crown,
  Heart,
  Brain,
  Users,
  Code,
  Mic,
  Palette
};

const CategorySection = ({ onCategorySelect }) => {
  const categories = [
    { name: 'Premium', icon: 'Crown', color: '#ffd700' },
    { name: 'Romance', icon: 'Heart', color: '#ff6b9d' },
    { name: 'Wellness', icon: 'Brain', color: '#667eea' },
    { name: 'Community', icon: 'Users', color: '#1dd1a1' },
    { name: 'Developer', icon: 'Code', color: '#f093fb' },
    { name: 'Voice', icon: 'Mic', color: '#4facfe' },
    { name: 'Creative', icon: 'Palette', color: '#fa709a' },
  ];

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
              onClick={() => onCategorySelect(category.name.toLowerCase())}
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