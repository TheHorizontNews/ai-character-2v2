# Sitemap generation utilities for SEO
from datetime import datetime
from typing import List, Dict

SITE_DOMAIN = "https://charactercentral.preview.emergentagent.com"

# Priority levels
PRIORITY_HOMEPAGE = "1.0"
PRIORITY_PLATFORM = "0.9"
PRIORITY_COMPARISON = "0.8"
PRIORITY_SEO_PAGE = "0.8"
PRIORITY_CATEGORY = "0.7"
PRIORITY_EXPLORE = "0.7"

# Change frequency
FREQ_DAILY = "daily"
FREQ_WEEKLY = "weekly"
FREQ_MONTHLY = "monthly"

def get_current_date():
    """Get current date in ISO format for lastmod"""
    return datetime.now().strftime('%Y-%m-%d')

def generate_url_entry(loc: str, lastmod: str = None, changefreq: str = FREQ_WEEKLY, priority: str = "0.5") -> str:
    """Generate a single URL entry for sitemap"""
    lastmod = lastmod or get_current_date()
    return f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>"""

def generate_sitemap_xml(urls: List[Dict[str, str]]) -> str:
    """Generate complete sitemap XML"""
    xml_header = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'''
    
    xml_footer = '\n</urlset>'
    
    url_entries = '\n'.join([
        generate_url_entry(
            url.get('loc'),
            url.get('lastmod'),
            url.get('changefreq', FREQ_WEEKLY),
            url.get('priority', '0.5')
        )
        for url in urls
    ])
    
    return xml_header + '\n' + url_entries + xml_footer

# Platform slugs (21 platforms)
PLATFORM_SLUGS = [
    'lovescape', 'character-ai', 'replika', 'anima-ai', 'nomi-ai',
    'chai-ai', 'inworld-ai', 'crushon-ai', 'janitor-ai', 'poe',
    'dreamgf', 'candy-ai', 'soulgen', 'dreambf', 'kindroid',
    'polybuzz', 'kupid-ai', 'ai-mirror', 'paradot', 'romantic-ai', 'talkie-ai'
]

# SEO page slugs (67 pages)
SEO_PAGE_SLUGS = [
    'ai-girlfriend-chat', 'ai-girlfriend-chatbot', 'ai-girlfriend-app',
    'ai-girlfriend-voice-chat', 'ai-girlfriend-roleplay',
    'ai-character-generator', 'ai-character-design', 'ai-character-personality',
    'ai-character-voice', 'ai-character-animation', 'ai-character-chatbot',
    'anime-ai-character', 'anime-ai-character-generator', 'anime-ai-waifu',
    'anime-ai-waifu-generator', 'anime-ai-waifu-chatbot', 'anime-ai-waifu-art',
    'ai-waifu-girlfriend', 'ai-boyfriend-chat', 'ai-boyfriend-app',
    'ai-boyfriend-voice-chat', 'ai-boyfriend-roleplay', 'ai-virtual-partner',
    'ai-friend-chat', 'ai-best-friend-chatbot', 'ai-companion-app',
    'virtual-ai-friend', 'ai-best-friend', 'ai-roleplay-chat',
    'ai-fantasy-roleplay', 'ai-story-roleplay', 'ai-rp-chatbot',
    'ai-character-creator', 'ai-character-maker', 'ai-character-builder',
    'create-ai-character', 'ai-character-backstory-generator',
    'ai-character-bio-generator', 'ai-character-description-generator',
    'fantasy-ai-character', 'manga-ai-character', 'best-ai-girlfriend-app',
    'best-ai-chatbot-for-roleplay', 'top-nsfw-ai-chatbots',
    'best-ai-companion-apps', 'ai-girlfriend-chat-online', 'spicy-ai-chat',
    'spicy-ai-chat-online', 'spicy-ai-chat-no-signup', 'spicy-ai-chat-anonymous',
    'spicy-ai-chat-uncensored', 'spicy-ai-chat-roleplay', 'spicy-ai-chat-flirty',
    'dirty-talk-ai', 'spicy-ai-girlfriend-persona', 'spicy-ai-boyfriend-persona',
    'crush-on-ai', 'crush-on-ai-chat', 'crush-on-ai-app', 'crush-on-ai-chatbot',
    'nsfw-ai-chat', 'ai-sexting-chat', 'free-ai-girlfriend',
    'ai-companion-online', 'ai-therapy-chatbot', 'ai-dating-simulator',
    'voice-ai-girlfriend'
]

# Category slugs
CATEGORY_SLUGS = ['premium', 'romance', 'wellness', 'community', 'developer', 'voice', 'creative']

def get_all_comparison_pairs() -> List[tuple]:
    """Generate all platform comparison pairs"""
    comparisons = []
    for i, platform1 in enumerate(PLATFORM_SLUGS):
        for platform2 in PLATFORM_SLUGS[i+1:]:
            comparisons.append((platform1, platform2))
    return comparisons

def generate_main_sitemap() -> str:
    """Generate main sitemap with all URLs"""
    urls = []
    
    # Homepage
    urls.append({
        'loc': f'{SITE_DOMAIN}/',
        'changefreq': FREQ_DAILY,
        'priority': PRIORITY_HOMEPAGE
    })
    
    # Platform pages
    for slug in PLATFORM_SLUGS:
        urls.append({
            'loc': f'{SITE_DOMAIN}/platform/{slug}',
            'changefreq': FREQ_WEEKLY,
            'priority': PRIORITY_PLATFORM
        })
    
    # SEO pages
    for slug in SEO_PAGE_SLUGS:
        urls.append({
            'loc': f'{SITE_DOMAIN}/character-review/{slug}',
            'changefreq': FREQ_WEEKLY,
            'priority': PRIORITY_SEO_PAGE
        })
    
    # Category pages
    for slug in CATEGORY_SLUGS:
        urls.append({
            'loc': f'{SITE_DOMAIN}/category/{slug}',
            'changefreq': FREQ_WEEKLY,
            'priority': PRIORITY_CATEGORY
        })
    
    # Compare hub
    urls.append({
        'loc': f'{SITE_DOMAIN}/compare',
        'changefreq': FREQ_WEEKLY,
        'priority': PRIORITY_EXPLORE
    })
    
    # Comparison pages
    for platform1, platform2 in get_all_comparison_pairs():
        urls.append({
            'loc': f'{SITE_DOMAIN}/compare/{platform1}-vs-{platform2}',
            'changefreq': FREQ_MONTHLY,
            'priority': PRIORITY_COMPARISON
        })
    
    # Explore page
    urls.append({
        'loc': f'{SITE_DOMAIN}/explore',
        'changefreq': FREQ_WEEKLY,
        'priority': PRIORITY_EXPLORE
    })
    
    # All comparisons page
    urls.append({
        'loc': f'{SITE_DOMAIN}/all-comparisons',
        'changefreq': FREQ_WEEKLY,
        'priority': PRIORITY_EXPLORE
    })
    
    return generate_sitemap_xml(urls)

def generate_sitemap_index() -> str:
    """Generate sitemap index pointing to individual sitemaps"""
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>{SITE_DOMAIN}/sitemap-main.xml</loc>
    <lastmod>{get_current_date()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{SITE_DOMAIN}/sitemap-platforms.xml</loc>
    <lastmod>{get_current_date()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{SITE_DOMAIN}/sitemap-seo.xml</loc>
    <lastmod>{get_current_date()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{SITE_DOMAIN}/sitemap-comparisons.xml</loc>
    <lastmod>{get_current_date()}</lastmod>
  </sitemap>
</sitemapindex>'''
