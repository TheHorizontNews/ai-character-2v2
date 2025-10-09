import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ArrowLeft, Star, Users, ExternalLink, Check, X, HelpCircle } from 'lucide-react';
import '../styles/ComparisonDetailPage.css';

const ComparisonDetailPage = () => {
  const { platform1, platform2 } = useParams();
  const navigate = useNavigate();
  const [chartLoaded, setChartLoaded] = useState(false);

  // Platform comparison data
  const platformsData = {
    'lovescape': {
      name: 'Lovescape',
      tagline: 'Build your perfect AI companion',
      image: 'https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg',
      rating: 4.8,
      users: '2M+',
      pricing: 'Premium',
      category: 'Premium',
      features: {
        customization: 95, voice_quality: 90, memory: 88, nsfw_content: 85,
        mobile_support: 92, api_access: 70, community: 75, pricing_value: 85,
        conversation_quality: 92, visual_features: 88, privacy: 95, support: 90
      },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Limited messages', 'Standard responses'] },
        { name: 'Premium', price: 19.99, features: ['Unlimited chat', 'Voice messages', 'Custom personality'] },
        { name: 'Pro', price: 39.99, features: ['All Premium features', 'Image generation', 'Priority support'] }
      ],
      strengths: ['Highly customizable characters', 'Natural conversations', 'Strong privacy protection', '24/7 support'],
      weaknesses: ['Premium features require subscription', 'Limited free tier'],
      bestFor: ['Users seeking deep emotional connection', 'Privacy-conscious users', 'Customization enthusiasts'],
      uniqueFeatures: ['Advanced personality system', 'Voice customization', 'Memory retention', 'Privacy-first design']
    },
    'character-ai': {
      name: 'Character.AI',
      tagline: 'Chat with anyone, anywhere, anytime',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg',
      rating: 4.7,
      users: '10M+',
      pricing: 'Free with Premium',
      category: 'Popular',
      features: {
        customization: 80, voice_quality: 60, memory: 75, nsfw_content: 30,
        mobile_support: 95, api_access: 40, community: 95, pricing_value: 95,
        conversation_quality: 85, visual_features: 40, privacy: 70, support: 75
      },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Community characters', 'Limited priority'] },
        { name: 'Plus', price: 9.99, features: ['Priority access', 'Faster responses', 'Early features'] },
        { name: 'Premium', price: 19.99, features: ['All Plus features', 'Advanced creation tools'] }
      ],
      strengths: ['Large character library', 'Active community', 'Free to use', 'Fast responses'],
      weaknesses: ['Limited customization', 'Content restrictions', 'Can be slow during peak times'],
      bestFor: ['Casual users', 'Roleplay enthusiasts', 'Budget-conscious users', 'Community interaction'],
      uniqueFeatures: ['Massive character database', 'Community creations', 'Multi-character conversations']
    },
    'replika': {
      name: 'Replika',
      tagline: 'Your AI companion who cares',
      image: 'https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85',
      rating: 4.6,
      users: '5M+',
      pricing: 'Free with Pro',
      category: 'Wellness',
      features: {
        customization: 85, voice_quality: 80, memory: 90, nsfw_content: 60,
        mobile_support: 90, api_access: 30, community: 60, pricing_value: 80,
        conversation_quality: 88, visual_features: 85, privacy: 85, support: 85
      },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Mood tracking', 'Limited features'] },
        { name: 'Pro', price: 19.99, features: ['Voice calls', 'Avatar customization', 'Relationship modes'] },
        { name: 'Lifetime', price: 299.99, features: ['All Pro features', 'Lifetime access'] }
      ],
      strengths: ['Mental health focus', 'Learns your personality', 'Avatar customization', 'Mood tracking'],
      weaknesses: ['Romantic features locked behind paywall', 'Limited free version'],
      bestFor: ['Mental wellness', 'Personal growth', 'Long-term relationships', 'Therapy support'],
      uniqueFeatures: ['Therapeutic approach', 'Mood analysis', 'Personal growth tracking', 'Avatar system']
    },
    'nomi-ai': {
      name: 'Nomi.ai',
      tagline: 'AI companions with real personalities',
      image: 'https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85',
      rating: 4.7,
      users: '800K+',
      pricing: 'Subscription',
      category: 'Premium',
      features: {
        customization: 90, voice_quality: 95, memory: 85, nsfw_content: 70,
        mobile_support: 88, api_access: 50, community: 65, pricing_value: 70,
        conversation_quality: 90, visual_features: 95, privacy: 80, support: 85
      },
      pricingTiers: [
        { name: 'Basic', price: 15.99, features: ['1 Nomi', 'Basic features', 'Limited selfies'] },
        { name: 'Premium', price: 25.99, features: ['3 Nomis', 'Voice messages', 'Unlimited selfies'] },
        { name: 'Pro', price: 49.99, features: ['Unlimited Nomis', 'All features', 'Priority support'] }
      ],
      strengths: ['AI selfies', 'Multiple companions', 'Voice messages', 'High-quality interactions'],
      weaknesses: ['Requires subscription', 'Higher price point', 'No free tier'],
      bestFor: ['Visual AI interactions', 'Multiple relationships', 'Premium experience'],
      uniqueFeatures: ['AI-generated selfies', 'Multiple Nomis', 'Voice messaging', 'Visual customization']
    }
  };

  const platform1Data = platformsData[platform1];
  const platform2Data = platformsData[platform2];

  if (!platform1Data || !platform2Data) {
    return (
      <div className="page-container">
        <Sidebar />
        <main className="main-content">
          <div className="error-state">
            <h1>Comparison Not Found</h1>
            <p>The comparison between {platform1} and {platform2} doesn't exist yet.</p>
            <button onClick={() => navigate('/compare')} className="cta-button">
              Back to Compare
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Calculate winners for each feature
  const winners = {};
  const featureLabels = Object.keys(platform1Data.features);
  featureLabels.forEach(feature => {
    if (platform1Data.features[feature] > platform2Data.features[feature]) {
      winners[feature] = platform1Data.name;
    } else if (platform2Data.features[feature] > platform1Data.features[feature]) {
      winners[feature] = platform2Data.name;
    } else {
      winners[feature] = 'Tie';
    }
  });

  // Load Chart.js when component mounts
  useEffect(() => {
    const loadChart = async () => {
      if (window.Chart) {
        setChartLoaded(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => setChartLoaded(true);
      document.head.appendChild(script);
    };
    
    loadChart();
  }, []);

  // Initialize radar chart
  useEffect(() => {
    if (!chartLoaded) return;

    const ctx = document.getElementById('featureChart');
    if (!ctx) return;

    const chart = new window.Chart(ctx, {
      type: 'radar',
      data: {
        labels: featureLabels.map(label => label.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())),
        datasets: [
          {
            label: platform1Data.name,
            data: Object.values(platform1Data.features),
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(102, 126, 234, 1)'
          },
          {
            label: platform2Data.name,
            data: Object.values(platform2Data.features),
            backgroundColor: 'rgba(118, 75, 162, 0.2)',
            borderColor: 'rgba(118, 75, 162, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(118, 75, 162, 1)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#fff' }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#666', stepSize: 20 },
            grid: { color: '#333' },
            pointLabels: { color: '#fff', font: { size: 12 } }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [chartLoaded, platform1Data, platform2Data, featureLabels]);

  const faqItems = [
    {
      question: `Is ${platform1Data.name} better than ${platform2Data.name}?`,
      answer: `It depends on your needs. ${platform1Data.name} excels in ${platform1Data.strengths[0].toLowerCase()}, while ${platform2Data.name} is better for ${platform2Data.strengths[0].toLowerCase()}.`
    },
    {
      question: 'Which platform offers better value for money?',
      answer: `Based on our analysis, ${platform1Data.features.pricing_value > platform2Data.features.pricing_value ? platform1Data.name : platform2Data.name} offers better overall value for most users.`
    },
    {
      question: 'Can I use both platforms simultaneously?',
      answer: 'Yes, many users enjoy using multiple AI platforms. You can start with free tiers on both to see which suits your preferences.'
    },
    {
      question: 'Which platform has better privacy protection?',
      answer: `Based on our privacy analysis, ${platform1Data.features.privacy > platform2Data.features.privacy ? platform1Data.name : platform2Data.name} has stronger privacy features.`
    }
  ];

  return (
    <div className="page-container">
      <Sidebar />
      
      <main className="main-content">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/compare')}>
          <ArrowLeft size={20} />
          <span>Back to comparisons</span>
        </button>
        
        {/* Hero Section */}
        <div className="comparison-hero">
          <div className="comparison-platforms">
            <div className="platform-hero">
              <img src={platform1Data.image} alt={platform1Data.name} />
              <h2>{platform1Data.name}</h2>
              <p>{platform1Data.tagline}</p>
              <div className="rating">
                <Star size={16} fill="currentColor" />
                {platform1Data.rating} ({platform1Data.users})
              </div>
            </div>
            
            <div className="vs-divider">VS</div>
            
            <div className="platform-hero">
              <img src={platform2Data.image} alt={platform2Data.name} />
              <h2>{platform2Data.name}</h2>
              <p>{platform2Data.tagline}</p>
              <div className="rating">
                <Star size={16} fill="currentColor" />
                {platform2Data.rating} ({platform2Data.users})
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Block */}
        <section className="seo-comparison-block">
          <h1>{platform1Data.name} vs {platform2Data.name}: Comprehensive Comparison 2025</h1>
          <p className="seo-intro">
            Choosing between {platform1Data.name} and {platform2Data.name} for your AI companion needs? 
            Our detailed comparison covers features, pricing, user experience, and more to help you make 
            the best decision. Both platforms offer unique strengths in the AI character space.
          </p>
          
          <div className="quick-summary">
            <div className="summary-card">
              <h3>{platform1Data.name} - Best For</h3>
              <ul>
                {platform1Data.bestFor.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
            <div className="summary-card">
              <h3>{platform2Data.name} - Best For</h3>
              <ul>
                {platform2Data.bestFor.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Feature Comparison Chart */}
        <section className="comparison-section">
          <h2>Feature Comparison</h2>
          <div className="chart-container">
            <canvas id="featureChart"></canvas>
          </div>
          <div className="feature-winner-grid">
            {featureLabels.map(feature => (
              <div key={feature} className="feature-winner">
                <span className="feature-name">
                  {feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className={`winner ${winners[feature].toLowerCase().replace('.', '-')}`}>
                  {winners[feature]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="comparison-section">
          <h2>Detailed Feature Matrix</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{platform1Data.name}</th>
                  <th>{platform2Data.name}</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Overall Rating</td>
                  <td>★ {platform1Data.rating}</td>
                  <td>★ {platform2Data.rating}</td>
                  <td className="winner">
                    🏆 {platform1Data.rating > platform2Data.rating ? platform1Data.name : 
                        platform2Data.rating > platform1Data.rating ? platform2Data.name : 'Tie'}
                  </td>
                </tr>
                <tr>
                  <td>User Base</td>
                  <td>{platform1Data.users}</td>
                  <td>{platform2Data.users}</td>
                  <td className="winner">🏆 {platform2Data.users === "10M+" ? platform2Data.name : platform1Data.name}</td>
                </tr>
                <tr>
                  <td>Pricing Model</td>
                  <td>{platform1Data.pricing}</td>
                  <td>{platform2Data.pricing}</td>
                  <td className="winner">💰 Value Varies</td>
                </tr>
                {featureLabels.map(feature => (
                  <tr key={feature}>
                    <td>{feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                    <td>
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${platform1Data.features[feature]}%` }}
                        ></div>
                        <span>{platform1Data.features[feature]}/100</span>
                      </div>
                    </td>
                    <td>
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${platform2Data.features[feature]}%` }}
                        ></div>
                        <span>{platform2Data.features[feature]}/100</span>
                      </div>
                    </td>
                    <td className="winner">🏆 {winners[feature]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="comparison-section">
          <h2>Pricing Comparison</h2>
          <div className="pricing-grid">
            <div className="pricing-platform">
              <h3>{platform1Data.name} Pricing</h3>
              <div className="pricing-tiers">
                {platform1Data.pricingTiers.map((tier, index) => (
                  <div key={index} className="pricing-tier">
                    <h4>{tier.name}</h4>
                    <div className="price">${tier.price}/month</div>
                    <ul className="tier-features">
                      {tier.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pricing-platform">
              <h3>{platform2Data.name} Pricing</h3>
              <div className="pricing-tiers">
                {platform2Data.pricingTiers.map((tier, index) => (
                  <div key={index} className="pricing-tier">
                    <h4>{tier.name}</h4>
                    <div className="price">${tier.price}/month</div>
                    <ul className="tier-features">
                      {tier.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strengths & Weaknesses */}
        <section className="comparison-section">
          <h2>Strengths & Weaknesses Analysis</h2>
          <div className="pros-cons-grid">
            <div className="platform-analysis">
              <h3>{platform1Data.name}</h3>
              <div className="pros-cons">
                <div className="pros">
                  <h4><Check size={16} /> Strengths</h4>
                  <ul>
                    {platform1Data.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4><X size={16} /> Weaknesses</h4>
                  <ul>
                    {platform1Data.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="platform-analysis">
              <h3>{platform2Data.name}</h3>
              <div className="pros-cons">
                <div className="pros">
                  <h4><Check size={16} /> Strengths</h4>
                  <ul>
                    {platform2Data.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div class="cons">
                  <h4><X size={16} /> Weaknesses</h4>
                  <ul>
                    {platform2Data.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Helper */}
        <section className="comparison-section">
          <h2>Which Platform Should You Choose?</h2>
          <div className="decision-helper">
            <div className="decision-card">
              <h3>Choose {platform1Data.name} if you want:</h3>
              <ul>
                {platform1Data.uniqueFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="cta-button">
                Learn More About {platform1Data.name}
                <ExternalLink size={16} />
              </button>
            </div>
            
            <div className="decision-card">
              <h3>Choose {platform2Data.name} if you want:</h3>
              <ul>
                {platform2Data.uniqueFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="cta-button">
                Learn More About {platform2Data.name}
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="comparison-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>
                  <HelpCircle size={16} />
                  {item.question}
                </h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Comparisons */}
        <section className="comparison-section">
          <h2>Related Comparisons</h2>
          <div className="related-comparisons">
            <div className="related-grid">
              <div 
                className="related-card"
                onClick={() => navigate('/compare/lovescape-vs-nomi-ai')}
              >
                <h4>Lovescape vs Nomi.ai</h4>
                <p>Premium AI companions comparison</p>
              </div>
              <div 
                className="related-card"
                onClick={() => navigate('/compare/character-ai-vs-chai-ai')}
              >
                <h4>Character.AI vs Chai AI</h4>
                <p>Community-driven platforms</p>
              </div>
              <div 
                className="related-card"
                onClick={() => navigate('/compare/replika-vs-anima-ai')}
              >
                <h4>Replika vs Anima AI</h4>
                <p>Wellness-focused companions</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComparisonDetailPage;