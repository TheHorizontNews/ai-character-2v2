#!/usr/bin/env python3
"""
Simple HTTP server for testing the HTML website
Run: python3 test-server.py
"""

import http.server
import socketserver
import os
from pathlib import Path

# Change to the html-website directory
os.chdir('/app/html-website')

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        # Handle routing for SPA-style URLs
        if self.path.endswith('/') and self.path != '/':
            self.path = self.path.rstrip('/') + '.html'
        elif not '.' in os.path.basename(self.path) and self.path != '/':
            self.path += '.html'
            
        # Serve index.html for root
        if self.path == '/':
            self.path = '/index.html'
            
        return super().do_GET()

PORT = 8080

print(f"Starting HTTP server on port {PORT}")
print(f"Serving files from: {os.getcwd()}")
print(f"Visit: http://localhost:{PORT}")

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        httpd.shutdown()