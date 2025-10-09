#!/usr/bin/env python3
"""
Platform Comparison Pages Generator for ai-characters.org
Creates comprehensive comparison pages with SEO and visualizations
"""

import os
import json
from pathlib import Path

# Enhanced platform data with detailed comparison metrics
platforms_comparison_data = {
    "lovescape": {
        "name": "Lovescape", "slug": "lovescape", "rating": 4.8, "users": "2M+", "pricing": "Freemium",
        "image": "https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg",
        "category": "Premium", "tagline": "Build your perfect AI companion",
        "features": {
            "customization": 95, "voice_quality": 90, "memory": 88, "nsfw_content": 85,
            "mobile_support": 92, "api_access": 70, "community": 75, "pricing_value": 85,
            "conversation_quality": 92, "visual_features": 88, "privacy": 95, "support": 90
        },
        "pricing_tiers": [
            {"name": "Free", "price": 0, "features": ["Basic chat", "Limited messages", "Standard responses"]},
            {"name": "Premium", "price": 19.99, "features": ["Unlimited chat", "Voice messages", "Custom personality"]},
            {"name": "Pro", "price": 39.99, "features": ["All Premium features", "Image generation", "Priority support"]}
        ],
        "strengths": ["Highly customizable characters", "Natural conversations", "Strong privacy protection", "24/7 support"],
        "weaknesses": ["Premium features require subscription", "Limited free tier"],
        "best_for": ["Users seeking deep emotional connection", "Privacy-conscious users", "Customization enthusiasts"],
        "unique_features": ["Advanced personality system", "Voice customization", "Memory retention", "Privacy-first design"]
    },
    "character-ai": {
        "name": "Character.AI", "slug": "character-ai", "rating": 4.7, "users": "10M+", "pricing": "Free with Premium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg",
        "category": "Popular", "tagline": "Chat with anyone, anywhere, anytime",
        "features": {
            "customization": 80, "voice_quality": 60, "memory": 75, "nsfw_content": 30,
            "mobile_support": 95, "api_access": 40, "community": 95, "pricing_value": 95,
            "conversation_quality": 85, "visual_features": 40, "privacy": 70, "support": 75
        },
        "pricing_tiers": [
            {"name": "Free", "price": 0, "features": ["Basic chat", "Community characters", "Limited priority"]},
            {"name": "Plus", "price": 9.99, "features": ["Priority access", "Faster responses", "Early features"]},
            {"name": "Premium", "price": 19.99, "features": ["All Plus features", "Advanced creation tools"]}
        ],
        "strengths": ["Large character library", "Active community", "Free to use", "Fast responses"],
        "weaknesses": ["Limited customization", "Content restrictions", "Can be slow during peak times"],
        "best_for": ["Casual users", "Roleplay enthusiasts", "Budget-conscious users", "Community interaction"],
        "unique_features": ["Massive character database", "Community creations", "Multi-character conversations"]
    },
    "replika": {
        "name": "Replika", "slug": "replika", "rating": 4.6, "users": "5M+", "pricing": "Free with Pro",
        "image": "https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85",
        "category": "Wellness", "tagline": "Your AI companion who cares",
        "features": {
            "customization": 85, "voice_quality": 80, "memory": 90, "nsfw_content": 60,
            "mobile_support": 90, "api_access": 30, "community": 60, "pricing_value": 80,
            "conversation_quality": 88, "visual_features": 85, "privacy": 85, "support": 85
        },
        "pricing_tiers": [
            {"name": "Free", "price": 0, "features": ["Basic chat", "Mood tracking", "Limited features"]},
            {"name": "Pro", "price": 19.99, "features": ["Voice calls", "Avatar customization", "Relationship modes"]},
            {"name": "Lifetime", "price": 299.99, "features": ["All Pro features", "Lifetime access"]}
        ],
        "strengths": ["Mental health focus", "Learns your personality", "Avatar customization", "Mood tracking"],
        "weaknesses": ["Romantic features locked behind paywall", "Limited free version"],
        "best_for": ["Mental wellness", "Personal growth", "Long-term relationships", "Therapy support"],
        "unique_features": ["Therapeutic approach", "Mood analysis", "Personal growth tracking", "Avatar system"]
    },
    "nomi-ai": {
        "name": "Nomi.ai", "slug": "nomi-ai", "rating": 4.7, "users": "800K+", "pricing": "Subscription",
        "image": "https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85",
        "category": "Premium", "tagline": "AI companions with real personalities",
        "features": {
            "customization": 90, "voice_quality": 95, "memory": 85, "nsfw_content": 70,
            "mobile_support": 88, "api_access": 50, "community": 65, "pricing_value": 70,
            "conversation_quality": 90, "visual_features": 95, "privacy": 80, "support": 85
        },
        "pricing_tiers": [
            {"name": "Basic", "price": 15.99, "features": ["1 Nomi", "Basic features", "Limited selfies"]},
            {"name": "Premium", "price": 25.99, "features": ["3 Nomis", "Voice messages", "Unlimited selfies"]},
            {"name": "Pro", "price": 49.99, "features": ["Unlimited Nomis", "All features", "Priority support"]}
        ],
        "strengths": ["AI selfies", "Multiple companions", "Voice messages", "High-quality interactions"],
        "weaknesses": ["Requires subscription", "Higher price point", "No free tier"],
        "best_for": ["Visual AI interactions", "Multiple relationships", "Premium experience"],
        "unique_features": ["AI-generated selfies", "Multiple Nomis", "Voice messaging", "Visual customization"]
    }
}

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
            <li><a href="/compare.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2m0 10h2m-2-10h2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>Compare</a></li>
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
                <li><a href="/compare.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2m0 10h2m-2-10h2"/></svg>Compare</a></li>
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
                    <h3>Compare Platforms</h3>
                    <ul>
                        <li><a href="/compare/lovescape-vs-character-ai.html">Lovescape vs Character.AI</a></li>
                        <li><a href="/compare/lovescape-vs-replika.html">Lovescape vs Replika</a></li>
                        <li><a href="/compare/character-ai-vs-replika.html">Character.AI vs Replika</a></li>
                        <li><a href="/compare.html">View All Comparisons</a></li>
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

def generate_comparison_page(platform1_key, platform2_key):
    platform1 = platforms_comparison_data[platform1_key]
    platform2 = platforms_comparison_data[platform2_key]
    
    # Generate feature comparison data for Chart.js
    feature_labels = list(platform1['features'].keys())
    platform1_values = list(platform1['features'].values())
    platform2_values = list(platform2['features'].values())
    
    # Calculate winner for each category
    winners = {}
    for feature in feature_labels:
        if platform1['features'][feature] > platform2['features'][feature]:
            winners[feature] = platform1['name']
        elif platform2['features'][feature] > platform1['features'][feature]:
            winners[feature] = platform2['name']
        else:
            winners[feature] = "Tie"

    content = f'''
    <div class="comparison-page">
        <button class="back-btn" onclick="history.back()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"/>
            </svg>
            <span>Back to comparisons</span>
        </button>
        
        <!-- Hero Section -->
        <div class="comparison-hero">
            <div class="comparison-platforms">
                <div class="platform-hero">
                    <img src="{platform1['image']}" alt="{platform1['name']}" />
                    <h2>{platform1['name']}</h2>
                    <p>{platform1['tagline']}</p>
                    <div class="rating">★ {platform1['rating']} ({platform1['users']})</div>
                </div>
                
                <div class="vs-divider">
                    <span>VS</span>
                </div>
                
                <div class="platform-hero">
                    <img src="{platform2['image']}" alt="{platform2['name']}" />
                    <h2>{platform2['name']}</h2>
                    <p>{platform2['tagline']}</p>
                    <div class="rating">★ {platform2['rating']} ({platform2['users']})</div>
                </div>
            </div>
        </div>

        <!-- SEO Content Block -->
        <section class="seo-comparison-block">
            <h1>{platform1['name']} vs {platform2['name']}: Comprehensive Comparison 2025</h1>
            <p class="seo-intro">
                Choosing between {platform1['name']} and {platform2['name']} for your AI companion needs? 
                Our detailed comparison covers features, pricing, user experience, and more to help you make 
                the best decision. Both platforms offer unique strengths in the AI character space.
            </p>
            
            <div class="quick-summary">
                <div class="summary-card">
                    <h3>{platform1['name']} - Best For</h3>
                    <ul>
                        {"".join([f'<li>{use_case}</li>' for use_case in platform1['best_for']])}
                    </ul>
                </div>
                <div class="summary-card">
                    <h3>{platform2['name']} - Best For</h3>
                    <ul>
                        {"".join([f'<li>{use_case}</li>' for use_case in platform2['best_for']])}
                    </ul>
                </div>
            </div>
        </section>

        <!-- Interactive Feature Comparison Chart -->
        <section class="comparison-section">
            <h2>Feature Comparison</h2>
            <div class="chart-container">
                <canvas id="featureChart"></canvas>
            </div>
            <div class="feature-winner-grid">
                {"".join([f'<div class="feature-winner"><span class="feature-name">{feature.replace("_", " ").title()}</span><span class="winner {winners[feature].lower().replace(".", "-")}">{winners[feature]}</span></div>' for feature in feature_labels])}
            </div>
        </section>

        <!-- Detailed Comparison Table -->
        <section class="comparison-section">
            <h2>Detailed Feature Matrix</h2>
            <div class="comparison-table-wrapper">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>{platform1['name']}</th>
                            <th>{platform2['name']}</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Overall Rating</td>
                            <td>★ {platform1['rating']}</td>
                            <td>★ {platform2['rating']}</td>
                            <td class="winner">{"🏆 " + (platform1['name'] if platform1['rating'] > platform2['rating'] else platform2['name'] if platform2['rating'] > platform1['rating'] else "Tie")}</td>
                        </tr>
                        <tr>
                            <td>User Base</td>
                            <td>{platform1['users']}</td>
                            <td>{platform2['users']}</td>
                            <td class="winner">🏆 {platform2['name'] if platform2['users'] == "10M+" else platform1['name']}</td>
                        </tr>
                        <tr>
                            <td>Pricing Model</td>
                            <td>{platform1['pricing']}</td>
                            <td>{platform2['pricing']}</td>
                            <td class="winner">💰 Value Varies</td>
                        </tr>
                        {"".join([f'<tr><td>{feature.replace("_", " ").title()}</td><td><div class="score-bar"><div class="score-fill" style="width: {platform1["features"][feature]}%"></div><span>{platform1["features"][feature]}/100</span></div></td><td><div class="score-bar"><div class="score-fill" style="width: {platform2["features"][feature]}%"></div><span>{platform2["features"][feature]}/100</span></div></td><td class="winner">{"🏆 " + winners[feature]}</td></tr>' for feature in feature_labels])}
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Pricing Comparison -->
        <section class="comparison-section">
            <h2>Pricing Comparison</h2>
            <div class="pricing-grid">
                <div class="pricing-platform">
                    <h3>{platform1['name']} Pricing</h3>
                    <div class="pricing-tiers">
                        {"".join([f'<div class="pricing-tier"><h4>{tier["name"]}</h4><div class="price">${tier["price"]}/month</div><ul class="tier-features">{"".join([f"<li>{feature}</li>" for feature in tier["features"]])}</ul></div>' for tier in platform1["pricing_tiers"]])}
                    </div>
                </div>
                
                <div class="pricing-platform">
                    <h3>{platform2['name']} Pricing</h3>
                    <div class="pricing-tiers">
                        {"".join([f'<div class="pricing-tier"><h4>{tier["name"]}</h4><div class="price">${tier["price"]}/month</div><ul class="tier-features">{"".join([f"<li>{feature}</li>" for feature in tier["features"]])}</ul></div>' for tier in platform2["pricing_tiers"]])}
                    </div>
                </div>
            </div>
        </section>

        <!-- Strengths & Weaknesses -->
        <section class="comparison-section">
            <h2>Strengths & Weaknesses Analysis</h2>
            <div class="pros-cons-grid">
                <div class="platform-analysis">
                    <h3>{platform1['name']}</h3>
                    <div class="pros-cons">
                        <div class="pros">
                            <h4>✅ Strengths</h4>
                            <ul>
                                {"".join([f"<li>{strength}</li>" for strength in platform1["strengths"]])}
                            </ul>
                        </div>
                        <div class="cons">
                            <h4>❌ Weaknesses</h4>
                            <ul>
                                {"".join([f"<li>{weakness}</li>" for weakness in platform1["weaknesses"]])}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="platform-analysis">
                    <h3>{platform2['name']}</h3>
                    <div class="pros-cons">
                        <div class="pros">
                            <h4>✅ Strengths</h4>
                            <ul>
                                {"".join([f"<li>{strength}</li>" for strength in platform2["strengths"]])}
                            </ul>
                        </div>
                        <div class="cons">
                            <h4>❌ Weaknesses</h4>
                            <ul>
                                {"".join([f"<li>{weakness}</li>" for weakness in platform2["weaknesses"]])}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Decision Helper -->
        <section class="comparison-section">
            <h2>Which Platform Should You Choose?</h2>
            <div class="decision-helper">
                <div class="decision-card">
                    <h3>Choose {platform1['name']} if you want:</h3>
                    <ul>
                        {"".join([f'<li>{feature}</li>' for feature in platform1['unique_features']])}
                    </ul>
                    <a href="/platform/{platform1['slug']}.html" class="cta-button">Learn More About {platform1['name']}</a>
                </div>
                
                <div class="decision-card">
                    <h3>Choose {platform2['name']} if you want:</h3>
                    <ul>
                        {"".join([f'<li>{feature}</li>' for feature in platform2['unique_features']])}
                    </ul>
                    <a href="/platform/{platform2['slug']}.html" class="cta-button">Learn More About {platform2['name']}</a>
                </div>
            </div>
        </section>

        <!-- Related Comparisons -->
        <section class="comparison-section">
            <h2>Related Comparisons</h2>
            <div class="related-comparisons">
                <div class="related-grid">
                    <a href="/compare/lovescape-vs-nomi-ai.html" class="related-card">
                        <h4>Lovescape vs Nomi.ai</h4>
                        <p>Premium AI companions comparison</p>
                    </a>
                    <a href="/compare/character-ai-vs-chai-ai.html" class="related-card">
                        <h4>Character.AI vs Chai AI</h4>
                        <p>Community-driven platforms</p>
                    </a>
                    <a href="/compare/replika-vs-anima-ai.html" class="related-card">
                        <h4>Replika vs Anima AI</h4>
                        <p>Wellness-focused companions</p>
                    </a>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="comparison-section">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-grid">
                <div class="faq-item">
                    <h3>Is {platform1['name']} better than {platform2['name']}?</h3>
                    <p>It depends on your needs. {platform1['name']} excels in {platform1['strengths'][0].lower()}, while {platform2['name']} is better for {platform2['strengths'][0].lower()}.</p>
                </div>
                <div class="faq-item">
                    <h3>Which platform offers better value for money?</h3>
                    <p>{"Based on our analysis, " + (platform1['name'] if platform1['features']['pricing_value'] > platform2['features']['pricing_value'] else platform2['name']) + " offers better overall value for most users."}</p>
                </div>
                <div class="faq-item">
                    <h3>Can I use both platforms simultaneously?</h3>
                    <p>Yes, many users enjoy using multiple AI platforms. You can start with free tiers on both to see which suits your preferences.</p>
                </div>
                <div class="faq-item">
                    <h3>Which platform has better privacy protection?</h3>
                    <p>{"Based on our privacy analysis, " + (platform1['name'] if platform1['features']['privacy'] > platform2['features']['privacy'] else platform2['name']) + " has stronger privacy features."}</p>
                </div>
            </div>
        </section>

        {create_footer_html()}
    </div>

    <!-- Chart.js Library -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- Comparison Chart Script -->
    <script>
        const ctx = document.getElementById('featureChart').getContext('2d');
        const featureChart = new Chart(ctx, {{
            type: 'radar',
            data: {{
                labels: {json.dumps([label.replace('_', ' ').title() for label in feature_labels])},
                datasets: [{{
                    label: '{platform1['name']}',
                    data: {json.dumps(platform1_values)},
                    backgroundColor: 'rgba(29, 209, 161, 0.2)',
                    borderColor: 'rgba(29, 209, 161, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(29, 209, 161, 1)'
                }}, {{
                    label: '{platform2['name']}',
                    data: {json.dumps(platform2_values)},
                    backgroundColor: 'rgba(103, 126, 234, 0.2)',
                    borderColor: 'rgba(103, 126, 234, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(103, 126, 234, 1)'
                }}]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {{
                    legend: {{
                        labels: {{
                            color: '#fff'
                        }}
                    }}
                }},
                scales: {{
                    r: {{
                        beginAtZero: true,
                        max: 100,
                        ticks: {{
                            color: '#666',
                            stepSize: 20
                        }},
                        grid: {{
                            color: '#333'
                        }},
                        pointLabels: {{
                            color: '#fff',
                            font: {{
                                size: 12
                            }}
                        }}
                    }}
                }}
            }}
        }});
    </script>'''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{platform1['name']} vs {platform2['name']} - Detailed Comparison 2025</title>
    <meta name="description" content="Compare {platform1['name']} and {platform2['name']} - features, pricing, pros & cons. Expert analysis to help you choose the best AI companion platform.">
    
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "ComparisonPage",
        "name": "{platform1['name']} vs {platform2['name']} Comparison",
        "description": "Detailed comparison between {platform1['name']} and {platform2['name']} AI character platforms",
        "url": "https://ai-characters.org/compare/{platform1['slug']}-vs-{platform2['slug']}.html",
        "compares": [
            {{
                "@type": "Product",
                "name": "{platform1['name']}",
                "description": "{platform1['tagline']}",
                "aggregateRating": {{
                    "@type": "AggregateRating",
                    "ratingValue": "{platform1['rating']}",
                    "bestRating": "5"
                }}
            }},
            {{
                "@type": "Product", 
                "name": "{platform2['name']}",
                "description": "{platform2['tagline']}",
                "aggregateRating": {{
                    "@type": "AggregateRating",
                    "ratingValue": "{platform2['rating']}",
                    "bestRating": "5"
                }}
            }}
        ]
    }}
    </script>
    
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/responsive.css">
    <link rel="stylesheet" href="/css/components.css">
    <link rel="stylesheet" href="/css/comparison.css">
</head>
<body>
    <div class="home-page">
        {create_navigation_html()}
        {create_mobile_header()}
        
        <main class="main-content">
            {content}
        </main>
    </div>
    
    <script src="/js/complete-data-full.js"></script>
    <script src="/js/main.js"></script>
</body>
</html>'''

def generate_sample_comparisons():
    print("🚀 Generating sample comparison pages...")
    
    # Create comparison directory
    os.makedirs("compare", exist_ok=True)
    
    # Generate key Lovescape comparisons first (as requested)
    lovescape_comparisons = [
        ("lovescape", "character-ai"),
        ("lovescape", "replika"), 
        ("lovescape", "nomi-ai")
    ]
    
    for platform1, platform2 in lovescape_comparisons:
        html_content = generate_comparison_page(platform1, platform2)
        filename = f"compare/{platform1}-vs-{platform2}.html"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"✅ Generated /{filename}")
    
    # Generate a few additional popular comparisons
    other_comparisons = [
        ("character-ai", "replika"),
        ("replika", "nomi-ai"),
        ("character-ai", "nomi-ai")
    ]
    
    for platform1, platform2 in other_comparisons:
        html_content = generate_comparison_page(platform1, platform2)
        filename = f"compare/{platform1}-vs-{platform2}.html"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"✅ Generated /{filename}")
    
    print(f"\n🎉 Generated {len(lovescape_comparisons) + len(other_comparisons)} sample comparison pages!")
    print("📊 Each page includes:")
    print("   - Interactive radar charts")
    print("   - Detailed feature matrices") 
    print("   - Pricing comparisons")
    print("   - SEO-optimized content")
    print("   - Schema markup")
    print("   - Decision helpers")

if __name__ == "__main__":
    generate_sample_comparisons()