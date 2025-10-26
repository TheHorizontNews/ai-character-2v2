// Schema.org JSON-LD Generator for all page types
// Generates rich snippets for Google Search

const SITE_URL = 'https://ai-characters.org';
const SITE_NAME = 'Character Central';
const LOGO_URL = `${SITE_URL}/logo.png`;
const ORG_NAME = 'ai-characters.org';

// Organization Schema (for all pages)
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": ORG_NAME,
  "alternateName": SITE_NAME,
  "url": SITE_URL,
  "logo": LOGO_URL,
  "description": "Expert reviews and comparisons of AI character and companion platforms",
  "sameAs": [
    "https://twitter.com/CharacterCentral"
  ]
});

// WebSite Schema (for homepage and search)
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE_URL,
  "description": "Discover the best AI character and companion platforms. Expert reviews, comparisons, and guides.",
  "publisher": {
    "@type": "Organization",
    "name": ORG_NAME
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/explore?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

// Review Schema (for platform pages)
export const generatePlatformReviewSchema = (platform) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": platform.name,
    "applicationCategory": "Entertainment",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": platform.pricing === "Free" ? "0" : platform.pricing.includes("Free") ? "0" : "9.99",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": platform.rating || "4.5",
      "bestRating": "5",
      "ratingCount": platform.users ? parseInt(platform.users.replace(/[^0-9]/g, '')) * 1000 : "1000"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": platform.rating || "4.5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Organization",
    "name": ORG_NAME
  },
  "publisher": {
    "@type": "Organization",
    "name": ORG_NAME
  },
  "reviewBody": platform.description,
  "datePublished": "2025-01-15",
  "dateModified": new Date().toISOString().split('T')[0]
});

// Article Schema (for SEO/Guide pages)
export const generateArticleSchema = (pageData) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": pageData.title,
  "description": pageData.description,
  "image": pageData.ogImage || `${SITE_URL}/og-image.png`,
  "author": {
    "@type": "Organization",
    "name": ORG_NAME
  },
  "publisher": {
    "@type": "Organization",
    "name": ORG_NAME,
    "logo": {
      "@type": "ImageObject",
      "url": LOGO_URL
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": new Date().toISOString().split('T')[0],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE_URL}/character-review/${pageData.slug}`
  },
  "keywords": pageData.keywords ? pageData.keywords.join(', ') : ''
});

// HowTo Schema (for guide pages)
export const generateHowToSchema = (pageData) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": `How to Choose ${pageData.title}`,
  "description": pageData.description,
  "image": pageData.ogImage || `${SITE_URL}/og-image.png`,
  "step": [
    {
      "@type": "HowToStep",
      "name": "Research Available Platforms",
      "text": `Compare different ${pageData.title.toLowerCase()} platforms and their features`,
      "url": `${SITE_URL}/character-review/${pageData.slug}#platforms`
    },
    {
      "@type": "HowToStep",
      "name": "Consider Your Needs",
      "text": `Evaluate what features matter most for your ${pageData.category.toLowerCase()} experience`,
      "url": `${SITE_URL}/character-review/${pageData.slug}#features`
    },
    {
      "@type": "HowToStep",
      "name": "Read Reviews",
      "text": "Check expert reviews and user feedback on each platform",
      "url": `${SITE_URL}/character-review/${pageData.slug}#reviews`
    },
    {
      "@type": "HowToStep",
      "name": "Try Free Versions",
      "text": "Test free tiers or trials before committing to a paid plan",
      "url": `${SITE_URL}/character-review/${pageData.slug}#pricing`
    }
  ]
});

// Comparison Schema (for comparison pages)
export const generateComparisonSchema = (platform1, platform2) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": `${platform1.name} vs ${platform2.name} Comparison`,
  "description": `Compare ${platform1.name} and ${platform2.name} features, pricing, and capabilities`,
  "author": {
    "@type": "Organization",
    "name": ORG_NAME
  },
  "publisher": {
    "@type": "Organization",
    "name": ORG_NAME
  },
  "datePublished": "2025-01-15",
  "dateModified": new Date().toISOString().split('T')[0],
  "about": [
    {
      "@type": "SoftwareApplication",
      "name": platform1.name,
      "applicationCategory": "Entertainment"
    },
    {
      "@type": "SoftwareApplication",
      "name": platform2.name,
      "applicationCategory": "Entertainment"
    }
  ]
});

// CollectionPage Schema (for category/explore pages)
export const generateCollectionSchema = (pageTitle, items) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": pageTitle,
  "description": `Browse ${items.length} items in ${pageTitle}`,
  "url": SITE_URL,
  "hasPart": items.slice(0, 10).map(item => ({
    "@type": "Article",
    "headline": item.title || item.name,
    "url": `${SITE_URL}/${item.slug ? 'character-review/' + item.slug : 'platform/' + item.slug}`
  }))
});

// BreadcrumbList Schema (for all pages)
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// FAQ Schema (for pages with FAQs)
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// ItemList Schema (for platform listings)
export const generateItemListSchema = (platforms, listName) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": listName,
  "description": `${platforms.length} AI character platforms`,
  "numberOfItems": platforms.length,
  "itemListElement": platforms.map((platform, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "SoftwareApplication",
      "name": platform.name,
      "url": `${SITE_URL}/platform/${platform.slug}`,
      "description": platform.description,
      "applicationCategory": "Entertainment",
      "aggregateRating": platform.rating ? {
        "@type": "AggregateRating",
        "ratingValue": platform.rating,
        "bestRating": "5"
      } : undefined
    }
  }))
});

// Combined schema generator based on page type
export const generatePageSchema = (pageType, data) => {
  const schemas = [];
  
  // Always include Organization schema
  schemas.push(generateOrganizationSchema());
  
  switch (pageType) {
    case 'homepage':
      schemas.push(generateWebsiteSchema());
      if (data.platforms) {
        schemas.push(generateItemListSchema(data.platforms, "Best AI Character Platforms"));
      }
      break;
      
    case 'platform':
      schemas.push(generatePlatformReviewSchema(data.platform));
      schemas.push(generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Platforms', url: `${SITE_URL}/explore` },
        { name: data.platform.name, url: `${SITE_URL}/platform/${data.platform.slug}` }
      ]));
      break;
      
    case 'seo-page':
      schemas.push(generateArticleSchema(data.pageData));
      schemas.push(generateHowToSchema(data.pageData));
      schemas.push(generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Guides', url: `${SITE_URL}/explore` },
        { name: data.pageData.title, url: `${SITE_URL}/character-review/${data.pageData.slug}` }
      ]));
      if (data.platforms && data.platforms.length > 0) {
        schemas.push(generateItemListSchema(data.platforms, `Best ${data.pageData.title} Platforms`));
      }
      break;
      
    case 'comparison':
      schemas.push(generateComparisonSchema(data.platform1, data.platform2));
      schemas.push(generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Compare', url: `${SITE_URL}/compare` },
        { name: `${data.platform1.name} vs ${data.platform2.name}`, url: `${SITE_URL}/compare/${data.comparisonSlug}` }
      ]));
      break;
      
    case 'category':
      schemas.push(generateCollectionSchema(data.categoryName, data.platforms));
      schemas.push(generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Categories', url: `${SITE_URL}/explore` },
        { name: data.categoryName, url: `${SITE_URL}/category/${data.categorySlug}` }
      ]));
      break;
      
    case 'explore':
      schemas.push(generateCollectionSchema('Explore AI Character Topics', data.pages));
      break;
      
    case 'compare':
      schemas.push(generateCollectionSchema('AI Platform Comparisons', data.comparisons));
      schemas.push(generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Compare Platforms', url: `${SITE_URL}/compare` }
      ]));
      break;
      
    case 'allComparisons':
      schemas.push(generateCollectionSchema('All Platform Comparisons', data.comparisons));
      schemas.push(generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'All Comparisons', url: `${SITE_URL}/all-comparisons` }
      ]));
      break;
  }
  
  return schemas;
};

// Export as JSON-LD string
export const schemaToJsonLd = (schemas) => {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas
  });
};
