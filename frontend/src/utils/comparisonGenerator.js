// Utility to generate all possible platform comparison combinations
import { aiPlatforms } from '../data/mockData';

// Generate SEO-optimized descriptions for platform comparisons
const generateSEODescription = (platform1, platform2) => {
  const keyFeatures = {
    'lovescape': ['premium customization', 'privacy-focused design', 'advanced AI companion'],
    'character-ai': ['massive character library', 'community-driven content', 'free access'],
    'replika': ['mental wellness focus', 'therapeutic conversations', 'mood tracking'],
    'nomi-ai': ['AI selfies', 'visual interactions', 'multiple companions'],
    'anima-ai': ['memory retention', 'personality development', 'roleplay modes'],
    'chai-ai': ['swipe interface', 'diverse personalities', 'mobile-first design'],
    'inworld-ai': ['developer tools', 'game integration', 'professional APIs'],
    'crushon-ai': ['unrestricted conversations', 'NSFW friendly', 'affordable pricing'],
    'janitor-ai': ['unrestricted content', 'character creation tools', 'community library'],
    'poe': ['multiple AI models', 'clean interface', 'productivity focus'],
    'dreamgf': ['AI girlfriend experience', 'image generation', 'romantic scenarios'],
    'candy-ai': ['anime & realistic styles', 'voice interactions', 'visual customization'],
    'soulgen': ['AI art generation', 'character design', 'creative tools'],
    'dreambf': ['AI boyfriend focus', 'male character specialization', 'relationship simulation'],
    'kindroid': ['long-term memory', 'voice calls', 'deep conversations'],
    'polybuzz': ['group conversations', 'multiple AI interaction', 'social features'],
    'kupid-ai': ['dating simulation', 'romantic progression', 'virtual relationships'],
    'ai-mirror': ['self-reflection tools', 'philosophical discussions', 'personal growth'],
    'paradot': ['emotional intelligence', 'mood recognition', 'adaptive personality'],
    'romantic-ai': ['romance specialization', 'virtual dating', 'relationship milestones'],
    'talkie-ai': ['voice-first experience', 'natural conversations', 'audio quality']
  };

  const categories = {
    'Premium': 'premium AI platform',
    'Popular': 'popular community platform', 
    'Wellness': 'mental wellness platform',
    'Friendship': 'friendship-focused platform',
    'Social': 'social interaction platform',
    'Developer': 'developer-grade platform',
    'Open Source': 'open source platform',
    'Community': 'community-driven platform',
    'Multi-Model': 'multi-model AI platform',
    'Romance': 'romantic AI platform',
    'Creative': 'creative AI platform',
    'Experimental': 'experimental platform',
    'Voice': 'voice-focused platform'
  };

  const pricingDescriptions = {
    'Free': 'free',
    'Freemium': 'freemium',
    'Premium': 'premium',
    'Free with Premium': 'free with premium options',
    'Free with Premium option': 'free with premium upgrades',
    'Free with Pro': 'free with pro features',
    'Subscription': 'subscription-based',
    'Subscription-based': 'subscription model',
    'Premium subscription': 'premium subscription',
    'Credit-based': 'credit system',
    'Developer pricing': 'developer pricing',
    'Free (self-hosted)': 'free self-hosted',
    'Free with API costs': 'free with API usage',
    'Free with subscription': 'free with paid tiers'
  };

  // Get key features for both platforms
  const features1 = keyFeatures[platform1.slug] || ['AI conversations', 'character interaction'];
  const features2 = keyFeatures[platform2.slug] || ['AI conversations', 'character interaction'];
  
  // Get category descriptions
  const cat1 = categories[platform1.category] || 'AI platform';
  const cat2 = categories[platform2.category] || 'AI platform';
  
  // Get pricing descriptions  
  const price1 = pricingDescriptions[platform1.pricing] || platform1.pricing.toLowerCase();
  const price2 = pricingDescriptions[platform2.pricing] || platform2.pricing.toLowerCase();

  // Generate different description patterns
  const patterns = [
    `Compare ${platform1.name}'s ${features1[0]} vs ${platform2.name}'s ${features2[0]} - ${cat1} vs ${cat2}`,
    `${platform1.name} (${price1}) vs ${platform2.name} (${price2}) - detailed AI platform comparison`,
    `${features1[0]} meets ${features2[0]} - comprehensive ${platform1.name} vs ${platform2.name} analysis`,
    `Choose between ${platform1.name}'s ${cat1.replace('platform', '')} approach and ${platform2.name}'s ${cat2.replace('platform', '')} features`,
    `${platform1.name} vs ${platform2.name}: ${features1[1] || features1[0]} vs ${features2[1] || features2[0]} comparison`,
    `Premium AI comparison: ${platform1.name}'s ${features1[0]} vs ${platform2.name}'s ${features2[0]}`,
    `AI platform showdown - ${platform1.name} (${cat1}) vs ${platform2.name} (${cat2}) features & pricing`,
    `${platform1.name} vs ${platform2.name} - which AI companion offers better ${features1[0]} and ${features2[0]}?`
  ];

  // Choose pattern based on platform combination to ensure variety
  const patternIndex = (platform1.id + platform2.id) % patterns.length;
  return patterns[patternIndex];
};

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
        description: generateSEODescription(platform1, platform2),
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