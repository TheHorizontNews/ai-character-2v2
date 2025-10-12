import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, ExternalLink, Check, X, TrendingUp, DollarSign, Shield, Zap, MessageCircle, Image as ImageIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { aiPlatforms } from '../data/mockData';
import '../styles/PlatformDetailPage.css';

const PlatformDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    const found = aiPlatforms.find(p => p.slug === slug);
    setPlatform(found);
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
            {/* Enhanced Key Features Section */}
            <section className="detail-section enhanced-features">
              <h2>Key Features</h2>
              <p className="section-subtitle">Discover what makes {platform.name} stand out</p>
              <div className="enhanced-features-grid">
                {platform.features.map((feature, idx) => (
                  <div key={idx} className="enhanced-feature-card">
                    <div className="feature-icon-wrapper">
                      <Zap size={28} />
                    </div>
                    <h3>{feature}</h3>
                    <div className="feature-checkmark">
                      <Check size={20} />
                    </div>
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
            
            {/* Feature Analysis with Visual Cards */}
            <section className="detail-section visual-features-section">
              <h2>What Makes {platform.name} Special</h2>
              <p className="centered-subtitle">Explore key capabilities with {platform.rating}/5 rating and {platform.users} users</p>
              
              <div className="visual-features-grid">
                <div className="visual-feature-card">
                  <div className="visual-icon blue-gradient">
                    <MessageCircle size={32} />
                  </div>
                  <h3>AI Conversation Quality</h3>
                  <p>
                    {platform.name} delivers natural conversations through advanced AI technology. 
                    The platform maintains consistent character personalities while adapting to your interaction style.
                  </p>
                </div>
                
                <div className="visual-feature-card">
                  <div className="visual-icon purple-gradient">
                    <ImageIcon size={32} />
                  </div>
                  <h3>Character Customization</h3>
                  <p>
                    Extensive customization options with intuitive interface. Create characters that match your preferences 
                    with {platform.pricing} pricing for all experience levels.
                  </p>
                </div>
                
                <div className="visual-feature-card">
                  <div className="visual-icon green-gradient">
                    <Shield size={32} />
                  </div>
                  <h3>Privacy & Security</h3>
                  <p>
                    Robust security with encrypted interactions. Full data control with options to manage privacy 
                    settings and delete conversations anytime.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Use Cases with Icon Cards */}
            <section className="detail-section icon-use-cases">
              <h2>Popular Use Cases</h2>
              <p className="centered-subtitle">How {platform.users} users leverage {platform.name}</p>
              
              <div className="icon-cases-grid">
                <div className="icon-case-card">
                  <div className="case-icon pink-gradient">
                    <Users size={36} />
                  </div>
                  <h3>Companionship</h3>
                  <p>Daily emotional support in a judgment-free space with {platform.rating}/5 rated experience.</p>
                </div>
                
                <div className="icon-case-card">
                  <div className="case-icon orange-gradient">
                    <Zap size={36} />
                  </div>
                  <h3>Creative Projects</h3>
                  <p>Brainstorming partner for writers with consistent character personalities.</p>
                </div>
                
                <div className="icon-case-card">
                  <div className="case-icon teal-gradient">
                    <MessageCircle size={36} />
                  </div>
                  <h3>Language Practice</h3>
                  <p>Low-pressure environment for practicing conversation skills at any level.</p>
                </div>
                
                <div className="icon-case-card">
                  <div className="case-icon indigo-gradient">
                    <TrendingUp size={36} />
                  </div>
                  <h3>Social Skills</h3>
                  <p>Safe space to build confidence with patient, realistic AI responses.</p>
                </div>
              </div>
            </section>
            
            {/* Comparison Highlights */}
            <section className="detail-section comparison-highlights">
              <h2>Why Choose {platform.name}</h2>
              <p className="centered-subtitle">Key advantages with {platform.users} users and {platform.rating}/5 rating</p>
              
              <div className="highlights-grid">
                <div className="highlight-card">
                  <div className="highlight-number">01</div>
                  <h3>Pricing & Value</h3>
                  <p>{platform.name} offers {platform.pricing} with balanced features and clear upgrade paths.</p>
                </div>
                
                <div className="highlight-card">
                  <div className="highlight-number">02</div>
                  <h3>Best For</h3>
                  <p>Excels in {platform.bestFor.toLowerCase()} with focused development approach.</p>
                </div>
                
                <div className="highlight-card">
                  <div className="highlight-number">03</div>
                  <h3>User Experience</h3>
                  <p>Intuitive {platform.category} interface with streamlined onboarding process.</p>
                </div>
                
                <div className="highlight-card">
                  <div className="highlight-number">04</div>
                  <h3>Active Community</h3>
                  <p>Vibrant {platform.users} user base with responsive support and regular updates.</p>
                </div>
              </div>
            </section>
            
            {/* FAQ Section */}
            <section className="detail-section seo-faq">
              <h2>Frequently Asked Questions About {platform.name}</h2>
              
              <div className="faq-list">
                <div className="faq-item">
                  <h3>What is {platform.name} and how does it work?</h3>
                  <p>
                    {platform.name} is an AI character platform that allows users to interact with AI-powered virtual companions. 
                    {platform.description} The platform uses advanced natural language processing to create realistic, engaging 
                    conversations. With {platform.users} active users and a {platform.rating}/5 rating, it's a trusted choice 
                    for AI companionship.
                  </p>
                </div>
                
                <div className="faq-item">
                  <h3>How much does {platform.name} cost?</h3>
                  <p>
                    {platform.name} operates on a {platform.pricing} basis. This pricing model allows users to access core 
                    features while offering premium options for enhanced functionality. The platform provides excellent value 
                    compared to competitors, with transparent pricing and no hidden fees.
                  </p>
                </div>
                
                <div className="faq-item">
                  <h3>Is {platform.name} safe and private?</h3>
                  <p>
                    Yes, {platform.name} takes user privacy and safety seriously. All conversations are encrypted and stored 
                    securely. The platform complies with data protection regulations and gives users full control over their 
                    data. You can delete your conversations and account at any time. The {platform.rating}/5 rating reflects 
                    users' trust in the platform's security measures.
                  </p>
                </div>
                
                <div className="faq-item">
                  <h3>Who is {platform.name} best suited for?</h3>
                  <p>
                    {platform.name} is ideal for {platform.bestFor.toLowerCase()}. The platform serves diverse needs, from 
                    casual conversation to {platform.category.toLowerCase()} interactions. Whether you're seeking companionship, 
                    creative inspiration, or just fun conversations, {platform.name} adapts to your preferences.
                  </p>
                </div>
                
                <div className="faq-item">
                  <h3>What features does {platform.name} offer?</h3>
                  <p>
                    {platform.name} offers comprehensive features including {platform.features.join(', ')}. These features 
                    are designed to provide a rich, immersive experience for users seeking quality AI interactions. The platform 
                    continues to add new features based on community feedback.
                  </p>
                </div>
                
                <div className="faq-item">
                  <h3>How does {platform.name} compare to Character.AI or Replika?</h3>
                  <p>
                    While Character.AI focuses on vast character variety and Replika emphasizes therapeutic companionship, 
                    {platform.name} distinguishes itself through {platform.bestFor.toLowerCase()}. With {platform.users} users 
                    and a {platform.rating}/5 rating, it offers a unique balance of features and user experience. The {platform.pricing} 
                    pricing model also makes it accessible to a wide audience.
                  </p>
                </div>
                
                <div className="faq-item">
                  <h3>Can I use {platform.name} on mobile devices?</h3>
                  <p>
                    Yes, {platform.name} is designed to work seamlessly across devices. Whether you're using a smartphone, 
                    tablet, or desktop computer, you'll have access to all features. The responsive interface ensures a 
                    consistent experience regardless of your device, making it easy to continue conversations on the go.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Final Verdict & Recommendations */}
            <section className="detail-section seo-verdict">
              <h2>Final Verdict: Is {platform.name} Worth It?</h2>
              
              <div className="verdict-content">
                <div className="verdict-summary">
                  <h3>Overall Assessment</h3>
                  <p>
                    After comprehensive analysis, {platform.name} earns its {platform.rating}/5 rating through consistent 
                    performance across key areas. The platform successfully delivers on its promise of {platform.tagline.toLowerCase()}, 
                    backed by a growing community of {platform.users} satisfied users.
                  </p>
                </div>
                
                <div className="verdict-strengths">
                  <h3>Key Strengths</h3>
                  <ul>
                    {platform.pros.map((pro, idx) => (
                      <li key={idx}>
                        <Check size={18} />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    These strengths make {platform.name} particularly well-suited for {platform.bestFor.toLowerCase()}. 
                    The {platform.pricing} model ensures good value for money, while the feature set covers essential 
                    needs without overwhelming users with unnecessary complexity.
                  </p>
                </div>
                
                <div className="verdict-considerations">
                  <h3>Points to Consider</h3>
                  <ul>
                    {platform.cons.map((con, idx) => (
                      <li key={idx}>
                        <X size={18} />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    While these limitations exist, they're relatively minor compared to the overall value proposition. 
                    Most users find that the advantages significantly outweigh any drawbacks, as reflected in the 
                    platform's strong {platform.rating}/5 rating.
                  </p>
                </div>
                
                <div className="verdict-recommendation">
                  <h3>Our Recommendation</h3>
                  <p>
                    <strong>We recommend {platform.name}</strong> for anyone seeking {platform.bestFor.toLowerCase()}. 
                    The combination of reliable performance, {platform.pricing} pricing, and {platform.users} active community 
                    makes it a solid choice in the AI character platform space. Whether you're new to AI companions or 
                    an experienced user, {platform.name} offers something valuable.
                  </p>
                  <p>
                    The platform excels in the {platform.category} category, delivering consistent quality across its 
                    feature set: {platform.features.join(', ')}. For users prioritizing {platform.bestFor.toLowerCase()}, 
                    {platform.name} represents one of the best options available today.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="detail-cta">
              <h2>Ready to try {platform.name}?</h2>
              <p>Join {platform.users} users experiencing AI companionship with {platform.name}</p>
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