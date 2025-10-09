import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, ExternalLink, Check, X, Shield, MessageCircle, Mic, Clock } from 'lucide-react';

const LovescapeDetail = () => {
  const navigate = useNavigate();

  // Add schema markup to document head
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "@id": "https://ai-characters.org/platform/lovescape",
      "name": "Lovescape",
      "url": "https://ai-characters.org/platform/lovescape",
      "image": "https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg",
      "description": "Lovescape is an advanced AI companion platform that allows users to create customizable virtual partners with unique personalities, voices, and emotional depth. Available in both freemium and premium versions with over 2 million active users worldwide.",
      "brand": {
        "@type": "Brand",
        "name": "Lovescape"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "ratingCount": "12500"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Liam Davenport"
        },
        "datePublished": "2025-10-09",
        "reviewBody": "Lovescape delivers an emotionally intelligent AI experience with customizable voices, personalities, and adaptive behavior. The freemium version is great for casual users, while premium members unlock realistic voices, visual avatars, and emotional memory — making Lovescape one of the best AI companion apps of 2025.",
        "name": "Lovescape Review 2025 — The Best AI Companion App for Emotional Connection",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.8",
          "bestRating": "5"
        }
      },
      "offers": {
        "@type": "Offer",
        "url": "https://lovescape.com",
        "priceCurrency": "USD",
        "price": "0.00",
        "availability": "https://schema.org/InStock"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Custom Personality",
          "value": "98%"
        },
        {
          "@type": "PropertyValue",
          "name": "Voice Customization",
          "value": "92%"
        },
        {
          "@type": "PropertyValue",
          "name": "24/7 Support",
          "value": "96%"
        },
        {
          "@type": "PropertyValue",
          "name": "Private & Secure",
          "value": "99%"
        }
      ]
    };

    // Update document title and meta description
    document.title = "Lovescape Review 2025 — The Best AI Companion App";
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover Lovescape — an advanced AI companion app with voice, personality, and emotions. Build your perfect virtual partner.');
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', 'Discover Lovescape — an advanced AI companion app with voice, personality, and emotions. Build your perfect virtual partner.');
      document.head.appendChild(metaDesc);
    }

    // Add schema markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      
      // Reset title to default
      document.title = "ai-characters.org - AI Character & Companion Reviews";
      
      // Reset meta description
      if (metaDesc) {
        metaDesc.setAttribute('content', 'ai-characters.org - Your comprehensive guide to AI character platforms. Compare features, read reviews, and find the perfect AI companion for your needs.');
      }
    };
  }, []);

  return (
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
        
        {/* Platform Stats & Insights */}
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
  );
};

export default LovescapeDetail;