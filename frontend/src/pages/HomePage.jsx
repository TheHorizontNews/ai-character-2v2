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
import { homepageMeta, SITE_DOMAIN } from '../data/metaTags';
import { generatePageSchema, schemaToJsonLd } from '../utils/schemaGenerator';
import '../styles/HomePage.css';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Filter platforms by category
  const romancePlatforms = aiPlatforms.filter(p => p.category === 'Romance');

  // Generate schema.org JSON-LD
  const schemaJsonLd = schemaToJsonLd(
    generatePageSchema('homepage', { platforms: aiPlatforms })
  );

  // Static schema.org JSON-LD
  const staticSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "ai-characters.org",
        "alternateName": "Character Central",
        "url": "https://ai-characters.org",
        "logo": "https://ai-characters.org/logo.png",
        "description": "Expert reviews and comparisons of AI character and companion platforms",
        "sameAs": ["https://twitter.com/CharacterCentral"]
      },
      {
        "@type": "WebSite",
        "name": "Character Central",
        "url": "https://ai-characters.org",
        "description": "Discover the best AI character and companion platforms. Expert reviews, comparisons, and guides.",
        "publisher": {
          "@type": "Organization",
          "name": "ai-characters.org"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://ai-characters.org/explore?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        "name": "Best AI Character Platforms",
        "description": "21 AI character platforms",
        "numberOfItems": 21,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Lovescape",
              "url": "https://ai-characters.org/platform/lovescape",
              "applicationCategory": "Entertainment",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "bestRating": "5"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Character.AI",
              "url": "https://ai-characters.org/platform/character-ai",
              "applicationCategory": "Entertainment",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "bestRating": "5"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Replika",
              "url": "https://ai-characters.org/platform/replika",
              "applicationCategory": "Entertainment",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.6",
                "bestRating": "5"
              }
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="home-page">
      {/* Static Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(staticSchema) }}
      />
      
      <SEOHead 
        title={homepageMeta.title}
        description={homepageMeta.description}
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
        ogImage={`${SITE_DOMAIN}/og-image.png`}
        canonical={`${SITE_DOMAIN}/`}
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