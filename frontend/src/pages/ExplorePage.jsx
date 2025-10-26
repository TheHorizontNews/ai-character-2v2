import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Sparkles, UserCheck, Users, Drama, Wand2, Trophy, Flame, HeartHandshake, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { seoPages, seoCategories } from '../data/seoPages';
import { explorePageMeta, SITE_DOMAIN } from '../data/metaTags';
import { generatePageSchema, schemaToJsonLd } from '../utils/schemaGenerator';
import '../styles/ExplorePage.css';

const iconMap = {
  Heart, User, Sparkles, UserCheck, Users, Drama, Wand2, Trophy, Flame, HeartHandshake
};

const ExplorePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPages = seoPages.filter(page => {
    const matchesCategory = selectedCategory === 'all' || 
      page.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedPages = {};
  filteredPages.forEach(page => {
    if (!groupedPages[page.category]) {
      groupedPages[page.category] = [];
    }
    groupedPages[page.category].push(page);
  });

  // Generate schema.org JSON-LD
  const schemaJsonLd = schemaToJsonLd(
    generatePageSchema('explore', {
      pages: seoPages,
      categories: seoCategories
    })
  );

  return (
    <div className="home-page">
      {/* Static Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Explore AI Character Topics",
            "description": "Browse 67 comprehensive guides on AI companions, characters, and chat platforms",
            "url": "https://ai-characters.org/explore",
            "hasPart": seoPages.slice(0, 10).map(page => ({
              "@type": "Article",
              "headline": page.title,
              "url": `https://ai-characters.org/character-review/${page.slug}`
            }))
          })
        }}
      />
      
      <SEOHead 
        title={explorePageMeta.title}
        description={explorePageMeta.description}
        schemaJsonLd={schemaJsonLd}
        keywords={[
          'AI character guides',
          'AI companion topics',
          'virtual girlfriend guides',
          'AI boyfriend resources',
          'character creation guides',
          'anime AI guides',
          'roleplay AI topics',
          'AI companion reviews'
        ]}
        ogImage={`${SITE_DOMAIN}/og-image.png`}
        canonical={`${SITE_DOMAIN}/explore`}
        ogType="website"
      />
      <Sidebar />
      
      <main className="main-content">
        <div className="explore-page">
          <div className="explore-hero">
            <h1>Explore AI Companions</h1>
            <p>Discover 67+ comprehensive guides on AI companions, characters, and chat platforms</p>
            
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="category-filter">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Topics ({seoPages.length})
            </button>
            {seoCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              const count = seoPages.filter(p => 
                p.category.toLowerCase().replace(/\s+/g, '-') === cat.id
              ).length;
              return (
                <button
                  key={cat.id}
                  className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ '--cat-color': cat.color }}
                >
                  <Icon size={16} />
                  <span>{cat.name} ({count})</span>
                </button>
              );
            })}
          </div>
          
          <div className="explore-content">
            {Object.entries(groupedPages).map(([category, pages]) => (
              <div key={category} className="category-group">
                <h2 className="group-title">{category}</h2>
                <div className="pages-grid">
                  {pages.map((page) => (
                    <div
                      key={page.slug}
                      className="page-card"
                      onClick={() => navigate(`/character-review/${page.slug}`)}
                    >
                      <div className="page-category-badge">{page.category}</div>
                      <h3>{page.title}</h3>
                      <p>{page.subtitle}</p>
                      <div className="page-keywords">
                        {page.keywords.slice(0, 3).map((keyword, idx) => (
                          <span key={idx} className="keyword-pill">{keyword}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredPages.length === 0 && (
              <div className="no-results">
                <h3>No topics found</h3>
                <p>Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default ExplorePage;
