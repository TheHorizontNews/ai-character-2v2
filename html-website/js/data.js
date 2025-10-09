// AI Platforms Data for ai-characters.org
const aiPlatforms = [
  {
    id: 1,
    name: "Lovescape",
    slug: "lovescape",
    tagline: "Build your perfect AI companion",
    description: "Create customizable AI characters with unique personalities, voices, and appearances. Features 24/7 emotional support and adaptive conversations.",
    rating: 4.8,
    users: "2M+",
    category: "Premium",
    features: ["Custom Personality", "Voice Customization", "24/7 Support", "Private & Secure"],
    pricing: "Freemium",
    image: "https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg",
    pros: ["Highly customizable characters", "Natural conversations", "Strong privacy protection"],
    cons: ["Premium features require subscription"],
    bestFor: "Users seeking deep emotional connection"
  },
  {
    id: 2,
    name: "Character.AI",
    slug: "character-ai",
    tagline: "Chat with anyone, anywhere, anytime",
    description: "Engage with AI characters from fiction, history, or create your own. Powered by advanced language models for realistic conversations.",
    rating: 4.7,
    users: "10M+",
    category: "Popular",
    features: ["Pre-made Characters", "Community Creations", "Multiple Characters", "Free Access"],
    pricing: "Free with Premium option",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg",
    pros: ["Large character library", "Active community", "Free to use"],
    cons: ["Can be slow during peak times", "Limited customization"],
    bestFor: "Casual users and roleplay enthusiasts"
  },
  {
    id: 3,
    name: "Replika",
    slug: "replika",
    tagline: "Your AI companion who cares",
    description: "Develop a meaningful relationship with an AI that learns from you. Focus on mental wellness and emotional support.",
    rating: 4.6,
    users: "5M+",
    category: "Wellness",
    features: ["Mental Health Focus", "Personalized Learning", "Avatar Customization", "Mood Tracking"],
    pricing: "Free with Pro subscription",
    image: "https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85",
    pros: ["Therapeutic approach", "Learns your personality", "Supportive community"],
    cons: ["Romantic features locked behind paywall"],
    bestFor: "Mental wellness and personal growth"
  }
];

// SEO Pages Data
const seoPages = [
  { slug: 'ai-girlfriend-chat', category: 'AI Girlfriend', title: 'AI Girlfriend Chat', subtitle: 'Chat with AI girlfriends', description: 'Discover the best AI girlfriend chat platforms for meaningful conversations and companionship.', keywords: ['ai girlfriend', 'chat', 'companionship'], platforms: ['lovescape', 'character-ai', 'replika'], relatedPages: ['ai-girlfriend-chatbot', 'ai-girlfriend-app', 'ai-girlfriend-voice-chat'] },
  { slug: 'ai-girlfriend-chatbot', category: 'AI Girlfriend', title: 'AI Girlfriend Chatbot', subtitle: 'Smart AI girlfriend bots', description: 'Advanced AI girlfriend chatbots with personality and emotional intelligence for deep connections.', keywords: ['chatbot', 'ai girlfriend', 'smart'], platforms: ['lovescape', 'romantic-ai', 'dreamgf'], relatedPages: ['ai-girlfriend-chat', 'ai-girlfriend-app', 'ai-girlfriend-roleplay'] },
  // Add more SEO pages...
];

// Categories Data
const categories = [
  { id: 'featured', name: 'Featured', icon: '✨', color: '#667eea' },
  { id: 'premium', name: 'Premium', icon: '👑', color: '#f093fb' },
  { id: 'romantic', name: 'Romantic', icon: '💕', color: '#ff6b6b' },
  { id: 'trending', name: 'Trending', icon: '📈', color: '#4ecdc4' },
  { id: 'community', name: 'Community', icon: '👥', color: '#45b7d1' }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { aiPlatforms, seoPages, categories };
}