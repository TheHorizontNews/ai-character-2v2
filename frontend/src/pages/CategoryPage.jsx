import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, Crown, Heart, TrendingUp, Sparkles, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PlatformCard from '../components/PlatformCard';
import Footer from '../components/Footer';
import { aiPlatforms } from '../data/mockData';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const categoryConfig = {
    premium: {
      title: 'Premium Platforms',
      subtitle: 'High-quality AI character platforms with advanced features',
      icon: Crown,
      color: '#ffd700',
      filter: (p) => ['Premium', 'Developer'].includes(p.category),
      description: 'Discover premium AI character platforms offering cutting-edge features, superior quality, and professional-grade experiences. These platforms provide the best technology and customization options.',
      seo: [
        {
          title: 'What Makes a Premium AI Character Platform?',
          content: 'Premium AI character platforms distinguish themselves through advanced technology, superior customization options, and professional-grade features. These platforms invest heavily in cutting-edge AI models, offering more realistic conversations, better memory retention, and sophisticated personality systems. Users can expect higher quality interactions, more detailed character creation tools, and premium support services.',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
        },
        {
          title: 'Advanced Features & Customization',
          content: 'Premium platforms provide extensive customization options including voice synthesis, visual character generation, and complex personality traits. These services often include API access for developers, advanced privacy controls, and enterprise-grade security. The investment in premium platforms pays off through superior user experiences and more meaningful AI interactions.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop'
        }
      ],
      faqs: [
        { q: 'What\'s the difference between premium and free AI platforms?', a: 'Premium platforms offer advanced AI models, better memory, more customization options, priority support, and often include features like voice chat, image generation, and API access that free platforms don\'t provide.' },
        { q: 'Are premium AI character platforms worth the investment?', a: 'For users seeking high-quality interactions, advanced features, and reliable performance, premium platforms offer significant value through superior technology, better privacy, and more engaging experiences.' },
        { q: 'Can I try premium platforms before subscribing?', a: 'Most premium platforms offer free trials or limited free tiers so you can test the service before committing to a subscription.' },
        { q: 'What support do premium platforms provide?', a: 'Premium platforms typically offer priority customer support, regular updates, bug fixes, and dedicated resources for troubleshooting and feature requests.' }
      ]
    },
    romantic: {
      title: 'Romantic AI Platforms',
      subtitle: 'AI companions focused on romantic relationships and connections',
      icon: Heart,
      color: '#ff6b9d',
      filter: (p) => p.category === 'Romance',
      description: 'Explore AI platforms designed specifically for romantic relationships, virtual dating, and emotional connections. Perfect for those seeking AI companions for romance and intimacy.',
      seo: [
        {
          title: 'Virtual Romance in the Digital Age',
          content: 'Romantic AI platforms provide companionship for those seeking emotional connection without the complexities of traditional relationships. These services offer personalized romantic experiences, allowing users to explore feelings, practice communication, and enjoy virtual intimacy in a safe, judgment-free environment. Modern AI companions can engage in meaningful conversations, remember relationship milestones, and adapt to your emotional needs.',
          image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop'
        },
        {
          title: 'Safety & Emotional Wellbeing',
          content: 'These platforms prioritize user privacy and emotional safety, offering a space to explore romantic feelings without real-world complications. Users can customize their AI partner\'s appearance, personality, and communication style to create their ideal companion. The technology provides consistent emotional support while helping users develop confidence in romantic communication.',
          image: 'https://images.unsplash.com/photo-1522407183863-c0bf2256188c?w=600&h=400&fit=crop'
        }
      ],
      faqs: [
        { q: 'Are romantic AI platforms safe to use?', a: 'Yes, reputable romantic AI platforms use encryption, maintain strict privacy policies, and never share your conversations. Your interactions remain private and secure.' },
        { q: 'Can AI companions provide real emotional support?', a: 'AI companions can offer consistent emotional support, active listening, and companionship. While not replacing human relationships, they provide meaningful interaction and comfort.' },
        { q: 'How realistic are romantic AI conversations?', a: 'Modern AI platforms use advanced language models that create highly realistic, contextually appropriate responses that adapt to your communication style and preferences.' },
        { q: 'Is it healthy to have an AI romantic partner?', a: 'AI companions can supplement real-world relationships and provide emotional support, but shouldn\'t replace human connections entirely. They\'re best used as tools for companionship and practice.' }
      ]
    },
    trending: {
      title: 'Trending Platforms',
      subtitle: 'Most popular AI character platforms right now',
      icon: TrendingUp,
      color: '#1dd1a1',
      filter: (p) => parseFloat(p.rating) >= 4.5,
      description: 'The hottest AI character platforms of 2025. These trending services are gaining massive popularity for their innovative features and exceptional user experiences.',
      seo: [
        {
          title: 'Why These Platforms Are Trending',
          content: 'Trending AI platforms capture attention through innovation, user satisfaction, and viral growth. These services often introduce groundbreaking features, offer superior user experiences, or tap into emerging needs in the AI companion market. High ratings, positive reviews, and strong community engagement drive their popularity as users share their experiences across social media and review platforms.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
        },
        {
          title: 'Innovation & User Experience',
          content: 'Trending platforms stay ahead by continuously improving their AI models, adding requested features, and maintaining active communities. They balance cutting-edge technology with intuitive interfaces, making advanced AI accessible to everyone. Regular updates, responsive support, and genuine user feedback integration keep these platforms at the forefront of the AI companion industry.',
          image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&h=400&fit=crop'
        }
      ],
      faqs: [
        { q: 'What makes a platform trending?', a: 'Platforms trend due to exceptional features, high user satisfaction, positive reviews, strong community engagement, and viral word-of-mouth recommendations.' },
        { q: 'Are trending platforms better than established ones?', a: 'Not necessarily. Trending platforms are popular now, but established platforms often have more refined features and proven reliability. Both have their advantages.' },
        { q: 'How often do platform trends change?', a: 'Trends can shift monthly as new platforms emerge and existing ones update. We regularly update our trending list based on user ratings and engagement.' },
        { q: 'Should I choose a trending platform?', a: 'Trending platforms often offer fresh features and active development, but consider your specific needs, budget, and desired features when choosing any platform.' }
      ]
    },
    featured: {
      title: 'Featured Platforms',
      subtitle: 'Editor\'s choice - best AI character platforms',
      icon: Sparkles,
      color: '#667eea',
      filter: (p) => ['Premium', 'Popular', 'Wellness'].includes(p.category),
      description: 'Our handpicked selection of the best AI character platforms. These featured services excel in quality, innovation, and user satisfaction.',
      seo: [
        {
          title: 'Editor\'s Selection Criteria',
          content: 'Featured platforms earn their place through rigorous evaluation of technology quality, user experience, feature completeness, privacy protection, and community feedback. Our editorial team tests each platform extensively, evaluating conversation quality, customization depth, reliability, and value for money. Only platforms demonstrating consistent excellence across all criteria receive featured status.',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
        },
        {
          title: 'Quality Assurance & Trust',
          content: 'Featured platforms undergo continuous monitoring to ensure they maintain high standards. We verify their privacy policies, test new features, and monitor user feedback regularly. These platforms represent the gold standard in AI character creation, offering reliable services you can trust with your personal interactions and data.',
          image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop'
        }
      ],
      faqs: [
        { q: 'How are featured platforms selected?', a: 'We evaluate platforms based on AI quality, features, user experience, privacy, support, and community feedback. Only top-performing services are featured.' },
        { q: 'Do featured platforms pay for placement?', a: 'No. Featured status is earned through merit and user satisfaction. Our editorial independence ensures unbiased recommendations.' },
        { q: 'How often is the featured list updated?', a: 'We review and update featured platforms monthly, adding new contenders and removing services that no longer meet our standards.' },
        { q: 'Are featured platforms suitable for beginners?', a: 'Yes! Featured platforms are chosen partly for their user-friendly interfaces and excellent onboarding experiences, making them perfect for newcomers.' }
      ]
    },
    community: {
      title: 'Community Favorites',
      subtitle: 'User-recommended AI character platforms',
      icon: Users,
      color: '#4facfe',
      filter: (p) => p.category === 'Community' || p.users.includes('M'),
      description: 'Platforms loved by the community. These AI character services have built strong user bases through exceptional features and reliable performance.',
      seo: [
        {
          title: 'The Power of Community Choice',
          content: 'Community-favorite platforms earn their status through genuine user satisfaction and organic recommendations. These services build loyal user bases by listening to feedback, maintaining active forums, and fostering welcoming communities. High user retention, positive reviews, and strong social media presence indicate platforms that truly deliver on their promises.',
          image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop'
        },
        {
          title: 'Community-Driven Development',
          content: 'These platforms succeed by prioritizing user feedback and building features the community actually wants. Active Discord servers, Reddit communities, and user forums allow direct communication between developers and users. Regular community events, user-generated content support, and transparent development roadmaps create platforms that feel truly collaborative.',
          image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop'
        }
      ],
      faqs: [
        { q: 'What makes a platform community-favorite?', a: 'Strong user bases, positive reviews, active communities, responsive developers, and genuine user recommendations make platforms community favorites.' },
        { q: 'Are community platforms free?', a: 'Many offer free tiers or are completely free, which contributes to their large user bases, though premium features may require payment.' },
        { q: 'How do I join these communities?', a: 'Most platforms have Discord servers, Reddit communities, or official forums where users share experiences, tips, and custom characters.' },
        { q: 'Do community platforms listen to feedback?', a: 'Yes! Community-favorite platforms actively solicit and implement user feedback, making them responsive to user needs and preferences.' }
      ]
    }
  };

  const config = categoryConfig[category] || categoryConfig.featured;
  const Icon = config.icon;
  const filteredPlatforms = aiPlatforms.filter(config.filter);

  return (
    <div className="home-page">
      <Sidebar />
      
      <main className="main-content">
        <div className="category-page">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            <span>Back to home</span>
          </button>
          
          <div className="category-hero" style={{ '--category-color': config.color }}>
            <div className="category-icon-large">
              <Icon size={48} />
            </div>
            <h1 className="category-title">{config.title}</h1>
            <p className="category-subtitle">{config.subtitle}</p>
            <p className="category-description">{config.description}</p>
            
            <div className="category-stats">
              <div className="category-stat">
                <div className="stat-value">{filteredPlatforms.length}</div>
                <div className="stat-label">Platforms</div>
              </div>
              <div className="category-stat">
                <div className="stat-value">
                  {filteredPlatforms.reduce((sum, p) => sum + parseFloat(p.users.replace(/[^0-9.]/g, '')), 0).toFixed(0)}M+
                </div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="category-stat">
                <div className="stat-value">
                  {(filteredPlatforms.reduce((sum, p) => sum + p.rating, 0) / filteredPlatforms.length).toFixed(1)}
                </div>
                <div className="stat-label">Avg Rating</div>
              </div>
            </div>
          </div>
          
          <div className="category-content">
            <div className="platforms-header">
              <h2>All {config.title}</h2>
              <div className="sort-options">
                <button className="sort-btn active">Highest Rated</button>
                <button className="sort-btn">Most Popular</button>
                <button className="sort-btn">Newest</button>
              </div>
            </div>
            
            <div className="platforms-grid">
              {filteredPlatforms
                .sort((a, b) => b.rating - a.rating)
                .map((platform) => (
                  <PlatformCard key={platform.id} platform={platform} />
                ))}
            </div>
            
            {filteredPlatforms.length === 0 && (
              <div className="no-platforms">
                <Icon size={64} color="#333" />
                <h3>No platforms found</h3>
                <p>Check back soon for more platforms in this category.</p>
              </div>
            )}
          </div>
          
          {/* SEO Content Blocks */}
          {config.seo && (
            <div className="seo-blocks">
              {config.seo.map((block, index) => (
                <div key={index} className="seo-block">
                  <div className={`seo-block-content ${index % 2 === 1 ? 'reverse' : ''}`}>
                    <div className="seo-block-text">
                      <h2>{block.title}</h2>
                      <p>{block.content}</p>
                    </div>
                    <div className="seo-block-image">
                      <img src={block.image} alt={block.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* FAQ Section */}
          {config.faqs && (
            <div className="category-faq">
              <h2 className="faq-title">Frequently Asked Questions</h2>
              <div className="faq-list">
                {config.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`faq-item ${openFaq === index ? 'open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="faq-question">
                      <h3>{faq.q}</h3>
                      <ChevronDown className={`faq-icon ${openFaq === index ? 'rotated' : ''}`} />
                    </div>
                    {openFaq === index && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default CategoryPage;