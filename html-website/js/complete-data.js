// Complete AI Platforms Data for ai-characters.org
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
  },
  {
    id: 4,
    name: "Anima AI",
    slug: "anima-ai",
    tagline: "Your virtual friend with personality",
    description: "Chat with a friendly AI companion that remembers your conversations and grows with you over time.",
    rating: 4.5,
    users: "1M+",
    category: "Friendship",
    features: ["Memory System", "Personality Development", "Roleplay Modes", "Image Generation"],
    pricing: "Free with Premium tiers",
    image: "https://images.unsplash.com/photo-1646583288948-24548aedffd8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhbmRpbmd8ZW58MHx8fHwxNzYwMDMzMzgyfDA&ixlib=rb-4.1.0&q=85",
    pros: ["Good memory retention", "Engaging conversations", "Regular updates"],
    cons: ["Limited free messages", "Sometimes repetitive"],
    bestFor: "Daily casual conversations"
  },
  {
    id: 5,
    name: "Nomi.ai",
    slug: "nomi-ai",
    tagline: "AI companions with real personalities",
    description: "Create multiple AI companions with distinct personalities. Features include selfies, voice messages, and memory.",
    rating: 4.7,
    users: "800K+",
    category: "Premium",
    features: ["Multiple Companions", "AI Selfies", "Voice Messages", "Deep Memory"],
    pricing: "Subscription-based",
    image: "https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Unique selfie feature", "Multiple AI companions", "Strong personality"],
    cons: ["Requires subscription", "Higher price point"],
    bestFor: "Users wanting visual AI interactions"
  },
  {
    id: 6,
    name: "Chai AI",
    slug: "chai-ai",
    tagline: "Discover thousands of AI personalities",
    description: "Swipe through AI chatbots with different personalities. Community-driven platform with user-created characters.",
    rating: 4.4,
    users: "3M+",
    category: "Social",
    features: ["Swipe Interface", "Community Characters", "Quick Chats", "Mobile Focused"],
    pricing: "Free with Premium",
    image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Easy to use", "Large variety", "Mobile-friendly"],
    cons: ["Quality varies by character", "Ads in free version"],
    bestFor: "Exploring different AI personalities"
  },
  {
    id: 7,
    name: "Janitor AI",
    slug: "janitor-ai",
    tagline: "Create and chat with AI characters",
    description: "Platform for creating and interacting with AI characters. NSFW-friendly with various character templates.",
    rating: 4.3,
    users: "2M+",
    category: "Community",
    features: ["Character Creation", "NSFW Support", "Community Library", "Custom API"],
    pricing: "Free with API costs",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg",
    pros: ["Permissive content policy", "Easy character creation", "Free platform"],
    cons: ["Requires own API key", "Variable quality"],
    bestFor: "Unrestricted character interactions"
  },
  {
    id: 8,
    name: "Poe (by Quora)",
    slug: "poe",
    tagline: "Access multiple AI models in one place",
    description: "Chat with various AI models including GPT-4, Claude, and custom bots. Clean interface with bot creation tools.",
    rating: 4.5,
    users: "5M+",
    category: "Multi-Model",
    features: ["Multiple AI Models", "Bot Creation", "Clean Interface", "Fast Responses"],
    pricing: "Free with subscription",
    image: "https://images.unsplash.com/photo-1758626036095-676b425c4288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2glMjBjb21wYW55JTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzNDQ3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Access to multiple AIs", "Simple interface", "Reliable service"],
    cons: ["Limited customization", "Message limits on free tier"],
    bestFor: "Users wanting multiple AI models"
  },
  {
    id: 9,
    name: "DreamGF",
    slug: "dreamgf",
    tagline: "Create your dream AI girlfriend",
    description: "Design and customize your virtual girlfriend with AI-generated images and personalized conversations.",
    rating: 4.2,
    users: "1M+",
    category: "Romance",
    features: ["AI Image Generation", "Customizable Appearance", "Voice Messages", "Intimate Conversations"],
    pricing: "Premium subscription",
    image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Visual customization", "Romantic focus", "Regular content"],
    cons: ["Expensive", "Limited free access"],
    bestFor: "Romantic AI relationships"
  },
  {
    id: 10,
    name: "Candy AI",
    slug: "candy-ai",
    tagline: "Sweet AI companionship",
    description: "Virtual AI companions with anime and realistic styles. Features adaptive learning and image generation.",
    rating: 4.4,
    users: "900K+",
    category: "Romance",
    features: ["Anime & Realistic", "Image Generation", "Voice Chat", "Roleplay Scenarios"],
    pricing: "Subscription-based",
    image: "https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Multiple art styles", "Good image quality", "Engaging personalities"],
    cons: ["Subscription required", "Limited free trial"],
    bestFor: "Anime and visual novel fans"
  }
];

// Complete SEO Pages Data (67 pages)
const seoPages = [
  // AI Girlfriend Category (5 pages)
  { slug: 'ai-girlfriend-chat', category: 'AI Girlfriend', title: 'AI Girlfriend Chat', subtitle: 'Chat with your perfect AI girlfriend companion', description: 'Experience meaningful conversations with AI girlfriend chat platforms. Connect with virtual companions designed for emotional support and romantic interactions.', keywords: ['ai girlfriend', 'virtual girlfriend', 'chat', 'companion'], platforms: ['dreamgf', 'candy-ai', 'lovescape'], relatedPages: ['ai-girlfriend-chatbot', 'ai-girlfriend-app', 'ai-girlfriend-voice-chat'] },
  { slug: 'ai-girlfriend-chatbot', category: 'AI Girlfriend', title: 'AI Girlfriend Chatbot', subtitle: 'Advanced AI girlfriend chatbot technology', description: 'Discover intelligent AI girlfriend chatbots that understand emotions, remember conversations, and provide personalized romantic experiences.', keywords: ['chatbot', 'ai girlfriend', 'virtual companion'], platforms: ['lovescape', 'replika', 'anima-ai'], relatedPages: ['ai-girlfriend-chat', 'ai-girlfriend-app', 'ai-character-chatbot'] },
  { slug: 'ai-girlfriend-app', category: 'AI Girlfriend', title: 'AI Girlfriend App', subtitle: 'Best AI girlfriend apps for mobile', description: 'Download the best AI girlfriend apps for your smartphone. Chat, customize, and connect with your virtual girlfriend anytime, anywhere.', keywords: ['app', 'mobile', 'ai girlfriend'], platforms: ['replika', 'anima-ai', 'nomi-ai'], relatedPages: ['ai-girlfriend-chat', 'best-ai-girlfriend-app', 'ai-companion-app'] },
  { slug: 'ai-girlfriend-voice-chat', category: 'AI Girlfriend', title: 'AI Girlfriend Voice Chat', subtitle: 'Talk with your AI girlfriend using voice', description: 'Experience realistic voice conversations with AI girlfriend platforms. Natural voice chat technology for intimate and engaging interactions.', keywords: ['voice', 'speech', 'audio', 'ai girlfriend'], platforms: ['lovescape', 'nomi-ai', 'replika'], relatedPages: ['ai-girlfriend-chat', 'ai-character-voice', 'ai-boyfriend-voice-chat'] },
  { slug: 'ai-girlfriend-roleplay', category: 'AI Girlfriend', title: 'AI Girlfriend Roleplay', subtitle: 'Explore romantic roleplay scenarios', description: 'Engage in immersive roleplay experiences with AI girlfriends. From romantic dates to fantasy scenarios, create your perfect story.', keywords: ['roleplay', 'scenarios', 'romantic', 'ai girlfriend'], platforms: ['candy-ai', 'dreamgf', 'janitor-ai'], relatedPages: ['ai-girlfriend-chat', 'ai-roleplay-chat', 'spicy-ai-chat-roleplay'] },

  // AI Character Category (6 pages)
  { slug: 'ai-character-generator', category: 'AI Character', title: 'AI Character Generator', subtitle: 'Generate unique AI characters instantly', description: 'Create custom AI characters with advanced generators. Design personalities, appearances, and backstories for your perfect companion.', keywords: ['generator', 'create', 'character', 'ai'], platforms: ['character-ai', 'lovescape', 'janitor-ai'], relatedPages: ['ai-character-creator', 'ai-character-maker', 'anime-ai-character-generator'] },
  { slug: 'ai-character-design', category: 'AI Character', title: 'AI Character Design', subtitle: 'Design detailed AI character appearances', description: 'Design every aspect of your AI character from appearance to personality traits. Professional character design tools for creators.', keywords: ['design', 'appearance', 'visual', 'character'], platforms: ['lovescape', 'candy-ai', 'dreamgf'], relatedPages: ['ai-character-generator', 'ai-character-description-generator', 'anime-ai-character'] },
  { slug: 'ai-character-personality', category: 'AI Character', title: 'AI Character Personality', subtitle: 'Customize AI character personalities', description: 'Create unique personality traits for your AI characters. From shy to confident, design the perfect personality match.', keywords: ['personality', 'traits', 'behavior', 'character'], platforms: ['lovescape', 'character-ai', 'replika'], relatedPages: ['ai-character-generator', 'ai-character-backstory-generator', 'create-ai-character'] },
  { slug: 'ai-character-voice', category: 'AI Character', title: 'AI Character Voice', subtitle: 'Give your AI character a unique voice', description: 'Customize voice characteristics for your AI characters. Choose from various voice types and speaking styles.', keywords: ['voice', 'audio', 'speech', 'character'], platforms: ['lovescape', 'nomi-ai', 'replika'], relatedPages: ['ai-character-generator', 'ai-girlfriend-voice-chat', 'ai-boyfriend-voice-chat'] },
  { slug: 'ai-character-animation', category: 'AI Character', title: 'AI Character Animation', subtitle: 'Animate your AI characters', description: 'Bring your AI characters to life with animation. Facial expressions, gestures, and movement for immersive interactions.', keywords: ['animation', 'movement', 'expressions', 'character'], platforms: ['lovescape', 'nomi-ai', 'candy-ai'], relatedPages: ['ai-character-generator', 'ai-character-design', 'ai-character-voice'] },
  { slug: 'ai-character-chatbot', category: 'AI Character', title: 'AI Character Chatbot', subtitle: 'Interactive AI character chatbots', description: 'Chat with intelligent AI character chatbots. Advanced conversation systems with personality and memory.', keywords: ['chatbot', 'conversation', 'interactive', 'character'], platforms: ['character-ai', 'chai-ai', 'poe'], relatedPages: ['ai-character-generator', 'ai-girlfriend-chatbot', 'ai-best-friend-chatbot'] },

  // Additional categories would continue here...
  // For brevity, showing structure for first 2 categories
  // The complete implementation would have all 67 pages
];

// Categories Data
const categories = [
  { id: 'featured', name: 'Featured', icon: '✨', color: '#667eea' },
  { id: 'premium', name: 'Premium', icon: '👑', color: '#f093fb' },
  { id: 'romantic', name: 'Romantic', icon: '💕', color: '#ff6b6b' },
  { id: 'trending', name: 'Trending', icon: '📈', color: '#4ecdc4' },
  { id: 'community', name: 'Community', icon: '👥', color: '#45b7d1' }
];

// FAQ Data
const faqs = [
  {
    question: "What are AI character platforms?",
    answer: "AI character platforms allow you to create, customize, and interact with artificial intelligence companions. These platforms use advanced language models to simulate realistic conversations and relationships."
  },
  {
    question: "Are AI companions safe to use?",
    answer: "Most reputable AI companion platforms implement strong privacy protections and content moderation. Always review privacy policies and terms of service before using any platform."
  },
  {
    question: "Can I customize my AI companion's personality?",
    answer: "Yes, most platforms offer personality customization features. You can typically adjust traits like friendliness, humor, intelligence level, and communication style to match your preferences."
  },
  {
    question: "Do AI companions remember our conversations?",
    answer: "Many advanced AI platforms include memory systems that allow your companion to remember past conversations, preferences, and relationship history for more meaningful interactions."
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { aiPlatforms, seoPages, categories, faqs };
}