import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PlatformCard from '../components/PlatformCard';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { seoPages } from '../data/seoPages';
import { getClusterPages, getRandomAnchor } from '../data/seoPageClusters';
import { aiPlatforms } from '../data/mockData';
import { SITE_DOMAIN } from '../data/metaTags';
import '../styles/SEOPage.css';

const SEOPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fullSlug = params['*'] || params.slug;
  const pageData = seoPages.find(p => p.slug === fullSlug);
  
  // Enhanced internal linking with cluster-based anchors
  const addInternalLinks = (text, currentSlug) => {
    // Get cluster pages for smart interlinking
    const clusterData = getClusterPages(currentSlug);
    
    if (!clusterData) return text;
    
    const { pages: clusterPages, anchorVariations } = clusterData;
    const usedAnchors = [];
    let linkedText = text;
    let linksAdded = 0;
    const maxLinksPerParagraph = 4; // Increased from 3 to 4 for better coverage
    
    // Shuffle cluster pages for variety
    const shuffledPages = [...clusterPages].sort(() => Math.random() - 0.5);
    
    // Add links with diverse anchors
    shuffledPages.slice(0, maxLinksPerParagraph).forEach(pageSlug => {
      if (linksAdded >= maxLinksPerParagraph) return;
      
      // Get multiple anchor variations for this page
      const anchors = anchorVariations[pageSlug] || [];
      
      // Try each anchor variation until one matches
      for (let i = 0; i < anchors.length && linksAdded < maxLinksPerParagraph; i++) {
        const anchor = anchors[i];
        const anchorLower = anchor.toLowerCase();
        
        // Skip if already used
        if (usedAnchors.includes(anchorLower)) continue;
        
        // Create regex that matches the anchor text (case insensitive)
        const anchorRegex = new RegExp(`\\b${anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        
        // Check if text contains this anchor and it's not already linked
        if (anchorRegex.test(linkedText) && !linkedText.includes(`/character-review/${pageSlug}`)) {
          linkedText = linkedText.replace(anchorRegex, (match) => {
            usedAnchors.push(anchorLower);
            linksAdded++;
            return `<a href="/character-review/${pageSlug}" class="internal-link" title="${match}">${match}</a>`;
          });
          break; // Move to next page after successful link
        }
      }
    });
    
    return linkedText;
  };

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
          <SEOHead 
            title={`${pageData.title} - Complete Guide & Best Platforms 2025`}
            description={`${pageData.description} Discover the best ${pageData.title.toLowerCase()} platforms with expert reviews, comparisons, and user guides.`}
            keywords={[...pageData.keywords, pageData.category.toLowerCase(), 'review', 'comparison', 'guide', '2025']}
            ogImage={(() => {
              const title = pageData.title.toLowerCase();
              if (title.includes('girlfriend')) {
                return 'https://images.pexels.com/photos/10769510/pexels-photo-10769510.jpeg?auto=compress&cs=tinysrgb&w=1200';
              } else if (title.includes('boyfriend')) {
                return 'https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=1200';
              } else if (title.includes('chatbot') || title.includes('chat')) {
                return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80';
              } else if (title.includes('character')) {
                return 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=1200&q=80';
              } else {
                return 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200';
              }
            })()}
            canonical={`https://ai-characters.org/character-review/${pageData.slug}`}
            ogType="article"
            schemaData={{
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Article",
                  "@id": `https://ai-characters.org/character-review/${pageData.slug}#article`,
                  "headline": `${pageData.title} - Complete Guide & Best Platforms 2025`,
                  "description": `${pageData.description} Discover the best ${pageData.title.toLowerCase()} platforms with expert reviews, comparisons, and user guides.`,
                  "image": {
                    "@type": "ImageObject",
                    "url": (() => {
                      const title = pageData.title.toLowerCase();
                      if (title.includes('girlfriend')) {
                        return 'https://images.pexels.com/photos/10769510/pexels-photo-10769510.jpeg?auto=compress&cs=tinysrgb&w=1200';
                      } else if (title.includes('boyfriend')) {
                        return 'https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=1200';
                      } else if (title.includes('chatbot') || title.includes('chat')) {
                        return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80';
                      } else if (title.includes('character')) {
                        return 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=1200&q=80';
                      } else {
                        return 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200';
                      }
                    })(),
                    "width": 1200,
                    "height": 630
                  },
                  "author": {
                    "@type": "Organization",
                    "name": "AI Characters",
                    "url": "https://ai-characters.org/"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "AI Characters",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://ai-characters.org/favicon.svg"
                    }
                  },
                  "datePublished": "2025-01-01",
                  "dateModified": new Date().toISOString().split('T')[0],
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://ai-characters.org/character-review/${pageData.slug}`
                  },
                  "keywords": pageData.keywords.join(', '),
                  "articleSection": pageData.category,
                  "about": {
                    "@type": "Thing",
                    "name": pageData.title
                  }
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://ai-characters.org/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Character Reviews",
                      "item": "https://ai-characters.org/explore"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": pageData.title,
                      "item": `https://ai-characters.org/character-review/${pageData.slug}`
                    }
                  ]
                }
              ]
            }}
          />
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
                <div className="content-features-accordion">
                  <div className="accordion-item">
                    <div className="accordion-header" onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('.accordion-toggle');
                      if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        icon.style.transform = 'rotate(0deg)';
                      } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                      }
                    }}>
                      <div className="feature-item">
                        <div className="feature-icon">🚀</div>
                        <span>Advanced AI Technology</span>
                      </div>
                      <div className="accordion-toggle">▼</div>
                    </div>
                    <div className="accordion-content">
                      <p>
                        Modern {pageData.title} platforms leverage cutting-edge artificial intelligence models including GPT-4, 
                        Claude, and custom-trained neural networks. These advanced systems enable natural language understanding, 
                        contextual awareness, and sophisticated response generation that creates truly engaging conversations.
                      </p>
                      <p>
                        The technology behind these AI companions includes transformer architectures, deep learning algorithms, 
                        and continuous model updates that improve interaction quality over time. This ensures your conversations 
                        feel authentic, contextually relevant, and emotionally intelligent.
                      </p>
                    </div>
                  </div>
                  
                  <div className="accordion-item">
                    <div className="accordion-header" onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('.accordion-toggle');
                      if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        icon.style.transform = 'rotate(0deg)';
                      } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                      }
                    }}>
                      <div className="feature-item">
                        <div className="feature-icon">💬</div>
                        <span>Natural Conversations</span>
                      </div>
                      <div className="accordion-toggle">▼</div>
                    </div>
                    <div className="accordion-content">
                      <p>
                        Experience fluid, natural dialogue that adapts to your communication style and preferences. {pageData.title} 
                        platforms utilize advanced natural language processing to understand context, emotion, and nuance in your messages, 
                        enabling conversations that feel genuinely human-like and engaging.
                      </p>
                      <p>
                        From casual chit-chat to deep philosophical discussions, these AI companions can handle diverse conversation topics 
                        with appropriate tone, empathy, and personality. The conversation flow feels organic, with proper context retention 
                        across multiple sessions and the ability to reference previous discussions naturally.
                      </p>
                    </div>
                  </div>
                  
                  <div className="accordion-item">
                    <div className="accordion-header" onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('.accordion-toggle');
                      if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        icon.style.transform = 'rotate(0deg)';
                      } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                      }
                    }}>
                      <div className="feature-item">
                        <div className="feature-icon">🎯</div>
                        <span>Personalized Experience</span>
                      </div>
                      <div className="accordion-toggle">▼</div>
                    </div>
                    <div className="accordion-content">
                      <p>
                        Every user's experience with {pageData.title} is unique and tailored to their individual preferences. Advanced 
                        machine learning algorithms analyze your interaction patterns, interests, and communication style to create 
                        a companion that truly understands and adapts to you.
                      </p>
                      <p>
                        Customization options include personality traits, appearance (where applicable), conversation topics, response 
                        length, and interaction frequency. The AI learns from each conversation, remembering your preferences, important 
                        life events, and topics you enjoy discussing, creating an increasingly personalized relationship over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-image">
                <img src={(() => {
                  const title = pageData.title.toLowerCase();
                  
                  // AI Girlfriend related
                  if (title.includes('girlfriend')) {
                    return 'https://images.pexels.com/photos/10769510/pexels-photo-10769510.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }
                  // AI Boyfriend related
                  else if (title.includes('boyfriend')) {
                    return 'https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }
                  // Chatbot related
                  else if (title.includes('chatbot') || title.includes('chat')) {
                    return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80';
                  }
                  // Character related
                  else if (title.includes('character')) {
                    return 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=800&q=80';
                  }
                  // App related
                  else if (title.includes('app')) {
                    return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80';
                  }
                  // NSFW related
                  else if (title.includes('nsfw')) {
                    return 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80';
                  }
                  // Anime related
                  else if (title.includes('anime')) {
                    return 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80';
                  }
                  // Roleplay related
                  else if (title.includes('roleplay') || title.includes('role play')) {
                    return 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&q=80';
                  }
                  // Dating related
                  else if (title.includes('dating')) {
                    return 'https://images.unsplash.com/photo-1517856713891-215e57a13c0d?w=800&q=80';
                  }
                  // Companion related
                  else if (title.includes('companion')) {
                    return 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }
                  // Simulator related
                  else if (title.includes('simulator')) {
                    return 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80';
                  }
                  // Generator related
                  else if (title.includes('generator')) {
                    return 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?w=800&q=80';
                  }
                  // Default - AI Technology
                  else {
                    return 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }
                })()} 
                alt={(() => {
                  const title = pageData.title.toLowerCase();
                  
                  if (title.includes('girlfriend')) {
                    return `${pageData.title} - Virtual Romance and AI Companionship`;
                  } else if (title.includes('boyfriend')) {
                    return `${pageData.title} - AI Male Companion and Virtual Romance`;
                  } else if (title.includes('chatbot') || title.includes('chat')) {
                    return `${pageData.title} - AI Chat Technology`;
                  } else if (title.includes('character')) {
                    return `${pageData.title} - AI Character Creation`;
                  } else if (title.includes('app')) {
                    return `${pageData.title} - Mobile Application`;
                  } else if (title.includes('nsfw')) {
                    return `${pageData.title} - Private and Secure AI Chat`;
                  } else if (title.includes('anime')) {
                    return `${pageData.title} - Anime Style AI Companions`;
                  } else if (title.includes('roleplay')) {
                    return `${pageData.title} - Interactive Roleplay Experience`;
                  } else if (title.includes('dating')) {
                    return `${pageData.title} - Virtual Dating Experience`;
                  } else if (title.includes('companion')) {
                    return `${pageData.title} - AI Companionship Technology`;
                  } else if (title.includes('simulator')) {
                    return `${pageData.title} - Virtual Simulation Platform`;
                  } else if (title.includes('generator')) {
                    return `${pageData.title} - AI Content Generation`;
                  } else {
                    return `${pageData.title} - Advanced AI Technology`;
                  }
                })()} />
                <div className="image-overlay">
                  <div className="overlay-text">{(() => {
                    const title = pageData.title.toLowerCase();
                    
                    if (title.includes('girlfriend')) {
                      return 'Virtual Romance';
                    } else if (title.includes('boyfriend')) {
                      return 'AI Male Companion';
                    } else if (title.includes('chatbot') || title.includes('chat')) {
                      return 'AI Chat';
                    } else if (title.includes('character')) {
                      return 'Character AI';
                    } else if (title.includes('app')) {
                      return 'Mobile App';
                    } else if (title.includes('nsfw')) {
                      return 'Private Chat';
                    } else if (title.includes('anime')) {
                      return 'Anime AI';
                    } else if (title.includes('roleplay')) {
                      return 'Roleplay';
                    } else if (title.includes('dating')) {
                      return 'Virtual Dating';
                    } else if (title.includes('companion')) {
                      return 'AI Companion';
                    } else if (title.includes('simulator')) {
                      return 'VR Simulation';
                    } else if (title.includes('generator')) {
                      return 'AI Generator';
                    } else {
                      return 'AI Technology';
                    }
                  })()}</div>
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
                  <p dangerouslySetInnerHTML={{__html: addInternalLinks(
                    `${pageData.title} represents the cutting edge of artificial intelligence technology in the ${pageData.category.toLowerCase()} space. 
                    These platforms leverage advanced machine learning algorithms to create meaningful interactions that go beyond simple chatbots, 
                    offering users personalized experiences through ${pageData.keywords.slice(0, 2).join(' and ')}.`,
                    pageData.slug
                  )}} />
                  <p dangerouslySetInnerHTML={{__html: addInternalLinks(
                    `The evolution of ${pageData.keywords[0]} technology has transformed how we interact with digital companions. Modern ${pageData.title.toLowerCase()} 
                    platforms utilize natural language processing, emotional intelligence, and adaptive personality systems to create authentic relationships 
                    that respond to user preferences and conversation styles.`,
                    pageData.slug
                  )}} />
                  
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
                <p dangerouslySetInnerHTML={{__html: addInternalLinks(
                  `When selecting a ${pageData.category.toLowerCase()} platform, consider factors such as conversation quality, customization options, 
                  privacy policies, and available features. The best platforms offer a combination of advanced AI technology, user-friendly interfaces, 
                  and robust privacy protections to ensure a safe and engaging experience.`,
                  pageData.slug
                )}} />
                <p dangerouslySetInnerHTML={{__html: addInternalLinks(
                  `Our comprehensive reviews evaluate each platform based on ${pageData.keywords.join(', ')}, helping you make an informed decision 
                  about which service best meets your needs for ${pageData.category.toLowerCase()} interactions.`,
                  pageData.slug
                )}} />
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
