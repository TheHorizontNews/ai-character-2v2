# Bot detection and meta tag injection middleware for FastAPI

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response, FileResponse
import re
from pathlib import Path
from meta_data import (
    PLATFORMS, SEO_PAGES, HOMEPAGE, CATEGORIES, COMPARE_HUB,
    EXPLORE_PAGE, ALL_COMPARISONS, get_comparison_meta,
    SITE_DOMAIN, SITE_NAME, DEFAULT_OG_IMAGE
)

# Bot User-Agent patterns
BOT_USER_AGENTS = [
    'Telegram',
    'facebookexternalhit',
    'Facebot',
    'Twitterbot',
    'LinkedInBot',
    'Slackbot',
    'Discordbot',
    'WhatsApp',
    'SkypeUriPreview',
    'GoogleBot',
    'Google-InspectionTool',
    'bingbot',
    'yandex',
    'DuckDuckBot'
]

def is_bot(user_agent: str) -> bool:
    """Check if the request is from a bot/crawler"""
    if not user_agent:
        return False
    
    user_agent_lower = user_agent.lower()
    return any(bot.lower() in user_agent_lower for bot in BOT_USER_AGENTS)

def inject_meta_tags(html_content: str, meta_data: dict, canonical_url: str) -> str:
    """Inject meta tags into HTML content"""
    
    # Extract existing head content
    head_pattern = r'<head>(.*?)</head>'
    head_match = re.search(head_pattern, html_content, re.DOTALL)
    
    if not head_match:
        return html_content
    
    # Build meta tags HTML
    meta_tags = f"""
    <!-- SEO Meta Tags -->
    <title>{meta_data['title']}</title>
    <meta name="description" content="{meta_data['description']}" />
    <link rel="canonical" href="{canonical_url}" />
    
    <!-- Open Graph / Facebook / LinkedIn / Telegram -->
    <meta property="og:title" content="{meta_data['og_title']}" />
    <meta property="og:description" content="{meta_data['og_description']}" />
    <meta property="og:image" content="{meta_data.get('og_image', DEFAULT_OG_IMAGE)}" />
    <meta property="og:url" content="{canonical_url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="{SITE_NAME}" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{meta_data['og_title']}" />
    <meta name="twitter:description" content="{meta_data['og_description']}" />
    <meta name="twitter:image" content="{meta_data.get('og_image', DEFAULT_OG_IMAGE)}" />
    <meta name="twitter:site" content="@CharacterCentral" />
    """
    
    # Remove existing meta tags that we're replacing
    existing_head = head_match.group(1)
    
    # Remove old title tag
    existing_head = re.sub(r'<title>.*?</title>', '', existing_head, flags=re.DOTALL)
    
    # Remove old meta description
    existing_head = re.sub(r'<meta\s+name="description"[^>]*>', '', existing_head, flags=re.IGNORECASE)
    
    # Remove old canonical
    existing_head = re.sub(r'<link\s+rel="canonical"[^>]*>', '', existing_head, flags=re.IGNORECASE)
    
    # Remove old Open Graph tags
    existing_head = re.sub(r'<meta\s+property="og:[^"]*"[^>]*>', '', existing_head, flags=re.IGNORECASE)
    
    # Remove old Twitter tags
    existing_head = re.sub(r'<meta\s+name="twitter:[^"]*"[^>]*>', '', existing_head, flags=re.IGNORECASE)
    
    # Inject new meta tags at the beginning of head
    new_head = meta_tags + existing_head
    
    # Replace head content
    new_html = re.sub(head_pattern, f'<head>{new_head}</head>', html_content, flags=re.DOTALL)
    
    return new_html

def get_meta_for_path(path: str) -> dict:
    """Get meta tags data based on the request path"""
    
    # Homepage
    if path == '/' or path == '':
        return HOMEPAGE
    
    # Platform detail pages: /platform/:slug
    if path.startswith('/platform/'):
        slug = path.replace('/platform/', '').strip('/')
        if slug in PLATFORMS:
            return PLATFORMS[slug]
    
    # SEO pages: /character-review/:slug
    if path.startswith('/character-review/') or path.startswith('/seo/'):
        slug = path.replace('/character-review/', '').replace('/seo/', '').strip('/')
        if slug in SEO_PAGES:
            return SEO_PAGES[slug]
    
    # Category pages: /category/:name
    if path.startswith('/category/'):
        category = path.replace('/category/', '').strip('/').lower()
        if category in CATEGORIES:
            return CATEGORIES[category]
    
    # Compare hub
    if path == '/compare' or path == '/compare/':
        return COMPARE_HUB
    
    # Comparison detail pages: /compare/:platform1-vs-:platform2
    if path.startswith('/compare/') and '-vs-' in path:
        comparison_slug = path.replace('/compare/', '').strip('/')
        parts = comparison_slug.split('-vs-')
        
        if len(parts) == 2:
            platform1_slug = parts[0].strip()
            platform2_slug = parts[1].strip()
            
            platform1_data = PLATFORMS.get(platform1_slug)
            platform2_data = PLATFORMS.get(platform2_slug)
            
            if platform1_data and platform2_data:
                return get_comparison_meta(
                    platform1_data['name'],
                    platform2_data['name'],
                    platform1_slug,
                    platform2_slug
                )
    
    # Explore page
    if path == '/explore' or path == '/explore/':
        return EXPLORE_PAGE
    
    # All comparisons page
    if path == '/all-comparisons' or path == '/all-comparisons/':
        return ALL_COMPARISONS
    
    # Default fallback to homepage
    return HOMEPAGE

class BotMetaMiddleware(BaseHTTPMiddleware):
    """Middleware to detect bots and inject meta tags"""
    
    async def dispatch(self, request: Request, call_next):
        # Only process GET requests
        if request.method != "GET":
            return await call_next(request)
        
        # Skip API routes
        if request.url.path.startswith('/api'):
            return await call_next(request)
        
        # Check if it's a bot
        user_agent = request.headers.get('user-agent', '')
        
        if not is_bot(user_agent):
            # Not a bot, proceed normally
            return await call_next(request)
        
        # It's a bot - serve modified HTML with meta tags
        try:
            # Read the index.html file
            frontend_path = Path(__file__).parent.parent / 'frontend' / 'public' / 'index.html'
            
            if not frontend_path.exists():
                # Fallback if file not found
                return await call_next(request)
            
            with open(frontend_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            # Get meta data for this path
            path = request.url.path
            meta_data = get_meta_for_path(path)
            
            # Build canonical URL
            canonical_url = f"{SITE_DOMAIN}{path}"
            
            # Inject meta tags
            modified_html = inject_meta_tags(html_content, meta_data, canonical_url)
            
            # Return modified HTML
            return Response(
                content=modified_html,
                media_type='text/html',
                headers={
                    'Cache-Control': 'public, max-age=3600',
                    'X-Bot-Detected': 'true'
                }
            )
            
        except Exception as e:
            print(f"Error in BotMetaMiddleware: {e}")
            # Fallback to normal response on error
            return await call_next(request)
