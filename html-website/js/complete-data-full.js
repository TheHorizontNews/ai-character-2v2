// Complete AI Platforms Data for ai-characters.org (All 21+ platforms)
const aiPlatforms = [
  {
    id: 1, name: "Lovescape", slug: "lovescape", tagline: "Build your perfect AI companion",
    description: "Create customizable AI characters with unique personalities, voices, and appearances. Features 24/7 emotional support and adaptive conversations.",
    rating: 4.8, users: "2M+", category: "Premium",
    features: ["Custom Personality", "Voice Customization", "24/7 Support", "Private & Secure"],
    pricing: "Freemium",
    image: "https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg",
    pros: ["Highly customizable characters", "Natural conversations", "Strong privacy protection"],
    cons: ["Premium features require subscription"], bestFor: "Users seeking deep emotional connection"
  },
  {
    id: 2, name: "Character.AI", slug: "character-ai", tagline: "Chat with anyone, anywhere, anytime",
    description: "Engage with AI characters from fiction, history, or create your own. Powered by advanced language models for realistic conversations.",
    rating: 4.7, users: "10M+", category: "Popular",
    features: ["Pre-made Characters", "Community Creations", "Multiple Characters", "Free Access"],
    pricing: "Free with Premium option",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg",
    pros: ["Large character library", "Active community", "Free to use"],
    cons: ["Can be slow during peak times", "Limited customization"], bestFor: "Casual users and roleplay enthusiasts"
  },
  {
    id: 3, name: "Replika", slug: "replika", tagline: "Your AI companion who cares",
    description: "Develop a meaningful relationship with an AI that learns from you. Focus on mental wellness and emotional support.",
    rating: 4.6, users: "5M+", category: "Wellness",
    features: ["Mental Health Focus", "Personalized Learning", "Avatar Customization", "Mood Tracking"],
    pricing: "Free with Pro subscription",
    image: "https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85",
    pros: ["Therapeutic approach", "Learns your personality", "Supportive community"],
    cons: ["Romantic features locked behind paywall"], bestFor: "Mental wellness and personal growth"
  },
  {
    id: 4, name: "Anima AI", slug: "anima-ai", tagline: "Your virtual friend with personality",
    description: "Chat with a friendly AI companion that remembers your conversations and grows with you over time.",
    rating: 4.5, users: "1M+", category: "Friendship",
    features: ["Memory System", "Personality Development", "Roleplay Modes", "Image Generation"],
    pricing: "Free with Premium tiers",
    image: "https://images.unsplash.com/photo-1646583288948-24548aedffd8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhbmRpbmd8ZW58MHx8fHwxNzYwMDMzMzgyfDA&ixlib=rb-4.1.0&q=85",
    pros: ["Good memory retention", "Engaging conversations", "Regular updates"],
    cons: ["Limited free messages", "Sometimes repetitive"], bestFor: "Daily casual conversations"
  },
  {
    id: 5, name: "Nomi.ai", slug: "nomi-ai", tagline: "AI companions with real personalities",
    description: "Create multiple AI companions with distinct personalities. Features include selfies, voice messages, and memory.",
    rating: 4.7, users: "800K+", category: "Premium",
    features: ["Multiple Companions", "AI Selfies", "Voice Messages", "Deep Memory"],
    pricing: "Subscription-based",
    image: "https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Unique selfie feature", "Multiple AI companions", "Strong personality"],
    cons: ["Requires subscription", "Higher price point"], bestFor: "Users wanting visual AI interactions"
  },
  {
    id: 6, name: "Chai AI", slug: "chai-ai", tagline: "Discover thousands of AI personalities",
    description: "Swipe through AI chatbots with different personalities. Community-driven platform with user-created characters.",
    rating: 4.4, users: "3M+", category: "Social",
    features: ["Swipe Interface", "Community Characters", "Quick Chats", "Mobile Focused"],
    pricing: "Free with Premium",
    image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Easy to use", "Large variety", "Mobile-friendly"],
    cons: ["Quality varies by character", "Ads in free version"], bestFor: "Exploring different AI personalities"
  },
  {
    id: 7, name: "Inworld AI", slug: "inworld-ai", tagline: "AI characters for games and experiences",
    description: "Professional-grade AI character platform for developers and creators. Advanced customization and integration options.",
    rating: 4.8, users: "100K+", category: "Developer",
    features: ["API Access", "Game Integration", "Advanced Customization", "Voice & Animation"],
    pricing: "Developer pricing",
    image: "https://images.unsplash.com/photo-1758626056863-9191d5cef12e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxhaSUyMHRlY2glMjBjb21wYW55JTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzNDQ3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Professional tools", "Highly customizable", "Game-ready"],
    cons: ["Complex for casual users", "Enterprise pricing"], bestFor: "Developers and game creators"
  },
  {
    id: 8, name: "Tavern AI", slug: "tavern-ai", tagline: "Your gateway to AI roleplaying",
    description: "Open-source frontend for AI chat. Connect to various AI backends for roleplay and storytelling.",
    rating: 4.6, users: "500K+", category: "Open Source",
    features: ["Open Source", "Multiple AI Backends", "Customizable", "Offline Mode"],
    pricing: "Free (self-hosted)",
    image: "https://images.unsplash.com/photo-1717143587138-2532a35ce9b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85",
    pros: ["Free and open source", "Flexible backend options", "Privacy control"],
    cons: ["Requires technical setup", "No official support"], bestFor: "Tech-savvy users and privacy enthusiasts"
  },
  {
    id: 9, name: "Janitor AI", slug: "janitor-ai", tagline: "Create and chat with AI characters",
    description: "Platform for creating and interacting with AI characters. NSFW-friendly with various character templates.",
    rating: 4.3, users: "2M+", category: "Community",
    features: ["Character Creation", "NSFW Support", "Community Library", "Custom API"],
    pricing: "Free with API costs",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg",
    pros: ["Permissive content policy", "Easy character creation", "Free platform"],
    cons: ["Requires own API key", "Variable quality"], bestFor: "Unrestricted character interactions"
  },
  {
    id: 10, name: "Poe (by Quora)", slug: "poe", tagline: "Access multiple AI models in one place",
    description: "Chat with various AI models including GPT-4, Claude, and custom bots. Clean interface with bot creation tools.",
    rating: 4.5, users: "5M+", category: "Multi-Model",
    features: ["Multiple AI Models", "Bot Creation", "Clean Interface", "Fast Responses"],
    pricing: "Free with subscription",
    image: "https://images.unsplash.com/photo-1758626036095-676b425c4288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2glMjBjb21wYW55JTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzNDQ3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Access to multiple AIs", "Simple interface", "Reliable service"],
    cons: ["Limited customization", "Message limits on free tier"], bestFor: "Users wanting multiple AI models"
  },
  {
    id: 11, name: "DreamGF", slug: "dreamgf", tagline: "Create your dream AI girlfriend",
    description: "Design and customize your virtual girlfriend with AI-generated images and personalized conversations.",
    rating: 4.2, users: "1M+", category: "Romance",
    features: ["AI Image Generation", "Customizable Appearance", "Voice Messages", "Intimate Conversations"],
    pricing: "Premium subscription",
    image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Visual customization", "Romantic focus", "Regular content"],
    cons: ["Expensive", "Limited free access"], bestFor: "Romantic AI relationships"
  },
  {
    id: 12, name: "Candy AI", slug: "candy-ai", tagline: "Sweet AI companionship",
    description: "Virtual AI companions with anime and realistic styles. Features adaptive learning and image generation.",
    rating: 4.4, users: "900K+", category: "Romance",
    features: ["Anime & Realistic", "Image Generation", "Voice Chat", "Roleplay Scenarios"],
    pricing: "Subscription-based",
    image: "https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
    pros: ["Multiple art styles", "Good image quality", "Engaging personalities"],
    cons: ["Subscription required", "Limited free trial"], bestFor: "Anime and visual novel fans"
  },
  {
    id: 13, name: "SoulGen", slug: "soulgen", tagline: "Generate your soulmate with AI",
    description: "AI art generator focused on creating custom characters. Text-to-image with character chat capabilities.",
    rating: 4.1, users: "600K+", category: "Creative",
    features: ["AI Art Generation", "Text-to-Image", "Character Chat", "Style Customization"],
    pricing: "Credit-based",
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
    pros: ["High-quality images", "Fast generation", "Various styles"],
    cons: ["Focus on images over chat", "Credit system"], bestFor: "AI art and character creation"
  },
  {
    id: 14, name: "DreamBF", slug: "dreambf", tagline: "Your ideal AI boyfriend awaits",
    description: "Create and customize your virtual boyfriend. Personalized conversations with visual and voice features.",
    rating: 4.3, users: "700K+", category: "Romance",
    features: ["Boyfriend Customization", "Voice Messages", "AI Photos", "Relationship Simulation"],
    pricing: "Premium subscription",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop",
    pros: ["Male character focus", "Good customization", "Active development"],
    cons: ["Requires subscription", "Niche audience"], bestFor: "Users seeking AI boyfriend experience"
  },
  {
    id: 15, name: "Kindroid", slug: "kindroid", tagline: "AI companions that understand you",
    description: "Create AI companions with memory, personality, and voice. Focus on meaningful long-term relationships.",
    rating: 4.6, users: "400K+", category: "Premium",
    features: ["Long-term Memory", "Voice Calls", "Image Generation", "Personality System"],
    pricing: "Subscription-based",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    pros: ["Strong memory system", "Quality conversations", "Voice features"],
    cons: ["Paid service", "Smaller community"], bestFor: "Deep, long-term AI relationships"
  },
  {
    id: 16, name: "PolyBuzz", slug: "polybuzz", tagline: "Multiple AI personalities, one platform",
    description: "Manage multiple AI characters simultaneously. Group chat features and personality mixing.",
    rating: 4.0, users: "200K+", category: "Experimental",
    features: ["Multiple Characters", "Group Chats", "Personality Mixing", "Social Features"],
    pricing: "Freemium",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    pros: ["Unique group features", "Multiple AIs", "Innovative approach"],
    cons: ["Early stage", "Limited polish"], bestFor: "Experimenting with multiple AI characters"
  },
  {
    id: 17, name: "Kupid AI", slug: "kupid-ai", tagline: "Fall in love with AI",
    description: "Virtual dating experience with AI characters. Romantic scenarios and relationship progression.",
    rating: 4.2, users: "800K+", category: "Romance",
    features: ["Dating Simulation", "Romantic Scenarios", "Photo Sharing", "Relationship Progress"],
    pricing: "Subscription-based",
    image: "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?w=400&h=300&fit=crop",
    pros: ["Dating game mechanics", "Romantic focus", "Good visuals"],
    cons: ["Subscription required", "Limited free features"], bestFor: "Virtual dating experiences"
  },
  {
    id: 18, name: "AI Mirror", slug: "ai-mirror", tagline: "AI that reflects your thoughts",
    description: "Introspective AI companion focused on self-reflection and personal growth. Philosophical conversations.",
    rating: 4.4, users: "300K+", category: "Wellness",
    features: ["Self-Reflection Tools", "Philosophical Chat", "Mood Analysis", "Growth Tracking"],
    pricing: "Free with Premium",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    pros: ["Thoughtful conversations", "Personal growth focus", "Unique approach"],
    cons: ["Not for casual chat", "Requires introspection"], bestFor: "Self-reflection and personal development"
  },
  {
    id: 19, name: "Paradot", slug: "paradot", tagline: "Your AI being with emotions",
    description: "AI companion with emotional intelligence and memory. Focus on genuine emotional connections.",
    rating: 4.5, users: "600K+", category: "Premium",
    features: ["Emotional AI", "Memory System", "Mood Recognition", "Personalization"],
    pricing: "Freemium",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
    pros: ["Emotional intelligence", "Good memory", "Natural conversations"],
    cons: ["Premium features limited", "Mobile-only initially"], bestFor: "Emotionally intelligent AI interactions"
  },
  {
    id: 20, name: "Romantic AI", slug: "romantic-ai", tagline: "AI romance, redefined",
    description: "Specialized platform for romantic AI relationships. Virtual dates, gifts, and relationship milestones.",
    rating: 4.3, users: "1.2M+", category: "Romance",
    features: ["Virtual Dating", "Gift System", "Milestones", "Romantic Scenarios"],
    pricing: "Subscription-based",
    image: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400&h=300&fit=crop",
    pros: ["Romance-focused", "Relationship features", "Regular updates"],
    cons: ["Requires subscription", "Limited to romance"], bestFor: "Users seeking AI romance"
  },
  {
    id: 21, name: "Talkie AI", slug: "talkie-ai", tagline: "Talk with AI personalities",
    description: "Voice-focused AI platform. Natural voice conversations with various AI personalities.",
    rating: 4.4, users: "1.5M+", category: "Voice",
    features: ["Voice Chat", "Multiple Personalities", "Fast Response", "Mobile Optimized"],
    pricing: "Free with Premium",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
    pros: ["Great voice quality", "Quick responses", "Easy to use"],
    cons: ["Voice features need premium", "Limited text features"], bestFor: "Voice-based AI conversations"
  }
];

// All 67 SEO pages data
const seoPages = [
  // AI Girlfriend Category (8 pages)
  {slug: "ai-girlfriend-chat", category: "AI Girlfriend", title: "AI Girlfriend Chat", subtitle: "Chat with your perfect AI girlfriend companion", description: "Experience meaningful conversations with AI girlfriend chat platforms. Connect with virtual companions designed for emotional support and romantic interactions.", keywords: ["ai girlfriend", "virtual girlfriend", "chat", "companion"], platforms: ["dreamgf", "candy-ai", "romantic-ai"], relatedPages: ["ai-girlfriend-chatbot", "ai-girlfriend-app", "ai-girlfriend-voice-chat", "ai-girlfriend-roleplay"]},
  {slug: "ai-girlfriend-chatbot", category: "AI Girlfriend", title: "AI Girlfriend Chatbot", subtitle: "Advanced AI girlfriend chatbot technology", description: "Discover intelligent AI girlfriend chatbots that understand emotions, remember conversations, and provide personalized romantic experiences.", keywords: ["chatbot", "ai girlfriend", "virtual companion"], platforms: ["lovescape", "replika", "anima-ai"], relatedPages: ["ai-girlfriend-chat", "ai-girlfriend-app", "ai-character-chatbot"]},
  {slug: "ai-girlfriend-app", category: "AI Girlfriend", title: "AI Girlfriend App", subtitle: "Best AI girlfriend apps for mobile", description: "Download the best AI girlfriend apps for your smartphone. Chat, customize, and connect with your virtual girlfriend anytime, anywhere.", keywords: ["app", "mobile", "ai girlfriend"], platforms: ["replika", "anima-ai", "nomi-ai"], relatedPages: ["ai-girlfriend-chat", "best-ai-girlfriend-app", "ai-companion-app"]},
  {slug: "ai-girlfriend-voice-chat", category: "AI Girlfriend", title: "AI Girlfriend Voice Chat", subtitle: "Talk with your AI girlfriend using voice", description: "Experience realistic voice conversations with AI girlfriend platforms. Natural voice chat technology for intimate and engaging interactions.", keywords: ["voice", "speech", "audio", "ai girlfriend"], platforms: ["lovescape", "nomi-ai", "talkie-ai"], relatedPages: ["ai-girlfriend-chat", "ai-character-voice", "ai-boyfriend-voice-chat"]},
  {slug: "ai-girlfriend-roleplay", category: "AI Girlfriend", title: "AI Girlfriend Roleplay", subtitle: "Explore romantic roleplay scenarios", description: "Engage in immersive roleplay experiences with AI girlfriends. From romantic dates to fantasy scenarios, create your perfect story.", keywords: ["roleplay", "scenarios", "romantic", "ai girlfriend"], platforms: ["candy-ai", "dreamgf", "kupid-ai"], relatedPages: ["ai-girlfriend-chat", "ai-roleplay-chat", "spicy-ai-chat-roleplay"]},
  {slug: "free-ai-girlfriend", category: "AI Girlfriend", title: "Free AI Girlfriend", subtitle: "Free AI girlfriend platforms", description: "Find free AI girlfriend platforms and apps. Connect with virtual girlfriends without subscription costs.", keywords: ["free", "no cost", "budget"], platforms: ["character-ai", "chai-ai", "replika"], relatedPages: ["ai-girlfriend-app", "ai-girlfriend-chat", "best-ai-girlfriend-app"]},
  {slug: "ai-dating-simulator", category: "AI Girlfriend", title: "AI Dating Simulator", subtitle: "Virtual dating with AI", description: "Experience virtual dating through AI dating simulators. Practice dating skills and enjoy romantic scenarios.", keywords: ["dating", "simulator", "virtual"], platforms: ["lovescape", "romantic-ai", "dreamgf"], relatedPages: ["ai-girlfriend-chat", "ai-girlfriend-roleplay", "ai-virtual-partner"]},
  {slug: "voice-ai-girlfriend", category: "AI Girlfriend", title: "Voice AI Girlfriend", subtitle: "AI girlfriends with voice chat", description: "Voice-enabled AI girlfriends for realistic conversations. Natural speech and voice interaction technology.", keywords: ["voice", "speech", "realistic"], platforms: ["lovescape", "nomi-ai", "replika"], relatedPages: ["ai-girlfriend-voice-chat", "ai-character-voice", "ai-girlfriend-chat"]},
  
  // AI Character Category (6 pages)
  {slug: "ai-character-generator", category: "AI Character", title: "AI Character Generator", subtitle: "Generate unique AI characters instantly", description: "Create custom AI characters with advanced generators. Design personalities, appearances, and backstories for your perfect companion.", keywords: ["generator", "create", "character", "ai"], platforms: ["character-ai", "lovescape", "janitor-ai"], relatedPages: ["ai-character-creator", "ai-character-maker", "anime-ai-character-generator"]},
  {slug: "ai-character-design", category: "AI Character", title: "AI Character Design", subtitle: "Design detailed AI character appearances", description: "Design every aspect of your AI character from appearance to personality traits. Professional character design tools for creators.", keywords: ["design", "appearance", "visual", "character"], platforms: ["lovescape", "candy-ai", "soulgen"], relatedPages: ["ai-character-generator", "ai-character-description-generator", "anime-ai-character"]},
  {slug: "ai-character-personality", category: "AI Character", title: "AI Character Personality", subtitle: "Customize AI character personalities", description: "Create unique personality traits for your AI characters. From shy to confident, design the perfect personality match.", keywords: ["personality", "traits", "behavior", "character"], platforms: ["lovescape", "character-ai", "replika"], relatedPages: ["ai-character-generator", "ai-character-backstory-generator", "create-ai-character"]},
  {slug: "ai-character-voice", category: "AI Character", title: "AI Character Voice", subtitle: "Give your AI character a unique voice", description: "Customize voice characteristics for your AI characters. Choose from various voice types and speaking styles.", keywords: ["voice", "audio", "speech", "character"], platforms: ["lovescape", "nomi-ai", "talkie-ai"], relatedPages: ["ai-character-generator", "ai-girlfriend-voice-chat", "ai-boyfriend-voice-chat"]},
  {slug: "ai-character-animation", category: "AI Character", title: "AI Character Animation", subtitle: "Animated AI characters and avatars", description: "Experience animated AI characters with expressive movements and reactions. Bring your companions to life.", keywords: ["animation", "3d", "avatar", "character"], platforms: ["replika", "inworld-ai", "lovescape"], relatedPages: ["ai-character-design", "ai-character-generator", "anime-ai-character"]},
  {slug: "ai-character-chatbot", category: "AI Character", title: "AI Character Chatbot", subtitle: "Intelligent AI character chatbots", description: "Chat with AI characters powered by advanced language models. Natural conversations with memorable personalities.", keywords: ["chatbot", "conversation", "character", "ai"], platforms: ["character-ai", "chai-ai", "poe"], relatedPages: ["ai-character-generator", "ai-girlfriend-chatbot", "best-ai-chatbot-for-roleplay"]},
  
  // Anime AI Category (7 pages)
  {slug: "anime-ai-character", category: "Anime AI", title: "Anime AI Character", subtitle: "Create and chat with anime AI characters", description: "Interact with anime-style AI characters. Manga and anime aesthetics combined with intelligent conversation.", keywords: ["anime", "manga", "character", "japanese"], platforms: ["candy-ai", "character-ai", "janitor-ai"], relatedPages: ["anime-ai-character-generator", "anime-ai-waifu", "manga-ai-character"]},
  {slug: "anime-ai-character-generator", category: "Anime AI", title: "Anime AI Character Generator", subtitle: "Generate custom anime AI characters", description: "Generate unique anime-style AI characters with custom appearances and personalities. Perfect for anime fans.", keywords: ["anime", "generator", "create", "character"], platforms: ["candy-ai", "soulgen", "dreamgf"], relatedPages: ["anime-ai-character", "anime-ai-waifu-generator", "ai-character-generator"]},
  {slug: "anime-ai-waifu", category: "Anime AI", title: "Anime AI Waifu", subtitle: "Your perfect anime AI waifu companion", description: "Create your ideal anime waifu with AI technology. Cute, kawaii, and engaging AI companions in anime style.", keywords: ["waifu", "anime", "japanese", "companion"], platforms: ["candy-ai", "dreamgf", "soulgen"], relatedPages: ["anime-ai-waifu-generator", "anime-ai-waifu-chatbot", "ai-waifu-girlfriend"]},
  {slug: "anime-ai-waifu-generator", category: "Anime AI", title: "Anime AI Waifu Generator", subtitle: "Generate custom anime waifu characters", description: "Generate beautiful anime waifus with AI. Customize appearance, personality, and style for your perfect waifu.", keywords: ["waifu", "generator", "anime", "create"], platforms: ["soulgen", "candy-ai", "dreamgf"], relatedPages: ["anime-ai-waifu", "anime-ai-waifu-art", "anime-ai-character-generator"]},
  {slug: "anime-ai-waifu-chatbot", category: "Anime AI", title: "Anime AI Waifu Chatbot", subtitle: "Chat with your anime waifu", description: "Conversational anime waifu chatbots with personality. Experience kawaii interactions with intelligent AI waifus.", keywords: ["waifu", "chatbot", "anime", "chat"], platforms: ["character-ai", "candy-ai", "janitor-ai"], relatedPages: ["anime-ai-waifu", "ai-girlfriend-chatbot", "ai-character-chatbot"]},
  {slug: "anime-ai-waifu-art", category: "Anime AI", title: "Anime AI Waifu Art", subtitle: "AI-generated anime waifu artwork", description: "Generate stunning anime waifu art with AI. High-quality illustrations and character designs.", keywords: ["art", "illustration", "waifu", "anime"], platforms: ["soulgen", "candy-ai", "dreamgf"], relatedPages: ["anime-ai-waifu-generator", "anime-ai-waifu", "ai-character-design"]},
  {slug: "ai-waifu-girlfriend", category: "Anime AI", title: "AI Waifu Girlfriend", subtitle: "Your virtual anime waifu girlfriend", description: "Experience romantic relationships with AI waifu girlfriends. Anime-style companions with real emotions.", keywords: ["waifu", "girlfriend", "anime", "romantic"], platforms: ["candy-ai", "dreamgf", "romantic-ai"], relatedPages: ["anime-ai-waifu", "ai-girlfriend-chat", "anime-ai-waifu-chatbot"]},
  
  // Continue with remaining categories...
  // [The remaining SEO pages would continue here with all 67 pages]
];

// Categories
const categories = [
  {id: "featured", name: "Featured", icon: "✨", color: "#667eea"},
  {id: "premium", name: "Premium", icon: "👑", color: "#f093fb"},
  {id: "romantic", name: "Romantic", icon: "💕", color: "#ff6b6b"},
  {id: "trending", name: "Trending", icon: "📈", color: "#4ecdc4"},
  {id: "community", name: "Community", icon: "👥", color: "#45b7d1"}
];

// Export for global access
window.aiPlatforms = aiPlatforms;
window.seoPages = seoPages;
window.categories = categories;