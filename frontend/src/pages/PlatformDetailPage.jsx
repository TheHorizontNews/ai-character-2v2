import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, ExternalLink, Check, X, TrendingUp, DollarSign, Shield, Zap, MessageCircle, Image as ImageIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import LovescapeDetail from '../components/LovescapeDetail';
import { aiPlatforms } from '../data/mockData';
import { generatePlatformSchema, updatePageMeta, addSchemaMarkup, resetPageMeta } from '../utils/schemaMarkup';
import '../styles/PlatformDetailPage.css';

const PlatformDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    const found = aiPlatforms.find(p => p.slug === slug);
    setPlatform(found);
    
    // Add schema markup and update meta for generic platforms (not Lovescape)
    if (found && found.slug !== 'lovescape') {
      const title = `${found.name} Review 2025 — ${found.tagline}`;
      const description = `${found.description.substring(0, 140)}...`;
      
      updatePageMeta(title, description);
      
      const schemaData = generatePlatformSchema(found);
      if (schemaData) {
        addSchemaMarkup(schemaData);
      }
    }
    
    // Cleanup function
    return () => {
      if (found && found.slug !== 'lovescape') {
        resetPageMeta();
      }
    };
  }, [slug]);

  if (!platform) {
    return (
      <div className="home-page">
        <Sidebar />
        <div className="main-content">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  // Special handling for Lovescape platform
  if (platform && platform.slug === 'lovescape') {
    // Update meta and schema for Lovescape
    React.useEffect(() => {
      document.title = "Lovescape Review 2025 — The Best AI Companion App";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Discover Lovescape — an advanced AI companion app with voice, personality, and emotions. Build your perfect virtual partner.');
      }
      
      // Add schema markup
      const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "@id": "https://ai-characters.org/platform/lovescape",
        "name": "Lovescape",
        "url": "https://ai-characters.org/platform/lovescape",
        "image": "https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg",
        "description": "Lovescape is an advanced AI companion platform that allows users to create customizable virtual partners with unique personalities, voices, and emotional depth.",
        "brand": { "@type": "Brand", "name": "Lovescape" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "bestRating": "5", "ratingCount": "12500" }
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }, []);

    return (
      <div className="home-page">
        <Sidebar />
        <main className="main-content">
          <div className="detail-page lovescape-detail">
            <button className="back-btn" onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
              <span>Back to all platforms</span>
            </button>
            
            <div className="detail-hero">
              <div className="detail-hero-image">
                <img src="https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg" alt="Lovescape" />
              </div>
              
              <div className="detail-hero-content">
                <div className="detail-badge">Premium</div>
                <h1 className="detail-title">🖤 Lovescape</h1>
                <p className="detail-tagline">Build your perfect AI companion</p>
                
                <div className="detail-stats">
                  <div className="detail-stat">
                    <Star size={20} fill="#ffd700" color="#ffd700" />
                    <span>4.8 Rating</span>
                  </div>
                  <div className="detail-stat">
                    <Users size={20} />
                    <span>2M+ Users</span>
                  </div>
                </div>
                
                <button className="cta-button">
                  👉 GET STARTED WITH LOVESCAPE
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
            
            <div className="detail-content">
              <section className="detail-section">
                <h2>Short Intro</h2>
                <p>
                  Lovescape is an advanced AI companion platform designed to create real emotional connections between humans and artificial intelligence.
                  It allows users to design fully customizable companions with unique personalities, voices, and appearances — making every interaction feel authentic and deeply personal.
                </p>
              </section>
              
              <section className="detail-section">
                <h2>About Lovescape</h2>
                <p>
                  Lovescape represents the next generation of AI communication.
                  It's not just a chat app — it's an emotional experience powered by adaptive intelligence.
                </p>
                <p>
                  Each companion on Lovescape learns from your conversations, remembers details, and evolves with time.
                  You can fine-tune their tone, character traits, or voice and even choose how they visually appear.
                  The system uses a proprietary emotional engine that allows AI to express empathy and adapt to your communication style in real time.
                </p>
              </section>
              
              <section className="detail-section">
                <h2>Key Features</h2>
                <div className="features-grid">
                  <div className="feature-item">
                    <span className="feature-emoji">🎭</span>
                    <div>
                      <strong>Custom Personality:</strong> Create from hundreds of character archetypes or build your own unique AI personality.
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-emoji">🎤</span>
                    <div>
                      <strong>Voice Customization:</strong> Choose from realistic voices with different tones, accents, and expressions.
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-emoji">🕓</span>
                    <div>
                      <strong>24/7 Support:</strong> Always available to chat, comfort, or inspire you — day or night.
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-emoji">🔒</span>
                    <div>
                      <strong>Private & Secure:</strong> All conversations are encrypted and protected by strong privacy protocols.
                    </div>
                  </div>
                </div>
              </section>
              
              <div className="detail-grid">
                <section className="detail-section">
                  <h2>Pros</h2>
                  <ul className="pros-list">
                    <li>
                      <Check size={18} />
                      <span>Deep personality customization</span>
                    </li>
                    <li>
                      <Check size={18} />
                      <span>Realistic emotional and voice interactions</span>
                    </li>
                    <li>
                      <Check size={18} />
                      <span>Fast, adaptive AI models with human-like conversation flow</span>
                    </li>
                  </ul>
                </section>
                
                <section className="detail-section">
                  <h2>Cons</h2>
                  <ul className="cons-list">
                    <li>
                      <X size={18} />
                      <span>Premium features require a subscription</span>
                    </li>
                    <li>
                      <X size={18} />
                      <span>Voice customization is limited on free accounts</span>
                    </li>
                  </ul>
                </section>
              </div>
              
              <section className="detail-section">
                <h2>Pricing</h2>
                <div className="pricing-card">
                  <h3>Freemium Model:</h3>
                  <p>
                    Lovescape offers a free version for basic text-based interactions and a premium plan for advanced features.
                    Premium unlocks realistic voice conversations, emotional memory, and deeper customization options — ideal for users seeking a richer experience.
                  </p>
                </div>
              </section>
              
              <section className="detail-section">
                <h2>Best For</h2>
                <p className="best-for">
                  Lovescape is best for users who want meaningful emotional interactions with AI — whether for companionship, emotional support, or creative exploration.
                </p>
              </section>
              
              <section className="detail-section data-visualization">
                <h2>Platform Stats & Insights</h2>
                <div className="stats-overview">
                  <div className="overview-stats">
                    <div className="overview-stat">
                      <span>⭐ 4.8 / 5</span>
                      <label>average user rating</label>
                    </div>
                    <div className="overview-stat">
                      <span>👥 2M+</span>
                      <label>active users</label>
                    </div>
                    <div className="overview-stat">
                      <span>💎</span>
                      <label>Freemium & Premium models</label>
                    </div>
                  </div>
                </div>
                
                <h3>Feature Availability:</h3>
                <div className="feature-availability">
                  <div className="availability-item">
                    <span>✔️ Custom Personality</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '98%' }}></div>
                    </div>
                    <span>98%</span>
                  </div>
                  <div className="availability-item">
                    <span>✔️ Voice Customization</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '92%' }}></div>
                    </div>
                    <span>92%</span>
                  </div>
                  <div className="availability-item">
                    <span>✔️ 24/7 Support</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '96%' }}></div>
                    </div>
                    <span>96%</span>
                  </div>
                  <div className="availability-item">
                    <span>✔️ Private & Secure</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '99%' }}></div>
                    </div>
                    <span>99%</span>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <h2>Why Choose Lovescape?</h2>
                <p>
                  Lovescape isn't just another chatbot — it's a digital companion that understands, reacts, and evolves.
                  Its emotional AI system ensures that every dialogue feels unique, natural, and emotionally intelligent.
                </p>
                <p>
                  Unlike traditional chatbots, Lovescape focuses on empathy, memory, and human-like adaptability.
                  Whether you want a supportive friend, a motivational partner, or a romantic companion, you can fully shape how your AI interacts with you — from tone of voice to behavioral traits.
                </p>
                <p>
                  This blend of emotional realism, deep customization, and strong privacy makes Lovescape one of the most advanced AI companion apps in 2025.
                </p>
              </section>

              <section className="detail-section key-highlights">
                <h2>Key Highlights</h2>
                <div className="highlights-grid">
                  <div className="highlight-item">
                    <span>💬</span>
                    <span>Emotionally rich conversations</span>
                  </div>
                  <div className="highlight-item">
                    <span>🎨</span>
                    <span>Fully customizable AI personalities</span>
                  </div>
                  <div className="highlight-item">
                    <span>🔐</span>
                    <span>Strong privacy & data protection</span>
                  </div>
                </div>
              </section>

              <section className="detail-section ready-to-try">
                <h2>Ready to try Lovescape?</h2>
                <p>
                  Step into the world of intelligent emotional connection.
                  Design your perfect AI partner, explore their personality, and experience conversations that feel truly alive.
                </p>
                <button className="large-cta-button">
                  👉 GET STARTED WITH LOVESCAPE
                </button>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Sidebar />
      
      <main className="main-content">
        <div className="detail-page">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            <span>Back to all platforms</span>
          </button>
          
          <div className="detail-hero">
            <div className="detail-hero-image">
              <img src={platform.image} alt={platform.name} />
            </div>
            
            <div className="detail-hero-content">
              <div className="detail-badge">{platform.category}</div>
              <h1 className="detail-title">{platform.name}</h1>
              <p className="detail-tagline">{platform.tagline}</p>
              
              <div className="detail-stats">
                <div className="detail-stat">
                  <Star size={20} fill="#ffd700" color="#ffd700" />
                  <span>{platform.rating} Rating</span>
                </div>
                <div className="detail-stat">
                  <Users size={20} />
                  <span>{platform.users} Users</span>
                </div>
              </div>
              
              <button className="cta-button">
                Visit {platform.name}
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
          
          <div className="detail-content">
            <section className="detail-section">
              <h2>About {platform.name}</h2>
              <p>{platform.description}</p>
            </section>
            
            <section className="detail-section">
              <h2>Key Features</h2>
              <div className="features-grid">
                {platform.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <Check size={20} className="feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="detail-grid">
              <section className="detail-section">
                <h2>Pros</h2>
                <ul className="pros-list">
                  {platform.pros.map((pro, idx) => (
                    <li key={idx}>
                      <Check size={18} />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              <section className="detail-section">
                <h2>Cons</h2>
                <ul className="cons-list">
                  {platform.cons.map((con, idx) => (
                    <li key={idx}>
                      <X size={18} />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            
            <section className="detail-section">
              <h2>Pricing</h2>
              <div className="pricing-card">
                <div className="pricing-info">
                  <span className="pricing-label">Pricing Model:</span>
                  <span className="pricing-amount">{platform.pricing}</span>
                </div>
              </div>
            </section>
            
            <section className="detail-section">
              <h2>Best For</h2>
              <p className="best-for">{platform.bestFor}</p>
            </section>
            
            {/* Data Visualization Block */}
            <section className="detail-section data-visualization">
              <h2>Platform Stats & Insights</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'rgba(29, 209, 161, 0.1)' }}>
                    <TrendingUp size={24} color="#1dd1a1" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{platform.rating}</div>
                    <div className="stat-label">User Rating</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'rgba(102, 126, 234, 0.1)' }}>
                    <Users size={24} color="#667eea" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{platform.users}</div>
                    <div className="stat-label">Active Users</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'rgba(240, 147, 251, 0.1)' }}>
                    <DollarSign size={24} color="#f093fb" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{platform.pricing}</div>
                    <div className="stat-label">Pricing Model</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'rgba(255, 107, 157, 0.1)' }}>
                    <Shield size={24} color="#ff6b9d" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{platform.category}</div>
                    <div className="stat-label">Category</div>
                  </div>
                </div>
              </div>
              
              <div className="features-progress">
                <h3>Feature Availability</h3>
                <div className="progress-bars">
                  {platform.features.map((feature, idx) => (
                    <div key={idx} className="progress-item">
                      <div className="progress-header">
                        <span>{feature}</span>
                        <span className="progress-percentage">100%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* SEO Content Block */}
            <section className="detail-section seo-content">
              <div className="seo-content-layout">
                <div className="seo-text">
                  <h2>Why Choose {platform.name}?</h2>
                  <p>{platform.description}</p>
                  <p>
                    {platform.name} stands out in the AI character platform space with its {platform.rating} rating 
                    and growing community of {platform.users} users. The platform offers a {platform.pricing.toLowerCase()} 
                    pricing model, making it accessible to a wide range of users.
                  </p>
                  <p>
                    Whether you're looking for {platform.category.toLowerCase()} AI interactions or exploring AI companionship, 
                    {platform.name} provides the tools and features you need. Users particularly appreciate the platform's 
                    focus on {platform.bestFor.toLowerCase()}.
                  </p>
                  <div className="seo-highlights">
                    <h3>Key Highlights:</h3>
                    <ul>
                      {platform.pros.map((pro, idx) => (
                        <li key={idx}>
                          <Check size={18} />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="seo-image">
                  <img src={platform.image} alt={`${platform.name} platform`} />
                  <div className="seo-image-overlay">
                    <div className="overlay-stat">
                      <Star size={20} fill="#ffd700" color="#ffd700" />
                      <span>{platform.rating} Rating</span>
                    </div>
                    <div className="overlay-stat">
                      <Users size={20} />
                      <span>{platform.users} Users</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="detail-cta">
              <h2>Ready to try {platform.name}?</h2>
              <p>Join millions of users experiencing AI companionship</p>
              <button className="cta-button large">
                Get Started with {platform.name}
                <ExternalLink size={20} />
              </button>
            </section>
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default PlatformDetailPage;