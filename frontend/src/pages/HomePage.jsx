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
import SEOHead from '../components/SEOHead';
import { aiPlatforms, faqs } from '../data/mockData';
import '../styles/HomePage.css';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Filter platforms by category
  const romancePlatforms = aiPlatforms.filter(p => p.category === 'Romance');

  return (
    <div className="home-page">
      <SEOHead 
        title="Best AI Character & Companion Platforms 2025"
        description="Discover and compare the top 21 AI character and companion platforms. Expert reviews, detailed comparisons, and guides for AI girlfriends, chatbots, and virtual companions."
        keywords={[
          'ai characters',
          'ai companions',
          'ai girlfriend',
          'ai chatbot',
          'virtual companion',
          'character ai',
          'ai boyfriend',
          'ai chat platforms',
          'best ai companions 2025'
        ]}
        ogImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&q=80"
        canonical="https://ai-characters.org/"
        schemaData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://ai-characters.org/#website",
              "url": "https://ai-characters.org/",
              "name": "AI Characters",
              "description": "Your comprehensive guide to AI character and companion platforms",
              "publisher": {
                "@id": "https://ai-characters.org/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://ai-characters.org/explore?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Organization",
              "@id": "https://ai-characters.org/#organization",
              "name": "AI Characters",
              "url": "https://ai-characters.org/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ai-characters.org/favicon.svg",
                "width": 64,
                "height": 64
              },
              "sameAs": []
            },
            {
              "@type": "WebPage",
              "@id": "https://ai-characters.org/#webpage",
              "url": "https://ai-characters.org/",
              "name": "Best AI Character & Companion Platforms 2025 | AI Characters",
              "isPartOf": {
                "@id": "https://ai-characters.org/#website"
              },
              "about": {
                "@id": "https://ai-characters.org/#organization"
              },
              "description": "Discover and compare the top 21 AI character and companion platforms. Expert reviews, detailed comparisons, and guides for AI girlfriends, chatbots, and virtual companions."
            },
            {
              "@type": "CollectionPage",
              "name": "AI Companion Platform Reviews",
              "description": "Comprehensive reviews of 21+ AI character and companion platforms",
              "numberOfItems": 21,
              "about": {
                "@type": "Thing",
                "name": "AI Companions"
              }
            }
          ]
        }}
      />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="main-content">
        <Hero />
        
        <CategorySection />
        
        <PlatformSection
          title="All Platforms"
          subtitle="Explore all 21 AI character creation platforms"
          platforms={aiPlatforms}
        />
        
        <CTABlocks />
        
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