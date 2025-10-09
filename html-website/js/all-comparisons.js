// All Comparisons Directory Functionality for ai-characters.org

class ComparisonDirectory {
    constructor() {
        this.allComparisons = [];
        this.liveComparisons = [
            {
                id: 'lovescape-vs-character-ai',
                platform1: 'lovescape',
                platform2: 'character-ai',
                title: 'Lovescape vs Character.AI',
                description: 'Premium customization vs community variety',
                rating1: 4.8,
                rating2: 4.7,
                pricing1: 'Premium',
                pricing2: 'Free',
                status: 'live',
                featured: true,
                url: '/compare/lovescape-vs-character-ai.html'
            },
            {
                id: 'lovescape-vs-replika',
                platform1: 'lovescape',
                platform2: 'replika',
                title: 'Lovescape vs Replika',
                description: 'Customization vs wellness focus',
                rating1: 4.8,
                rating2: 4.6,
                pricing1: 'Premium',
                pricing2: 'Freemium',
                status: 'live',
                featured: false,
                url: '/compare/lovescape-vs-replika.html'
            },
            {
                id: 'lovescape-vs-nomi-ai',
                platform1: 'lovescape',
                platform2: 'nomi-ai',
                title: 'Lovescape vs Nomi.ai',
                description: 'Privacy-first vs visual features',
                rating1: 4.8,
                rating2: 4.7,
                pricing1: 'Premium',
                pricing2: 'Premium',
                status: 'live',
                featured: false,
                url: '/compare/lovescape-vs-nomi-ai.html'
            },
            {
                id: 'character-ai-vs-replika',
                platform1: 'character-ai',
                platform2: 'replika',
                title: 'Character.AI vs Replika',
                description: 'Community characters vs personal AI',
                rating1: 4.7,
                rating2: 4.6,
                pricing1: 'Free',
                pricing2: 'Freemium',
                status: 'live',
                featured: false,
                url: '/compare/character-ai-vs-replika.html'
            },
            {
                id: 'replika-vs-nomi-ai',
                platform1: 'replika',
                platform2: 'nomi-ai',
                title: 'Replika vs Nomi.ai',
                description: 'Mental wellness vs visual AI',
                rating1: 4.6,
                rating2: 4.7,
                pricing1: 'Freemium',
                pricing2: 'Premium',
                status: 'live',
                featured: false,
                url: '/compare/replika-vs-nomi-ai.html'
            },
            {
                id: 'character-ai-vs-nomi-ai',
                platform1: 'character-ai',
                platform2: 'nomi-ai',
                title: 'Character.AI vs Nomi.ai',
                description: 'Free community vs premium features',
                rating1: 4.7,
                rating2: 4.7,
                pricing1: 'Free',
                pricing2: 'Premium',
                status: 'live',
                featured: false,
                url: '/compare/character-ai-vs-nomi-ai.html'
            }
        ];

        this.comingSoonComparisons = {
            premium: [
                'Lovescape vs Kindroid', 'Lovescape vs Paradot', 'Nomi.ai vs Kindroid', 
                'Nomi.ai vs Paradot', 'Kindroid vs Paradot'
            ],
            romance: [
                'DreamGF vs Candy AI', 'DreamGF vs Romantic AI', 'Candy AI vs Romantic AI',
                'DreamGF vs Kupid AI', 'Candy AI vs Kupid AI', 'Romantic AI vs Kupid AI'
            ],
            free: [
                'Character.AI vs Chai AI', 'Character.AI vs Poe', 'Chai AI vs Poe',
                'Replika vs Poe', 'Chai AI vs Replika'
            ],
            creative: [
                'Janitor AI vs Tavern AI', 'SoulGen vs DreamGF', 'Janitor AI vs SoulGen',
                'Tavern AI vs SoulGen', 'Inworld AI vs Tavern AI'
            ]
        };

        this.platformImages = {
            'lovescape': 'https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg',
            'character-ai': 'https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg',
            'replika': 'https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85',
            'nomi-ai': 'https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85',
            'anima-ai': 'https://images.unsplash.com/photo-1646583288948-24548aedffd8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhbmRpbmd8ZW58MHx8fHwxNzYwMDMzMzgyfDA&ixlib=rb-4.1.0&q=85'
        };

        this.filteredComparisons = [...this.liveComparisons];
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderAllSections();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('comparison-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Brand filter
        const brandFilter = document.getElementById('brand-filter');
        if (brandFilter) {
            brandFilter.addEventListener('change', (e) => this.handleBrandFilter(e.target.value));
        }

        // Tab functionality for coming soon
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabChange(e.target.dataset.category));
        });

        // Request comparison
        const requestBtn = document.querySelector('.request-btn');
        if (requestBtn) {
            requestBtn.addEventListener('click', () => this.handleComparisonRequest());
        }
    }

    renderAllSections() {
        this.renderLiveComparisons();
        this.renderLovescapeComparisons();
        this.renderPopularComparisons();
        this.renderComingSoonGrid('premium');
        this.updateResultsCount();
    }

    renderLiveComparisons() {
        const container = document.getElementById('live-comparisons-grid');
        if (!container) return;

        container.innerHTML = this.filteredComparisons
            .map(comparison => this.createComparisonCard(comparison))
            .join('');
    }

    renderLovescapeComparisons() {
        const container = document.getElementById('lovescape-comparisons');
        if (!container) return;

        const lovescapeComparisons = this.liveComparisons.filter(
            comp => comp.platform1 === 'lovescape' || comp.platform2 === 'lovescape'
        );

        container.innerHTML = lovescapeComparisons
            .map(comparison => this.createComparisonCard(comparison))
            .join('');
    }

    renderPopularComparisons() {
        const container = document.getElementById('popular-comparisons');
        if (!container) return;

        // Show non-Lovescape comparisons as "popular"
        const popularComparisons = this.liveComparisons.filter(
            comp => comp.platform1 !== 'lovescape' && comp.platform2 !== 'lovescape'
        );

        container.innerHTML = popularComparisons
            .map(comparison => this.createComparisonCard(comparison))
            .join('');
    }

    createComparisonCard(comparison) {
        const image1 = this.platformImages[comparison.platform1] || '/assets/images/default-platform.png';
        const image2 = this.platformImages[comparison.platform2] || '/assets/images/default-platform.png';
        
        return `
            <a href="${comparison.url}" class="comparison-card ${comparison.featured ? 'featured' : ''}">
                <div class="comparison-platforms-mini">
                    <img src="${image1}" alt="${comparison.platform1}" />
                    <span class="vs">vs</span>
                    <img src="${image2}" alt="${comparison.platform2}" />
                </div>
                <h3>${comparison.title}</h3>
                <p>${comparison.description}</p>
                <div class="comparison-stats">
                    <span>${comparison.rating1}★ vs ${comparison.rating2}★</span>
                    <span>${comparison.pricing1} vs ${comparison.pricing2}</span>
                </div>
                ${comparison.status === 'live' ? 
                    '<div class="status-badge live">🔥 Live</div>' : 
                    '<div class="status-badge coming-soon">🔜 Coming Soon</div>'
                }
            </a>
        `;
    }

    renderComingSoonGrid(category) {
        const container = document.getElementById('coming-soon-grid');
        if (!container) return;

        const comparisons = this.comingSoonComparisons[category] || [];
        
        container.innerHTML = comparisons
            .map(title => this.createComingSoonCard(title))
            .join('');
    }

    createComingSoonCard(title) {
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
        
        return `
            <div class="coming-soon-card">
                <div class="coming-soon-header">
                    <h4>${title}</h4>
                    <div class="status-badge coming-soon">Coming Soon</div>
                </div>
                <p>Detailed comparison with interactive charts, pricing analysis, and expert recommendations.</p>
                <div class="coming-soon-features">
                    <span class="feature-tag">📊 Charts</span>
                    <span class="feature-tag">💰 Pricing</span>
                    <span class="feature-tag">🎯 Analysis</span>
                </div>
                <button class="notify-btn" data-comparison="${slug}">Notify When Ready</button>
            </div>
        `;
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase();
        
        this.filteredComparisons = this.liveComparisons.filter(comparison => 
            comparison.title.toLowerCase().includes(searchTerm) ||
            comparison.description.toLowerCase().includes(searchTerm) ||
            comparison.platform1.toLowerCase().includes(searchTerm) ||
            comparison.platform2.toLowerCase().includes(searchTerm)
        );

        this.renderLiveComparisons();
        this.updateResultsCount();
    }

    handleBrandFilter(brand) {
        if (!brand) {
            this.filteredComparisons = [...this.liveComparisons];
        } else {
            this.filteredComparisons = this.liveComparisons.filter(comparison => 
                comparison.platform1 === brand || comparison.platform2 === brand
            );
        }

        this.renderLiveComparisons();
        this.updateResultsCount();
    }

    handleTabChange(category) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Render new content
        this.renderComingSoonGrid(category);
    }

    handleComparisonRequest() {
        const platform1 = document.getElementById('request-platform1').value;
        const platform2 = document.getElementById('request-platform2').value;

        if (!platform1 || !platform2) {
            alert('Please select both platforms for comparison');
            return;
        }

        if (platform1 === platform2) {
            alert('Please select different platforms');
            return;
        }

        // Check if comparison already exists
        const exists = this.liveComparisons.some(comp => 
            (comp.platform1 === platform1 && comp.platform2 === platform2) ||
            (comp.platform1 === platform2 && comp.platform2 === platform1)
        );

        if (exists) {
            alert('This comparison already exists! Check the live comparisons section.');
            return;
        }

        // Simulate request submission
        alert(`Thank you! We've added "${platform1} vs ${platform2}" to our priority list. You'll be notified when it's ready.`);
        
        // Reset form
        document.getElementById('request-platform1').value = '';
        document.getElementById('request-platform2').value = '';
    }

    updateResultsCount() {
        const counter = document.getElementById('results-count');
        if (counter) {
            counter.textContent = this.filteredComparisons.length;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.comparison-directory-page')) {
        new ComparisonDirectory();
    }
});