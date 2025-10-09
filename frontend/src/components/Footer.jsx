import React from 'react';
import { Mail, Twitter, Github } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">ai-characters.org</div>
          <p className="footer-description">
            Your comprehensive guide to AI character platforms on ai-characters.org. Compare features, read reviews, 
            and find the perfect AI companion for your needs.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-link">
              <Github size={20} />
            </a>
            <a href="#" className="social-link">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Platforms</h4>
          <ul className="footer-links">
            <li><a href="#">All Platforms</a></li>
            <li><a href="#">Premium</a></li>
            <li><a href="#">Free Options</a></li>
            <li><a href="#">Voice Chat</a></li>
            <li><a href="#">Image Generation</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li><a href="#">Romance</a></li>
            <li><a href="#">Wellness</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Developer Tools</a></li>
            <li><a href="#">Creative</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Comparison Guide</a></li>
            <li><a href="#">Privacy Guide</a></li>
            <li><a href="#">Best Practices</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookies Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 AI Character Review. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;