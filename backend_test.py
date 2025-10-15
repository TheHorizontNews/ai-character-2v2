#!/usr/bin/env python3
"""
Comprehensive Backend Testing for Bot Detection and Meta Tag Pre-rendering Middleware
Tests the BotMetaMiddleware implementation for social media bot detection and meta tag injection.
"""

import requests
import json
import re
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://aivertex.preview.emergentagent.com')
# Test the backend directly on localhost to bypass any reverse proxy
DIRECT_BACKEND_URL = 'http://localhost:8001'
print(f"Testing backend at: {BACKEND_URL}")
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

class BotMetaMiddlewareTest:
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
                expected_canonical = "https://charactercentral.preview.emergentagent.com/"
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
            
    def test_og_image_tags(self):
        """Test 8: OG Image Tags"""
        print("\n=== Test 8: OG Image Tags ===")
        
        try:
            response = self.make_request('/', BOT_USER_AGENTS['FacebookBot'])
            
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
            {'path': '/', 'expected_base': 'https://charactercentral.preview.emergentagent.com/'},
            {'path': '/platform/lovescape', 'expected_base': 'https://charactercentral.preview.emergentagent.com/platform/lovescape'},
            {'path': '/character-review/ai-girlfriend-chat', 'expected_base': 'https://charactercentral.preview.emergentagent.com/character-review/ai-girlfriend-chat'}
        ]
        
        for test_path in test_paths:
            try:
                response = self.make_request(test_path['path'], BOT_USER_AGENTS['GoogleBot'])
                
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