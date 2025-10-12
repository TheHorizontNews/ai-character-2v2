import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, GitCompare, ArrowRight } from 'lucide-react';
import '../styles/CTABlocks.css';

const CTABlocks = () => {
  const navigate = useNavigate();

  return (
    <div className="cta-blocks-section">
      <div className="cta-blocks-container">
        <div className="cta-block explore-cta" onClick={() => navigate('/explore')}>
          <div className="cta-icon-wrapper">
            <Compass size={40} />
          </div>
          <div className="cta-content">
            <h3>Explore AI Companions</h3>
            <p>Discover 67+ comprehensive guides on AI companions, characters, and chat platforms</p>
            <div className="cta-button">
              <span>Explore Now</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>

        <div className="cta-block comparisons-cta" onClick={() => navigate('/all-comparisons')}>
          <div className="cta-icon-wrapper">
            <GitCompare size={40} />
          </div>
          <div className="cta-content">
            <h3>All Platform Comparisons</h3>
            <p>Compare 210 platform combinations with detailed feature analysis and expert insights</p>
            <div className="cta-button">
              <span>View Comparisons</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABlocks;
