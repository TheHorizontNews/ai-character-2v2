// Generate all routes for react-snap pre-rendering
const fs = require('fs');
const path = require('path');

// Import data
const seoPages = require('../frontend/src/data/seoPages').seoPages;
const mockData = require('../frontend/src/data/mockData');

const routes = [
  '/',
  '/explore',
  '/compare',
  '/all-comparisons'
];

// Add all platform pages
mockData.aiPlatforms.forEach(platform => {
  routes.push(`/platform/${platform.slug}`);
});

// Add all SEO pages
seoPages.forEach(page => {
  routes.push(`/character-review/${page.slug}`);
});

// Add top comparison pages (limit to avoid timeout)
const topComparisons = [
  '/compare/lovescape-vs-character-ai',
  '/compare/lovescape-vs-replika',
  '/compare/lovescape-vs-nomi-ai',
  '/compare/character-ai-vs-replika',
  '/compare/replika-vs-nomi-ai'
];

routes.push(...topComparisons);

// Write routes to file
const routesPath = path.join(__dirname, '../frontend/public/routes.txt');
fs.writeFileSync(routesPath, routes.join('\n'));

console.log(`✅ Generated ${routes.length} routes for pre-rendering`);
console.log('Routes saved to:', routesPath);
