import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { List, Search, Filter } from 'lucide-react';
import { generateAllComparisons, getComparisonStats, filterComparisons, getBrandList } from '../utils/comparisonGenerator';
import '../styles/AllComparisonsPage.css';

const AllComparisonsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  // activeTab removed since all comparisons are now live

  // Generate all comparisons and get stats
  const allComparisons = useMemo(() => generateAllComparisons(), []);
  const comparisonStats = useMemo(() => getComparisonStats(), []);
  const brandList = useMemo(() => getBrandList(), []);

  // Filter comparisons based on search and brand selection
  const filteredComparisons = useMemo(() => {
    return filterComparisons(allComparisons, searchQuery, selectedBrand);
  }, [allComparisons, searchQuery, selectedBrand]);

  // All comparison data is now generated programmatically

  // Get specific comparison subsets
  const lovescapeComparisons = useMemo(() => {
    return filteredComparisons.filter(
      comp => comp.platform1 === 'lovescape' || comp.platform2 === 'lovescape'
    );
  }, [filteredComparisons]);

  const popularComparisons = useMemo(() => {
    return filteredComparisons.filter(
      comp => comp.platform1 !== 'lovescape' && comp.platform2 !== 'lovescape'
    );
  }, [filteredComparisons]);

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

        {/* All comparisons are now live - no coming soon section needed */}

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