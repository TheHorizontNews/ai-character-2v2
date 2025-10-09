// ai-characters.org - Main JavaScript Functionality

class AICharactersApp {
  constructor() {
    this.currentPage = this.getPageFromURL();
    this.mobileMenuOpen = false;
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupSearch();
    this.loadPageContent();
  }

  getPageFromURL() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    if (path.includes('/platform/')) return 'platform';
    if (path.includes('/category/')) return 'category';
    if (path.includes('/seo/')) return 'seo';
    if (path.includes('/explore')) return 'explore';
    return 'home';
  }

  setupNavigation() {
    // Set active navigation item
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-menu a, .mobile-menu a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === '/index.html')) {
        link.classList.add('active');
      }
    });

    // Handle hero badge click
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
      heroBadge.addEventListener('click', () => {
        window.location.href = '/explore.html';
      });
    }
  }

  setupMobileMenu() {
    const burgerButton = document.querySelector('.burger-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.mobile-menu-close');

    if (burgerButton) {
      burgerButton.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menu = document.querySelector('.mobile-menu');

    if (this.mobileMenuOpen) {
      overlay.classList.add('active');
      menu.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menu = document.querySelector('.mobile-menu');
    
    overlay.classList.remove('active');
    menu.classList.remove('active');
    document.body.style.overflow = '';
  }

  setupSearch() {
    const searchInput = document.querySelector('#search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleFilter(e.target.dataset.category);
      });
    });
  }

  handleSearch(query) {
    // Implement search functionality
    const searchResults = this.searchPlatforms(query);
    this.displaySearchResults(searchResults);
  }

  handleFilter(category) {
    // Implement filter functionality
    const filteredResults = this.filterPlatforms(category);
    this.displayFilteredResults(filteredResults);
  }

  searchPlatforms(query) {
    if (!query) return aiPlatforms;
    
    return aiPlatforms.filter(platform => 
      platform.name.toLowerCase().includes(query.toLowerCase()) ||
      platform.description.toLowerCase().includes(query.toLowerCase()) ||
      platform.features.some(feature => 
        feature.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  filterPlatforms(category) {
    if (!category || category === 'all') return aiPlatforms;
    return aiPlatforms.filter(platform => 
      platform.category.toLowerCase() === category.toLowerCase()
    );
  }

  displaySearchResults(results) {
    const container = document.querySelector('#search-results');
    if (!container) return;
    
    container.innerHTML = '';
    results.forEach(platform => {
      const card = this.createPlatformCard(platform);
      container.appendChild(card);
    });
  }

  displayFilteredResults(results) {
    const container = document.querySelector('#platform-grid');
    if (!container) return;
    
    container.innerHTML = '';
    results.forEach(platform => {
      const card = this.createPlatformCard(platform);
      container.appendChild(card);
    });
  }

  createPlatformCard(platform) {
    const card = document.createElement('div');
    card.className = 'platform-card';
    card.onclick = () => window.location.href = `/platform/${platform.slug}.html`;
    
    card.innerHTML = `
      <div class="platform-image">
        <img src="${platform.image}" alt="${platform.name}" />
      </div>
      <div class="platform-info">
        <div class="platform-header">
          <h3 class="platform-name">${platform.name}</h3>
          <div class="platform-rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            ${platform.rating}
          </div>
        </div>
        <p class="platform-tagline">${platform.tagline}</p>
        <div class="platform-stats">
          <div class="platform-stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            ${platform.users}
          </div>
        </div>
        <div class="platform-features">
          ${platform.features.map(feature => 
            `<span class="feature-tag">${feature}</span>`
          ).join('')}
        </div>
      </div>
    `;
    
    return card;
  }

  loadPageContent() {
    // Load content based on current page
    switch(this.currentPage) {
      case 'home':
        this.loadHomepage();
        break;
      case 'explore':
        this.loadExplorePage();
        break;
      case 'platform':
        this.loadPlatformPage();
        break;
      case 'category':
        this.loadCategoryPage();
        break;
      case 'seo':
        this.loadSEOPage();
        break;
    }
  }

  loadHomepage() {
    const platformGrid = document.querySelector('#platform-grid');
    if (platformGrid) {
      // Load featured platforms (first 6)
      const featuredPlatforms = aiPlatforms.slice(0, 6);
      featuredPlatforms.forEach(platform => {
        const card = this.createPlatformCard(platform);
        platformGrid.appendChild(card);
      });
    }
  }

  loadExplorePage() {
    // Implementation for explore page
  }

  loadPlatformPage() {
    // Implementation for platform detail page
  }

  loadCategoryPage() {
    // Implementation for category page
  }

  loadSEOPage() {
    // Implementation for SEO page
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AICharactersApp();
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024 && window.app && window.app.mobileMenuOpen) {
    window.app.closeMobileMenu();
  }
});