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
            
            {/* Detailed Feature Analysis */}
            <section className="detail-section seo-detailed-features">
              <h2>Comprehensive Feature Analysis: {platform.name}</h2>
              <p className="section-intro">
                In this detailed analysis, we explore everything {platform.name} has to offer. From advanced AI technology 
                to user experience, discover why {platform.name} is a leading choice for AI character interactions with 
                its {platform.rating}/5 rating and {platform.users} active user community.
              </p>
              
              <div className="feature-deep-dive">
                <h3><MessageCircle size={24} /> Conversation Quality & AI Intelligence</h3>
                <p>
                  {platform.name} leverages cutting-edge AI technology to deliver natural, engaging conversations. 
                  The platform's AI models are trained on diverse datasets, ensuring responses that feel authentic and contextually aware. 
                  Users consistently rate the conversation quality as one of the platform's strongest features, with the AI demonstrating 
                  remarkable understanding of context, emotion, and user preferences over time.
                </p>
                <p>
                  What sets {platform.name} apart is its ability to maintain consistent character personalities while adapting to 
                  individual user interaction styles. Whether you're looking for casual chat, deep philosophical discussions, or 
                  creative roleplay, the AI adjusts its responses to match your needs and expectations.
                </p>
              </div>
              
              <div className="feature-deep-dive">
                <h3><ImageIcon size={24} /> Visual Customization & Character Design</h3>
                <p>
                  Visual representation plays a crucial role in AI companionship, and {platform.name} excels in this area. 
                  The platform offers extensive customization options, allowing users to create or select characters that resonate 
                  with their preferences. From detailed avatar customization to dynamic visual responses, every aspect is designed 
                  to enhance immersion and emotional connection.
                </p>
                <p>
                  The character design interface is intuitive yet powerful, suitable for both beginners and advanced users. 
                  With {platform.pricing} pricing structure, users can access various levels of visual customization, making 
                  it accessible to a broad audience while offering premium options for those seeking more detailed control.
                </p>
              </div>
              
              <div className="feature-deep-dive">
                <h3><Shield size={24} /> Privacy & Security Features</h3>
                <p>
                  In the age of digital interactions, privacy and security are paramount. {platform.name} implements robust 
                  security measures to protect user data and conversations. All interactions are encrypted, and the platform 
                  adheres to strict data protection standards. Users maintain full control over their data, with options to 
                  delete conversations and manage their privacy settings at any time.
                </p>
                <p>
                  The platform's commitment to user privacy extends to its AI training processes. Unlike some competitors, 
                  {platform.name} ensures that user conversations are not used for AI training without explicit consent, 
                  providing peace of mind for users concerned about data privacy.
                </p>
              </div>
            </section>
            
            {/* Use Cases & Applications */}
            <section className="detail-section seo-use-cases">
              <h2>Real-World Use Cases for {platform.name}</h2>
              <p className="section-intro">
                Discover how {platform.users} users are leveraging {platform.name} across different scenarios and applications. 
                From personal development to creative writing, the platform serves diverse needs.
              </p>
              
              <div className="use-case-grid">
                <div className="use-case-card">
                  <h3>Companionship & Emotional Support</h3>
                  <p>
                    Many users turn to {platform.name} for daily companionship and emotional support. The AI provides a 
                    judgment-free space for expressing thoughts and feelings, offering comfort during difficult times. 
                    With its {platform.rating} rating, users consistently report feeling heard and understood.
                  </p>
                </div>
                
                <div className="use-case-card">
                  <h3>Creative Writing & Roleplay</h3>
                  <p>
                    Writers and creative professionals use {platform.name} as a brainstorming partner and character development 
                    tool. The AI's ability to maintain consistent character personalities makes it ideal for exploring storylines, 
                    dialogue, and character interactions in creative projects.
                  </p>
                </div>
                
                <div className="use-case-card">
                  <h3>Language Practice & Learning</h3>
                  <p>
                    Language learners benefit from {platform.name}'s conversational capabilities. The platform provides a 
                    low-pressure environment for practicing language skills, with the AI adapting to different proficiency 
                    levels and offering corrections in a supportive manner.
                  </p>
                </div>
                
                <div className="use-case-card">
                  <h3>Social Skills Development</h3>
                  <p>
                    For individuals working on social skills, {platform.name} offers a safe space to practice conversations 
                    and social interactions. The AI provides realistic responses while being patient and understanding, 
                    making it an excellent tool for building confidence.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Comparison with Competitors */}
            <section className="detail-section seo-comparison">
              <h2>How {platform.name} Compares to Other AI Character Platforms</h2>
              <p className="section-intro">
                With {platform.users} active users and a {platform.rating}/5 rating, {platform.name} stands among the top 
                AI character platforms. Here's how it compares to major competitors in key areas:
              </p>
              
              <div className="comparison-insights">
                <div className="comparison-point">
                  <h3>Pricing & Value</h3>
                  <p>
                    {platform.name} offers a {platform.pricing} model, making it competitive in the market. While some platforms 
                    offer completely free access with limitations, and others require expensive subscriptions, {platform.name} 
                    strikes a balance between accessibility and premium features. Users get substantial functionality at a 
                    reasonable price point, with clear upgrade paths for those seeking advanced features.
                  </p>
                </div>
                
                <div className="comparison-point">
                  <h3>Feature Set & Capabilities</h3>
                  <p>
                    Compared to competitors, {platform.name} excels in {platform.features[0]?.toLowerCase()}. While platforms 
                    like Character.AI offer vast character libraries and Replika focuses on therapeutic AI, {platform.name} 
                    differentiates itself through {platform.bestFor.toLowerCase()}. This focused approach allows for deeper 
                    development in specific areas rather than spreading resources across too many features.
                  </p>
                </div>
                
                <div className="comparison-point">
                  <h3>User Experience & Interface</h3>
                  <p>
                    The platform's interface is designed for {platform.category.toLowerCase()} interactions, with intuitive 
                    navigation and responsive design. User feedback consistently highlights the ease of use compared to more 
                    complex platforms, while still offering depth for power users. The onboarding process is streamlined, 
                    allowing new users to start conversations within minutes.
                  </p>
                </div>
                
                <div className="comparison-point">
                  <h3>Community & Support</h3>
                  <p>
                    With {platform.users} active users, {platform.name} has cultivated a vibrant community. The platform 
                    provides comprehensive support resources, including documentation, community forums, and responsive 
                    customer service. Regular updates and feature additions demonstrate the team's commitment to continuous 
                    improvement based on user feedback.
                  </p>
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