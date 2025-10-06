import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PlatformCard from './PlatformCard';
import '../styles/PlatformSection.css';

const PlatformSection = ({ title, subtitle, platforms }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="platform-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        
        <div className="section-controls">
          <button className="scroll-btn" onClick={() => scroll('left')}>
            <ChevronLeft size={20} />
          </button>
          <button className="scroll-btn" onClick={() => scroll('right')}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="platforms-scroll" ref={scrollRef}>
        {platforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </div>
    </div>
  );
};

export default PlatformSection;