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
              <p className="detail-description">{platform.description}</p>
              
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
                {platform.features.map((feature, idx) => {
                  // Generate descriptions for features
                  const featureDescriptions = {
                    'Custom Personality': 'Tailor your AI companion\'s traits, preferences, and communication style to match your ideal personality.',
                    'Voice Customization': 'Choose from multiple voice options and customize tone, pitch, and speaking style for authentic conversations.',
                    '24/7 Support': 'Always available whenever you need them - your AI companion is ready to chat any time of day or night.',
                    'Private & Secure': 'Your conversations are protected with end-to-end encryption and strict privacy policies.',
                    'Pre-made Characters': 'Explore thousands of ready-to-use characters from various genres, personalities, and backgrounds.',
                    'Community Creations': 'Access millions of user-created characters and share your own with the community.',
                    'Multiple Characters': 'Chat with multiple AI personalities simultaneously and switch between conversations seamlessly.',
                    'Free Access': 'Get started immediately with free access to core features and unlimited conversations.',
                    'AI Therapy': 'Professional mental health support powered by empathetic AI trained in therapeutic techniques.',
                    'Mood Tracking': 'Monitor your emotional well-being with intelligent mood tracking and personalized insights.',
                    'Journal Integration': 'Combine AI conversations with digital journaling for deeper self-reflection and growth.',
                    'Progress Analytics': 'Track your mental health journey with detailed analytics and progress reports.',
                    'Anime Style': 'Experience conversations with beautifully designed anime-inspired character avatars.',
                    'Visual Avatars': 'Interact with stunning visual representations that bring your AI companion to life.',
                    'Relationship Building': 'Develop deep, meaningful connections through progressive relationship mechanics.',
                    'Memory System': 'Advanced memory capabilities ensure your AI remembers important details about you and past conversations.',
                    'Romantic Focus': 'Designed specifically for romantic interactions with flirting, dating scenarios, and intimate conversations.',
                    'Emotional Intelligence': 'Sophisticated emotional understanding that responds appropriately to your feelings and mood.',
                    'Voice Chat': 'Natural voice conversations with realistic speech synthesis and voice recognition.',
                    'Real-time Response': 'Lightning-fast responses that make conversations feel natural and engaging.',
                    'NSFW Friendly': 'Open platform that allows adult content and mature conversations without restrictions.',
                    'Character Library': 'Extensive collection of pre-built characters spanning diverse personalities and scenarios.',
                    'Customizable AI': 'Deep customization options to fine-tune every aspect of your AI companion\'s behavior.',
                    'Memory Features': 'Intelligent memory system that recalls personal details, preferences, and conversation history.',
                    'Image Generation': 'Create custom images and visual content of your AI companion using advanced AI art generation.',
                    'Chat History': 'Complete conversation history with search, export, and organization features.',
                    'Character Creator': 'Powerful tools to design and customize your own unique AI characters from scratch.',
                    'API Access': 'Developer-friendly API for integrating AI capabilities into your own applications.',
                    'Multiple Models': 'Access to various AI models including GPT-4, Claude, and specialized conversation models.',
                    'Model Comparison': 'Compare responses from different AI models side-by-side to get the best answers.',
                    'Discord Bot': 'Seamless integration with Discord for chatting with AI characters in your servers.',
                    'Free Tier': 'Generous free plan with access to essential features and regular conversation quotas.',
                    'Premium Features': 'Advanced capabilities including priority access, enhanced memory, and exclusive content.',
                    'Offline Mode': 'Continue conversations without internet connection using local AI processing.',
                    'Multi-platform': 'Available across web, iOS, Android, and desktop with synced conversations.',
                    'Group Chat': 'Create conversations involving multiple AI characters for dynamic interactions.',
                    'Scene Builder': 'Design custom scenarios and roleplay settings for your AI conversations.',
                    'Import/Export': 'Easily backup, transfer, or share your character configurations and chat history.',
                    'Open Source': 'Transparent codebase that you can modify, self-host, and customize freely.',
                    'Self-hosted': 'Full control by hosting the platform on your own servers with complete data ownership.',
                    'Community Support': 'Active community forums, guides, and peer support for troubleshooting and tips.'
                  };
                  
                  const description = featureDescriptions[feature] || 'Experience enhanced AI interactions with this powerful feature.';
                  
                  return (
                    <div key={idx} className="enhanced-feature-card">
                      <div className="feature-icon-wrapper">
                        <Zap size={28} />
                      </div>
                      <h3>{feature}</h3>
                      <p className="feature-description">{description}</p>
                      <div className="feature-checkmark">
                        <Check size={20} />
                      </div>
                    </div>
                  );
                })}
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
            
            {/* Compact FAQ Section */}
            <section className="detail-section compact-faq">
              <h2>Common Questions</h2>
              <p className="centered-subtitle">Quick answers about {platform.name}</p>
              
              <div className="compact-faq-grid">
                <div className="compact-faq-item">
                  <div className="faq-icon">❓</div>
                  <h3>What is {platform.name}?</h3>
                  <p>{platform.description} Uses advanced AI for realistic conversations with {platform.users} users.</p>
                </div>
                
                <div className="compact-faq-item">
                  <div className="faq-icon">💰</div>
                  <h3>Pricing</h3>
                  <p>{platform.pricing} with transparent pricing and no hidden fees.</p>
                </div>
                
                <div className="compact-faq-item">
                  <div className="faq-icon">🔒</div>
                  <h3>Privacy & Safety</h3>
                  <p>Encrypted conversations with full data control. {platform.rating}/5 trusted rating.</p>
                </div>
                
                <div className="compact-faq-item">
                  <div className="faq-icon">🎯</div>
                  <h3>Best For</h3>
                  <p>Ideal for {platform.bestFor.toLowerCase()} with {platform.category} focus.</p>
                </div>
                
                <div className="compact-faq-item">
                  <div className="faq-icon">⚡</div>
                  <h3>Key Features</h3>
                  <p>{platform.features.slice(0, 2).join(', ')} and more premium features.</p>
                </div>
                
                <div className="compact-faq-item">
                  <div className="faq-icon">📱</div>
                  <h3>Mobile Access</h3>
                  <p>Works seamlessly on all devices with responsive interface.</p>
                </div>
              </div>
            </section>
            
            {/* Visual Verdict Section */}
            <section className="detail-section visual-verdict">
              <h2>Our Verdict</h2>
              <p className="centered-subtitle">Is {platform.name} worth it?</p>
              
              <div className="verdict-rating-card">
                <div className="rating-display">
                  <Star size={48} fill="#ffd700" color="#ffd700" />
                  <span className="rating-number">{platform.rating}</span>
                  <span className="rating-text">out of 5</span>
                </div>
                <p className="rating-summary">
                  {platform.name} delivers on {platform.tagline.toLowerCase()} with {platform.users} satisfied users.
                </p>
              </div>
              
              <div className="verdict-two-column">
                <div className="verdict-pros-card">
                  <h3>✓ Strengths</h3>
                  <ul>
                    {platform.pros.map((pro, idx) => (
                      <li key={idx}>{pro}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="verdict-cons-card">
                  <h3>⚠ Considerations</h3>
                  <ul>
                    {platform.cons.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="final-recommendation">
                <h3>✨ Recommended For</h3>
                <p>
                  Perfect for {platform.bestFor.toLowerCase()} with {platform.pricing} pricing. 
                  Excels in {platform.category} category with quality features.
                </p>
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