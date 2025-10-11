// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const postsContainer = document.getElementById('postsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const categoryFilters = document.querySelectorAll('.blog-hero__category');
    const viewButtons = document.querySelectorAll('.blog-posts__view-btn');
    const featuredPostSection = document.querySelector('.featured-post');

    // State
    let currentCategory = 'all';
    let currentView = 'grid';
    let visiblePosts = 6;

    // Initialize blog
    function initBlog() {
        renderFeaturedPost();
        renderPosts();
        setupEventListeners();
    }

    // Render featured post
    function renderFeaturedPost() {
        const featuredPost = blogPosts.find(post => post.featured);
        
        if (!featuredPost || !featuredPostSection) return;

        featuredPostSection.innerHTML = `
            <div class="container">
                <div class="featured-post__badge">
                    <i class="fas fa-star"></i>
                    Featured Article
                </div>
                <div class="featured-post__content">
                    <div class="featured-post__text">
                        <span class="featured-post__category">${formatCategory(featuredPost.category)}</span>
                        <h2>${featuredPost.title}</h2>
                        <p class="featured-post__excerpt">${featuredPost.excerpt}</p>
                        <div class="featured-post__meta">
                            <div class="featured-post__author">
                                <div class="featured-post__avatar">
                                    <img src="${featuredPost.authorAvatar || featuredPost.avatar}" alt="${featuredPost.author}">
                                </div>
                                <div class="featured-post__details">
                                    <span class="featured-post__name">${featuredPost.author}</span>
                                    <span class="featured-post__date">${featuredPost.date} • ${featuredPost.readTime}</span>
                                </div>
                            </div>
                        </div>
                        <a href="article.html?id=${featuredPost.id}" class="btn btn-primary">Read Full Article</a>
                    </div>
                    <div class="featured-post__image">
                        <img src="${featuredPost.image}" alt="${featuredPost.title}">
                    </div>
                </div>
            </div>
        `;
    }

    // Render posts based on current filters
    function renderPosts() {
        const filteredPosts = filterPostsByCategory();
        const postsToShow = filteredPosts.slice(0, visiblePosts);
        
        postsContainer.innerHTML = '';
        postsContainer.className = `blog-posts__${currentView}`;
        
        if (postsToShow.length === 0) {
            postsContainer.innerHTML = `
                <div class="no-posts">
                    <i class="fas fa-inbox"></i>
                    <h3>No articles found</h3>
                    <p>No articles available in the ${currentCategory === 'all' ? 'selected' : currentCategory} category.</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        postsToShow.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
        
        // Show/hide load more button
        if (visiblePosts >= filteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Filter posts by category (exclude featured post from regular listings)
    function filterPostsByCategory() {
        let filteredPosts;
        
        if (currentCategory === 'all') {
            filteredPosts = blogPosts.filter(post => !post.featured);
        } else {
            filteredPosts = blogPosts.filter(post => post.category === currentCategory && !post.featured);
        }
        
        return filteredPosts;
    }

    // Create post element
    function createPostElement(post) {
        const article = document.createElement('article');
        article.className = 'blog-post';
        article.setAttribute('data-category', post.category);
        
        article.innerHTML = `
            <a href="article.html?id=${post.id}" class="blog-post__link">
                <div class="blog-post__image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <span class="blog-post__category">${formatCategory(post.category)}</span>
                </div>
                <div class="blog-post__content">
                    <h3 class="blog-post__title">${post.title}</h3>
                    <p class="blog-post__excerpt">${post.excerpt}</p>
                    <div class="blog-post__meta">
                        <div class="blog-post__author">
                            <img src="${post.authorAvatar || post.avatar}" alt="${post.author}" class="blog-post__avatar">
                            <div class="blog-post__details">
                                <span class="blog-post__name">${post.author}</span>
                                <span class="blog-post__date">${post.date} • ${post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
        
        return article;
    }

    // Format category for display
    function formatCategory(category) {
        const categoryMap = {
            'ai': 'AI',
            'automation': 'Automation',
            'industry': 'Industry Insights',
            'tutorials': 'Tutorials'
        };
        return categoryMap[category] || category;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Category filters
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.getAttribute('data-category');
                
                // Update active state
                categoryFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                // Update category and reset visible posts
                currentCategory = category;
                visiblePosts = 6;
                renderPosts();
            });
        });

        // View controls
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const view = button.getAttribute('data-view');
                
                // Update active state
                viewButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update view
                currentView = view;
                renderPosts();
            });
        });

        // Load more button
        loadMoreBtn.addEventListener('click', () => {
            visiblePosts += 6;
            renderPosts();
            
            // Smooth scroll to new posts
            setTimeout(() => {
                const newPosts = postsContainer.querySelectorAll('.blog-post');
                if (newPosts.length > 0) {
                    newPosts[newPosts.length - 1].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }, 100);
        });

        // Handle URL parameters for category filtering
        handleUrlParameters();
    }

    // Handle URL parameters for direct category filtering
    function handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');
        
        if (categoryFromUrl && ['ai', 'automation', 'industry', 'tutorials'].includes(categoryFromUrl)) {
            // Find and click the corresponding category button
            const categoryButton = document.querySelector(`[data-category="${categoryFromUrl}"]`);
            if (categoryButton) {
                categoryButton.click();
            }
        }
    }

    // Initialize blog if we're on the blog page
    if (document.querySelector('.blog-posts')) {
        initBlog();
    }
});

// ... rest of your utility functions (shareArticle, toggleBookmark, etc.) 