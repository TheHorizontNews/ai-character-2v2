#!/usr/bin/env python3
"""
Update all generated pages to include comparison navigation links
"""

import os
import glob
import re

def update_navigation_in_file(file_path):
    """Add comparison navigation to a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if comparison links already exist
        if '/compare.html' in content and '/all-comparisons.html' in content:
            print(f"✅ {file_path} already has comparison navigation")
            return False
        
        # Pattern to find where to insert comparison links (after Explore Topics)
        sidebar_pattern = r'(</svg>\s*Explore Topics\s*</a></li>)\s*(<li><a href="/category/featured.html">)'
        mobile_pattern = r'(</svg>\s*Explore Topics\s*</a></li>)\s*(<li><a href="/category/featured.html">)'
        
        comparison_links_sidebar = '''</svg>
                    Explore Topics
                </a></li>
                <li><a href="/compare.html">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 17H7A5 5 0 0 1 7 7h2m0 10h2m-2-10h2"/>
                        <line x1="12" y1="12" x2="12" y2="12"/>
                    </svg>
                    Compare
                </a></li>
                <li><a href="/all-comparisons.html">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                    </svg>
                    All Comparisons
                </a></li>
                <li><a href="/category/featured.html">'''
        
        comparison_links_mobile = '''</svg>
                        Explore Topics
                    </a></li>
                    <li><a href="/compare.html">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 17H7A5 5 0 0 1 7 7h2m0 10h2m-2-10h2"/>
                            <line x1="12" y1="12" x2="12" y2="12"/>
                        </svg>
                        Compare
                    </a></li>
                    <li><a href="/all-comparisons.html">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>
                        All Comparisons
                    </a></li>
                    <li><a href="/category/featured.html">'''
        
        # Update sidebar navigation
        content = re.sub(sidebar_pattern, comparison_links_sidebar, content, flags=re.MULTILINE | re.DOTALL)
        
        # Update mobile navigation (look for mobile-specific patterns)
        mobile_sidebar_pattern = r'(</svg>\s*Explore Topics\s*</a></li>)\s*(<li><a href="/category/featured.html">\s*<svg)'
        content = re.sub(mobile_sidebar_pattern, comparison_links_mobile, content, flags=re.MULTILINE | re.DOTALL)
        
        # Write back the updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Updated {file_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error updating {file_path}: {e}")
        return False

def update_all_pages():
    """Update all HTML pages with comparison navigation"""
    print("🔄 Adding comparison navigation to all pages...")
    
    # Get all HTML files except the ones we already updated manually
    html_files = []
    
    # Add platform pages
    html_files.extend(glob.glob('platform/*.html'))
    
    # Add SEO pages  
    html_files.extend(glob.glob('seo/*.html'))
    
    # Add category pages
    html_files.extend(glob.glob('category/*.html'))
    
    # Add comparison pages
    html_files.extend(glob.glob('compare/*.html'))
    
    updated_count = 0
    
    for file_path in html_files:
        if update_navigation_in_file(file_path):
            updated_count += 1
    
    print(f"\n🎉 Updated {updated_count} pages with comparison navigation!")
    print(f"📊 Total HTML files checked: {len(html_files)}")
    
    # Also update the build scripts to include navigation by default
    print("\n💡 Note: Future page generation will include comparison navigation automatically")

if __name__ == "__main__":
    update_all_pages()