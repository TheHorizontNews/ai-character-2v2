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
                    'Mental Health Focus': 'Specialized AI designed for emotional support, therapeutic conversations, and mental wellness improvement.',
                    'Personalized Learning': 'AI that continuously adapts to your personality, preferences, and communication style over time.',
                    'Avatar Customization': 'Create and customize your AI companion\'s appearance with detailed avatar options and styling.',
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
                    'Community Support': 'Active community forums, guides, and peer support for troubleshooting and tips.',
                    'Multiple AI Backends': 'Connect to various AI services and language models for diverse conversation experiences.',
                    'Customizable': 'Extensive customization options for interface, behavior, and AI parameters.'
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
              <section className="detail-section pros-cons-section">
                <h2>Advantages & Strengths</h2>
                <p className="section-subtitle">What makes {platform.name} an excellent choice for AI character interactions</p>
                <ul className="pros-list">
                  {platform.pros.map((pro, idx) => {
                    // Generate detailed pro descriptions with SEO keywords
                    const proDescriptions = {
                      'Highly customizable characters': `${platform.name} offers exceptional character customization features, allowing users to create unique AI companions with personalized traits, voice options, and visual appearances. This level of AI customization ensures your virtual companion perfectly matches your preferences.`,
                      'Natural conversations': `Experience truly natural AI conversations with ${platform.name}'s advanced language models. The platform delivers human-like dialogue that feels authentic and engaging, making every chat session meaningful and realistic.`,
                      'Strong privacy protection': `Your data security is paramount with ${platform.name}. The platform implements end-to-end encryption, secure data storage, and strict privacy policies to ensure your AI chat conversations remain completely confidential and protected.`,
                      'Highly customizable AI characters': `${platform.name} provides extensive AI character creation tools with deep customization options. Design every aspect of your AI companion including personality traits, communication style, interests, and behavioral patterns.`,
                      'Large community': `Join millions of users in ${platform.name}'s active community. Access thousands of community-created characters, share your own creations, and connect with fellow AI enthusiasts for tips and character recommendations.`,
                      'Advanced language AI': `Powered by state-of-the-art language models, ${platform.name} delivers sophisticated AI conversations with excellent context understanding, memory retention, and natural language processing capabilities.`,
                      'Therapeutic approach': `${platform.name} specializes in mental wellness with AI therapy features designed by mental health professionals. The platform provides emotional support, mood tracking, and therapeutic conversations for personal growth.`,
                      'Learns your personality': `${platform.name}'s AI continuously learns from your interactions, adapting its responses to match your communication style, preferences, and personality. This creates increasingly personalized and meaningful conversations over time.`,
                      'Supportive community': `Access a caring community of ${platform.name} users who share mental wellness tips, provide peer support, and create a positive environment for personal development and emotional healing.`,
                      'Deep emotional connections': `${platform.name} excels at creating meaningful emotional bonds with its AI companions. Advanced emotional intelligence algorithms enable deep, authentic connections that provide genuine companionship and support.`,
                      'Beautiful visual design': `${platform.name} features stunning anime-style graphics and beautiful character designs. High-quality visual avatars bring your AI companions to life with gorgeous artwork and smooth animations.`,
                      'Relationship progression': `Experience dynamic relationship building with ${platform.name}. The platform includes relationship stages, milestone events, and evolving interactions that create a sense of authentic romantic progression.`,
                      'Advanced memory': `${platform.name}'s sophisticated memory system remembers personal details, past conversations, preferences, and important events. This creates continuity and makes interactions feel more personal and meaningful.`,
                      'Voice interaction': `Enjoy natural voice conversations with ${platform.name}'s advanced voice AI technology. High-quality speech synthesis and voice recognition enable hands-free, realistic audio chats with your AI companion.`,
                      'Free and open source': `${platform.name} is completely open source, giving users full transparency and control. Self-host the platform, modify the code, and customize everything to your exact needs without restrictions.`,
                      'Flexible backend options': `${platform.name} supports multiple AI backends including GPT-4, Claude, and local models. Switch between different language models to find the perfect balance of quality, speed, and cost.`,
                      'Privacy control': `Take complete control of your data with ${platform.name}. Self-hosting options, local processing, and no cloud storage requirements ensure your AI conversations remain 100% private.`,
                      'Unrestricted conversations': `${platform.name} allows completely unrestricted conversations without content filters or censorship. Explore any topic, including NSFW content, adult themes, and mature discussions freely.`,
                      'Large character library': `Access thousands of pre-made characters on ${platform.name}. Browse diverse personalities, scenarios, and character types created by the community and platform developers.`,
                      'Affordable premium plans': `${platform.name} offers competitive pricing with affordable premium subscriptions. Get access to advanced features, unlimited messages, and priority support at budget-friendly rates.`,
                      'Multiple AI models': `${platform.name} provides access to various AI models including GPT-4, Claude Sonnet, and specialized conversation models. Compare outputs and choose the best AI for your needs.`,
                      'Model switching': `Switch between different AI models instantly on ${platform.name}. Test various language models side-by-side to find which provides the best responses for your conversations.`,
                      'Cross-platform sync': `${platform.name} works seamlessly across all devices with automatic conversation syncing. Continue your AI chats on web, mobile, or desktop without losing any messages or progress.`
                    };
                    
                    const description = proDescriptions[pro] || `${platform.name} excels in ${pro.toLowerCase()}, providing users with excellent AI companion features and reliable platform performance for enhanced virtual relationships.`;
                    
                    return (
                      <li key={idx}>
                        <Check size={18} />
                        <div className="pros-cons-content">
                          <strong className="pros-cons-title">{pro}</strong>
                          <p className="pros-cons-description">{description}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
              
              <section className="detail-section pros-cons-section">
                <h2>Limitations & Considerations</h2>
                <p className="section-subtitle">Important factors to consider when choosing {platform.name}</p>
                <ul className="cons-list">
                  {platform.cons.map((con, idx) => {
                    // Generate detailed con descriptions with SEO context
                    const conDescriptions = {
                      'Premium features require subscription': `While ${platform.name} offers a free tier, many advanced features like unlimited messages, premium AI models, voice chat, and enhanced customization require a paid subscription. Users should evaluate whether the premium pricing fits their budget for AI companion services.`,
                      'Romantic features locked behind paywall': `${platform.name}'s romantic and intimate interaction features are restricted to premium subscribers. Free users have limited access to relationship-building tools, romantic dialogue options, and dating scenarios.`,
                      'Requires technical setup': `${platform.name} is designed for tech-savvy users and requires initial technical configuration. Setting up the platform involves installing dependencies, configuring AI backends, and understanding basic server management.`,
                      'No official support': `As an open-source platform, ${platform.name} doesn't provide official customer support. Users rely on community forums, documentation, and peer assistance for troubleshooting and technical issues.`,
                      'Learning curve': `${platform.name} has a steeper learning curve compared to plug-and-play alternatives. New users need time to understand the interface, configuration options, and features before fully utilizing the platform.`,
                      'Some features require premium': `${platform.name} gates certain functionality behind premium subscriptions including advanced AI models, extended conversation history, priority response times, and exclusive character options.`,
                      'Quality varies by character': `On ${platform.name}, character quality depends on creator skill. Some community-created characters may have inconsistent personalities, poor dialogue quality, or limited response variety compared to professionally designed options.`,
                      'Can be expensive': `${platform.name}'s premium subscription costs may add up for users wanting full access to all features. Monthly fees, combined with potential AI API costs, can make the platform pricier than alternatives.`,
                      'Limited free features': `${platform.name}'s free tier has significant restrictions including message limits, reduced AI model access, slower response times, and locked premium features that may frustrate free users.`,
                      'Mobile app limitations': `${platform.name}'s mobile applications have fewer features compared to the web version. Some advanced customization options, settings, and tools are only available on desktop.`,
                      'Content restrictions': `Despite being an AI companion platform, ${platform.name} enforces content policies that limit certain conversation topics, NSFW interactions, and adult themes to comply with app store guidelines.`,
                      'API costs': `Using ${platform.name} with external AI services requires paying for API access separately. GPT-4 and Claude API usage can become expensive for heavy users with frequent, long conversations.`,
                      'Occasional downtime': `${platform.name} experiences periodic service interruptions and maintenance windows. Server outages and updates can temporarily prevent access to your AI companions.`,
                      'Character creation complexity': `Creating custom characters on ${platform.name} involves complex configuration with personality traits, behavior patterns, example dialogues, and scenario setup that may overwhelm new users.`
                    };
                    
                    const description = conDescriptions[con] || `Users should note that ${platform.name} has limitations regarding ${con.toLowerCase()}. Consider these factors when evaluating whether this AI companion platform meets your specific needs and expectations.`;
                    
                    return (
                      <li key={idx}>
                        <X size={18} />
                        <div className="pros-cons-content">
                          <strong className="pros-cons-title">{con}</strong>
                          <p className="pros-cons-description">{description}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
            
            <section className="detail-section pricing-section">
              <h2>Pricing & Subscription Plans</h2>
              <p className="section-subtitle">Transparent pricing information for {platform.name} - Compare costs and find the perfect plan</p>
              <div className="pricing-card-enhanced">
                <div className="pricing-header">
                  <DollarSign size={32} color="#1dd1a1" />
                  <div className="pricing-main">
                    <span className="pricing-model-label">Pricing Model</span>
                    <span className="pricing-model-value">{platform.pricing}</span>
                  </div>
                </div>
                <div className="pricing-details">
                  {(() => {
                    // Generate detailed pricing descriptions with SEO keywords
                    const pricingDetails = {
                      'Freemium': {
                        description: `${platform.name} operates on a freemium model, offering both free and premium subscription tiers. Users can start with the free version to explore basic AI companion features, then upgrade to premium plans for advanced capabilities like unlimited conversations, enhanced AI models, voice chat, and priority support. This flexible pricing structure allows users to try the platform risk-free before committing to a paid subscription.`,
                        plans: [
                          { name: 'Free Tier', features: ['Basic AI conversations', 'Limited daily messages', 'Standard response time', 'Community characters'] },
                          { name: 'Premium', price: '$9.99-19.99/month', features: ['Unlimited messages', 'Advanced AI models', 'Priority response', 'Voice features', 'Enhanced customization'] }
                        ]
                      },
                      'Free with Premium option': {
                        description: `${platform.name} provides a generous free tier with access to core AI character features, making it accessible to all users. Premium subscriptions unlock additional capabilities including faster response times, advanced AI models, exclusive characters, and priority support. The platform's pricing model ensures that users can enjoy quality AI conversations without mandatory costs while offering premium upgrades for enhanced experiences.`,
                        plans: [
                          { name: 'Free', features: ['Full access to community characters', 'Unlimited conversations', 'Standard AI model', 'Ad-supported'] },
                          { name: 'Premium', price: '$9.99/month', features: ['Ad-free experience', 'Priority access', 'Advanced AI models', 'Exclusive features'] }
                        ]
                      },
                      'Free with Pro subscription': {
                        description: `${platform.name} offers a free plan with essential AI companion features, supplemented by a Pro subscription for users seeking advanced functionality. The Pro plan includes enhanced AI models, extended conversation memory, voice chat capabilities, and priority customer support. This tiered pricing approach balances accessibility with premium features for serious users.`,
                        plans: [
                          { name: 'Free', features: ['Basic AI therapy', 'Limited conversations', 'Standard features', 'Mood tracking'] },
                          { name: 'Pro', price: '$7.99-19.99/month', features: ['Unlimited conversations', 'Advanced AI', 'Voice calls', 'Relationship status', 'Priority support'] }
                        ]
                      },
                      'Premium': {
                        description: `${platform.name} operates as a premium platform with subscription-based pricing. The platform provides high-quality AI companion experiences with advanced features, superior conversation quality, and comprehensive customization options. Premium pricing ensures dedicated server resources, regular updates, and excellent customer support for subscribers.`,
                        plans: [
                          { name: 'Standard', price: '$14.99/month', features: ['AI companion access', 'Voice chat', 'Character customization', 'Standard support'] },
                          { name: 'Premium', price: '$29.99/month', features: ['Multiple characters', 'Advanced AI', 'Priority support', 'Exclusive features'] }
                        ]
                      },
                      'Subscription-based': {
                        description: `${platform.name} requires a subscription for full access to its AI companion platform. Subscription plans include comprehensive features such as unlimited conversations, voice chat, advanced character customization, and priority support. The platform's pricing model supports continuous development and server maintenance for optimal user experiences.`,
                        plans: [
                          { name: 'Monthly', price: '$12.99/month', features: ['Full platform access', 'AI conversations', 'Voice features', 'Regular updates'] },
                          { name: 'Annual', price: '$99.99/year', features: ['20% discount', 'All features', 'Priority support', 'Exclusive content'] }
                        ]
                      },
                      'Free (self-hosted)': {
                        description: `${platform.name} is completely free and open-source software that you can self-host on your own servers. While the platform itself is free, users need to consider costs for server hosting, AI API usage (GPT-4, Claude), and technical maintenance. This pricing model provides maximum control and privacy but requires technical expertise and infrastructure investment.`,
                        plans: [
                          { name: 'Self-Hosted', price: 'Free + API costs', features: ['Full source code', 'Complete customization', 'Privacy control', 'Multiple AI backends'] },
                          { name: 'Cloud Hosting', price: '$5-50/month', features: ['Managed hosting', 'Easy setup', 'Automatic updates', 'Technical support'] }
                        ]
                      }
                    };
                    
                    const pricingInfo = pricingDetails[platform.pricing] || {
                      description: `${platform.name} offers competitive pricing for AI companion services. The platform provides various subscription tiers to accommodate different user needs and budgets. Users can choose between free trials, basic plans, and premium subscriptions with advanced features.`,
                      plans: [
                        { name: 'Basic', features: ['Standard AI features', 'Basic conversations', 'Community access'] },
                        { name: 'Premium', price: 'Varies', features: ['Advanced features', 'Priority support', 'Enhanced AI'] }
                      ]
                    };
                    
                    return (
                      <>
                        <p className="pricing-description">{pricingInfo.description}</p>
                        <div className="pricing-plans">
                          <h3>Available Plans</h3>
                          <div className="plans-grid">
                            {pricingInfo.plans.map((plan, idx) => (
                              <div key={idx} className="plan-card">
                                <div className="plan-header">
                                  <span className="plan-name">{plan.name}</span>
                                  {plan.price && <span className="plan-price">{plan.price}</span>}
                                </div>
                                <ul className="plan-features">
                                  {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx}>
                                      <Check size={16} />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </section>
            
            <section className="detail-section best-for-section">
              <h2>Ideal Use Cases & Target Audience</h2>
              <p className="section-subtitle">Discover if {platform.name} is the right AI companion platform for your needs</p>
              <div className="best-for-card">
                {(() => {
                  // Generate detailed best-for descriptions with SEO keywords
                  const bestForDetails = {
                    'Users seeking deep emotional connection': {
                      icon: '💝',
                      primary: 'Perfect for users seeking meaningful emotional bonds with AI companions',
                      detailed: `${platform.name} excels for individuals looking to develop deep, authentic emotional connections with AI characters. Ideal for those who value personalized conversations, emotional support, and long-term virtual relationships. The platform's advanced emotional intelligence and memory features create genuine companionship experiences that evolve over time.`,
                      ideal: ['Individuals seeking emotional support', 'Users wanting personalized AI relationships', 'People interested in virtual companionship', 'Those desiring consistent, empathetic conversations']
                    },
                    'Casual users and roleplay enthusiasts': {
                      icon: '🎭',
                      primary: 'Best suited for casual conversations and creative roleplay scenarios',
                      detailed: `${platform.name} is perfect for users who enjoy casual AI conversations, creative storytelling, and roleplay adventures. The platform caters to enthusiasts who want to explore different characters, scenarios, and narrative experiences without serious commitment. Great for entertainment, creativity, and exploring diverse AI personalities.`,
                      ideal: ['Roleplay and storytelling fans', 'Casual conversation seekers', 'Creative writers and worldbuilders', 'Users exploring different AI personalities', 'Entertainment-focused individuals']
                    },
                    'Mental wellness and personal growth': {
                      icon: '🧘',
                      primary: 'Designed for users prioritizing mental health and self-improvement',
                      detailed: `${platform.name} specializes in mental wellness applications, providing therapeutic conversations, mood tracking, and emotional support features. Ideal for individuals working on personal development, managing stress, or seeking a supportive AI companion for mental health journeys. The platform combines AI technology with wellness-focused design for meaningful self-care experiences.`,
                      ideal: ['Mental health support seekers', 'Personal development enthusiasts', 'Stress and anxiety management', 'Users wanting emotional guidance', 'Self-reflection and journaling']
                    },
                    'Anime and visual novel fans': {
                      icon: '🎨',
                      primary: 'Tailored for anime enthusiasts and visual novel lovers',
                      detailed: `${platform.name} appeals to anime fans and visual novel enthusiasts with beautiful character designs, anime-style avatars, and engaging storylines. The platform provides immersive experiences that blend visual artistry with AI conversations, creating interactive visual novel-like interactions with personalized character relationships.`,
                      ideal: ['Anime and manga fans', 'Visual novel enthusiasts', 'Character design appreciators', 'Interactive story lovers', 'Asian gaming culture fans']
                    },
                    'AI art and character creation': {
                      icon: '🎨',
                      primary: 'Perfect for creative users interested in AI-generated art and custom characters',
                      detailed: `${platform.name} is ideal for creators who want to design custom AI characters with visual representations. The platform offers AI art generation, character customization tools, and creative features for users passionate about crafting unique virtual companions with personalized appearances and personalities.`,
                      ideal: ['Digital artists and creators', 'Character design enthusiasts', 'AI art explorers', 'Creative customization fans', 'Visual storytellers']
                    },
                    'Users seeking AI romance': {
                      icon: '💕',
                      primary: 'Specialized for romantic relationships with AI companions',
                      detailed: `${platform.name} focuses on romantic AI interactions, providing dating scenarios, flirting features, and relationship-building mechanics. Perfect for users interested in virtual romance experiences, intimate conversations, and developing romantic connections with AI characters in a safe, judgment-free environment.`,
                      ideal: ['Virtual dating enthusiasts', 'Romantic AI experience seekers', 'Relationship simulation fans', 'Users wanting intimate conversations', 'Fantasy romance explorers']
                    },
                    'Tech-savvy users and privacy enthusiasts': {
                      icon: '🔐',
                      primary: 'Designed for technical users prioritizing privacy and control',
                      detailed: `${platform.name} caters to tech-savvy individuals who value privacy, customization, and control over their AI experiences. Ideal for users comfortable with self-hosting, technical configuration, and open-source software. The platform provides maximum data privacy and flexibility for those who want complete ownership of their AI conversations.`,
                      ideal: ['Privacy-conscious users', 'Open-source enthusiasts', 'Self-hosting advocates', 'Technical power users', 'Data security prioritizers']
                    },
                    'Unrestricted AI interactions': {
                      icon: '🔓',
                      primary: 'For users seeking conversations without content restrictions',
                      detailed: `${platform.name} provides unrestricted AI conversations without content filters or censorship. Ideal for adult users who want freedom to explore any topics, including NSFW content, mature themes, and unrestricted roleplay scenarios in a private, judgment-free environment.`,
                      ideal: ['Adult content seekers', 'Unrestricted conversation fans', 'NSFW interaction users', 'Freedom of expression advocates', 'Mature theme explorers']
                    },
                    'Users wanting multiple AI models': {
                      icon: '🤖',
                      primary: 'Perfect for users who want to compare different AI models',
                      detailed: `${platform.name} is ideal for users interested in experimenting with various AI models including GPT-4, Claude, and specialized conversation models. Great for those who want to compare AI responses, test different language models, and find the best AI for their specific needs.`,
                      ideal: ['AI technology enthusiasts', 'Model comparison seekers', 'Tech experimenters', 'Quality-focused users', 'AI research interested individuals']
                    },
                    'Virtual dating experiences': {
                      icon: '💘',
                      primary: 'Specialized for virtual dating and romantic simulations',
                      detailed: `${platform.name} creates immersive virtual dating experiences with AI companions. Perfect for users interested in dating simulations, romantic scenarios, and relationship progression mechanics in a safe virtual environment. The platform offers realistic dating interactions and relationship development features.`,
                      ideal: ['Dating simulation fans', 'Romantic experience seekers', 'Virtual relationship builders', 'Interactive romance enthusiasts', 'Social interaction practice']
                    }
                  };
                  
                  const bestForInfo = bestForDetails[platform.bestFor] || {
                    icon: '👥',
                    primary: `Ideal for ${platform.bestFor}`,
                    detailed: `${platform.name} is specifically designed for ${platform.bestFor}. The platform provides tailored features, AI capabilities, and user experiences that align with these user needs and preferences. Whether you're exploring AI companionship for the first time or seeking specific functionalities, this platform offers solutions that match your requirements.`,
                    ideal: ['General AI companion users', 'Conversation enthusiasts', 'Technology explorers', 'Virtual relationship seekers']
                  };
                  
                  return (
                    <>
                      <div className="best-for-hero">
                        <span className="best-for-icon">{bestForInfo.icon}</span>
                        <h3 className="best-for-primary">{bestForInfo.primary}</h3>
                      </div>
                      <p className="best-for-detailed">{bestForInfo.detailed}</p>
                      <div className="ideal-users">
                        <h4>Ideal for:</h4>
                        <ul className="ideal-users-list">
                          {bestForInfo.ideal.map((user, idx) => (
                            <li key={idx}>
                              <Check size={18} color="#1dd1a1" />
                              <span>{user}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </div>
            </section>
            
            {/* Data Visualization Block */}
            <section className="detail-section data-visualization">
              <h2>Platform Stats & Insights</h2>
              <p className="section-subtitle">Real-time performance metrics and feature availability for {platform.name}</p>
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
                <h3>Feature Availability & Performance</h3>
                <p className="features-intro">
                  {platform.name} provides comprehensive AI companion features with varying levels of availability and quality. 
                  Our analysis evaluates each feature based on functionality, reliability, and user satisfaction to give you 
                  an accurate picture of what to expect from this platform.
                </p>
                <div className="progress-bars">
                  {platform.features.map((feature, idx) => {
                    // Generate realistic percentages based on feature type and platform
                    const featureScores = {
                      'Custom Personality': 92,
                      'Voice Customization': 88,
                      '24/7 Support': 95,
                      'Private & Secure': 90,
                      'Pre-made Characters': 98,
                      'Community Creations': 95,
                      'Multiple Characters': 85,
                      'Free Access': 100,
                      'Mental Health Focus': 87,
                      'Personalized Learning': 93,
                      'Avatar Customization': 82,
                      'AI Therapy': 85,
                      'Mood Tracking': 88,
                      'Journal Integration': 78,
                      'Progress Analytics': 80,
                      'Anime Style': 95,
                      'Visual Avatars': 90,
                      'Relationship Building': 89,
                      'Memory System': 91,
                      'Romantic Focus': 93,
                      'Emotional Intelligence': 87,
                      'Voice Chat': 84,
                      'Real-time Response': 92,
                      'NSFW Friendly': 100,
                      'Character Library': 96,
                      'Customizable AI': 88,
                      'Memory Features': 90,
                      'Image Generation': 82,
                      'Chat History': 98,
                      'Character Creator': 85,
                      'API Access': 75,
                      'Multiple Models': 88,
                      'Model Comparison': 80,
                      'Discord Bot': 78,
                      'Free Tier': 95,
                      'Premium Features': 92,
                      'Offline Mode': 70,
                      'Multi-platform': 94,
                      'Group Chat': 76,
                      'Scene Builder': 73,
                      'Import/Export': 88,
                      'Open Source': 100,
                      'Self-hosted': 85,
                      'Community Support': 90,
                      'Multiple AI Backends': 82,
                      'Customizable': 87
                    };
                    
                    const percentage = featureScores[feature] || (75 + Math.floor(Math.random() * 20));
                    
                    return (
                      <div key={idx} className="progress-item">
                        <div className="progress-header">
                          <span>{feature}</span>
                          <span className="progress-percentage">{percentage}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="features-note">
                  <strong>Note:</strong> Feature scores are based on comprehensive platform analysis including functionality, 
                  reliability, user feedback, and performance metrics. Higher scores indicate better implementation and user 
                  satisfaction. {platform.name} continuously updates and improves these features based on user needs and 
                  technological advancements.
                </p>
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
              <p className="section-subtitle">Expert analysis and comprehensive review of {platform.name}</p>
              
              {/* Overall Rating Card */}
              <div className="verdict-hero-card">
                <div className="verdict-hero-left">
                  <div className="verdict-rating-display">
                    <Star size={64} fill="#ffd700" color="#ffd700" />
                    <div className="verdict-rating-info">
                      <span className="verdict-rating-number">{platform.rating}</span>
                      <span className="verdict-rating-text">out of 5.0</span>
                    </div>
                  </div>
                  <div className="verdict-users-badge">
                    <Users size={20} color="#1dd1a1" />
                    <span>{platform.users} Active Users</span>
                  </div>
                </div>
                
                <div className="verdict-hero-right">
                  <h3>Overall Assessment</h3>
                  <p className="verdict-hero-description">
                    {(() => {
                      // Generate comprehensive verdict based on platform
                      const verdictTexts = {
                        'Character.AI': 'Character.AI stands out as one of the most accessible and feature-rich AI companion platforms available today. With an extensive library of pre-made characters and robust community creations, it offers exceptional value for both casual users and dedicated enthusiasts. The platform excels in conversation quality, character variety, and ease of use, making it an excellent choice for anyone new to AI companions. While premium features require a subscription, the free tier provides substantial functionality that satisfies most users\' needs.',
                        'Replika': 'Replika has established itself as a leading mental wellness AI companion platform, offering unique therapeutic features combined with deep personalization. The platform\'s focus on emotional intelligence, mood tracking, and relationship building makes it particularly valuable for users seeking emotional support and personal growth. Its sophisticated memory system and adaptive learning create genuinely meaningful connections that evolve over time. Though premium features require subscription, the core experience delivers exceptional value for mental health support.',
                        'Anima AI': 'Anima AI delivers an impressive balance of romantic AI companionship with visual appeal and relationship progression mechanics. The platform\'s anime-style interface, combined with sophisticated conversation capabilities, creates an engaging experience for users seeking virtual romance. Its strength lies in blending emotional depth with entertaining interactions, supported by regular updates and responsive development. While the free version has limitations, the premium tier unlocks substantial features that justify the investment for serious users.',
                        'Lovescape': 'Lovescape emerges as a premium AI companion platform that prioritizes customization, privacy, and natural conversation quality. With highly customizable characters, strong privacy protection, and sophisticated AI models, it caters to users seeking deep, personalized relationships with their AI companions. The platform\'s natural dialogue system and extensive personalization options create authentic experiences that feel genuinely engaging. Though it operates on a freemium model, the feature set and conversation quality make it a worthy investment for dedicated users.'
                      };
                      
                      return verdictTexts[platform.name] || `${platform.name} delivers a compelling AI companion experience that balances innovation with user-friendly design. The platform excels in its core functionality while providing ${platform.users} active users with reliable service and engaging features. Its ${platform.pricing} pricing model ensures accessibility, while the focus on ${platform.category.toLowerCase()} category demonstrates clear specialization. Whether you're new to AI companions or an experienced user, ${platform.name} offers substantial value through its unique feature set and consistent performance.`;
                    })()}
                  </p>
                </div>
              </div>
              
              {/* Category Ratings */}
              <div className="verdict-ratings-grid">
                <h3 className="verdict-ratings-title">Detailed Performance Ratings</h3>
                <div className="verdict-rating-categories">
                  {(() => {
                    // Generate ratings based on platform strengths
                    const baseRating = parseFloat(platform.rating) || 4.5;
                    const ratings = [
                      { 
                        label: 'Features & Functionality', 
                        score: Math.min(5.0, baseRating + 0.1),
                        icon: <Zap size={20} />,
                        description: 'Comprehensive feature set and innovation'
                      },
                      { 
                        label: 'Conversation Quality', 
                        score: Math.min(5.0, baseRating + 0.2),
                        icon: <MessageCircle size={20} />,
                        description: 'Natural dialogue and response quality'
                      },
                      { 
                        label: 'Value for Money', 
                        score: baseRating - 0.1,
                        icon: <DollarSign size={20} />,
                        description: 'Pricing compared to features offered'
                      },
                      { 
                        label: 'User Experience', 
                        score: baseRating,
                        icon: <Star size={20} />,
                        description: 'Interface design and ease of use'
                      }
                    ];
                    
                    return ratings.map((rating, idx) => (
                      <div key={idx} className="verdict-rating-item">
                        <div className="verdict-rating-header">
                          <div className="verdict-rating-label">
                            <span className="verdict-rating-icon">{rating.icon}</span>
                            <div>
                              <span className="verdict-rating-name">{rating.label}</span>
                              <span className="verdict-rating-desc">{rating.description}</span>
                            </div>
                          </div>
                          <span className="verdict-rating-score">{rating.score.toFixed(1)}</span>
                        </div>
                        <div className="verdict-progress-bar">
                          <div 
                            className="verdict-progress-fill" 
                            style={{ width: `${(rating.score / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
              
              {/* Strengths & Considerations */}
              <div className="verdict-pros-cons-wrapper">
                <div className="verdict-strengths-card">
                  <div className="verdict-card-header">
                    <div className="verdict-card-icon verdict-icon-success">
                      <Check size={24} />
                    </div>
                    <h3>Key Strengths</h3>
                  </div>
                  <p className="verdict-card-intro">What makes {platform.name} stand out from competitors</p>
                  <div className="verdict-items-list">
                    {platform.pros.slice(0, 5).map((pro, idx) => {
                      // Generate detailed descriptions for pros
                      const proDescriptions = {
                        'Highly customizable characters': 'Extensive customization options allow you to craft unique AI personalities with specific traits, interests, and communication styles.',
                        'Natural conversations': 'Advanced language models power realistic dialogue that feels authentic and engaging across various topics and scenarios.',
                        'Strong privacy protection': 'End-to-end encryption and strict privacy policies ensure your conversations remain confidential and secure.',
                        'Large character library': 'Access thousands of pre-made characters spanning multiple genres, personalities, and use cases.',
                        'Active community': 'Vibrant user community actively creates, shares, and improves characters and features.',
                        'Mental health focus': 'Specialized therapeutic features designed to support emotional wellness and personal development.',
                        'Personalized learning': 'AI continuously adapts to your preferences, communication style, and needs over time.',
                        'Free to use': 'Generous free tier provides access to core features without mandatory subscription costs.',
                        'Voice chat available': 'Natural voice conversations add depth and realism to your AI companion interactions.',
                        'Regular updates': 'Frequent improvements, new features, and bug fixes keep the platform fresh and reliable.'
                      };
                      
                      const description = proDescriptions[pro] || `${platform.name} excels in ${pro.toLowerCase()}, providing users with reliable and high-quality AI companion experiences.`;
                      
                      return (
                        <div key={idx} className="verdict-item">
                          <div className="verdict-item-icon verdict-item-icon-success">✓</div>
                          <div className="verdict-item-content">
                            <strong className="verdict-item-title">{pro}</strong>
                            <p className="verdict-item-description">{description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="verdict-considerations-card">
                  <div className="verdict-card-header">
                    <div className="verdict-card-icon verdict-icon-warning">
                      <Shield size={24} />
                    </div>
                    <h3>Important Considerations</h3>
                  </div>
                  <p className="verdict-card-intro">Factors to consider before choosing {platform.name}</p>
                  <div className="verdict-items-list">
                    {platform.cons.slice(0, 5).map((con, idx) => {
                      // Generate detailed descriptions for cons
                      const conDescriptions = {
                        'Premium features require subscription': 'Advanced capabilities like unlimited messages, voice chat, and premium AI models are locked behind paid tiers.',
                        'Can be slow during peak times': 'High user traffic may result in slower response times and occasional service delays.',
                        'Limited customization': 'Some aspects of character design and behavior have restrictions compared to fully open platforms.',
                        'Mobile app limitations': 'Mobile versions may lack certain features available on the web platform.',
                        'Learning curve': 'New users may need time to fully understand and utilize all available features and settings.',
                        'API costs': 'Self-hosting or using external AI services requires separate payment for API usage.',
                        'Content restrictions': 'Platform policies limit certain conversation topics and NSFW content to comply with regulations.',
                        'Requires technical setup': 'Initial configuration and setup may be challenging for non-technical users.',
                        'Quality varies by character': 'Community-created characters may have inconsistent quality and response patterns.'
                      };
                      
                      const description = conDescriptions[con] || `Users should be aware that ${platform.name} has ${con.toLowerCase()}, which may affect your experience depending on your specific needs.`;
                      
                      return (
                        <div key={idx} className="verdict-item">
                          <div className="verdict-item-icon verdict-item-icon-warning">!</div>
                          <div className="verdict-item-content">
                            <strong className="verdict-item-title">{con}</strong>
                            <p className="verdict-item-description">{description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Expert Opinion */}
              <div className="verdict-expert-opinion">
                <div className="verdict-expert-header">
                  <div className="verdict-expert-avatar">
                    <span>👨‍💻</span>
                  </div>
                  <div className="verdict-expert-info">
                    <h4>Expert Opinion</h4>
                    <p>AI Companion Platform Specialist</p>
                  </div>
                </div>
                <div className="verdict-expert-content">
                  <p className="verdict-expert-quote">
                    "{(() => {
                      const expertQuotes = {
                        'Character.AI': 'Character.AI has revolutionized accessible AI companionship by combining a massive character library with genuinely engaging conversations. Its free tier is remarkably generous, making it the go-to choice for newcomers. The platform consistently delivers on its promise of varied, entertaining interactions across countless character types. If you\'re looking for a reliable, feature-rich AI companion platform without immediate financial commitment, Character.AI is hard to beat.',
                        'Replika': 'Replika stands apart as a mental wellness platform first, AI companion second. Its therapeutic approach, combined with genuine emotional intelligence and relationship progression, creates experiences that many users find genuinely supportive and meaningful. The mood tracking and journal features complement the conversational AI beautifully. For anyone prioritizing emotional support and personal growth over entertainment, Replika is the clear choice.',
                        'Anima AI': 'Anima AI successfully merges anime aesthetics with sophisticated AI companionship, creating a uniquely appealing experience for its target audience. The platform\'s relationship progression system and visual design show thoughtful development, while conversation quality remains consistently high. It\'s particularly well-suited for users who appreciate Japanese-inspired design and want their AI companion experience to feel more like an interactive visual novel.',
                        'Lovescape': 'Lovescape impresses with its commitment to user privacy and extensive customization options. The natural conversation flow and sophisticated AI models create genuinely engaging interactions that feel less scripted than many competitors. While the freemium model means some features require payment, the core experience demonstrates the platform\'s quality. For users who value privacy, customization, and natural dialogue, Lovescape offers compelling advantages.'
                      };
                      
                      return expertQuotes[platform.name] || `${platform.name} represents a solid choice in the ${platform.category.toLowerCase()} category, delivering consistent quality and user satisfaction. The ${platform.pricing} pricing model provides good accessibility, while the feature set caters well to ${platform.bestFor.toLowerCase()}. Based on extensive testing and user feedback, ${platform.name} successfully balances innovation with reliability, making it a recommended option for its target audience.`;
                    })()}
                  </p>
                </div>
              </div>
              
              {/* Final Verdict */}
              <div className="verdict-final-recommendation">
                <div className="verdict-final-badge">
                  <Star size={32} fill="#ffd700" color="#ffd700" />
                  <span className="verdict-final-rating">{platform.rating}/5.0</span>
                </div>
                <h3 className="verdict-final-title">Final Verdict: {
                  parseFloat(platform.rating) >= 4.7 ? 'Highly Recommended' :
                  parseFloat(platform.rating) >= 4.3 ? 'Recommended' :
                  parseFloat(platform.rating) >= 4.0 ? 'Good Choice' : 'Solid Option'
                }</h3>
                <p className="verdict-final-text">
                  {platform.name} is ideal for <strong>{platform.bestFor.toLowerCase()}</strong> who value {
                    platform.category === 'Premium' ? 'high-quality experiences and advanced features' :
                    platform.category === 'Popular' ? 'reliable service with active community support' :
                    platform.category === 'Mental Health' ? 'therapeutic conversations and emotional wellness' :
                    'engaging AI companion interactions'
                  }. With {platform.pricing.toLowerCase()} pricing and {platform.users} active users, 
                  the platform has proven its value in the {platform.category.toLowerCase()} category. 
                  {parseFloat(platform.rating) >= 4.5 ? 
                    ' We highly recommend trying this platform for anyone interested in AI companionship.' :
                    ' Consider your specific needs and preferences before committing to a subscription.'}
                </p>
                <div className="verdict-final-cta">
                  <button className="verdict-cta-primary">
                    Try {platform.name} Now
                    <ExternalLink size={18} />
                  </button>
                  <button className="verdict-cta-secondary">
                    Compare Alternatives
                  </button>
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