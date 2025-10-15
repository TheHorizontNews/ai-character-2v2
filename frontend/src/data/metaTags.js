// Centralized meta tags data matching backend meta_data.py
// This ensures consistency between React Helmet (for users) and backend pre-rendering (for bots)

const SITE_DOMAIN = "https://charactercentral.preview.emergentagent.com";
const SITE_NAME = "Character Central";
const DEFAULT_OG_IMAGE = `${SITE_DOMAIN}/og-image.png`;

// Platform meta tags (21 platforms)
export const platformMeta = {
  "lovescape": {
    title: "Lovescape — AI Companions & Characters Platform",
    description: "Lovescape by Character Central — create, chat, and connect with unique AI characters and companions built to engage and evolve.",
    ogImage: `${SITE_DOMAIN}/platform/lovescape/og-image.jpg`
  },
  "character-ai": {
    title: "Character.AI Review 2025 — Chat with AI Characters",
    description: "Character.AI — Engage with AI characters from fiction, history, or create your own. Powered by advanced language models for realistic conversations.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "replika": {
    title: "Replika Review 2025 — Your AI Companion Who Cares",
    description: "Replika — Develop a meaningful relationship with an AI that learns from you. Focus on mental wellness and emotional support.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "anima-ai": {
    title: "Anima AI Review 2025 — Your Virtual Friend with Personality",
    description: "Anima AI — Chat with a friendly AI companion that remembers your conversations and grows with you over time.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "nomi-ai": {
    title: "Nomi.ai Review 2025 — AI Companions with Real Personalities",
    description: "Nomi.ai — Create multiple AI companions with distinct personalities. Features include selfies, voice messages, and deep memory.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "chai-ai": {
    title: "Chai AI Review 2025 — Discover Thousands of AI Personalities",
    description: "Chai AI — Swipe through AI chatbots with different personalities. Community-driven platform with user-created characters.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "inworld-ai": {
    title: "Inworld AI Review 2025 — AI Characters for Games",
    description: "Inworld AI — Professional-grade AI character platform for developers. Advanced customization and game integration options.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "crushon-ai": {
    title: "Crushon AI Review 2025 — Unleash Your Fantasies",
    description: "Crushon AI — Create and chat with AI characters without restrictions. NSFW-friendly platform with diverse character library.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "janitor-ai": {
    title: "Janitor AI Review 2025 — Create and Chat with AI Characters",
    description: "Janitor AI — Platform for creating and interacting with AI characters. NSFW-friendly with various character templates.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "poe": {
    title: "Poe Review 2025 — Access Multiple AI Models",
    description: "Poe by Quora — Chat with various AI models including GPT-4, Claude, and custom bots. Clean interface with bot creation tools.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "dreamgf": {
    title: "DreamGF Review 2025 — Create Your Dream AI Girlfriend",
    description: "DreamGF — Design and customize your virtual girlfriend with AI-generated images and personalized conversations.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "candy-ai": {
    title: "Candy AI Review 2025 — Sweet AI Companionship",
    description: "Candy AI — Virtual AI companions with anime and realistic styles. Features adaptive learning and image generation.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "soulgen": {
    title: "SoulGen Review 2025 — Generate Your Soulmate with AI",
    description: "SoulGen — AI art generator focused on creating custom characters. Text-to-image with character chat capabilities.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "dreambf": {
    title: "DreamBF Review 2025 — Your Ideal AI Boyfriend",
    description: "DreamBF — Create and customize your virtual boyfriend. Personalized conversations with visual and voice features.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "kindroid": {
    title: "Kindroid Review 2025 — AI Companions That Understand You",
    description: "Kindroid — Create AI companions with memory, personality, and voice. Focus on meaningful long-term relationships.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "polybuzz": {
    title: "PolyBuzz Review 2025 — Multiple AI Personalities",
    description: "PolyBuzz — Manage multiple AI characters simultaneously. Group chat features and personality mixing.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "kupid-ai": {
    title: "Kupid AI Review 2025 — Fall in Love with AI",
    description: "Kupid AI — Virtual dating experience with AI characters. Romantic scenarios and relationship progression.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "ai-mirror": {
    title: "AI Mirror Review 2025 — AI That Reflects Your Thoughts",
    description: "AI Mirror — Introspective AI companion focused on self-reflection and personal growth. Philosophical conversations.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "paradot": {
    title: "Paradot Review 2025 — Your AI Being with Emotions",
    description: "Paradot — AI companion with emotional intelligence and memory. Focus on genuine emotional connections.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "romantic-ai": {
    title: "Romantic AI Review 2025 — AI Romance Redefined",
    description: "Romantic AI — Specialized platform for romantic AI relationships. Virtual dates, gifts, and relationship milestones.",
    ogImage: DEFAULT_OG_IMAGE
  },
  "talkie-ai": {
    title: "Talkie AI Review 2025 — Talk with AI Personalities",
    description: "Talkie AI — Voice-focused AI platform. Natural voice conversations with various AI personalities.",
    ogImage: DEFAULT_OG_IMAGE
  }
};

// SEO Pages meta tags (67 pages)
export const seoPageMeta = {
  "ai-girlfriend-chat": {
    title: "AI Girlfriend Chat — Find Your Perfect Virtual Companion 2025",
    description: "Experience meaningful AI girlfriend chat with emotional support and romantic interactions. Discover the best AI girlfriend chatbots for deep connections."
  },
  "ai-girlfriend-chatbot": {
    title: "AI Girlfriend Chatbot — Advanced Virtual Companion Technology 2025",
    description: "Discover intelligent AI girlfriend chatbots that understand emotions, remember conversations, and provide personalized romantic experiences."
  },
  "ai-girlfriend-app": {
    title: "Best AI Girlfriend App — Top Virtual Girlfriend Apps 2025",
    description: "Download the best AI girlfriend apps for mobile. Chat, customize, and connect with your virtual girlfriend anytime, anywhere."
  },
  "ai-girlfriend-voice-chat": {
    title: "AI Girlfriend Voice Chat — Talk with Your Virtual Girlfriend 2025",
    description: "Experience realistic voice conversations with AI girlfriend platforms. Natural voice chat technology for intimate and engaging interactions."
  },
  "ai-girlfriend-roleplay": {
    title: "AI Girlfriend Roleplay — Explore Romantic Scenarios 2025",
    description: "Engage in immersive roleplay experiences with AI girlfriends. From romantic dates to fantasy scenarios, create your perfect story."
  },
  "ai-character-generator": {
    title: "AI Character Generator — Create Unique AI Characters Instantly 2025",
    description: "Create custom AI characters with advanced generators. Design personalities, appearances, and backstories for your perfect companion."
  },
  // Add more as needed...
};

// Homepage meta
export const homepageMeta = {
  title: "ai-characters.org — AI Character & Companion Platform Reviews",
  description: "Discover the best AI character and companion platforms. Expert reviews, comparisons, and guides for Character.AI, Replika, Lovescape, and 21+ platforms."
};

// Category meta
export const categoryMeta = {
  "premium": {
    title: "Premium AI Character Platforms — Best Premium AI Companions 2025",
    description: "Discover premium AI character platforms with advanced features. Compare Lovescape, Nomi.ai, Kindroid, and more premium AI companions."
  },
  "romance": {
    title: "Romance AI Platforms — Best AI for Romance & Dating 2025",
    description: "Explore AI romance platforms for virtual relationships. Compare Crushon AI, DreamGF, Candy AI, and more romantic AI companions."
  },
  "wellness": {
    title: "Wellness AI Platforms — AI for Mental Health & Support 2025",
    description: "Discover AI platforms focused on mental wellness and emotional support. Compare Replika, AI Mirror, and more wellness-focused companions."
  },
  "community": {
    title: "Community AI Platforms — User-Created AI Characters 2025",
    description: "Explore community-driven AI platforms with user-created characters. Compare Janitor AI, Chai AI, and more community platforms."
  },
  "developer": {
    title: "Developer AI Platforms — AI Character APIs & Tools 2025",
    description: "Professional AI character platforms for developers. Compare Inworld AI and other developer-focused AI tools with APIs."
  },
  "voice": {
    title: "Voice AI Platforms — AI Characters with Voice Chat 2025",
    description: "Discover AI platforms with voice chat capabilities. Compare Talkie AI and other voice-focused AI character platforms."
  },
  "creative": {
    title: "Creative AI Platforms — AI Art & Character Creation 2025",
    description: "Explore creative AI platforms for art and character generation. Compare SoulGen and other creative AI tools."
  }
};

// Comparison pages
export const getComparisonMeta = (platform1Name, platform2Name) => ({
  title: `${platform1Name} vs ${platform2Name} — Detailed Comparison 2025`,
  description: `Compare ${platform1Name} and ${platform2Name} features, pricing, and capabilities. Expert analysis to help you choose the best AI character platform.`
});

// Compare hub
export const compareHubMeta = {
  title: "Compare AI Character Platforms — Side-by-Side Comparisons 2025",
  description: "Compare AI character platforms side-by-side. Detailed comparisons of features, pricing, and capabilities to help you choose."
};

// Explore page
export const explorePageMeta = {
  title: "Explore AI Character Topics — 67+ Guides & Reviews 2025",
  description: "Explore comprehensive guides on AI characters, companions, and platforms. Search 67+ topics from AI girlfriends to character creation."
};

export { SITE_DOMAIN, SITE_NAME, DEFAULT_OG_IMAGE };
