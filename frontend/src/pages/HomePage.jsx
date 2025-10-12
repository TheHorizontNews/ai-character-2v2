import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import PlatformSection from '../components/PlatformSection';
import CategorySection from '../components/CategorySection';
import ComparisonTable from '../components/ComparisonTable';
import SEOBlock from '../components/SEOBlock';
import ExpertInsights from '../components/ExpertInsights';
import AITrendsSection from '../components/AITrendsSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { aiPlatforms, faqs } from '../data/mockData';
import '../styles/HomePage.css';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Filter platforms by category
  const premiumPlatforms = aiPlatforms.filter(p => p.category === 'Premium');
  const romancePlatforms = aiPlatforms.filter(p => p.category === 'Romance');
  const popularPlatforms = aiPlatforms.slice(0, 8);
  const trendingPlatforms = aiPlatforms.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 8);

  return (
    <div className="home-page">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="main-content">
        <Hero />
        
        <PlatformSection
          title="Featured Platforms"
          subtitle="Explore the best AI character creation services"
          platforms={aiPlatforms.slice(0, 10)}
        />
        
        <CategorySection />
        
        <PlatformSection
          title="Premium Platforms"
          subtitle="High-quality AI experiences with advanced features"
          platforms={premiumPlatforms}
        />
        
        <PlatformSection
          title="Trending Now"
          subtitle="Most popular platforms based on user ratings"
          platforms={trendingPlatforms}
        />
        
        <ComparisonTable />
        
        <PlatformSection
          title="Romance & Relationships"
          subtitle="AI companions focused on romantic connections"
          platforms={romancePlatforms}
        />
        
        <SEOBlock />
        
        <PlatformSection
          title="Community Favorites"
          subtitle="User-recommended AI character platforms"
          platforms={popularPlatforms}
        />
        
        <ExpertInsights />
        
        <AITrendsSection />
        
        <FAQ faqs={faqs} />
        
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;