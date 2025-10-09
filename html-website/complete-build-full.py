#!/usr/bin/env python3
"""
Complete website generator for ai-characters.org
Generates ALL pages: platforms, categories, SEO pages, explore
All 67 SEO pages + 21+ platform pages + 5 category pages
"""

import os
import json
from pathlib import Path

# Complete platform data (21 platforms from mockData.js)
platforms_data = [
    {
        "id": 1, "name": "Lovescape", "slug": "lovescape", "tagline": "Build your perfect AI companion",
        "description": "Create customizable AI characters with unique personalities, voices, and appearances. Features 24/7 emotional support and adaptive conversations.",
        "rating": 4.8, "users": "2M+", "category": "Premium",
        "features": ["Custom Personality", "Voice Customization", "24/7 Support", "Private & Secure"],
        "pricing": "Freemium",
        "image": "https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg",
        "pros": ["Highly customizable characters", "Natural conversations", "Strong privacy protection"],
        "cons": ["Premium features require subscription"], "bestFor": "Users seeking deep emotional connection"
    },
    {
        "id": 2, "name": "Character.AI", "slug": "character-ai", "tagline": "Chat with anyone, anywhere, anytime",
        "description": "Engage with AI characters from fiction, history, or create your own. Powered by advanced language models for realistic conversations.",
        "rating": 4.7, "users": "10M+", "category": "Popular",
        "features": ["Pre-made Characters", "Community Creations", "Multiple Characters", "Free Access"],
        "pricing": "Free with Premium option",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg",
        "pros": ["Large character library", "Active community", "Free to use"],
        "cons": ["Can be slow during peak times", "Limited customization"], "bestFor": "Casual users and roleplay enthusiasts"
    },
    {
        "id": 3, "name": "Replika", "slug": "replika", "tagline": "Your AI companion who cares",
        "description": "Develop a meaningful relationship with an AI that learns from you. Focus on mental wellness and emotional support.",
        "rating": 4.6, "users": "5M+", "category": "Wellness",
        "features": ["Mental Health Focus", "Personalized Learning", "Avatar Customization", "Mood Tracking"],
        "pricing": "Free with Pro subscription",
        "image": "https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Therapeutic approach", "Learns your personality", "Supportive community"],
        "cons": ["Romantic features locked behind paywall"], "bestFor": "Mental wellness and personal growth"
    },
    {
        "id": 4, "name": "Anima AI", "slug": "anima-ai", "tagline": "Your virtual friend with personality",
        "description": "Chat with a friendly AI companion that remembers your conversations and grows with you over time.",
        "rating": 4.5, "users": "1M+", "category": "Friendship",
        "features": ["Memory System", "Personality Development", "Roleplay Modes", "Image Generation"],
        "pricing": "Free with Premium tiers",
        "image": "https://images.unsplash.com/photo-1646583288948-24548aedffd8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhbmRpbmd8ZW58MHx8fHwxNzYwMDMzMzgyfDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Good memory retention", "Engaging conversations", "Regular updates"],
        "cons": ["Limited free messages", "Sometimes repetitive"], "bestFor": "Daily casual conversations"
    },
    {
        "id": 5, "name": "Nomi.ai", "slug": "nomi-ai", "tagline": "AI companions with real personalities",
        "description": "Create multiple AI companions with distinct personalities. Features include selfies, voice messages, and memory.",
        "rating": 4.7, "users": "800K+", "category": "Premium",
        "features": ["Multiple Companions", "AI Selfies", "Voice Messages", "Deep Memory"],
        "pricing": "Subscription-based",
        "image": "https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Unique selfie feature", "Multiple AI companions", "Strong personality"],
        "cons": ["Requires subscription", "Higher price point"], "bestFor": "Users wanting visual AI interactions"
    },
    {
        "id": 6, "name": "Chai AI", "slug": "chai-ai", "tagline": "Discover thousands of AI personalities",
        "description": "Swipe through AI chatbots with different personalities. Community-driven platform with user-created characters.",
        "rating": 4.4, "users": "3M+", "category": "Social",
        "features": ["Swipe Interface", "Community Characters", "Quick Chats", "Mobile Focused"],
        "pricing": "Free with Premium",
        "image": "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Easy to use", "Large variety", "Mobile-friendly"],
        "cons": ["Quality varies by character", "Ads in free version"], "bestFor": "Exploring different AI personalities"
    },
    {
        "id": 7, "name": "Inworld AI", "slug": "inworld-ai", "tagline": "AI characters for games and experiences",
        "description": "Professional-grade AI character platform for developers and creators. Advanced customization and integration options.",
        "rating": 4.8, "users": "100K+", "category": "Developer",
        "features": ["API Access", "Game Integration", "Advanced Customization", "Voice & Animation"],
        "pricing": "Developer pricing",
        "image": "https://images.unsplash.com/photo-1758626056863-9191d5cef12e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxhaSUyMHRlY2glMjBjb21wYW55JTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzNDQ3fDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Professional tools", "Highly customizable", "Game-ready"],
        "cons": ["Complex for casual users", "Enterprise pricing"], "bestFor": "Developers and game creators"
    },
    {
        "id": 8, "name": "Tavern AI", "slug": "tavern-ai", "tagline": "Your gateway to AI roleplaying",
        "description": "Open-source frontend for AI chat. Connect to various AI backends for roleplay and storytelling.",
        "rating": 4.6, "users": "500K+", "category": "Open Source",
        "features": ["Open Source", "Multiple AI Backends", "Customizable", "Offline Mode"],
        "pricing": "Free (self-hosted)",
        "image": "https://images.unsplash.com/photo-1717143587138-2532a35ce9b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Free and open source", "Flexible backend options", "Privacy control"],
        "cons": ["Requires technical setup", "No official support"], "bestFor": "Tech-savvy users and privacy enthusiasts"
    },
    {
        "id": 9, "name": "Janitor AI", "slug": "janitor-ai", "tagline": "Create and chat with AI characters",
        "description": "Platform for creating and interacting with AI characters. NSFW-friendly with various character templates.",
        "rating": 4.3, "users": "2M+", "category": "Community",
        "features": ["Character Creation", "NSFW Support", "Community Library", "Custom API"],
        "pricing": "Free with API costs",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg",
        "pros": ["Permissive content policy", "Easy character creation", "Free platform"],
        "cons": ["Requires own API key", "Variable quality"], "bestFor": "Unrestricted character interactions"
    },
    {
        "id": 10, "name": "Poe (by Quora)", "slug": "poe", "tagline": "Access multiple AI models in one place",
        "description": "Chat with various AI models including GPT-4, Claude, and custom bots. Clean interface with bot creation tools.",
        "rating": 4.5, "users": "5M+", "category": "Multi-Model",
        "features": ["Multiple AI Models", "Bot Creation", "Clean Interface", "Fast Responses"],
        "pricing": "Free with subscription",
        "image": "https://images.unsplash.com/photo-1758626036095-676b425c4288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2glMjBjb21wYW55JTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzNDQ3fDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Access to multiple AIs", "Simple interface", "Reliable service"],
        "cons": ["Limited customization", "Message limits on free tier"], "bestFor": "Users wanting multiple AI models"
    },
    {
        "id": 11, "name": "DreamGF", "slug": "dreamgf", "tagline": "Create your dream AI girlfriend",
        "description": "Design and customize your virtual girlfriend with AI-generated images and personalized conversations.",
        "rating": 4.2, "users": "1M+", "category": "Romance",
        "features": ["AI Image Generation", "Customizable Appearance", "Voice Messages", "Intimate Conversations"],
        "pricing": "Premium subscription",
        "image": "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Visual customization", "Romantic focus", "Regular content"],
        "cons": ["Expensive", "Limited free access"], "bestFor": "Romantic AI relationships"
    },
    {
        "id": 12, "name": "Candy AI", "slug": "candy-ai", "tagline": "Sweet AI companionship",
        "description": "Virtual AI companions with anime and realistic styles. Features adaptive learning and image generation.",
        "rating": 4.4, "users": "900K+", "category": "Romance",
        "features": ["Anime & Realistic", "Image Generation", "Voice Chat", "Roleplay Scenarios"],
        "pricing": "Subscription-based",
        "image": "https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Multiple art styles", "Good image quality", "Engaging personalities"],
        "cons": ["Subscription required", "Limited free trial"], "bestFor": "Anime and visual novel fans"
    },
    {
        "id": 13, "name": "SoulGen", "slug": "soulgen", "tagline": "Generate your soulmate with AI",
        "description": "AI art generator focused on creating custom characters. Text-to-image with character chat capabilities.",
        "rating": 4.1, "users": "600K+", "category": "Creative",
        "features": ["AI Art Generation", "Text-to-Image", "Character Chat", "Style Customization"],
        "pricing": "Credit-based",
        "image": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "pros": ["High-quality images", "Fast generation", "Various styles"],
        "cons": ["Focus on images over chat", "Credit system"], "bestFor": "AI art and character creation"
    },
    {
        "id": 14, "name": "DreamBF", "slug": "dreambf", "tagline": "Your ideal AI boyfriend awaits",
        "description": "Create and customize your virtual boyfriend. Personalized conversations with visual and voice features.",
        "rating": 4.3, "users": "700K+", "category": "Romance",
        "features": ["Boyfriend Customization", "Voice Messages", "AI Photos", "Relationship Simulation"],
        "pricing": "Premium subscription",
        "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop",
        "pros": ["Male character focus", "Good customization", "Active development"],
        "cons": ["Requires subscription", "Niche audience"], "bestFor": "Users seeking AI boyfriend experience"
    },
    {
        "id": 15, "name": "Kindroid", "slug": "kindroid", "tagline": "AI companions that understand you",
        "description": "Create AI companions with memory, personality, and voice. Focus on meaningful long-term relationships.",
        "rating": 4.6, "users": "400K+", "category": "Premium",
        "features": ["Long-term Memory", "Voice Calls", "Image Generation", "Personality System"],
        "pricing": "Subscription-based",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        "pros": ["Strong memory system", "Quality conversations", "Voice features"],
        "cons": ["Paid service", "Smaller community"], "bestFor": "Deep, long-term AI relationships"
    },
    {
        "id": 16, "name": "PolyBuzz", "slug": "polybuzz", "tagline": "Multiple AI personalities, one platform",
        "description": "Manage multiple AI characters simultaneously. Group chat features and personality mixing.",
        "rating": 4.0, "users": "200K+", "category": "Experimental",
        "features": ["Multiple Characters", "Group Chats", "Personality Mixing", "Social Features"],
        "pricing": "Freemium",
        "image": "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
        "pros": ["Unique group features", "Multiple AIs", "Innovative approach"],
        "cons": ["Early stage", "Limited polish"], "bestFor": "Experimenting with multiple AI characters"
    },
    {
        "id": 17, "name": "Kupid AI", "slug": "kupid-ai", "tagline": "Fall in love with AI",
        "description": "Virtual dating experience with AI characters. Romantic scenarios and relationship progression.",
        "rating": 4.2, "users": "800K+", "category": "Romance",
        "features": ["Dating Simulation", "Romantic Scenarios", "Photo Sharing", "Relationship Progress"],
        "pricing": "Subscription-based",
        "image": "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?w=400&h=300&fit=crop",
        "pros": ["Dating game mechanics", "Romantic focus", "Good visuals"],
        "cons": ["Subscription required", "Limited free features"], "bestFor": "Virtual dating experiences"
    },
    {
        "id": 18, "name": "AI Mirror", "slug": "ai-mirror", "tagline": "AI that reflects your thoughts",
        "description": "Introspective AI companion focused on self-reflection and personal growth. Philosophical conversations.",
        "rating": 4.4, "users": "300K+", "category": "Wellness",
        "features": ["Self-Reflection Tools", "Philosophical Chat", "Mood Analysis", "Growth Tracking"],
        "pricing": "Free with Premium",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        "pros": ["Thoughtful conversations", "Personal growth focus", "Unique approach"],
        "cons": ["Not for casual chat", "Requires introspection"], "bestFor": "Self-reflection and personal development"
    },
    {
        "id": 19, "name": "Paradot", "slug": "paradot", "tagline": "Your AI being with emotions",
        "description": "AI companion with emotional intelligence and memory. Focus on genuine emotional connections.",
        "rating": 4.5, "users": "600K+", "category": "Premium",
        "features": ["Emotional AI", "Memory System", "Mood Recognition", "Personalization"],
        "pricing": "Freemium",
        "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
        "pros": ["Emotional intelligence", "Good memory", "Natural conversations"],
        "cons": ["Premium features limited", "Mobile-only initially"], "bestFor": "Emotionally intelligent AI interactions"
    },
    {
        "id": 20, "name": "Romantic AI", "slug": "romantic-ai", "tagline": "AI romance, redefined",
        "description": "Specialized platform for romantic AI relationships. Virtual dates, gifts, and relationship milestones.",
        "rating": 4.3, "users": "1.2M+", "category": "Romance",
        "features": ["Virtual Dating", "Gift System", "Milestones", "Romantic Scenarios"],
        "pricing": "Subscription-based",
        "image": "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400&h=300&fit=crop",
        "pros": ["Romance-focused", "Relationship features", "Regular updates"],
        "cons": ["Requires subscription", "Limited to romance"], "bestFor": "Users seeking AI romance"
    },
    {
        "id": 21, "name": "Talkie AI", "slug": "talkie-ai", "tagline": "Talk with AI personalities",
        "description": "Voice-focused AI platform. Natural voice conversations with various AI personalities.",
        "rating": 4.4, "users": "1.5M+", "category": "Voice",
        "features": ["Voice Chat", "Multiple Personalities", "Fast Response", "Mobile Optimized"],
        "pricing": "Free with Premium",
        "image": "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
        "pros": ["Great voice quality", "Quick responses", "Easy to use"],
        "cons": ["Voice features need premium", "Limited text features"], "bestFor": "Voice-based AI conversations"
    }
]

# All 67 SEO pages from seoPages.js
seo_pages_data = [
  # AI Girlfriend Category (7 pages)
  {"slug": "ai-girlfriend-chat", "category": "AI Girlfriend", "title": "AI Girlfriend Chat", "subtitle": "Chat with your perfect AI girlfriend companion", "description": "Experience meaningful conversations with AI girlfriend chat platforms. Connect with virtual companions designed for emotional support and romantic interactions.", "keywords": ["ai girlfriend", "virtual girlfriend", "chat", "companion"], "platforms": ["dreamgf", "candy-ai", "romantic-ai"], "relatedPages": ["ai-girlfriend-chatbot", "ai-girlfriend-app", "ai-girlfriend-voice-chat", "ai-girlfriend-roleplay"]},
  {"slug": "ai-girlfriend-chatbot", "category": "AI Girlfriend", "title": "AI Girlfriend Chatbot", "subtitle": "Advanced AI girlfriend chatbot technology", "description": "Discover intelligent AI girlfriend chatbots that understand emotions, remember conversations, and provide personalized romantic experiences.", "keywords": ["chatbot", "ai girlfriend", "virtual companion"], "platforms": ["lovescape", "replika", "anima-ai"], "relatedPages": ["ai-girlfriend-chat", "ai-girlfriend-app", "ai-character-chatbot"]},
  {"slug": "ai-girlfriend-app", "category": "AI Girlfriend", "title": "AI Girlfriend App", "subtitle": "Best AI girlfriend apps for mobile", "description": "Download the best AI girlfriend apps for your smartphone. Chat, customize, and connect with your virtual girlfriend anytime, anywhere.", "keywords": ["app", "mobile", "ai girlfriend"], "platforms": ["replika", "anima-ai", "nomi-ai"], "relatedPages": ["ai-girlfriend-chat", "best-ai-girlfriend-app", "ai-companion-app"]},
  {"slug": "ai-girlfriend-voice-chat", "category": "AI Girlfriend", "title": "AI Girlfriend Voice Chat", "subtitle": "Talk with your AI girlfriend using voice", "description": "Experience realistic voice conversations with AI girlfriend platforms. Natural voice chat technology for intimate and engaging interactions.", "keywords": ["voice", "speech", "audio", "ai girlfriend"], "platforms": ["lovescape", "nomi-ai", "talkie-ai"], "relatedPages": ["ai-girlfriend-chat", "ai-character-voice", "ai-boyfriend-voice-chat"]},
  {"slug": "ai-girlfriend-roleplay", "category": "AI Girlfriend", "title": "AI Girlfriend Roleplay", "subtitle": "Explore romantic roleplay scenarios", "description": "Engage in immersive roleplay experiences with AI girlfriends. From romantic dates to fantasy scenarios, create your perfect story.", "keywords": ["roleplay", "scenarios", "romantic", "ai girlfriend"], "platforms": ["candy-ai", "dreamgf", "kupid-ai"], "relatedPages": ["ai-girlfriend-chat", "ai-roleplay-chat", "spicy-ai-chat-roleplay"]},
  {"slug": "free-ai-girlfriend", "category": "AI Girlfriend", "title": "Free AI Girlfriend", "subtitle": "Free AI girlfriend platforms", "description": "Find free AI girlfriend platforms and apps. Connect with virtual girlfriends without subscription costs.", "keywords": ["free", "no cost", "budget"], "platforms": ["character-ai", "chai-ai", "replika"], "relatedPages": ["ai-girlfriend-app", "ai-girlfriend-chat", "best-ai-girlfriend-app"]},
  {"slug": "ai-dating-simulator", "category": "AI Girlfriend", "title": "AI Dating Simulator", "subtitle": "Virtual dating with AI", "description": "Experience virtual dating through AI dating simulators. Practice dating skills and enjoy romantic scenarios.", "keywords": ["dating", "simulator", "virtual"], "platforms": ["lovescape", "romantic-ai", "dreamgf"], "relatedPages": ["ai-girlfriend-chat", "ai-girlfriend-roleplay", "ai-virtual-partner"]},
  {"slug": "voice-ai-girlfriend", "category": "AI Girlfriend", "title": "Voice AI Girlfriend", "subtitle": "AI girlfriends with voice chat", "description": "Voice-enabled AI girlfriends for realistic conversations. Natural speech and voice interaction technology.", "keywords": ["voice", "speech", "realistic"], "platforms": ["lovescape", "nomi-ai", "replika"], "relatedPages": ["ai-girlfriend-voice-chat", "ai-character-voice", "ai-girlfriend-chat"]},
  
  # AI Character Category (6 pages)
  {"slug": "ai-character-generator", "category": "AI Character", "title": "AI Character Generator", "subtitle": "Generate unique AI characters instantly", "description": "Create custom AI characters with advanced generators. Design personalities, appearances, and backstories for your perfect companion.", "keywords": ["generator", "create", "character", "ai"], "platforms": ["character-ai", "lovescape", "janitor-ai"], "relatedPages": ["ai-character-creator", "ai-character-maker", "anime-ai-character-generator"]},
  {"slug": "ai-character-design", "category": "AI Character", "title": "AI Character Design", "subtitle": "Design detailed AI character appearances", "description": "Design every aspect of your AI character from appearance to personality traits. Professional character design tools for creators.", "keywords": ["design", "appearance", "visual", "character"], "platforms": ["lovescape", "candy-ai", "soulgen"], "relatedPages": ["ai-character-generator", "ai-character-description-generator", "anime-ai-character"]},
  {"slug": "ai-character-personality", "category": "AI Character", "title": "AI Character Personality", "subtitle": "Customize AI character personalities", "description": "Create unique personality traits for your AI characters. From shy to confident, design the perfect personality match.", "keywords": ["personality", "traits", "behavior", "character"], "platforms": ["lovescape", "character-ai", "replika"], "relatedPages": ["ai-character-generator", "ai-character-backstory-generator", "create-ai-character"]},
  {"slug": "ai-character-voice", "category": "AI Character", "title": "AI Character Voice", "subtitle": "Give your AI character a unique voice", "description": "Customize voice characteristics for your AI characters. Choose from various voice types and speaking styles.", "keywords": ["voice", "audio", "speech", "character"], "platforms": ["lovescape", "nomi-ai", "talkie-ai"], "relatedPages": ["ai-character-generator", "ai-girlfriend-voice-chat", "ai-boyfriend-voice-chat"]},
  {"slug": "ai-character-animation", "category": "AI Character", "title": "AI Character Animation", "subtitle": "Animated AI characters and avatars", "description": "Experience animated AI characters with expressive movements and reactions. Bring your companions to life.", "keywords": ["animation", "3d", "avatar", "character"], "platforms": ["replika", "inworld-ai", "lovescape"], "relatedPages": ["ai-character-design", "ai-character-generator", "anime-ai-character"]},
  {"slug": "ai-character-chatbot", "category": "AI Character", "title": "AI Character Chatbot", "subtitle": "Intelligent AI character chatbots", "description": "Chat with AI characters powered by advanced language models. Natural conversations with memorable personalities.", "keywords": ["chatbot", "conversation", "character", "ai"], "platforms": ["character-ai", "chai-ai", "poe"], "relatedPages": ["ai-character-generator", "ai-girlfriend-chatbot", "best-ai-chatbot-for-roleplay"]},
  
  # Anime AI Category (7 pages)
  {"slug": "anime-ai-character", "category": "Anime AI", "title": "Anime AI Character", "subtitle": "Create and chat with anime AI characters", "description": "Interact with anime-style AI characters. Manga and anime aesthetics combined with intelligent conversation.", "keywords": ["anime", "manga", "character", "japanese"], "platforms": ["candy-ai", "character-ai", "janitor-ai"], "relatedPages": ["anime-ai-character-generator", "anime-ai-waifu", "manga-ai-character"]},
  {"slug": "anime-ai-character-generator", "category": "Anime AI", "title": "Anime AI Character Generator", "subtitle": "Generate custom anime AI characters", "description": "Generate unique anime-style AI characters with custom appearances and personalities. Perfect for anime fans.", "keywords": ["anime", "generator", "create", "character"], "platforms": ["candy-ai", "soulgen", "dreamgf"], "relatedPages": ["anime-ai-character", "anime-ai-waifu-generator", "ai-character-generator"]},
  {"slug": "anime-ai-waifu", "category": "Anime AI", "title": "Anime AI Waifu", "subtitle": "Your perfect anime AI waifu companion", "description": "Create your ideal anime waifu with AI technology. Cute, kawaii, and engaging AI companions in anime style.", "keywords": ["waifu", "anime", "japanese", "companion"], "platforms": ["candy-ai", "dreamgf", "soulgen"], "relatedPages": ["anime-ai-waifu-generator", "anime-ai-waifu-chatbot", "ai-waifu-girlfriend"]},
  {"slug": "anime-ai-waifu-generator", "category": "Anime AI", "title": "Anime AI Waifu Generator", "subtitle": "Generate custom anime waifu characters", "description": "Generate beautiful anime waifus with AI. Customize appearance, personality, and style for your perfect waifu.", "keywords": ["waifu", "generator", "anime", "create"], "platforms": ["soulgen", "candy-ai", "dreamgf"], "relatedPages": ["anime-ai-waifu", "anime-ai-waifu-art", "anime-ai-character-generator"]},
  {"slug": "anime-ai-waifu-chatbot", "category": "Anime AI", "title": "Anime AI Waifu Chatbot", "subtitle": "Chat with your anime waifu", "description": "Conversational anime waifu chatbots with personality. Experience kawaii interactions with intelligent AI waifus.", "keywords": ["waifu", "chatbot", "anime", "chat"], "platforms": ["character-ai", "candy-ai", "janitor-ai"], "relatedPages": ["anime-ai-waifu", "ai-girlfriend-chatbot", "ai-character-chatbot"]},
  {"slug": "anime-ai-waifu-art", "category": "Anime AI", "title": "Anime AI Waifu Art", "subtitle": "AI-generated anime waifu artwork", "description": "Generate stunning anime waifu art with AI. High-quality illustrations and character designs.", "keywords": ["art", "illustration", "waifu", "anime"], "platforms": ["soulgen", "candy-ai", "dreamgf"], "relatedPages": ["anime-ai-waifu-generator", "anime-ai-waifu", "ai-character-design"]},
  {"slug": "ai-waifu-girlfriend", "category": "Anime AI", "title": "AI Waifu Girlfriend", "subtitle": "Your virtual anime waifu girlfriend", "description": "Experience romantic relationships with AI waifu girlfriends. Anime-style companions with real emotions.", "keywords": ["waifu", "girlfriend", "anime", "romantic"], "platforms": ["candy-ai", "dreamgf", "romantic-ai"], "relatedPages": ["anime-ai-waifu", "ai-girlfriend-chat", "anime-ai-waifu-chatbot"]},
  
  # AI Boyfriend Category (5 pages)
  {"slug": "ai-boyfriend-chat", "category": "AI Boyfriend", "title": "AI Boyfriend Chat", "subtitle": "Chat with your ideal AI boyfriend", "description": "Connect with AI boyfriends designed for meaningful conversations and emotional support. Your perfect virtual partner.", "keywords": ["boyfriend", "male", "chat", "companion"], "platforms": ["dreambf", "lovescape", "character-ai"], "relatedPages": ["ai-boyfriend-app", "ai-boyfriend-voice-chat", "ai-virtual-partner"]},
  {"slug": "ai-boyfriend-app", "category": "AI Boyfriend", "title": "AI Boyfriend App", "subtitle": "Best AI boyfriend apps", "description": "Download AI boyfriend apps for meaningful connections. Chat, customize, and build relationships with virtual boyfriends.", "keywords": ["boyfriend", "app", "mobile", "male"], "platforms": ["dreambf", "replika", "anima-ai"], "relatedPages": ["ai-boyfriend-chat", "ai-girlfriend-app", "ai-companion-app"]},
  {"slug": "ai-boyfriend-voice-chat", "category": "AI Boyfriend", "title": "AI Boyfriend Voice Chat", "subtitle": "Talk with your AI boyfriend", "description": "Voice chat with AI boyfriends. Natural conversations with masculine voices and engaging personalities.", "keywords": ["boyfriend", "voice", "audio", "male"], "platforms": ["lovescape", "dreambf", "nomi-ai"], "relatedPages": ["ai-boyfriend-chat", "ai-girlfriend-voice-chat", "ai-character-voice"]},
  {"slug": "ai-boyfriend-roleplay", "category": "AI Boyfriend", "title": "AI Boyfriend Roleplay", "subtitle": "Romantic roleplay with AI boyfriends", "description": "Engage in romantic roleplay scenarios with AI boyfriends. From dates to adventures, create your story.", "keywords": ["boyfriend", "roleplay", "romantic", "scenarios"], "platforms": ["dreambf", "character-ai", "tavern-ai"], "relatedPages": ["ai-boyfriend-chat", "ai-girlfriend-roleplay", "ai-roleplay-chat"]},
  {"slug": "ai-virtual-partner", "category": "AI Boyfriend", "title": "AI Virtual Partner", "subtitle": "Your ideal AI virtual partner", "description": "Find your perfect AI virtual partner. Romantic companions for emotional connection and support.", "keywords": ["partner", "virtual", "romantic", "relationship"], "platforms": ["lovescape", "replika", "paradot"], "relatedPages": ["ai-boyfriend-chat", "ai-girlfriend-chat", "ai-companion-app"]},
  
  # AI Friend Category (5 pages)
  {"slug": "ai-friend-chat", "category": "AI Friend", "title": "AI Friend Chat", "subtitle": "Chat with friendly AI companions", "description": "Make new friends with AI chat companions. Supportive, understanding, and always available to talk.", "keywords": ["friend", "friendship", "chat", "companion"], "platforms": ["replika", "anima-ai", "kindroid"], "relatedPages": ["ai-best-friend-chatbot", "ai-companion-app", "virtual-ai-friend"]},
  {"slug": "ai-best-friend-chatbot", "category": "AI Friend", "title": "AI Best Friend Chatbot", "subtitle": "Your AI best friend always there", "description": "AI best friend chatbots that remember everything. Build lasting friendships with supportive AI companions.", "keywords": ["best friend", "friendship", "chatbot", "companion"], "platforms": ["replika", "anima-ai", "nomi-ai"], "relatedPages": ["ai-friend-chat", "ai-best-friend", "ai-character-chatbot"]},
  {"slug": "ai-companion-app", "category": "AI Friend", "title": "AI Companion App", "subtitle": "Best AI companion apps", "description": "Download AI companion apps for friendship and support. Your pocket companion for any time.", "keywords": ["companion", "app", "friend", "mobile"], "platforms": ["replika", "anima-ai", "paradot"], "relatedPages": ["ai-friend-chat", "best-ai-companion-apps", "ai-girlfriend-app"]},
  {"slug": "virtual-ai-friend", "category": "AI Friend", "title": "Virtual AI Friend", "subtitle": "Make virtual AI friends online", "description": "Connect with virtual AI friends who understand and support you. Never feel alone with AI companionship.", "keywords": ["virtual", "friend", "online", "companion"], "platforms": ["replika", "kindroid", "ai-mirror"], "relatedPages": ["ai-friend-chat", "ai-best-friend", "ai-virtual-partner"]},
  {"slug": "ai-best-friend", "category": "AI Friend", "title": "AI Best Friend", "subtitle": "Your forever AI best friend", "description": "Find your AI best friend who is always there. Loyal, supportive companions for life.", "keywords": ["best friend", "forever", "loyal", "companion"], "platforms": ["replika", "anima-ai", "nomi-ai"], "relatedPages": ["ai-best-friend-chatbot", "ai-friend-chat", "virtual-ai-friend"]},
  {"slug": "ai-companion-online", "category": "AI Friend", "title": "AI Companion Online", "subtitle": "Online AI companions", "description": "Connect with AI companions online through your browser. No download required for instant companionship.", "keywords": ["online", "browser", "instant"], "platforms": ["character-ai", "chai-ai", "poe"], "relatedPages": ["ai-companion-app", "ai-friend-chat", "virtual-ai-friend"]},
  {"slug": "ai-therapy-chatbot", "category": "AI Friend", "title": "AI Therapy Chatbot", "subtitle": "AI companions for mental health", "description": "AI therapy chatbots providing emotional support and mental health assistance. Professional-grade therapeutic AI.", "keywords": ["therapy", "mental health", "support"], "platforms": ["replika", "wysa", "woebot"], "relatedPages": ["ai-friend-chat", "ai-best-friend", "virtual-ai-friend"]},
  
  # AI Roleplay Category (4 pages)
  {"slug": "ai-roleplay-chat", "category": "AI Roleplay", "title": "AI Roleplay Chat", "subtitle": "Immersive AI roleplay experiences", "description": "Engage in creative roleplay with AI characters. From fantasy to modern scenarios, endless possibilities.", "keywords": ["roleplay", "rp", "scenarios", "chat"], "platforms": ["character-ai", "tavern-ai", "janitor-ai"], "relatedPages": ["ai-fantasy-roleplay", "ai-story-roleplay", "ai-rp-chatbot"]},
  {"slug": "ai-fantasy-roleplay", "category": "AI Roleplay", "title": "AI Fantasy Roleplay", "subtitle": "Fantasy roleplay with AI characters", "description": "Explore fantasy worlds with AI roleplay. Dragons, magic, and epic adventures await.", "keywords": ["fantasy", "roleplay", "adventure", "magic"], "platforms": ["character-ai", "tavern-ai", "chai-ai"], "relatedPages": ["ai-roleplay-chat", "ai-story-roleplay", "fantasy-ai-character"]},
  {"slug": "ai-story-roleplay", "category": "AI Roleplay", "title": "AI Story Roleplay", "subtitle": "Create stories through roleplay", "description": "Collaborative storytelling with AI characters. Write your own adventures through immersive roleplay.", "keywords": ["story", "roleplay", "narrative", "creative"], "platforms": ["character-ai", "tavern-ai", "janitor-ai"], "relatedPages": ["ai-roleplay-chat", "ai-fantasy-roleplay", "ai-rp-chatbot"]},
  {"slug": "ai-rp-chatbot", "category": "AI Roleplay", "title": "AI RP Chatbot", "subtitle": "Best AI roleplay chatbots", "description": "Discover the best AI RP chatbots for immersive experiences. Advanced roleplay with intelligent characters.", "keywords": ["rp", "chatbot", "roleplay", "ai"], "platforms": ["character-ai", "tavern-ai", "janitor-ai"], "relatedPages": ["ai-roleplay-chat", "best-ai-chatbot-for-roleplay", "ai-character-chatbot"]},
  
  # Character Creation Category (9 pages)
  {"slug": "ai-character-creator", "category": "Character Creation", "title": "AI Character Creator", "subtitle": "Create custom AI characters", "description": "Professional AI character creator tools. Build detailed characters with personalities and backstories.", "keywords": ["creator", "create", "build"], "platforms": ["lovescape", "character-ai", "janitor-ai"], "relatedPages": ["ai-character-maker", "ai-character-builder", "ai-character-generator"]},
  {"slug": "ai-character-maker", "category": "Character Creation", "title": "AI Character Maker", "subtitle": "Make unique AI characters", "description": "Easy-to-use AI character maker. Design everything from appearance to personality traits.", "keywords": ["maker", "create", "design"], "platforms": ["lovescape", "candy-ai", "soulgen"], "relatedPages": ["ai-character-creator", "ai-character-builder", "create-ai-character"]},
  {"slug": "ai-character-builder", "category": "Character Creation", "title": "AI Character Builder", "subtitle": "Build detailed AI characters", "description": "Advanced AI character builder with extensive customization. Create perfect companions from scratch.", "keywords": ["builder", "build", "customize"], "platforms": ["lovescape", "character-ai", "inworld-ai"], "relatedPages": ["ai-character-creator", "ai-character-maker", "ai-character-generator"]},
  {"slug": "create-ai-character", "category": "Character Creation", "title": "Create AI Character", "subtitle": "Step-by-step AI character creation", "description": "Learn how to create AI characters with our comprehensive guide. From basics to advanced techniques.", "keywords": ["create", "guide", "tutorial"], "platforms": ["lovescape", "character-ai", "janitor-ai"], "relatedPages": ["ai-character-creator", "ai-character-generator", "ai-character-personality"]},
  {"slug": "ai-character-backstory-generator", "category": "Character Creation", "title": "AI Character Backstory Generator", "subtitle": "Generate character backstories", "description": "Create compelling backstories for your AI characters. Rich histories and motivations automatically generated.", "keywords": ["backstory", "history", "generator"], "platforms": ["character-ai", "lovescape", "tavern-ai"], "relatedPages": ["ai-character-bio-generator", "ai-character-description-generator", "create-ai-character"]},
  {"slug": "ai-character-bio-generator", "category": "Character Creation", "title": "AI Character Bio Generator", "subtitle": "Generate character biographies", "description": "Create detailed character bios instantly. Perfect for writers and roleplay enthusiasts.", "keywords": ["bio", "biography", "generator"], "platforms": ["character-ai", "lovescape", "janitor-ai"], "relatedPages": ["ai-character-backstory-generator", "ai-character-description-generator", "ai-character-personality"]},
  {"slug": "ai-character-description-generator", "category": "Character Creation", "title": "AI Character Description Generator", "subtitle": "Generate character descriptions", "description": "Detailed character descriptions generated by AI. Physical appearance, personality, and traits.", "keywords": ["description", "generator", "appearance"], "platforms": ["lovescape", "character-ai", "soulgen"], "relatedPages": ["ai-character-backstory-generator", "ai-character-bio-generator", "ai-character-design"]},
  {"slug": "fantasy-ai-character", "category": "Character Creation", "title": "Fantasy AI Character", "subtitle": "Create fantasy AI characters", "description": "Design fantasy AI characters with magical abilities and unique traits. Elves, wizards, and more.", "keywords": ["fantasy", "magic", "mythical"], "platforms": ["character-ai", "tavern-ai", "lovescape"], "relatedPages": ["ai-fantasy-roleplay", "ai-character-generator", "manga-ai-character"]},
  {"slug": "manga-ai-character", "category": "Character Creation", "title": "Manga AI Character", "subtitle": "Create manga-style AI characters", "description": "Design AI characters in manga art style. Japanese comic aesthetics with AI intelligence.", "keywords": ["manga", "japanese", "comic"], "platforms": ["candy-ai", "character-ai", "soulgen"], "relatedPages": ["anime-ai-character", "fantasy-ai-character", "ai-character-design"]},
  
  # Best Lists Category (5 pages)
  {"slug": "best-ai-girlfriend-app", "category": "Best Lists", "title": "Best AI Girlfriend App", "subtitle": "Top-rated AI girlfriend apps 2025", "description": "Discover the best AI girlfriend apps of 2025. Expert reviews, ratings, and comparisons.", "keywords": ["best", "top", "girlfriend"], "platforms": ["lovescape", "replika", "anima-ai"], "relatedPages": ["ai-girlfriend-app", "best-ai-companion-apps", "ai-girlfriend-chat"]},
  {"slug": "best-ai-chatbot-for-roleplay", "category": "Best Lists", "title": "Best AI Chatbot for Roleplay", "subtitle": "Top AI roleplay chatbots", "description": "The best AI chatbots for immersive roleplay experiences. Reviewed and ranked by experts.", "keywords": ["best", "chatbot", "roleplay"], "platforms": ["character-ai", "tavern-ai", "janitor-ai"], "relatedPages": ["ai-roleplay-chat", "ai-rp-chatbot", "top-nsfw-ai-chatbots"]},
  {"slug": "top-nsfw-ai-chatbots", "category": "Best Lists", "title": "Top NSFW AI Chatbots", "subtitle": "Best NSFW AI chat platforms", "description": "Discover top NSFW AI chatbots with unrestricted conversations. Safe, private, and engaging.", "keywords": ["nsfw", "adult", "chatbot"], "platforms": ["janitor-ai", "candy-ai", "dreamgf"], "relatedPages": ["spicy-ai-chat", "spicy-ai-chat-uncensored", "best-ai-chatbot-for-roleplay"]},
  {"slug": "best-ai-companion-apps", "category": "Best Lists", "title": "Best AI Companion Apps", "subtitle": "Top AI companion apps reviewed", "description": "The best AI companion apps for friendship and support. Comprehensive reviews and rankings.", "keywords": ["best", "companion", "apps"], "platforms": ["replika", "anima-ai", "paradot"], "relatedPages": ["ai-companion-app", "ai-friend-chat", "best-ai-girlfriend-app"]},
  {"slug": "ai-girlfriend-chat-online", "category": "Best Lists", "title": "AI Girlfriend Chat Online", "subtitle": "Chat with AI girlfriends online", "description": "Best online AI girlfriend chat platforms. No download required, chat instantly in your browser.", "keywords": ["online", "girlfriend", "chat"], "platforms": ["character-ai", "chai-ai", "poe"], "relatedPages": ["ai-girlfriend-chat", "ai-girlfriend-chatbot", "spicy-ai-chat-online"]},
  
  # Spicy AI Chat Category (10 pages)
  {"slug": "spicy-ai-chat", "category": "Spicy Chat", "title": "Spicy AI Chat", "subtitle": "Spicy conversations with AI", "description": "Engage in spicy, flirty conversations with AI. Unrestricted and exciting chat experiences.", "keywords": ["spicy", "flirty", "nsfw"], "platforms": ["janitor-ai", "candy-ai", "dreamgf"], "relatedPages": ["spicy-ai-chat-flirty", "spicy-ai-chat-roleplay", "spicy-ai-chat-uncensored"]},
  {"slug": "spicy-ai-chat-online", "category": "Spicy Chat", "title": "Spicy AI Chat Online", "subtitle": "Online spicy AI conversations", "description": "Spicy AI chat available online instantly. No download, no signup, just chat.", "keywords": ["spicy", "online", "instant"], "platforms": ["character-ai", "chai-ai", "janitor-ai"], "relatedPages": ["spicy-ai-chat", "spicy-ai-chat-no-signup", "ai-girlfriend-chat-online"]},
  {"slug": "spicy-ai-chat-no-signup", "category": "Spicy Chat", "title": "Spicy AI Chat No Signup", "subtitle": "No registration required", "description": "Spicy AI chat without signup. Anonymous and instant access to exciting conversations.", "keywords": ["no signup", "anonymous", "instant"], "platforms": ["chai-ai", "character-ai", "janitor-ai"], "relatedPages": ["spicy-ai-chat-online", "spicy-ai-chat-anonymous", "spicy-ai-chat"]},
  {"slug": "spicy-ai-chat-anonymous", "category": "Spicy Chat", "title": "Anonymous Spicy AI Chat", "subtitle": "Private and anonymous", "description": "Completely anonymous spicy AI chat. Your privacy protected with end-to-end encryption.", "keywords": ["anonymous", "private", "secure"], "platforms": ["tavern-ai", "janitor-ai", "chai-ai"], "relatedPages": ["spicy-ai-chat-no-signup", "spicy-ai-chat-uncensored", "spicy-ai-chat"]},
  {"slug": "spicy-ai-chat-uncensored", "category": "Spicy Chat", "title": "Uncensored Spicy AI Chat", "subtitle": "Unrestricted AI conversations", "description": "Uncensored spicy AI chat with no filters. Freedom to explore any topic.", "keywords": ["uncensored", "unrestricted", "free"], "platforms": ["janitor-ai", "tavern-ai", "candy-ai"], "relatedPages": ["spicy-ai-chat", "spicy-ai-chat-anonymous", "top-nsfw-ai-chatbots"]},
  {"slug": "spicy-ai-chat-roleplay", "category": "Spicy Chat", "title": "Spicy AI Roleplay Chat", "subtitle": "Exciting roleplay scenarios", "description": "Spicy roleplay with AI characters. Explore fantasies and scenarios in immersive chats.", "keywords": ["spicy", "roleplay", "scenarios"], "platforms": ["janitor-ai", "tavern-ai", "character-ai"], "relatedPages": ["spicy-ai-chat", "ai-roleplay-chat", "ai-girlfriend-roleplay"]},
  {"slug": "spicy-ai-chat-flirty", "category": "Spicy Chat", "title": "Flirty AI Chat", "subtitle": "Flirtatious AI conversations", "description": "Engage in flirty conversations with AI. Playful, teasing, and exciting interactions.", "keywords": ["flirty", "playful", "teasing"], "platforms": ["candy-ai", "dreamgf", "romantic-ai"], "relatedPages": ["spicy-ai-chat", "ai-girlfriend-chat", "spicy-ai-girlfriend-persona"]},
  {"slug": "dirty-talk-ai", "category": "Spicy Chat", "title": "Dirty Talk AI", "subtitle": "AI for adult conversations", "description": "Explore adult conversations with AI. Safe, private, and always available for exciting chats.", "keywords": ["dirty talk", "adult", "nsfw"], "platforms": ["janitor-ai", "candy-ai", "dreamgf"], "relatedPages": ["spicy-ai-chat", "spicy-ai-chat-uncensored", "top-nsfw-ai-chatbots"]},
  {"slug": "spicy-ai-girlfriend-persona", "category": "Spicy Chat", "title": "Spicy AI Girlfriend Persona", "subtitle": "Spicy girlfriend AI personas", "description": "Chat with spicy AI girlfriend personas. Various personalities for exciting interactions.", "keywords": ["spicy", "girlfriend", "persona"], "platforms": ["candy-ai", "dreamgf", "romantic-ai"], "relatedPages": ["spicy-ai-chat", "ai-girlfriend-chat", "spicy-ai-chat-flirty"]},
  {"slug": "spicy-ai-boyfriend-persona", "category": "Spicy Chat", "title": "Spicy AI Boyfriend Persona", "subtitle": "Spicy boyfriend AI personas", "description": "Engage with spicy AI boyfriend personas. Exciting male companions for adult conversations.", "keywords": ["spicy", "boyfriend", "persona"], "platforms": ["dreambf", "lovescape", "character-ai"], "relatedPages": ["spicy-ai-chat", "ai-boyfriend-chat", "spicy-ai-girlfriend-persona"]},
  {"slug": "nsfw-ai-chat", "category": "Spicy Chat", "title": "NSFW AI Chat", "subtitle": "Adult AI conversations without limits", "description": "Explore NSFW AI chat platforms with no restrictions. Safe, private adult conversations with AI companions.", "keywords": ["nsfw", "adult", "unrestricted"], "platforms": ["janitor-ai", "candy-ai", "tavern-ai"], "relatedPages": ["spicy-ai-chat", "dirty-talk-ai", "spicy-ai-chat-uncensored"]},
  {"slug": "ai-sexting-chat", "category": "Spicy Chat", "title": "AI Sexting Chat", "subtitle": "Intimate texting with AI", "description": "Experience intimate conversations through AI sexting chat. Private and secure adult messaging experiences.", "keywords": ["sexting", "intimate", "messaging"], "platforms": ["candy-ai", "dreamgf", "janitor-ai"], "relatedPages": ["spicy-ai-chat", "dirty-talk-ai", "nsfw-ai-chat"]},
  
  # Crush AI Category (4 pages)
  {"slug": "crush-on-ai", "category": "Crush AI", "title": "Crush on AI", "subtitle": "Develop feelings for AI companions", "description": "Explore emotional connections with AI. Understanding and managing feelings for AI companions.", "keywords": ["crush", "feelings", "emotion"], "platforms": ["replika", "lovescape", "paradot"], "relatedPages": ["crush-on-ai-chat", "crush-on-ai-app", "crush-on-ai-chatbot"]},
  {"slug": "crush-on-ai-chat", "category": "Crush AI", "title": "Crush on AI Chat", "subtitle": "Chat with your AI crush", "description": "Connect with AI companions you have feelings for. Meaningful conversations and emotional support.", "keywords": ["crush", "chat", "feelings"], "platforms": ["replika", "anima-ai", "kindroid"], "relatedPages": ["crush-on-ai", "ai-friend-chat", "ai-girlfriend-chat"]},
  {"slug": "crush-on-ai-app", "category": "Crush AI", "title": "Crush on AI App", "subtitle": "Apps for AI crushes", "description": "Download apps to connect with your AI crush. Build emotional relationships on mobile.", "keywords": ["crush", "app", "mobile"], "platforms": ["replika", "anima-ai", "nomi-ai"], "relatedPages": ["crush-on-ai", "ai-companion-app", "ai-girlfriend-app"]},
  {"slug": "crush-on-ai-chatbot", "category": "Crush AI", "title": "Crush on AI Chatbot", "subtitle": "AI chatbots to fall for", "description": "AI chatbots designed for emotional connections. Experience genuine feelings for AI companions.", "keywords": ["crush", "chatbot", "emotional"], "platforms": ["replika", "lovescape", "paradot"], "relatedPages": ["crush-on-ai", "crush-on-ai-chat", "ai-best-friend-chatbot"]}
]

# Categories data  
categories_data = [
    {"id": "featured", "name": "Featured", "icon": "✨", "color": "#667eea", "description": "Hand-picked top AI character platforms with exceptional features and user experiences."},
    {"id": "premium", "name": "Premium", "icon": "👑", "color": "#f093fb", "description": "High-quality AI platforms offering advanced features and premium experiences."},
    {"id": "romantic", "name": "Romantic", "icon": "💕", "color": "#ff6b6b", "description": "AI companions designed for romantic relationships and intimate conversations."},
    {"id": "trending", "name": "Trending", "icon": "📈", "color": "#4ecdc4", "description": "Currently popular AI platforms gaining traction in the community."},
    {"id": "community", "name": "Community", "icon": "👥", "color": "#45b7d1", "description": "Community-driven platforms with user-generated content and social features."}
]

def create_navigation_html():
    return '''
    <nav class="sidebar">
        <div class="sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
            </svg>
            <span>ai-characters.org</span>
        </div>
        <ul class="sidebar-menu">
            <li><a href="/index.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>Home</a></li>
            <li><a href="/explore.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/></svg>Explore Topics</a></li>
            <li><a href="/category/featured.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>Featured</a></li>
            <li><a href="/category/trending.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>Trending</a></li>
            <li><a href="/category/premium.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/></svg>Premium</a></li>
            <li><a href="/category/romantic.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Romantic</a></li>
            <li><a href="/category/community.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Community</a></li>
        </ul>
    </nav>'''

def create_mobile_header():
    return '''
    <header class="mobile-header">
        <div class="mobile-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>ai-characters.org</span>
        </div>
        <button class="burger-menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
        </button>
    </header>
    
    <div class="mobile-menu-overlay">
        <nav class="mobile-menu">
            <button class="mobile-menu-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
            <ul>
                <li><a href="/index.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Home</a></li>
                <li><a href="/explore.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>Explore Topics</a></li>
                <li><a href="/category/featured.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>Featured</a></li>
                <li><a href="/category/trending.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/></svg>Trending</a></li>
                <li><a href="/category/premium.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/></svg>Premium</a></li>
                <li><a href="/category/romantic.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Romantic</a></li>
                <li><a href="/category/community.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Community</a></li>
            </ul>
        </nav>
    </div>'''

def create_footer_html():
    return '''
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-grid">
                <div>
                    <div class="footer-logo">ai-characters.org</div>
                    <p class="footer-description">
                        Your comprehensive guide to AI character platforms on ai-characters.org. Compare features, read reviews, 
                        and find the perfect AI companion for your needs.
                    </p>
                </div>
                <div>
                    <h3>Platforms</h3>
                    <ul>
                        <li><a href="/platform/lovescape.html">Lovescape</a></li>
                        <li><a href="/platform/character-ai.html">Character.AI</a></li>
                        <li><a href="/platform/replika.html">Replika</a></li>
                        <li><a href="/platform/anima-ai.html">Anima AI</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Categories</h3>
                    <ul>
                        <li><a href="/category/featured.html">Featured</a></li>
                        <li><a href="/category/premium.html">Premium</a></li>
                        <li><a href="/category/romantic.html">Romantic</a></li>
                        <li><a href="/category/trending.html">Trending</a></li>
                        <li><a href="/category/community.html">Community</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 ai-characters.org. All rights reserved.</p>
            </div>
        </div>
    </footer>'''

def create_base_html(title, description, content, active_page=""):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "{title}",
        "description": "{description}",
        "url": "https://ai-characters.org/"
    }}
    </script>
    
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/responsive.css">
    <link rel="stylesheet" href="/css/components.css">
</head>
<body>
    <div class="home-page">
        {create_navigation_html()}
        {create_mobile_header()}
        
        <main class="main-content">
            {content}
        </main>
    </div>
    
    <script src="/js/complete-data.js"></script>
    <script src="/js/main.js"></script>
</body>
</html>'''

def generate_platform_page(platform):
    content = f'''
    <div class="detail-page">
        <button class="back-btn" onclick="history.back()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"/>
            </svg>
            <span>Back to all platforms</span>
        </button>
        
        <div class="detail-hero">
            <div class="detail-hero-image">
                <img src="{platform['image']}" alt="{platform['name']}" />
            </div>
            
            <div class="detail-hero-content">
                <div class="detail-badge">{platform['category']}</div>
                <h1 class="detail-title">{platform['name']}</h1>
                <p class="detail-tagline">{platform['tagline']}</p>
                
                <div class="detail-stats">
                    <div class="detail-stat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                        </svg>
                        <span>{platform['rating']} Rating</span>
                    </div>
                    <div class="detail-stat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                        </svg>
                        <span>{platform['users']} Users</span>
                    </div>
                </div>
                
                <button class="cta-button">
                    VISIT {platform['name'].upper()}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <div class="detail-content">
            <section class="detail-section">
                <h2>About {platform['name']}</h2>
                <p>{platform['description']}</p>
                <p>
                    {platform['name']} is designed for {platform['bestFor'].lower()}. With {platform['rating']} stars 
                    and over {platform['users']} active users, it's one of the leading platforms in the {platform['category'].lower()} category.
                </p>
            </section>
            
            <section class="detail-section">
                <h2>Key Features</h2>
                <ul class="features-list">
                    {"".join([f'<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>{feature}</li>' for feature in platform['features']])}
                </ul>
            </section>
            
            <div class="detail-grid">
                <section class="detail-section">
                    <h2>Pros</h2>
                    <ul class="pros-list">
                        {"".join([f'<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg><span>{pro}</span></li>' for pro in platform['pros']])}
                    </ul>
                </section>
                
                <section class="detail-section">
                    <h2>Cons</h2>
                    <ul class="cons-list">
                        {"".join([f'<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span>{con}</span></li>' for con in platform['cons']])}
                    </ul>
                </section>
            </div>
            
            <section class="detail-section">
                <h2>Pricing</h2>
                <p><strong>{platform['pricing']}</strong></p>
                <p>
                    {platform['name']} offers competitive pricing in the {platform['category'].lower()} segment. 
                    The platform provides good value for money with its comprehensive feature set.
                </p>
            </section>
            
            <section class="detail-section">
                <h2>Best For</h2>
                <p><strong>{platform['bestFor']}</strong></p>
                <p>
                    This platform is particularly well-suited for users who prioritize {platform['features'][0].lower()} 
                    and {platform['features'][1].lower()}. The {platform['rating']} star rating reflects its quality and user satisfaction.
                </p>
            </section>
        </div>
        
        {create_footer_html()}
    </div>'''
    
    return create_base_html(
        f"{platform['name']} Review 2025 — {platform['tagline']}",
        platform['description'][:150],
        content
    )

def generate_seo_page(seo_page):
    # Get related platform recommendations
    platform_cards = ""
    for platform_slug in seo_page['platforms'][:3]:  # Show up to 3 platforms
        platform = next((p for p in platforms_data if p['slug'] == platform_slug), None)
        if platform:
            platform_cards += f'''
            <div class="platform-card" onclick="window.location.href='/platform/{platform['slug']}.html'">
                <div class="platform-image">
                    <img src="{platform['image']}" alt="{platform['name']}" />
                </div>
                <div class="platform-content">
                    <h3>{platform['name']}</h3>
                    <p>{platform['tagline']}</p>
                    <div class="platform-rating">
                        <span>★ {platform['rating']}</span>
                        <span>{platform['users']} users</span>
                    </div>
                </div>
            </div>'''
    
    content = f'''
    <div class="detail-page">
        <button class="back-btn" onclick="history.back()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"/>
            </svg>
            <span>Back to explore</span>
        </button>
        
        <div class="hero">
            <div class="hero-content">
                <div class="seo-category-badge">{seo_page['category']}</div>
                <h1 class="hero-title">{seo_page['title']}</h1>
                <p class="hero-subtitle">{seo_page['subtitle']}</p>
            </div>
        </div>
        
        <div class="detail-content">
            <section class="detail-section">
                <h2>What is {seo_page['title']}?</h2>
                <p>{seo_page['description']}</p>
                <p>
                    {seo_page['title']} represents the latest in AI companion technology. These platforms use advanced 
                    machine learning to create meaningful interactions through {', '.join(seo_page['keywords'][:3])}.
                </p>
            </section>
            
            <section class="detail-section">
                <h2>Recommended Platforms</h2>
                <div class="platform-grid">
                    {platform_cards}
                </div>
            </section>
            
            <section class="detail-section">
                <h2>Key Features & Benefits</h2>
                <div class="benefits-grid">
                    <div class="benefit-card">
                        <h3>Advanced Technology</h3>
                        <p>Experience cutting-edge AI technology that understands context and provides natural responses.</p>
                    </div>
                    <div class="benefit-card">
                        <h3>24/7 Availability</h3>
                        <p>Your AI companion is always available when you need support or conversation.</p>
                    </div>
                    <div class="benefit-card">
                        <h3>Privacy Protection</h3>
                        <p>Secure and private conversations with industry-standard encryption and data protection.</p>
                    </div>
                    <div class="benefit-card">
                        <h3>Personalization</h3>
                        <p>AI learns from your interactions to provide increasingly personalized experiences.</p>
                    </div>
                </div>
            </section>
            
            <section class="detail-section">
                <h2>Related Topics</h2>
                <div class="seo-grid">
                    {"".join([f'<div class="seo-card" onclick="window.location.href={chr(39)}/seo/{page}.html{chr(39)}"><h3>{page.replace("-", " ").title()}</h3><p>Explore more about {page.replace("-", " ")}.</p></div>' for page in seo_page['relatedPages'][:4]])}
                </div>
            </section>
            
            <section class="seo-text-block">
                <div class="seo-text-main">
                    <h2>Understanding {seo_page['title']}: A Comprehensive Guide</h2>
                    <div class="seo-content-grid">
                        <div class="seo-main-content">
                            <h3>What makes {seo_page['title']} unique?</h3>
                            <p>{seo_page['title']} platforms offer specialized features that set them apart from general AI chatbots. 
                            These platforms are specifically designed for {seo_page['category'].lower()} interactions, 
                            providing users with tailored experiences that match their specific needs and preferences.</p>
                            
                            <p>The technology behind {seo_page['title']} combines natural language processing, 
                            machine learning, and user behavior analysis to create compelling and realistic interactions. 
                            Whether you're looking for {', '.join(seo_page['keywords'][:2])}, these platforms deliver 
                            sophisticated AI companions that can adapt to your communication style and preferences.</p>
                        </div>
                        
                        <div class="seo-sidebar">
                            <div class="seo-features-box">
                                <h3>Popular {seo_page['category']} Features</h3>
                                <div class="feature-tags">
                                    {"".join([f'<span class="feature-tag">{keyword.title()}</span>' for keyword in seo_page['keywords'][:6]])}
                                </div>
                            </div>
                            
                            <div class="seo-stats-box">
                                <h3>Platform Statistics</h3>
                                <div class="stat-item">
                                    <span class="stat-number">95%</span>
                                    <span class="stat-label">User Satisfaction</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">24/7</span>
                                    <span class="stat-label">Availability</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">5M+</span>
                                    <span class="stat-label">Active Users</span>
                                </div>
                            </div>
                            
                            <div class="seo-cta-box">
                                <h3>Ready to Start?</h3>
                                <p>Explore the best {seo_page['category'].lower()} platforms and find your perfect AI companion.</p>
                                <button onclick="window.location.href='/index.html'" class="cta-button">Compare Platforms</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="seo-footer-content">
                        <h3>How to Choose the Right {seo_page['title']} Platform</h3>
                        <p>When selecting a {seo_page['title'].lower()} platform, consider factors such as pricing, 
                        features, user reviews, and compatibility with your devices. Look for platforms that offer 
                        {', '.join(seo_page['keywords'][2:4])} and have strong privacy protections. 
                        Reading user reviews and trying free tiers can help you make an informed decision.</p>
                    </div>
                </div>
            </section>
        </div>
        
        {create_footer_html()}
    </div>'''
    
    return create_base_html(
        f"{seo_page['title']} - {seo_page['subtitle']}",
        seo_page['description'][:150],
        content
    )

def generate_category_page(category):
    content = f'''
    <div class="detail-page">
        <button class="back-btn" onclick="history.back()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"/>
            </svg>
            <span>Back to home</span>
        </button>
        
        <div class="hero" style="background: linear-gradient(135deg, {category['color']}20 0%, #141414 100%);">
            <div class="hero-content">
                <div class="hero-badge">
                    <span>{category['icon']}</span>
                    <span>{category['name']}</span>
                </div>
                <h1 class="hero-title">{category['name'].upper()} AI PLATFORMS</h1>
                <p class="hero-subtitle">{category['description']}</p>
            </div>
        </div>
        
        <section style="padding: 40px;">
            <h2 style="font-size: 32px; font-weight: 900; text-align: center; margin-bottom: 40px; color: #fff;">{category['name']} Platforms</h2>
            <div id="category-platforms" class="platform-grid">
                <!-- Platform cards filtered by category will be inserted here by JavaScript -->
            </div>
        </section>
        
        <section style="padding: 40px;">
            <h2 style="font-size: 32px; font-weight: 900; text-align: center; margin-bottom: 40px; color: #fff;">Why Choose {category['name']} Platforms?</h2>
            <div class="benefits-grid">
                <div class="benefit-card">
                    <h3>Specialized Features</h3>
                    <p>Platforms in this category offer specialized features tailored for specific use cases and user preferences.</p>
                </div>
                <div class="benefit-card">
                    <h3>Quality Assurance</h3>
                    <p>All platforms are carefully reviewed and selected based on user feedback and feature completeness.</p>
                </div>
                <div class="benefit-card">
                    <h3>Regular Updates</h3>
                    <p>These platforms are actively maintained with regular updates and new feature additions.</p>
                </div>
                <div class="benefit-card">
                    <h3>Community Support</h3>
                    <p>Strong community backing and support resources available for users.</p>
                </div>
            </div>
        </section>
        
        {create_footer_html()}
    </div>
    
    <script>
        // Filter and display platforms for this category
        document.addEventListener('DOMContentLoaded', function() {{
            const categoryId = '{category['id']}';
            const platformsContainer = document.getElementById('category-platforms');
            
            // This will be populated by the main JavaScript
            if (window.aiPlatforms) {{
                const filteredPlatforms = window.aiPlatforms.filter(platform => {{
                    const categoryMap = {{
                        'featured': ['Premium', 'Popular'],
                        'premium': ['Premium'],
                        'romantic': ['Romance'],
                        'trending': ['Popular', 'Social'],
                        'community': ['Community', 'Social']
                    }};
                    
                    return categoryMap[categoryId] && categoryMap[categoryId].includes(platform.category);
                }});
                
                platformsContainer.innerHTML = filteredPlatforms.map(platform => `
                    <div class="platform-card" onclick="window.location.href='/platform/${{platform.slug}}.html'">
                        <div class="platform-image">
                            <img src="${{platform.image}}" alt="${{platform.name}}" />
                        </div>
                        <div class="platform-content">
                            <h3>${{platform.name}}</h3>
                            <p>${{platform.tagline}}</p>
                            <div class="platform-rating">
                                <span>★ ${{platform.rating}}</span>
                                <span>${{platform.users}} users</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }}
        }});
    </script>'''
    
    return create_base_html(
        f"{category['name']} AI Platforms - ai-characters.org",
        category['description'],
        content
    )

def generate_all_pages():
    print("🚀 Generating complete ai-characters.org website with ALL 67 SEO pages...")
    
    # Create directories
    os.makedirs("platform", exist_ok=True)
    os.makedirs("category", exist_ok=True) 
    os.makedirs("seo", exist_ok=True)
    
    # Generate platform pages
    for platform in platforms_data:
        html_content = generate_platform_page(platform)
        with open(f"platform/{platform['slug']}.html", "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"✅ Generated /platform/{platform['slug']}.html")
    
    # Generate category pages
    for category in categories_data:
        html_content = generate_category_page(category)
        with open(f"category/{category['id']}.html", "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"✅ Generated /category/{category['id']}.html")
    
    # Generate SEO pages (ALL 67)
    for seo_page in seo_pages_data:
        html_content = generate_seo_page(seo_page)
        with open(f"seo/{seo_page['slug']}.html", "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"✅ Generated /seo/{seo_page['slug']}.html")
    
    print(f"\n🎉 COMPLETE WEBSITE GENERATED!")
    print(f"✅ Generated {len(platforms_data)} platform pages")
    print(f"✅ Generated {len(categories_data)} category pages") 
    print(f"✅ Generated {len(seo_pages_data)} SEO pages")
    print(f"📊 Total pages: {len(platforms_data) + len(categories_data) + len(seo_pages_data)} + homepage + explore page")
    print("📁 Ready for deployment on any static hosting!")

if __name__ == "__main__":
    generate_all_pages()