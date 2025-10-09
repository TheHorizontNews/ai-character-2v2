import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { List, Search, Filter } from 'lucide-react';
import { generateAllComparisons, getComparisonStats, filterComparisons, getBrandList } from '../utils/comparisonGenerator';
import '../styles/AllComparisonsPage.css';

const AllComparisonsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Generate all comparisons and get stats
  const allComparisons = useMemo(() => generateAllComparisons(), []);
  const comparisonStats = useMemo(() => getComparisonStats(), []);
  const brandList = useMemo(() => getBrandList(), []);

  // Filter comparisons based on search and brand selection
  const filteredComparisons = useMemo(() => {
    return filterComparisons(allComparisons, searchQuery, selectedBrand);
  }, [allComparisons, searchQuery, selectedBrand]);

  const liveComparisons = [
    {
      id: 'lovescape-vs-character-ai',
      platform1: 'lovescape',
      platform2: 'character-ai',
      title: 'Lovescape vs Character.AI',
      description: 'Premium customization vs community variety',
      rating1: 4.8,
      rating2: 4.7,
      pricing1: 'Premium',
      pricing2: 'Free',
      status: 'live',
      featured: true,
      url: '/compare/lovescape-vs-character-ai'
    },
    {
      id: 'lovescape-vs-replika',
      platform1: 'lovescape',
      platform2: 'replika',
      title: 'Lovescape vs Replika',
      description: 'Customization vs wellness focus',
      rating1: 4.8,
      rating2: 4.6,
      pricing1: 'Premium',
      pricing2: 'Freemium',
      status: 'live',
      url: '/compare/lovescape-vs-replika'
    },
    {
      id: 'lovescape-vs-nomi-ai',
      platform1: 'lovescape',
      platform2: 'nomi-ai',
      title: 'Lovescape vs Nomi.ai',
      description: 'Privacy-first vs visual features',
      rating1: 4.8,
      rating2: 4.7,
      pricing1: 'Premium',
      pricing2: 'Premium',
      status: 'live',
      url: '/compare/lovescape-vs-nomi-ai'
    },
    {
      id: 'character-ai-vs-replika',
      platform1: 'character-ai',
      platform2: 'replika',
      title: 'Character.AI vs Replika',
      description: 'Community characters vs personal AI',
      rating1: 4.7,
      rating2: 4.6,
      pricing1: 'Free',
      pricing2: 'Freemium',
      status: 'live',
      url: '/compare/character-ai-vs-replika'
    },
    {
      id: 'replika-vs-nomi-ai',
      platform1: 'replika',
      platform2: 'nomi-ai',
      title: 'Replika vs Nomi.ai',
      description: 'Mental wellness vs visual AI',
      rating1: 4.6,
      rating2: 4.7,
      pricing1: 'Freemium',
      pricing2: 'Premium',
      status: 'live',
      url: '/compare/replika-vs-nomi-ai'
    },
    {
      id: 'character-ai-vs-nomi-ai',
      platform1: 'character-ai',
      platform2: 'nomi-ai',
      title: 'Character.AI vs Nomi.ai',
      description: 'Free community vs premium features',
      rating1: 4.7,
      rating2: 4.7,
      pricing1: 'Free',
      pricing2: 'Premium',
      status: 'live',
      url: '/compare/character-ai-vs-nomi-ai'
    }
  ];

  const comingSoonComparisons = {
    premium: [
      'Lovescape vs Kindroid', 'Lovescape vs Paradot', 'Nomi.ai vs Kindroid',
      'Nomi.ai vs Paradot', 'Kindroid vs Paradot'
    ],
    romance: [
      'DreamGF vs Candy AI', 'DreamGF vs Romantic AI', 'Candy AI vs Romantic AI',
      'DreamGF vs Kupid AI', 'Candy AI vs Kupid AI', 'Romantic AI vs Kupid AI'
    ],
    free: [
      'Character.AI vs Chai AI', 'Character.AI vs Poe', 'Chai AI vs Poe',
      'Replika vs Poe', 'Chai AI vs Replika'
    ],
    creative: [
      'Janitor AI vs Tavern AI', 'SoulGen vs DreamGF', 'Janitor AI vs SoulGen',
      'Tavern AI vs SoulGen', 'Inworld AI vs Tavern AI'
    ]
  };

  const brands = [
    'lovescape', 'character-ai', 'replika', 'nomi-ai', 'anima-ai', 'chai-ai',
    'dreamgf', 'candy-ai', 'janitor-ai', 'poe', 'tavern-ai', 'inworld-ai',
    'romantic-ai', 'dreambf', 'kindroid', 'paradot', 'soulgen', 'kupid-ai',
    'ai-mirror', 'talkie-ai', 'polybuzz'
  ];

  const filteredComparisons = liveComparisons.filter(comparison => {
    const matchesSearch = comparison.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comparison.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = !selectedBrand || 
                        comparison.platform1 === selectedBrand || 
                        comparison.platform2 === selectedBrand;
    
    return matchesSearch && matchesBrand;
  });

  const lovescapeComparisons = liveComparisons.filter(
    comp => comp.platform1 === 'lovescape' || comp.platform2 === 'lovescape'
  );

  const popularComparisons = liveComparisons.filter(
    comp => comp.platform1 !== 'lovescape' && comp.platform2 !== 'lovescape'
  );

  const handleComparisonClick = (url) => {
    navigate(url);
  };

  const handleRequestComparison = () => {
    alert('Comparison request feature will be implemented! Users can request specific platform comparisons.');
  };

  return (
    <div className="page-container">
      <Sidebar />
      
      <main className="main-content">
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <List size={24} />
              <span>All Comparisons</span>
            </div>
            <h1 className="hero-title">COMPLETE COMPARISON DIRECTORY</h1>
            <p className="hero-subtitle">
              Browse all platform comparisons, filter by brand, and find detailed analysis for any AI character platform combination
            </p>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <section className="directory-controls">
          <div className="search-filter-bar">
            <div className="search-section">
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search comparisons (e.g., 'Lovescape vs Character.AI')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            
            <div className="filter-section">
              <label htmlFor="brand-filter">Filter by Brand:</label>
              <select
                id="brand-filter"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="brand-filter"
              >
                <option value="">All Brands</option>
                {brandList.map(brand => (
                  <option key={brand.slug} value={brand.slug}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="results-counter">
              <span className="count">{filteredComparisons.length}</span> comparisons found
            </div>
          </div>
        </section>

        {/* Statistics Overview */}
        <section className="stats-overview">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{comparisonStats.live}</div>
              <div className="stat-label">Live Comparisons</div>
              <div className="stat-sublabel">Ready to view</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{comparisonStats.upcoming}</div>
              <div className="stat-label">Coming Soon</div>
              <div className="stat-sublabel">In development</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">21</div>
              <div className="stat-label">Total Platforms</div>
              <div className="stat-sublabel">Available for comparison</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{comparisonStats.total}</div>
              <div className="stat-label">Total Available</div>
              <div className="stat-sublabel">Platform combinations</div>
            </div>
          </div>
        </section>

        {/* Live Comparisons */}
        <section className="section">
          <h2 className="section-title">🔥 Live Comparisons</h2>
          <div className="comparisons-grid">
            {filteredComparisons.map((comparison) => (
              <div
                key={comparison.id}
                className={`comparison-card ${comparison.featured ? 'featured' : ''}`}
                onClick={() => handleComparisonClick(comparison.url)}
              >
                <h3>{comparison.title}</h3>
                <p>{comparison.description}</p>
                <div className="comparison-stats">
                  <span>⭐ {comparison.rating1} vs {comparison.rating2}</span>
                  <span>{comparison.pricing1} vs {comparison.pricing2}</span>
                </div>
                <div className="status-badge live">🔥 Live</div>
              </div>
            ))}
          </div>
        </section>

        {/* Lovescape Comparisons */}
        <section className="section">
          <h2 className="section-title">🏆 Lovescape Comparisons</h2>
          <p className="brand-description">
            Compare Lovescape's premium customization features with other leading AI platforms
          </p>
          <div className="comparisons-grid">
            {lovescapeComparisons.map((comparison) => (
              <div
                key={comparison.id}
                className="comparison-card"
                onClick={() => handleComparisonClick(comparison.url)}
              >
                <h3>{comparison.title}</h3>
                <p>{comparison.description}</p>
                <div className="comparison-stats">
                  <span>⭐ {comparison.rating1} vs {comparison.rating2}</span>
                  <span>{comparison.pricing1} vs {comparison.pricing2}</span>
                </div>
                <div className="status-badge live">🔥 Live</div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Platform Comparisons */}
        <section className="section">
          <h2 className="section-title">🌟 Popular Platform Comparisons</h2>
          <p className="brand-description">
            Most requested comparisons between leading AI character platforms
          </p>
          <div className="comparisons-grid">
            {popularComparisons.map((comparison) => (
              <div
                key={comparison.id}
                className="comparison-card"
                onClick={() => handleComparisonClick(comparison.url)}
              >
                <h3>{comparison.title}</h3>
                <p>{comparison.description}</p>
                <div className="comparison-stats">
                  <span>⭐ {comparison.rating1} vs {comparison.rating2}</span>
                  <span>{comparison.pricing1} vs {comparison.pricing2}</span>
                </div>
                <div className="status-badge live">🔥 Live</div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="section">
          <h2 className="section-title">🔜 Coming Soon</h2>
          <p className="coming-soon-description">
            We're actively expanding our comparison database. Here's a preview of upcoming comparisons 
            organized by category. Each will feature the same detailed analysis, interactive charts, 
            and expert recommendations.
          </p>
          
          <div className="coming-soon-tabs">
            {Object.keys(comingSoonComparisons).map(category => (
              <button
                key={category}
                className={`tab-btn ${activeTab === category ? 'active' : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} Platforms
              </button>
            ))}
          </div>
          
          <div className="coming-soon-grid">
            {comingSoonComparisons[activeTab]?.map((title, index) => (
              <div key={index} className="coming-soon-card">
                <div className="coming-soon-header">
                  <h4>{title}</h4>
                  <div className="status-badge coming-soon">Coming Soon</div>
                </div>
                <p>Detailed comparison with interactive charts, pricing analysis, and expert recommendations.</p>
                <div className="coming-soon-features">
                  <span className="feature-tag">📊 Charts</span>
                  <span className="feature-tag">💰 Pricing</span>
                  <span className="feature-tag">🎯 Analysis</span>
                </div>
                <button className="notify-btn">Notify When Ready</button>
              </div>
            ))}
          </div>
        </section>

        {/* Request a Comparison */}
        <section className="section">
          <h2 className="section-title">💡 Request a Comparison</h2>
          <div className="request-comparison-card">
            <div className="request-content">
              <h3>Don't see the comparison you need?</h3>
              <p>
                We prioritize new comparisons based on user demand. Let us know which platforms 
                you'd like to see compared, and we'll fast-track that analysis.
              </p>
              <div className="priority-note">
                <strong>High Priority:</strong> Comparisons featuring Lovescape, Character.AI, Replika, and other top platforms
              </div>
            </div>
            <div className="request-form">
              <button className="request-btn" onClick={handleRequestComparison}>
                Request New Comparison
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllComparisonsPage;