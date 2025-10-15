#!/usr/bin/env python3
"""
Generate static sitemap.xml and sitemap-index.xml files
Run this script before deployment to update sitemaps
"""

import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent.parent / 'backend'
sys.path.insert(0, str(backend_dir))

from sitemap_generator import generate_main_sitemap, generate_sitemap_index

def main():
    frontend_public = Path(__file__).parent.parent / 'frontend' / 'public'
    
    # Generate main sitemap
    sitemap_path = frontend_public / 'sitemap.xml'
    xml_content = generate_main_sitemap()
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(xml_content)
    print(f'✅ Generated sitemap.xml ({len(xml_content)} bytes)')
    
    # Generate sitemap index
    index_path = frontend_public / 'sitemap-index.xml'
    index_content = generate_sitemap_index()
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print(f'✅ Generated sitemap-index.xml ({len(index_content)} bytes)')
    
    print('\n📊 Sitemap statistics:')
    print(f'   Total size: {(len(xml_content) + len(index_content)) / 1024:.2f} KB')
    print(f'   URLs: {xml_content.count("<url>")}')
    print('\n🚀 Sitemaps ready for deployment!')

if __name__ == '__main__':
    main()
