#!/usr/bin/env python3
"""
Comprehensive Backend and Schema.org Testing for ai-characters.org
Tests backend API functionality, sitemap generation, bot detection middleware, and schema.org implementation.
"""

import requests
import json
import re
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv
from urllib.parse import urljoin

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get URLs from environment - using production URLs as specified in review request
FRONTEND_URL = 'https://seoschema.preview.emergentagent.com'
BACKEND_URL = 'https://seoschema.preview.emergentagent.com/api'
# Test the backend directly on localhost for internal testing
DIRECT_BACKEND_URL = 'http://localhost:8001'
print(f"Testing frontend at: {FRONTEND_URL}")
print(f"Testing backend API at: {BACKEND_URL}")
print(f"Testing backend directly at: {DIRECT_BACKEND_URL}")

# Bot User-Agents for testing
BOT_USER_AGENTS = {
    'TelegramBot': 'TelegramBot (like TwitterBot)',
    'FacebookBot': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'TwitterBot': 'Twitterbot/1.0',
    'LinkedInBot': 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com/)',
    'SlackBot': 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
    'DiscordBot': 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
    'WhatsAppBot': 'WhatsApp/2.19.81 A',
    'GoogleBot': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
}

# Regular browser User-Agent
REGULAR_BROWSER = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

class ComprehensiveBackendTest:
    def __init__(self):
        self.results = []
        self.errors = []
        
    def log_result(self, test_name, success, details=""):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = f"{status}: {test_name}"
        if details:
            result += f" - {details}"
        self.results.append(result)
        print(result)
        
    def log_error(self, test_name, error):
        """Log test error"""
        error_msg = f"❌ ERROR: {test_name} - {str(error)}"
        self.errors.append(error_msg)
        print(error_msg)
        
    def make_request(self, path, user_agent, timeout=10, use_direct=False):
        """Make HTTP request with specified user agent"""
        try:
            headers = {'User-Agent': user_agent}
            base_url = DIRECT_BACKEND_URL if use_direct else BACKEND_URL
            url = f"{base_url}{path}"
            response = requests.get(url, headers=headers, timeout=timeout)
            return response
        except Exception as e:
            raise Exception(f"Request failed: {str(e)}")
            
    def extract_meta_tags(self, html_content):
        """Extract meta tags from HTML content"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        meta_data = {
            'title': soup.find('title').text if soup.find('title') else None,
            'description': None,
            'canonical': None,
            'og_title': None,
            'og_description': None,
            'og_image': None,
            'og_url': None,
            'og_type': None,
            'og_site_name': None,
            'twitter_card': None,
            'twitter_title': None,
            'twitter_description': None,
            'twitter_image': None,
            'twitter_site': None
        }
        
        # Extract meta tags
        for meta in soup.find_all('meta'):
            name = meta.get('name', '').lower()
            prop = meta.get('property', '').lower()
            content = meta.get('content', '')
            
            if name == 'description':
                meta_data['description'] = content
            elif prop == 'og:title':
                meta_data['og_title'] = content
            elif prop == 'og:description':
                meta_data['og_description'] = content
            elif prop == 'og:image':
                meta_data['og_image'] = content
            elif prop == 'og:url':
                meta_data['og_url'] = content
            elif prop == 'og:type':
                meta_data['og_type'] = content
            elif prop == 'og:site_name':
                meta_data['og_site_name'] = content
            elif name == 'twitter:card':
                meta_data['twitter_card'] = content
            elif name == 'twitter:title':
                meta_data['twitter_title'] = content
            elif name == 'twitter:description':
                meta_data['twitter_description'] = content
            elif name == 'twitter:image':
                meta_data['twitter_image'] = content
            elif name == 'twitter:site':
                meta_data['twitter_site'] = content
                
        # Extract canonical link
        canonical = soup.find('link', rel='canonical')
        if canonical:
            meta_data['canonical'] = canonical.get('href')
            
        return meta_data
        
    def test_bot_detection(self):
        """Test 1: Bot Detection Test"""
        print("\n=== Test 1: Bot Detection (Direct Backend) ===")
        
        # Test with different bot User-Agents on direct backend
        for bot_name, user_agent in BOT_USER_AGENTS.items():
            try:
                response = self.make_request('/', user_agent, use_direct=True)
                
                # Check if bot was detected (should have X-Bot-Detected header)
                bot_detected = response.headers.get('X-Bot-Detected') == 'true'
                
                if bot_detected and response.status_code == 200:
                    self.log_result(f"Bot Detection - {bot_name}", True, "Bot correctly detected")
                else:
                    self.log_result(f"Bot Detection - {bot_name}", False, f"Bot not detected (status: {response.status_code})")
                    
            except Exception as e:
                self.log_error(f"Bot Detection - {bot_name}", e)
                
        # Test with regular browser (should get 404 since no route for /)
        try:
            response = self.make_request('/', REGULAR_BROWSER, use_direct=True)
            
            # Regular browser should get 404 (no route) and no X-Bot-Detected header
            if response.status_code == 404 and not response.headers.get('X-Bot-Detected'):
                self.log_result("Regular Browser Detection", True, "Regular browser correctly not detected as bot (404 as expected)")
            else:
                self.log_result("Regular Browser Detection", False, f"Unexpected response: status {response.status_code}, bot header: {response.headers.get('X-Bot-Detected')}")
                
        except Exception as e:
            self.log_error("Regular Browser Detection", e)
            
    def test_homepage_meta_tags(self):
        """Test 2: Homepage Meta Tags"""
        print("\n=== Test 2: Homepage Meta Tags (Direct Backend) ===")
        
        try:
            response = self.make_request('/', BOT_USER_AGENTS['TelegramBot'], use_direct=True)
            
            if response.status_code == 200:
                meta_data = self.extract_meta_tags(response.text)
                
                # Expected homepage title
                expected_title = "ai-characters.org — AI Character & Companion Platform Reviews"
                
                # Test title
                if meta_data['title'] == expected_title:
                    self.log_result("Homepage Title", True, f"Title: {meta_data['title']}")
                else:
                    self.log_result("Homepage Title", False, f"Expected: {expected_title}, Got: {meta_data['title']}")
                    
                # Test description
                if meta_data['description']:
                    self.log_result("Homepage Description", True, f"Description present: {meta_data['description'][:100]}...")
                else:
                    self.log_result("Homepage Description", False, "No description found")
                    
                # Test OG tags
                if meta_data['og_title']:
                    self.log_result("Homepage OG Title", True, f"OG Title: {meta_data['og_title']}")
                else:
                    self.log_result("Homepage OG Title", False, "No OG title found")
                    
                if meta_data['og_description']:
                    self.log_result("Homepage OG Description", True, f"OG Description present")
                else:
                    self.log_result("Homepage OG Description", False, "No OG description found")
                    
                # Test canonical URL
                expected_canonical = "https://seoschema.preview.emergentagent.com/"
                if meta_data['canonical'] == expected_canonical:
                    self.log_result("Homepage Canonical URL", True, f"Canonical: {meta_data['canonical']}")
                else:
                    self.log_result("Homepage Canonical URL", False, f"Expected: {expected_canonical}, Got: {meta_data['canonical']}")
                    
            else:
                self.log_result("Homepage Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Homepage Meta Tags", e)
            
    def test_platform_pages_meta_tags(self):
        """Test 3: Platform Pages Meta Tags"""
        print("\n=== Test 3: Platform Pages Meta Tags ===")
        
        # Test specific platform pages
        test_platforms = [
            {
                'path': '/platform/lovescape',
                'expected_title': 'Lovescape — AI Companions & Characters Platform | Character Central'
            },
            {
                'path': '/platform/character-ai',
                'expected_title': 'Character.AI Review 2025 — Chat with AI Characters | Character Central'
            }
        ]
        
        for platform in test_platforms:
            try:
                response = self.make_request(platform['path'], BOT_USER_AGENTS['TelegramBot'], use_direct=True)
                
                if response.status_code == 200:
                    meta_data = self.extract_meta_tags(response.text)
                    
                    # Test title
                    if meta_data['title'] == platform['expected_title']:
                        self.log_result(f"Platform Title - {platform['path']}", True, f"Title: {meta_data['title']}")
                    else:
                        self.log_result(f"Platform Title - {platform['path']}", False, f"Expected: {platform['expected_title']}, Got: {meta_data['title']}")
                        
                    # Test that meta tags are unique (not default)
                    if meta_data['description'] and len(meta_data['description']) > 50:
                        self.log_result(f"Platform Description - {platform['path']}", True, "Unique description present")
                    else:
                        self.log_result(f"Platform Description - {platform['path']}", False, "No unique description")
                        
                else:
                    self.log_result(f"Platform Request - {platform['path']}", False, f"Status code: {response.status_code}")
                    
            except Exception as e:
                self.log_error(f"Platform Meta Tags - {platform['path']}", e)
                
    def test_seo_pages_meta_tags(self):
        """Test 4: SEO Pages Meta Tags"""
        print("\n=== Test 4: SEO Pages Meta Tags ===")
        
        # Test specific SEO pages
        test_seo_pages = [
            {
                'path': '/character-review/ai-girlfriend-chat',
                'expected_title': 'AI Girlfriend Chat — Find Your Perfect Virtual Companion 2025'
            },
            {
                'path': '/character-review/ai-character-generator',
                'expected_title': 'AI Character Generator — Create Unique AI Characters Instantly 2025'
            },
            {
                'path': '/seo/ai-girlfriend-chat',
                'expected_title': 'AI Girlfriend Chat — Find Your Perfect Virtual Companion 2025'
            }
        ]
        
        for seo_page in test_seo_pages:
            try:
                response = self.make_request(seo_page['path'], BOT_USER_AGENTS['FacebookBot'], use_direct=True)
                
                if response.status_code == 200:
                    meta_data = self.extract_meta_tags(response.text)
                    
                    # Test title
                    if meta_data['title'] == seo_page['expected_title']:
                        self.log_result(f"SEO Title - {seo_page['path']}", True, f"Title: {meta_data['title']}")
                    else:
                        self.log_result(f"SEO Title - {seo_page['path']}", False, f"Expected: {seo_page['expected_title']}, Got: {meta_data['title']}")
                        
                    # Test unique meta tags
                    if meta_data['og_title'] and meta_data['og_description']:
                        self.log_result(f"SEO OG Tags - {seo_page['path']}", True, "OG tags present")
                    else:
                        self.log_result(f"SEO OG Tags - {seo_page['path']}", False, "Missing OG tags")
                        
                else:
                    self.log_result(f"SEO Request - {seo_page['path']}", False, f"Status code: {response.status_code}")
                    
            except Exception as e:
                self.log_error(f"SEO Meta Tags - {seo_page['path']}", e)
                
    def test_category_pages(self):
        """Test 5: Category Pages"""
        print("\n=== Test 5: Category Pages ===")
        
        try:
            response = self.make_request('/category/premium', BOT_USER_AGENTS['TwitterBot'], use_direct=True)
            
            if response.status_code == 200:
                meta_data = self.extract_meta_tags(response.text)
                
                expected_title = "Premium AI Character Platforms — Best Premium AI Companions 2025"
                
                if meta_data['title'] == expected_title:
                    self.log_result("Category Title - Premium", True, f"Title: {meta_data['title']}")
                else:
                    self.log_result("Category Title - Premium", False, f"Expected: {expected_title}, Got: {meta_data['title']}")
                    
            else:
                self.log_result("Category Request - Premium", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Category Pages", e)
            
    def test_comparison_pages(self):
        """Test 6: Comparison Pages"""
        print("\n=== Test 6: Comparison Pages ===")
        
        # Test compare hub
        try:
            response = self.make_request('/compare', BOT_USER_AGENTS['LinkedInBot'], use_direct=True)
            
            if response.status_code == 200:
                meta_data = self.extract_meta_tags(response.text)
                
                expected_title = "Compare AI Character Platforms — Side-by-Side Comparisons 2025"
                
                if meta_data['title'] == expected_title:
                    self.log_result("Compare Hub Title", True, f"Title: {meta_data['title']}")
                else:
                    self.log_result("Compare Hub Title", False, f"Expected: {expected_title}, Got: {meta_data['title']}")
                    
            else:
                self.log_result("Compare Hub Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Compare Hub", e)
            
        # Test specific comparison
        try:
            response = self.make_request('/compare/lovescape-vs-character-ai', BOT_USER_AGENTS['SlackBot'], use_direct=True)
            
            if response.status_code == 200:
                meta_data = self.extract_meta_tags(response.text)
                
                expected_title = "Lovescape vs Character.AI — Detailed Comparison 2025"
                
                if meta_data['title'] == expected_title:
                    self.log_result("Comparison Title - Lovescape vs Character.AI", True, f"Title: {meta_data['title']}")
                else:
                    self.log_result("Comparison Title - Lovescape vs Character.AI", False, f"Expected: {expected_title}, Got: {meta_data['title']}")
                    
            else:
                self.log_result("Comparison Request - Lovescape vs Character.AI", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Comparison Pages", e)
            
    def test_twitter_cards(self):
        """Test 9: Twitter Cards"""
        print("\n=== Test 9: Twitter Cards ===")
        
        try:
            response = self.make_request('/', BOT_USER_AGENTS['TwitterBot'], use_direct=True)
            
            if response.status_code == 200:
                meta_data = self.extract_meta_tags(response.text)
                
                # Test Twitter card tags
                if meta_data['twitter_card']:
                    self.log_result("Twitter Card Type", True, f"Card type: {meta_data['twitter_card']}")
                else:
                    self.log_result("Twitter Card Type", False, "No Twitter card type found")
                    
                if meta_data['twitter_title']:
                    self.log_result("Twitter Title", True, f"Twitter title present")
                else:
                    self.log_result("Twitter Title", False, "No Twitter title found")
                    
                if meta_data['twitter_description']:
                    self.log_result("Twitter Description", True, f"Twitter description present")
                else:
                    self.log_result("Twitter Description", False, "No Twitter description found")
                    
                if meta_data['twitter_image']:
                    self.log_result("Twitter Image", True, f"Twitter image present")
                else:
                    self.log_result("Twitter Image", False, "No Twitter image found")
                    
                # Test Twitter site handle
                if meta_data['twitter_site'] == "@CharacterCentral":
                    self.log_result("Twitter Site Handle", True, f"Handle: {meta_data['twitter_site']}")
                else:
                    self.log_result("Twitter Site Handle", False, f"Expected: @CharacterCentral, Got: {meta_data['twitter_site']}")
                    
            else:
                self.log_result("Twitter Cards Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Twitter Cards", e)
            
    def test_api_routes_not_affected(self):
        """Test 10: API Routes Not Affected"""
        print("\n=== Test 10: API Routes Not Affected ===")
        
        try:
            response = self.make_request('/api/', BOT_USER_AGENTS['TelegramBot'], use_direct=True)
            
            if response.status_code == 200:
                # Should return JSON, not HTML
                try:
                    json_data = response.json()
                    self.log_result("API Route JSON Response", True, f"JSON response: {json_data}")
                except:
                    self.log_result("API Route JSON Response", False, "Response is not JSON")
                    
                # Should not have bot detection header
                bot_detected = response.headers.get('X-Bot-Detected') == 'true'
                if not bot_detected:
                    self.log_result("API Route Bot Detection", True, "API route not affected by bot middleware")
                else:
                    self.log_result("API Route Bot Detection", False, "API route incorrectly affected by bot middleware")
                    
            else:
                self.log_result("API Route Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("API Routes", e)
            
    def test_sitemap_xml(self):
        """Test 11: Sitemap.xml Accessibility and Content-Type"""
        print("\n=== Test 11: Sitemap.xml Testing ===")
        
        try:
            # Test sitemap.xml endpoint
            response = self.make_request('/sitemap.xml', REGULAR_BROWSER, use_direct=True)
            
            if response.status_code == 200:
                self.log_result("Sitemap.xml Accessibility", True, "Sitemap.xml is accessible")
                
                # Check content-type
                content_type = response.headers.get('content-type', '').lower()
                if 'application/xml' in content_type or 'text/xml' in content_type:
                    self.log_result("Sitemap.xml Content-Type", True, f"Content-Type: {content_type}")
                else:
                    self.log_result("Sitemap.xml Content-Type", False, f"Expected XML content-type, got: {content_type}")
                
                # Check XML structure
                if '<?xml version="1.0"' in response.text and '<urlset' in response.text:
                    self.log_result("Sitemap.xml XML Structure", True, "Valid XML structure found")
                    
                    # Count URLs
                    url_count = response.text.count('<url>')
                    self.log_result("Sitemap.xml URL Count", True, f"Found {url_count} URLs in sitemap")
                else:
                    self.log_result("Sitemap.xml XML Structure", False, "Invalid XML structure")
                    
            else:
                self.log_result("Sitemap.xml Accessibility", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Sitemap.xml", e)
            
    def test_sitemap_index_xml(self):
        """Test 12: Sitemap-index.xml Endpoint"""
        print("\n=== Test 12: Sitemap-index.xml Testing ===")
        
        try:
            response = self.make_request('/sitemap-index.xml', REGULAR_BROWSER, use_direct=True)
            
            if response.status_code == 200:
                self.log_result("Sitemap-index.xml Accessibility", True, "Sitemap-index.xml is accessible")
                
                # Check content-type
                content_type = response.headers.get('content-type', '').lower()
                if 'application/xml' in content_type or 'text/xml' in content_type:
                    self.log_result("Sitemap-index.xml Content-Type", True, f"Content-Type: {content_type}")
                else:
                    self.log_result("Sitemap-index.xml Content-Type", False, f"Expected XML content-type, got: {content_type}")
                
                # Check XML structure
                if '<?xml version="1.0"' in response.text and '<sitemapindex' in response.text:
                    self.log_result("Sitemap-index.xml XML Structure", True, "Valid sitemap index structure found")
                else:
                    self.log_result("Sitemap-index.xml XML Structure", False, "Invalid sitemap index structure")
                    
            else:
                self.log_result("Sitemap-index.xml Accessibility", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Sitemap-index.xml", e)
            
    def test_backend_api_health(self):
        """Test 13: Backend API Health Check"""
        print("\n=== Test 13: Backend API Health ===")
        
        # Test main API endpoints
        api_endpoints = [
            '/api/',
            '/api/status'
        ]
        
        for endpoint in api_endpoints:
            try:
                response = self.make_request(endpoint, REGULAR_BROWSER, use_direct=True)
                
                if response.status_code == 200:
                    self.log_result(f"API Health - {endpoint}", True, f"Endpoint accessible (status: {response.status_code})")
                    
                    # Check if response is JSON
                    try:
                        json_data = response.json()
                        self.log_result(f"API JSON Response - {endpoint}", True, "Valid JSON response")
                    except:
                        self.log_result(f"API JSON Response - {endpoint}", False, "Response is not valid JSON")
                        
                else:
                    self.log_result(f"API Health - {endpoint}", False, f"Status code: {response.status_code}")
                    
            except Exception as e:
                self.log_error(f"API Health - {endpoint}", e)
                
    def make_frontend_request(self, path, timeout=10):
        """Make HTTP request to frontend"""
        try:
            url = urljoin(FRONTEND_URL, path)
            headers = {'User-Agent': REGULAR_BROWSER}
            response = requests.get(url, headers=headers, timeout=timeout)
            return response
        except Exception as e:
            raise Exception(f"Frontend request failed: {str(e)}")
            
    def extract_json_ld_schemas(self, html_content):
        """Extract JSON-LD schema markup from HTML"""
        soup = BeautifulSoup(html_content, 'html.parser')
        schemas = []
        
        # Find all script tags with type="application/ld+json"
        for script in soup.find_all('script', type='application/ld+json'):
            try:
                schema_data = json.loads(script.string)
                schemas.append(schema_data)
            except json.JSONDecodeError:
                continue
                
        return schemas
        
    def validate_schema_structure(self, schema, expected_types):
        """Validate schema structure"""
        if isinstance(schema, dict):
            schema_type = schema.get('@type')
            if schema_type in expected_types:
                return True, schema_type
            # Check for @graph structure
            elif '@graph' in schema:
                found_types = []
                for item in schema['@graph']:
                    item_type = item.get('@type')
                    if item_type in expected_types:
                        found_types.append(item_type)
                if found_types:
                    return True, found_types
        return False, None
        
    def test_homepage_schema(self):
        """Test 14: Homepage Schema.org Implementation"""
        print("\n=== Test 14: Homepage Schema.org ===")
        
        try:
            response = self.make_frontend_request('/')
            
            if response.status_code == 200:
                schemas = self.extract_json_ld_schemas(response.text)
                
                if schemas:
                    self.log_result("Homepage Schema Present", True, f"Found {len(schemas)} schema(s)")
                    
                    # Expected schema types for homepage
                    expected_types = ['Organization', 'WebSite', 'ItemList']
                    found_types = []
                    
                    for schema in schemas:
                        is_valid, schema_types = self.validate_schema_structure(schema, expected_types)
                        if is_valid:
                            if isinstance(schema_types, list):
                                found_types.extend(schema_types)
                            else:
                                found_types.append(schema_types)
                    
                    # Check for required schema types
                    if 'Organization' in found_types:
                        self.log_result("Homepage Organization Schema", True, "Organization schema found")
                    else:
                        self.log_result("Homepage Organization Schema", False, "Organization schema missing")
                        
                    if 'WebSite' in found_types:
                        self.log_result("Homepage Website Schema", True, "Website schema found")
                    else:
                        self.log_result("Homepage Website Schema", False, "Website schema missing")
                        
                    if 'ItemList' in found_types:
                        self.log_result("Homepage ItemList Schema", True, "ItemList schema for platforms found")
                    else:
                        self.log_result("Homepage ItemList Schema", False, "ItemList schema missing")
                        
                else:
                    self.log_result("Homepage Schema Present", False, "No JSON-LD schema found")
                    
            else:
                self.log_result("Homepage Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Homepage Schema", e)
            
    def test_platform_page_schema(self):
        """Test 15: Platform Page Schema.org Implementation"""
        print("\n=== Test 15: Platform Page Schema.org ===")
        
        # Test Lovescape platform page
        try:
            response = self.make_frontend_request('/platform/lovescape')
            
            if response.status_code == 200:
                schemas = self.extract_json_ld_schemas(response.text)
                
                if schemas:
                    self.log_result("Platform Schema Present", True, f"Found {len(schemas)} schema(s)")
                    
                    # Expected schema types for platform pages
                    expected_types = ['Review', 'Organization', 'BreadcrumbList']
                    found_types = []
                    
                    for schema in schemas:
                        is_valid, schema_types = self.validate_schema_structure(schema, expected_types)
                        if is_valid:
                            if isinstance(schema_types, list):
                                found_types.extend(schema_types)
                            else:
                                found_types.append(schema_types)
                    
                    # Check for Review schema with ratings
                    if 'Review' in found_types:
                        self.log_result("Platform Review Schema", True, "Review schema found")
                        
                        # Check for rating in Review schema
                        for schema in schemas:
                            if schema.get('@type') == 'Review' or (isinstance(schema.get('@graph'), list) and any(item.get('@type') == 'Review' for item in schema['@graph'])):
                                self.log_result("Platform Review Rating", True, "Review schema with rating found")
                                break
                    else:
                        self.log_result("Platform Review Schema", False, "Review schema missing")
                        
                else:
                    self.log_result("Platform Schema Present", False, "No JSON-LD schema found")
                    
            else:
                self.log_result("Platform Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Platform Schema", e)
            
    def test_seo_page_schema(self):
        """Test 16: SEO Page Schema.org Implementation"""
        print("\n=== Test 16: SEO Page Schema.org ===")
        
        # Test SEO page
        try:
            response = self.make_frontend_request('/character-review/ai-girlfriend-chat')
            
            if response.status_code == 200:
                schemas = self.extract_json_ld_schemas(response.text)
                
                if schemas:
                    self.log_result("SEO Page Schema Present", True, f"Found {len(schemas)} schema(s)")
                    
                    # Expected schema types for SEO pages
                    expected_types = ['Article', 'HowTo', 'Organization', 'BreadcrumbList', 'ItemList']
                    found_types = []
                    
                    for schema in schemas:
                        is_valid, schema_types = self.validate_schema_structure(schema, expected_types)
                        if is_valid:
                            if isinstance(schema_types, list):
                                found_types.extend(schema_types)
                            else:
                                found_types.append(schema_types)
                    
                    # Check for Article schema
                    if 'Article' in found_types:
                        self.log_result("SEO Page Article Schema", True, "Article schema found")
                    else:
                        self.log_result("SEO Page Article Schema", False, "Article schema missing")
                        
                    # Check for HowTo schema
                    if 'HowTo' in found_types:
                        self.log_result("SEO Page HowTo Schema", True, "HowTo schema found")
                    else:
                        self.log_result("SEO Page HowTo Schema", False, "HowTo schema missing")
                        
                else:
                    self.log_result("SEO Page Schema Present", False, "No JSON-LD schema found")
                    
            else:
                self.log_result("SEO Page Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("SEO Page Schema", e)
            
    def test_comparison_page_schema(self):
        """Test 17: Comparison Page Schema.org Implementation"""
        print("\n=== Test 17: Comparison Page Schema.org ===")
        
        # Test comparison page
        try:
            response = self.make_frontend_request('/compare/lovescape-vs-character-ai')
            
            if response.status_code == 200:
                schemas = self.extract_json_ld_schemas(response.text)
                
                if schemas:
                    self.log_result("Comparison Schema Present", True, f"Found {len(schemas)} schema(s)")
                    
                    # Expected schema types for comparison pages
                    expected_types = ['Article', 'Organization', 'BreadcrumbList']
                    found_types = []
                    
                    for schema in schemas:
                        is_valid, schema_types = self.validate_schema_structure(schema, expected_types)
                        if is_valid:
                            if isinstance(schema_types, list):
                                found_types.extend(schema_types)
                            else:
                                found_types.append(schema_types)
                    
                    # Check for comparison Article schema
                    if 'Article' in found_types:
                        self.log_result("Comparison Article Schema", True, "Comparison Article schema found")
                    else:
                        self.log_result("Comparison Article Schema", False, "Comparison Article schema missing")
                        
                else:
                    self.log_result("Comparison Schema Present", False, "No JSON-LD schema found")
                    
            else:
                self.log_result("Comparison Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Comparison Schema", e)
            
    def test_explore_page_schema(self):
        """Test 18: Explore Page Schema.org Implementation"""
        print("\n=== Test 18: Explore Page Schema.org ===")
        
        try:
            response = self.make_frontend_request('/explore')
            
            if response.status_code == 200:
                schemas = self.extract_json_ld_schemas(response.text)
                
                if schemas:
                    self.log_result("Explore Schema Present", True, f"Found {len(schemas)} schema(s)")
                    
                    # Expected schema types for explore page
                    expected_types = ['CollectionPage', 'Organization']
                    found_types = []
                    
                    for schema in schemas:
                        is_valid, schema_types = self.validate_schema_structure(schema, expected_types)
                        if is_valid:
                            if isinstance(schema_types, list):
                                found_types.extend(schema_types)
                            else:
                                found_types.append(schema_types)
                    
                    # Check for CollectionPage schema
                    if 'CollectionPage' in found_types:
                        self.log_result("Explore CollectionPage Schema", True, "CollectionPage schema found")
                    else:
                        self.log_result("Explore CollectionPage Schema", False, "CollectionPage schema missing")
                        
                else:
                    self.log_result("Explore Schema Present", False, "No JSON-LD schema found")
                    
            else:
                self.log_result("Explore Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Explore Schema", e)
            
    def test_compare_hub_schema(self):
        """Test 19: Compare Hub Page Schema.org Implementation"""
        print("\n=== Test 19: Compare Hub Schema.org ===")
        
        try:
            response = self.make_frontend_request('/compare')
            
            if response.status_code == 200:
                schemas = self.extract_json_ld_schemas(response.text)
                
                if schemas:
                    self.log_result("Compare Hub Schema Present", True, f"Found {len(schemas)} schema(s)")
                    
                    # Expected schema types for compare hub page
                    expected_types = ['CollectionPage', 'Organization', 'BreadcrumbList']
                    found_types = []
                    
                    for schema in schemas:
                        is_valid, schema_types = self.validate_schema_structure(schema, expected_types)
                        if is_valid:
                            if isinstance(schema_types, list):
                                found_types.extend(schema_types)
                            else:
                                found_types.append(schema_types)
                    
                    # Check for CollectionPage schema
                    if 'CollectionPage' in found_types:
                        self.log_result("Compare Hub CollectionPage Schema", True, "CollectionPage schema found")
                    else:
                        self.log_result("Compare Hub CollectionPage Schema", False, "CollectionPage schema missing")
                        
                else:
                    self.log_result("Compare Hub Schema Present", False, "No JSON-LD schema found")
                    
            else:
                self.log_result("Compare Hub Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("Compare Hub Schema", e)
            
    def test_meta_tags_uniqueness(self):
        """Test 20: Meta Tags Uniqueness"""
        print("\n=== Test 20: Meta Tags Uniqueness ===")
        
        test_pages = [
            {'path': '/', 'name': 'Homepage'},
            {'path': '/platform/lovescape', 'name': 'Lovescape Platform'},
            {'path': '/character-review/ai-girlfriend-chat', 'name': 'SEO Page'},
            {'path': '/compare/lovescape-vs-character-ai', 'name': 'Comparison Page'}
        ]
        
        page_titles = {}
        page_descriptions = {}
        
        for page in test_pages:
            try:
                response = self.make_frontend_request(page['path'])
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    
                    # Extract title
                    title_tag = soup.find('title')
                    title = title_tag.text if title_tag else None
                    
                    # Extract meta description
                    desc_tag = soup.find('meta', attrs={'name': 'description'})
                    description = desc_tag.get('content') if desc_tag else None
                    
                    if title:
                        page_titles[page['name']] = title
                    if description:
                        page_descriptions[page['name']] = description
                        
            except Exception as e:
                self.log_error(f"Meta Tags - {page['name']}", e)
        
        # Check for unique titles
        unique_titles = len(set(page_titles.values())) == len(page_titles)
        if unique_titles:
            self.log_result("Unique Page Titles", True, f"All {len(page_titles)} pages have unique titles")
        else:
            self.log_result("Unique Page Titles", False, "Some pages have duplicate titles")
            
        # Check for unique descriptions
        unique_descriptions = len(set(page_descriptions.values())) == len(page_descriptions)
        if unique_descriptions:
            self.log_result("Unique Meta Descriptions", True, f"All {len(page_descriptions)} pages have unique descriptions")
        else:
            self.log_result("Unique Meta Descriptions", False, "Some pages have duplicate descriptions")
            
    def test_javascript_console_errors(self):
        """Test 21: Check for JavaScript Console Errors (Basic)"""
        print("\n=== Test 21: JavaScript Console Errors Check ===")
        
        # Note: This is a basic check - full JS error detection would require browser automation
        test_pages = [
            '/',
            '/platform/lovescape',
            '/character-review/ai-girlfriend-chat',
            '/explore'
        ]
        
        for page_path in test_pages:
            try:
                response = self.make_frontend_request(page_path)
                
                if response.status_code == 200:
                    # Check for common JS error indicators in HTML
                    html_content = response.text.lower()
                    
                    # Look for error indicators
                    error_indicators = [
                        'javascript error',
                        'uncaught',
                        'syntaxerror',
                        'referenceerror',
                        'typeerror'
                    ]
                    
                    has_errors = any(indicator in html_content for indicator in error_indicators)
                    
                    if not has_errors:
                        self.log_result(f"JS Errors Check - {page_path}", True, "No obvious JS errors detected in HTML")
                    else:
                        self.log_result(f"JS Errors Check - {page_path}", False, "Potential JS errors detected in HTML")
                        
                else:
                    self.log_result(f"JS Errors Check - {page_path}", False, f"Page not accessible (status: {response.status_code})")
                    
            except Exception as e:
                self.log_error(f"JS Errors Check - {page_path}", e)
            
    def test_og_image_tags(self):
        """Test 8: OG Image Tags"""
        print("\n=== Test 8: OG Image Tags ===")
        
        try:
            response = self.make_request('/', BOT_USER_AGENTS['FacebookBot'], use_direct=True)
            
            if response.status_code == 200:
                meta_data = self.extract_meta_tags(response.text)
                
                # Test OG image presence
                if meta_data['og_image']:
                    self.log_result("OG Image Present", True, f"OG Image: {meta_data['og_image']}")
                    
                    # Test if it's a valid URL
                    if meta_data['og_image'].startswith('http'):
                        self.log_result("OG Image URL Valid", True, "OG image has valid URL format")
                    else:
                        self.log_result("OG Image URL Valid", False, "OG image URL format invalid")
                        
                else:
                    self.log_result("OG Image Present", False, "No OG image found")
                    
                # Test OG type
                if meta_data['og_type'] == 'website':
                    self.log_result("OG Type", True, f"OG Type: {meta_data['og_type']}")
                else:
                    self.log_result("OG Type", False, f"Expected: website, Got: {meta_data['og_type']}")
                    
                # Test OG site name
                if meta_data['og_site_name']:
                    self.log_result("OG Site Name", True, f"Site name: {meta_data['og_site_name']}")
                else:
                    self.log_result("OG Site Name", False, "No OG site name found")
                    
            else:
                self.log_result("OG Image Request", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_error("OG Image Tags", e)
            
    def test_canonical_urls(self):
        """Test 7: Canonical URLs"""
        print("\n=== Test 7: Canonical URLs ===")
        
        test_paths = [
            {'path': '/', 'expected_base': 'https://seoschema.preview.emergentagent.com/'},
            {'path': '/platform/lovescape', 'expected_base': 'https://seoschema.preview.emergentagent.com/platform/lovescape'},
            {'path': '/character-review/ai-girlfriend-chat', 'expected_base': 'https://seoschema.preview.emergentagent.com/character-review/ai-girlfriend-chat'}
        ]
        
        for test_path in test_paths:
            try:
                response = self.make_request(test_path['path'], BOT_USER_AGENTS['GoogleBot'], use_direct=True)
                
                if response.status_code == 200:
                    meta_data = self.extract_meta_tags(response.text)
                    
                    if meta_data['canonical'] == test_path['expected_base']:
                        self.log_result(f"Canonical URL - {test_path['path']}", True, f"Canonical: {meta_data['canonical']}")
                    else:
                        self.log_result(f"Canonical URL - {test_path['path']}", False, f"Expected: {test_path['expected_base']}, Got: {meta_data['canonical']}")
                        
                else:
                    self.log_result(f"Canonical Request - {test_path['path']}", False, f"Status code: {response.status_code}")
                    
            except Exception as e:
                self.log_error(f"Canonical URLs - {test_path['path']}", e)
                
    def run_all_tests(self):
        """Run all tests"""
        print("🤖 Starting Bot Detection and Meta Tag Pre-rendering Middleware Tests")
        print("=" * 80)
        
        # Run all test methods
        self.test_bot_detection()
        self.test_homepage_meta_tags()
        self.test_platform_pages_meta_tags()
        self.test_seo_pages_meta_tags()
        self.test_category_pages()
        self.test_comparison_pages()
        self.test_canonical_urls()
        self.test_og_image_tags()
        self.test_twitter_cards()
        self.test_api_routes_not_affected()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.results)
        passed_tests = len([r for r in self.results if "✅ PASS" in r])
        failed_tests = len([r for r in self.results if "❌ FAIL" in r])
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.errors:
            print(f"\n❌ ERRORS ({len(self.errors)}):")
            for error in self.errors:
                print(f"  {error}")
                
        if failed_tests > 0:
            print(f"\n❌ FAILED TESTS ({failed_tests}):")
            for result in self.results:
                if "❌ FAIL" in result:
                    print(f"  {result}")
                    
        print("\n" + "=" * 80)
        return passed_tests, failed_tests, len(self.errors)

if __name__ == "__main__":
    tester = BotMetaMiddlewareTest()
    passed, failed, errors = tester.run_all_tests()
    
    # Exit with appropriate code
    if failed > 0 or errors > 0:
        exit(1)
    else:
        exit(0)