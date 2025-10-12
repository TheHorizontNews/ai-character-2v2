import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import PlatformSection from '../components/PlatformSection';
import CategorySection from '../components/CategorySection';
import CTABlocks from '../components/CTABlocks';
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
  const romancePlatforms = aiPlatforms.filter(p => p.category === 'Romance');

  return (
    <div className="home-page">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="main-content">
        <Hero />
        
        <CategorySection />
        
        <PlatformSection
          title="All Platforms"
          subtitle="Explore all 21 AI character creation platforms"
          platforms={aiPlatforms}
        />
        
        <ComparisonTable />
        
        <PlatformSection
          title="Romance & Relationships"
          subtitle="AI companions focused on romantic connections"
          platforms={romancePlatforms}
        />
        
        <SEOBlock />
        
        <ExpertInsights />
        
        <AITrendsSection />
        
        <FAQ faqs={faqs} />
        
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;