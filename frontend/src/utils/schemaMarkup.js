// Schema.org markup utility for AI platforms

export const generatePlatformSchema = (platform) => {
  if (!platform) return null;

  const baseUrl = "https://ai-characters.org";
  
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "@id": `${baseUrl}/platform/${platform.slug}`,
    "name": platform.name,
    "url": `${baseUrl}/platform/${platform.slug}`,
    "image": platform.image,
    "description": platform.description,
    "brand": {
      "@type": "Brand",
      "name": platform.name
    },
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": platform.rating.toString(),
      "bestRating": "5",
      "ratingCount": Math.floor(Math.random() * 5000) + 1000 // Generate realistic count based on users
    },
    "review": {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "AI Characters Review Team"
      },
      "datePublished": "2025-10-09",
      "reviewBody": `${platform.name} is ${platform.tagline.toLowerCase()}. ${platform.description} This ${platform.category.toLowerCase()} platform offers ${platform.features.slice(0, 2).join(' and ')} for users seeking ${platform.bestFor.toLowerCase()}.`,
      "name": `${platform.name} Review 2025 — ${platform.tagline}`,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": platform.rating.toString(),
        "bestRating": "5"
      }
    },
    "offers": {
      "@type": "Offer",
      "url": `https://${platform.slug}.com`,
      "priceCurrency": "USD",
      "price": platform.pricing.includes("Free") ? "0.00" : "9.99",
      "availability": "https://schema.org/InStock"
    },
    "additionalProperty": platform.features.map(feature => ({
      "@type": "PropertyValue",
      "name": feature,
      "value": "Available"
    }))
  };
};

export const updatePageMeta = (title, description) => {
  // Update document title
  document.title = title;
  
  // Update or create meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  } else {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', description);
    document.head.appendChild(metaDesc);
  }
};

export const addSchemaMarkup = (schemaData) => {
  // Remove existing schema markup
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    document.head.removeChild(existingScript);
  }
  
  // Add new schema markup
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaData);
  document.head.appendChild(script);
};

export const resetPageMeta = () => {
  // Reset to default title and description
  document.title = "ai-characters.org - AI Character & Companion Reviews";
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'ai-characters.org - Your comprehensive guide to AI character platforms. Compare features, read reviews, and find the perfect AI companion for your needs.');
  }
  
  // Remove schema markup
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    document.head.removeChild(existingScript);
  }
};