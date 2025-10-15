import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords = [],
  ogImage = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&q=80',
  ogType = 'website',
  canonical,
  noindex = false
}) => {
  const siteUrl = 'https://ai-characters.org';
  const siteName = 'AI Characters - Best AI Companion Platform Reviews';
  const fullTitle = title ? `${title} | AI Characters` : 'AI Characters - Best AI Companion Platform Reviews';
  const fullCanonical = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={fullCanonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="AI Characters" />
    </Helmet>
  );
};

export default SEOHead;
