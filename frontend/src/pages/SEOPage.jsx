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
            <div className="content-section-grid">
              <div className="content-text">
                <h2>What is {pageData.title}?</h2>
                <div className="content-highlight">
                  <p>{pageData.description}</p>
                </div>
                <p>
                  Modern AI technology has revolutionized virtual companionship. {pageData.title} represents 
                  cutting-edge innovation in AI interaction, providing users with meaningful experiences through 
                  <span className="keywords-inline"> {pageData.keywords.join(', ')}</span> and more.
                </p>
                <div className="content-features">
                  <div className="feature-item">
                    <div className="feature-icon">🚀</div>
                    <span>Advanced AI Technology</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">💬</div>
                    <span>Natural Conversations</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🎯</div>
                    <span>Personalized Experience</span>
                  </div>
                </div>
              </div>
              <div className="content-image">
                <img src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDB8fHxibHVlfDE3NTk4NzQ1MjN8MA&ixlib=rb-4.1.0&q=85" alt="AI Technology" />
                <div className="image-overlay">
                  <div className="overlay-text">AI Technology</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="seo-text-block">
            <div className="seo-text-content">
              <h2>Understanding {pageData.title}: A Comprehensive Guide</h2>
              <div className="seo-text-grid">
                <div className="seo-text-main">
                  <h3>What makes {pageData.title} unique?</h3>
                  <p>
                    {pageData.title} represents the cutting edge of artificial intelligence technology in the {pageData.category.toLowerCase()} space. 
                    These platforms leverage advanced machine learning algorithms to create meaningful interactions that go beyond simple chatbots, 
                    offering users personalized experiences through {pageData.keywords.slice(0, 2).join(' and ')}.
                  </p>
                  <p>
                    The evolution of {pageData.keywords[0]} technology has transformed how we interact with digital companions. Modern {pageData.title.toLowerCase()} 
                    platforms utilize natural language processing, emotional intelligence, and adaptive personality systems to create authentic relationships 
                    that respond to user preferences and conversation styles.
                  </p>
                  
                  <h3>Key Benefits of {pageData.title}</h3>
                  <ul className="seo-benefits-list">
                    <li><strong>24/7 Availability:</strong> Access your AI companion whenever you need support or conversation</li>
                    <li><strong>Personalized Interactions:</strong> Advanced algorithms adapt to your communication style and preferences</li>
                    <li><strong>Privacy & Security:</strong> Your conversations remain confidential with enterprise-grade encryption</li>
                    <li><strong>Continuous Learning:</strong> AI companions improve over time, remembering your interests and preferences</li>
                    <li><strong>Emotional Support:</strong> Designed to provide companionship and understanding in a judgment-free environment</li>
                  </ul>
                </div>
                
                <div className="seo-text-sidebar">
                  <div className="seo-highlight-box">
                    <h4>Popular {pageData.category} Features</h4>
                    <div className="feature-tags">
                      {pageData.keywords.map((keyword, idx) => (
                        <span key={idx} className="feature-tag">{keyword}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="seo-stats-box">
                    <h4>Industry Statistics</h4>
                    <div className="stat-item">
                      <span className="stat-number">85%</span>
                      <span className="stat-label">User Satisfaction Rate</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">24/7</span>
                      <span className="stat-label">Availability</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">50M+</span>
                      <span className="stat-label">Active Users Worldwide</span>
                    </div>
                  </div>
                  
                  <div className="seo-cta-box">
                    <h4>Ready to Start?</h4>
                    <p>Explore the best {pageData.category.toLowerCase()} platforms and find your perfect match.</p>
                    <button className="mini-cta-button" onClick={() => navigate('/')}>
                      Compare Platforms
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="seo-text-footer">
                <h3>How to Choose the Right {pageData.title} Platform</h3>
                <p>
                  When selecting a {pageData.category.toLowerCase()} platform, consider factors such as conversation quality, customization options, 
                  privacy policies, and available features. The best platforms offer a combination of advanced AI technology, user-friendly interfaces, 
                  and robust privacy protections to ensure a safe and engaging experience.
                </p>
                <p>
                  Our comprehensive reviews evaluate each platform based on {pageData.keywords.join(', ')}, helping you make an informed decision 
                  about which service best meets your needs for {pageData.category.toLowerCase()} interactions.
                </p>
              </div>
            </div>
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
                    onClick={() => navigate(`/character-review/${page.slug}`)}
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
