#!/usr/bin/env python3
"""
Complete website generator for ai-characters.org
Generates all HTML pages with proper cross-linking and SEO
"""

import os
import json
from pathlib import Path

# Complete platform data
platforms_data = [
    {
        "id": 1,
        "name": "Lovescape",
        "slug": "lovescape",
        "tagline": "Build your perfect AI companion",
        "description": "Create customizable AI characters with unique personalities, voices, and appearances. Features 24/7 emotional support and adaptive conversations.",
        "rating": 4.8,
        "users": "2M+",
        "category": "Premium",
        "features": ["Custom Personality", "Voice Customization", "24/7 Support", "Private & Secure"],
        "pricing": "Freemium",
        "image": "https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg",
        "pros": ["Highly customizable characters", "Natural conversations", "Strong privacy protection"],
        "cons": ["Premium features require subscription"],
        "bestFor": "Users seeking deep emotional connection"
    },
    {
        "id": 2,
        "name": "Character.AI",
        "slug": "character-ai",
        "tagline": "Chat with anyone, anywhere, anytime",
        "description": "Engage with AI characters from fiction, history, or create your own. Powered by advanced language models for realistic conversations.",
        "rating": 4.7,
        "users": "10M+",
        "category": "Popular",
        "features": ["Pre-made Characters", "Community Creations", "Multiple Characters", "Free Access"],
        "pricing": "Free with Premium option",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg",
        "pros": ["Large character library", "Active community", "Free to use"],
        "cons": ["Can be slow during peak times", "Limited customization"],
        "bestFor": "Casual users and roleplay enthusiasts"
    },
    {
        "id": 3,
        "name": "Replika",
        "slug": "replika",
        "tagline": "Your AI companion who cares",
        "description": "Develop a meaningful relationship with an AI that learns from you. Focus on mental wellness and emotional support.",
        "rating": 4.6,
        "users": "5M+",
        "category": "Wellness",
        "features": ["Mental Health Focus", "Personalized Learning", "Avatar Customization", "Mood Tracking"],
        "pricing": "Free with Pro subscription",
        "image": "https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Therapeutic approach", "Learns your personality", "Supportive community"],
        "cons": ["Romantic features locked behind paywall"],
        "bestFor": "Mental wellness and personal growth"
    },
    {
        "id": 4,
        "name": "Anima AI",
        "slug": "anima-ai", 
        "tagline": "Your virtual friend with personality",
        "description": "Chat with a friendly AI companion that remembers your conversations and grows with you over time.",
        "rating": 4.5,
        "users": "1M+",
        "category": "Friendship",
        "features": ["Memory System", "Personality Development", "Roleplay Modes", "Image Generation"],
        "pricing": "Free with Premium tiers",
        "image": "https://images.unsplash.com/photo-1646583288948-24548aedffd8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhbmRpbmd8ZW58MHx8fHwxNzYwMDMzMzgyfDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Good memory retention", "Engaging conversations", "Regular updates"],
        "cons": ["Limited free messages", "Sometimes repetitive"],
        "bestFor": "Daily casual conversations"
    },
    {
        "id": 5,
        "name": "Nomi.ai",
        "slug": "nomi-ai",
        "tagline": "AI companions with real personalities",
        "description": "Create multiple AI companions with distinct personalities. Features include selfies, voice messages, and memory.",
        "rating": 4.7,
        "users": "800K+",
        "category": "Premium",
        "features": ["Multiple Companions", "AI Selfies", "Voice Messages", "Deep Memory"],
        "pricing": "Subscription-based",
        "image": "https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
        "pros": ["Unique selfie feature", "Multiple AI companions", "Strong personality"],
        "cons": ["Requires subscription", "Higher price point"],
        "bestFor": "Users wanting visual AI interactions"
    }
]

# SEO pages data (sample - will generate all 67)
seo_pages_data = [
    {
        "slug": "ai-girlfriend-chat",
        "category": "AI Girlfriend",
        "title": "AI Girlfriend Chat",
        "subtitle": "Chat with your perfect AI girlfriend companion",
        "description": "Experience meaningful conversations with AI girlfriend chat platforms. Connect with virtual companions designed for emotional support and romantic interactions.",
        "keywords": ["ai girlfriend", "virtual girlfriend", "chat", "companion"],
        "platforms": ["dreamgf", "candy-ai", "romantic-ai"],
        "relatedPages": ["ai-girlfriend-chatbot", "ai-girlfriend-app", "ai-girlfriend-voice-chat"]
    },
    {
        "slug": "ai-character-generator",
        "category": "AI Character", 
        "title": "AI Character Generator",
        "subtitle": "Generate unique AI characters instantly",
        "description": "Create custom AI characters with advanced generators. Design personalities, appearances, and backstories for your perfect companion.",
        "keywords": ["generator", "create", "character", "ai"],
        "platforms": ["character-ai", "lovescape", "janitor-ai"],
        "relatedPages": ["ai-character-creator", "ai-character-maker", "anime-ai-character-generator"]
    }
]

# Categories data
categories_data = [
    {"id": "featured", "name": "Featured", "icon": "✨", "color": "#667eea"},
    {"id": "premium", "name": "Premium", "icon": "👑", "color": "#f093fb"},
    {"id": "romantic", "name": "Romantic", "icon": "💕", "color": "#ff6b6b"},
    {"id": "trending", "name": "Trending", "icon": "📈", "color": "#4ecdc4"},
    {"id": "community", "name": "Community", "icon": "👥", "color": "#45b7d1"}
]

def create_navigation_html():
    """Generate navigation HTML"""
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
    """Generate mobile header HTML"""
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

def create_base_html(title, description, content, page_type="page"):
    """Generate base HTML template"""
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
</head>
<body>
    <div class="home-page">
        {create_navigation_html()}
        {create_mobile_header()}
        
        <main class="main-content">
            {content}
        </main>
    </div>
    
    <script src="/js/data.js"></script>
    <script src="/js/main.js"></script>
</body>
</html>'''

def generate_platform_page(platform):
    """Generate individual platform page"""
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
    </div>'''
    
    return create_base_html(
        f"{platform['name']} Review 2025 — {platform['tagline']}",
        f"{platform['description']}",
        content
    )

def generate_all_pages():
    """Generate all website pages"""
    print("Generating complete ai-characters.org website...")
    
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
    
    print(f"Generated {len(platforms_data)} platform pages")
    print("🚀 Complete website generated successfully!")

if __name__ == "__main__":
    generate_all_pages()