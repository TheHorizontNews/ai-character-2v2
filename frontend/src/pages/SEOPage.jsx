import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PlatformCard from '../components/PlatformCard';
import Footer from '../components/Footer';
import { seoPages } from '../data/seoPages';
import { aiPlatforms } from '../data/mockData';
import '../styles/SEOPage.css';

const SEOPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fullSlug = params['*'] || params.slug;
  const pageData = seoPages.find(p => p.slug === fullSlug);

  if (!pageData) {
    return (
      <div className="home-page">
        <Sidebar />
        <div className="main-content">
          <div className="seo-page">
            <h1>Page Not Found</h1>
            <button className="cta-button" onClick={() => navigate('/explore')}>
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

  const recommendedPlatforms = aiPlatforms.filter(p => 
    pageData.platforms.includes(p.slug)
  );

  const relatedPages = seoPages.filter(p => 
    pageData.relatedPages && pageData.relatedPages.includes(p.slug)
  );

  return (
    <div className="home-page">
      <Sidebar />
      
      <main className="main-content">
        <div className="seo-page">
          <button className="back-btn" onClick={() => navigate('/explore')}>
            <ArrowLeft size={20} />
            <span>Back to explore</span>
          </button>
          
          <div className="seo-hero">
            <div className="seo-badge">{pageData.category}</div>
            <h1 className="seo-title">{pageData.title}</h1>
            <p className="seo-subtitle">{pageData.subtitle}</p>
            <p className="seo-description">{pageData.description}</p>
            
            <div className="seo-keywords">
              {pageData.keywords.map((keyword, idx) => (
                <span key={idx} className="keyword-tag">{keyword}</span>
              ))}
            </div>
          </div>
          
          <div className="seo-content-section">
            <h2>What is {pageData.title}?</h2>
            <p>{pageData.description}</p>
            <p>
              Modern AI technology has revolutionized virtual companionship. {pageData.title} represents 
              cutting-edge innovation in AI interaction, providing users with meaningful experiences through 
              {pageData.keywords.join(', ')} and more.
            </p>
          </div>
          
          <div className="recommended-platforms">
            <h2>Recommended Platforms for {pageData.title}</h2>
            <p className="platforms-subtitle">
              Top platforms optimized for {pageData.keywords[0]}
            </p>
            
            <div className="platforms-grid">
              {recommendedPlatforms.map((platform) => (
                <PlatformCard key={platform.id} platform={platform} />
              ))}
            </div>
          </div>
          
          {relatedPages.length > 0 && (
            <div className="related-pages">
              <h2>Related Topics</h2>
              <div className="related-grid">
                {relatedPages.map((page) => (
                  <button
                    key={page.slug}
                    className="related-card"
                    onClick={() => navigate(`/seo/${page.slug}`)}
                  >
                    <div className="related-content">
                      <span className="related-category">{page.category}</span>
                      <h3>{page.title}</h3>
                      <p>{page.subtitle}</p>
                    </div>
                    <ChevronRight size={20} className="related-arrow" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="seo-benefits">
            <h2>Benefits of {pageData.title}</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Instant Access</h3>
                <p>Connect immediately with AI companions. Available 24/7 whenever you need support.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔒</div>
                <h3>Private & Secure</h3>
                <p>Your conversations remain private with encryption and secure data storage.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎨</div>
                <h3>Fully Customizable</h3>
                <p>Personalize every aspect creating your perfect companion.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💬</div>
                <h3>Natural Conversations</h3>
                <p>Advanced AI ensures realistic, engaging conversations.</p>
              </div>
            </div>
          </div>
          
          <div className="seo-cta">
            <h2>Ready to Get Started with {pageData.title}?</h2>
            <p>Explore the recommended platforms and find your perfect AI companion.</p>
            <button className="cta-button" onClick={() => navigate('/')}>
              <span>View All Platforms</span>
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default SEOPage;
