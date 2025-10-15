"""
Meta tags data for all pages
"""

# Platform pages meta data
PLATFORM_META = {
    'character-ai': {
        'title': 'Character.AI Review 2025 - Features, Pricing & User Experience | AI Characters',
        'description': 'Comprehensive Character.AI review: Chat with intelligent AI characters. Explore features, pricing, pros & cons. 4.7/5 rating from 10M+ users. Popular AI platform.',
        'og_image': 'https://ai-characters.org/images/character-ai-logo.png'
    },
    'replika': {
        'title': 'Replika Review 2025 - Features, Pricing & User Experience | AI Characters',
        'description': 'Comprehensive Replika review: Your AI companion for emotional support. Explore features, pricing, pros & cons. 4.5/5 rating from 5M+ users. Mental Health AI platform.',
        'og_image': 'https://ai-characters.org/images/replika-logo.png'
    },
    'lovescape': {
        'title': 'Lovescape Review 2025 - Features, Pricing & User Experience | AI Characters',
        'description': 'Comprehensive Lovescape review: Customize your perfect AI girlfriend. Explore features, pricing, pros & cons. 4.5/5 rating from 500K+ users. Premium AI platform.',
        'og_image': 'https://ai-characters.org/images/lovescape-logo.png'
    },
    'anima-ai': {
        'title': 'Anima AI Review 2025 - Features, Pricing & User Experience | AI Characters',
        'description': 'Comprehensive Anima AI review: Virtual AI girlfriend companion. Explore features, pricing, pros & cons. 4.6/5 rating from 1M+ users. Romance AI platform.',
        'og_image': 'https://ai-characters.org/images/anima-ai-logo.png'
    },
    # Add more platforms as needed
}

# Character review pages meta data
CHARACTER_REVIEW_META = {
    'ai-girlfriend-chatbot': {
        'title': 'AI Girlfriend Chatbot - Complete Guide & Best Platforms 2025 | AI Characters',
        'description': 'Discover intelligent AI girlfriend chatbots that understand emotions, engage in meaningful conversations, and adapt to your personality. Explore features, pricing, and top platforms for virtual romance.',
        'og_image': 'https://ai-characters.org/og-image.png'
    },
    'ai-girlfriend-chat': {
        'title': 'AI Girlfriend Chat - Complete Guide & Best Platforms 2025 | AI Characters',
        'description': 'Find the best AI girlfriend chat platforms offering natural conversations, emotional intelligence, and personalized experiences. Compare features, pricing, and user reviews.',
        'og_image': 'https://ai-characters.org/og-image.png'
    },
    'ai-girlfriend-app': {
        'title': 'AI Girlfriend App - Complete Guide & Best Platforms 2025 | AI Characters',
        'description': 'Explore top AI girlfriend apps with advanced features, natural conversations, and emotional support. Read reviews, compare pricing, and find your perfect virtual companion.',
        'og_image': 'https://ai-characters.org/og-image.png'
    },
    # Add more character review pages as needed
}

# Homepage meta
HOMEPAGE_META = {
    'title': 'Best AI Character & Companion Platforms 2025 | AI Characters',
    'description': 'Discover and compare the top 21 AI character and companion platforms. Expert reviews, detailed comparisons, and comprehensive guides for AI girlfriends, chatbots, and virtual companions.',
    'og_image': 'https://ai-characters.org/og-image.png'
}

# Explore page meta
EXPLORE_META = {
    'title': 'Explore AI Companion Platforms - Reviews & Comparisons | AI Characters',
    'description': 'Browse our complete collection of AI companion platform reviews. Filter by category, compare features, and find the perfect AI character platform for your needs.',
    'og_image': 'https://ai-characters.org/og-image.png'
}

def get_meta_tags(path: str):
    """
    Get meta tags for a specific path
    """
    # Homepage
    if path == '/' or path == '':
        return HOMEPAGE_META
    
    # Explore page
    if path == '/explore':
        return EXPLORE_META
    
    # Platform pages
    if path.startswith('/platform/'):
        slug = path.replace('/platform/', '').strip('/')
        return PLATFORM_META.get(slug, {
            'title': 'AI Platform Review 2025 | AI Characters',
            'description': 'Comprehensive AI platform review with features, pricing, and user experience analysis.',
            'og_image': 'https://ai-characters.org/og-image.png'
        })
    
    # Character review pages
    if path.startswith('/character-review/'):
        slug = path.replace('/character-review/', '').strip('/')
        return CHARACTER_REVIEW_META.get(slug, {
            'title': 'AI Character Guide & Best Platforms 2025 | AI Characters',
            'description': 'Complete guide to AI character platforms with expert reviews, comparisons, and recommendations.',
            'og_image': 'https://ai-characters.org/og-image.png'
        })
    
    # Default meta
    return {
        'title': 'AI Characters - Best AI Companion Platform Reviews',
        'description': 'Expert reviews and comparisons of AI character and companion platforms.',
        'og_image': 'https://ai-characters.org/og-image.png'
    }
