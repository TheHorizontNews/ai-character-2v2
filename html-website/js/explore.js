// Explore page functionality for ai-characters.org

class ExploreApp {
  constructor() {
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.filteredPages = seoPages;
    this.init();
  }

  init() {
    this.setupSearch();
    this.setupFilters();
    this.loadTopics();
    this.updateTopicCount();
  }

  setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.filterAndDisplay();
      });
    }
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Update current filter
        this.currentFilter = e.target.dataset.category;
        this.filterAndDisplay();
      });
    });
  }

  filterAndDisplay() {
    // Filter by category
    let filtered = this.currentFilter === 'all' 
      ? [...seoPages] 
      : seoPages.filter(page => page.category === this.currentFilter);

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(page => 
        page.title.toLowerCase().includes(this.searchQuery) ||
        page.description.toLowerCase().includes(this.searchQuery) ||
        page.keywords.some(keyword => keyword.toLowerCase().includes(this.searchQuery))
      );
    }

    this.filteredPages = filtered;
    this.displayTopics();
    this.updateTopicCount();
  }

  loadTopics() {
    this.displayTopics();
  }

  displayTopics() {
    const container = document.getElementById('topics-grid');
    if (!container) return;

    container.innerHTML = '';

    if (this.filteredPages.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #666;">
          <h3 style="font-size: 24px; margin-bottom: 12px; color: #999;">No topics found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      `;
      return;
    }

    this.filteredPages.forEach(page => {
      const card = this.createTopicCard(page);
      container.appendChild(card);
    });
  }

  createTopicCard(page) {
    const card = document.createElement('div');
    card.className = 'seo-card';
    card.onclick = () => window.location.href = `/seo/${page.slug}.html`;
    
    card.innerHTML = `
      <div class="seo-category-badge">${page.category}</div>
      <h3>${page.title}</h3>
      <p>${page.description}</p>
      <div class="seo-keywords">
        ${page.keywords.map(keyword => 
          `<span class="keyword-pill">${keyword}</span>`
        ).join('')}
      </div>
    `;
    
    return card;
  }

  updateTopicCount() {
    const countElement = document.getElementById('topic-count');
    if (countElement) {
      countElement.textContent = this.filteredPages.length;
    }
  }
}

// Initialize explore app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('topics-grid')) {
    window.exploreApp = new ExploreApp();
  }
});