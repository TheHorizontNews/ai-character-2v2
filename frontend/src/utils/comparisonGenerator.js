// Utility to generate all possible platform comparison combinations
import { aiPlatforms } from '../data/mockData';

export const generateAllComparisons = () => {
  const comparisons = [];
  
  for (let i = 0; i < aiPlatforms.length; i++) {
    for (let j = i + 1; j < aiPlatforms.length; j++) {
      const platform1 = aiPlatforms[i];
      const platform2 = aiPlatforms[j];
      
      comparisons.push({
        id: `${platform1.slug}-vs-${platform2.slug}`,
        platform1: platform1.slug,
        platform2: platform2.slug,
        title: `${platform1.name} vs ${platform2.name}`,
        description: `${platform1.tagline} vs ${platform2.tagline}`,
        rating1: platform1.rating,
        rating2: platform2.rating,
        pricing1: platform1.pricing,
        pricing2: platform2.pricing,
        category1: platform1.category,
        category2: platform2.category,
        url: `/compare/${platform1.slug}-vs-${platform2.slug}`,
        status: 'live' // All comparisons are now live since we have the data
      });
    }
  }
  
  return comparisons;
};

export const getComparisonStats = () => {
  const totalComparisons = generateAllComparisons().length;
  const liveComparisons = totalComparisons; // All are live now
  const upcomingComparisons = 0; // None upcoming since all are implemented
  
  return {
    total: totalComparisons,
    live: liveComparisons,
    upcoming: upcomingComparisons
  };
};

export const filterComparisons = (comparisons, searchQuery = '', selectedBrand = '') => {
  return comparisons.filter(comparison => {
    const matchesSearch = !searchQuery || 
      comparison.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comparison.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = !selectedBrand || 
      comparison.platform1 === selectedBrand || 
      comparison.platform2 === selectedBrand;
    
    return matchesSearch && matchesBrand;
  });
};

export const getBrandList = () => {
  return aiPlatforms.map(platform => ({
    slug: platform.slug,
    name: platform.name
  }));
};