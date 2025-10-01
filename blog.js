// Blog JavaScript - Dynamic Content Loading and Interactions

// Sample blog data with full content
const blogPosts = [
    {
        id: 1,
        title: "5 Workflows Every Business Should Automate Today",
        excerpt: "Discover the most impactful automation opportunities that can transform your business operations immediately and boost productivity.",
        category: "automation",
        date: "March 10, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        author: {
            name: "Taylor Johnson",
            role: "Automation Strategist",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        featured: false,
        fullContent: `
            <h2>Introduction to Business Automation</h2>
            <p>In today's fast-paced business environment, automation has become a critical component for staying competitive. Companies that leverage automation effectively can reduce costs, improve efficiency, and enhance customer experiences.</p>
            
            <h2>The 5 Essential Workflows to Automate</h2>
            
            <h3>1. Customer Onboarding Process</h3>
            <p>Streamline your customer onboarding with automated welcome emails, document collection, and account setup. This ensures a consistent experience for every new customer while reducing manual work for your team.</p>
            
            <h3>2. Invoice and Payment Processing</h3>
            <p>Automate your accounts receivable with systems that generate and send invoices automatically, track payments, and send reminders for overdue accounts.</p>
            
            <h3>3. Employee Onboarding</h3>
            <p>Create a seamless onboarding experience by automating paperwork, equipment requests, and training schedule notifications.</p>
            
            <h3>4. Social Media Management</h3>
            <p>Schedule posts, monitor engagement, and analyze performance across all your social channels with automation tools.</p>
            
            <h3>5. Data Backup and Reporting</h3>
            <p>Automate regular data backups and generate scheduled reports to keep stakeholders informed without manual intervention.</p>
            
            <h2>Getting Started with Automation</h2>
            <p>Begin by identifying repetitive tasks in your business that consume significant time. Start small with one workflow, measure the results, and gradually expand your automation efforts.</p>
            
            <p>Remember: The goal of automation isn't to replace human workers, but to free them from mundane tasks so they can focus on higher-value activities that drive business growth.</p>
        `
    },
    {
        id: 2,
        title: "How AI is Transforming Customer Support in 2025",
        excerpt: "Explore the latest AI advancements that are revolutionizing customer service and how to implement them in your business.",
        category: "ai",
        date: "March 15, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        author: {
            name: "Alex Chen",
            role: "AI Solutions Architect",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        featured: true,
        fullContent: `
            <h2>The AI Revolution in Customer Service</h2>
            <p>Artificial Intelligence is fundamentally changing how businesses interact with customers. In 2025, we're seeing AI move from basic chatbots to sophisticated systems that can understand context, emotion, and complex customer needs.</p>
            
            <h2>Key AI Technologies Transforming Support</h2>
            
            <h3>Natural Language Processing (NLP)</h3>
            <p>Modern NLP systems can understand customer intent with over 95% accuracy, allowing for more natural conversations and reduced frustration.</p>
            
            <h3>Sentiment Analysis</h3>
            <p>AI can now detect customer emotions in real-time, enabling support agents to tailor their responses and escalate issues before they become critical.</p>
            
            <h3>Predictive Support</h3>
            <p>By analyzing customer behavior and historical data, AI can anticipate issues before they occur and provide proactive solutions.</p>
            
            <h2>Implementation Strategies</h2>
            <p>Start with a hybrid approach where AI handles routine inquiries while human agents focus on complex issues. Gradually increase AI capabilities as the system learns from customer interactions.</p>
            
            <h2>Measuring Success</h2>
            <p>Track key metrics like first-contact resolution, customer satisfaction scores, and average handling time to measure the impact of AI on your support operations.</p>
        `
    },
    // Add fullContent to all other posts similarly...
    {
        id: 3,
        title: "Automation for Law Firms: 3 Processes You Can Streamline Now",
        excerpt: "Learn how legal practices are using automation to reduce administrative overhead and improve client service delivery.",
        category: "industry",
        date: "March 5, 2025",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        author: {
            name: "Sam Rivera",
            role: "Industry Solutions Lead",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        featured: false,
        fullContent: `<p>Full content for law firm automation article...</p>`
    },
    {
        id: 4,
        title: "Getting Started with Zapier: A Beginner's Guide",
        excerpt: "Step-by-step tutorial on how to create your first automation with Zapier, even if you have no technical background.",
        category: "tutorials",
        date: "February 28, 2025",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        author: {
            name: "Jordan Smith",
            role: "Technical Trainer",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
        },
        featured: false,
        fullContent: `<p>Full content for Zapier tutorial...</p>`
    },
    {
        id: 5,
        title: "The ROI of Automation: Calculating Your Business Savings",
        excerpt: "Learn how to measure and quantify the return on investment from automation initiatives in your organization.",
        category: "automation",
        date: "February 22, 2025",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        author: {
            name: "Morgan Lee",
            role: "Business Analyst",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        featured: false,
        fullContent: `<p>Full content for ROI automation article...</p>`
    },
    {
        id: 6,
        title: "AI Chatbots vs Human Support: Finding the Right Balance",
        excerpt: "Explore when to use AI chatbots and when human intervention is necessary for optimal customer experience.",
        category: "ai",
        date: "February 18, 2025",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        author: {
            name: "Alex Chen",
            role: "AI Solutions Architect",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        featured: false,
        fullContent: `<p>Full content for AI chatbots article...</p>`
    },
    {
        id: 7,
        title: "E-commerce Automation: Streamlining Order to Delivery",
        excerpt: "How online retailers can automate their entire order fulfillment process for efficiency and customer satisfaction.",
        category: "industry",
        date: "February 12, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1563013546-7e5c7c07c47e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        author: {
            name: "Sam Rivera",
            role: "Industry Solutions Lead",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        featured: false,
        fullContent: `<p>Full content for e-commerce automation article...</p>`
    },
    {
        id: 8,
        title: "Building Custom GPTs for Business: A Practical Guide",
        excerpt: "Step-by-step instructions for creating custom GPT models tailored to your specific business needs and use cases.",
        category: "tutorials",
        date: "February 5, 2025",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        author: {
            name: "Taylor Johnson",
            role: "Automation Strategist",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        featured: false,
        fullContent: `<p>Full content for custom GPTs article...</p>`
    }
];

// DOM Elements
const postsContainer = document.getElementById('postsContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const categoryFilters = document.querySelectorAll('.category-filter');
const viewButtons = document.querySelectorAll('.view-btn');
const searchInput = document.getElementById('searchInput');

// State
let currentPage = 1;
const postsPerPage = 6;
let currentCategory = 'all';
let currentView = 'grid';
let filteredPosts = [...blogPosts.filter(post => !post.featured)];

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    renderPosts();
    setupEventListeners();
    
    // Add search input if it doesn't exist in HTML
    if (!searchInput) {
        addSearchInput();
    }
});

// Add search input dynamically if missing
function addSearchInput() {
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && !document.getElementById('searchInput')) {
        
        
        // Reinitialize search functionality
        setupSearchFunctionality();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }
    
    // Category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            currentCategory = this.dataset.category;
            currentPage = 1;
            filterPosts();
        });
    });
    
    // View toggle buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active view button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Change view
            currentView = this.dataset.view;
            postsContainer.className = `blog-posts-grid ${currentView}-view`;
            renderPosts();
        });
    });
    
    // Search functionality
    setupSearchFunctionality();
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest automation insights soon.`);
            this.reset();
        });
    }
    
    // Featured post read button
    const readFeaturedBtn = document.querySelector('.read-featured');
    if (readFeaturedBtn) {
        readFeaturedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const featuredPost = blogPosts.find(post => post.featured);
            if (featuredPost) {
                navigateToArticle(featuredPost.id);
            }
        });
    }
}

// Set up search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Clear any existing event listeners by cloning and replacing
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        
        newSearchInput.addEventListener('input', function() {
            currentPage = 1;
            filterPosts();
        });
        
        // Add search button functionality
        const searchButton = newSearchInput.nextElementSibling;
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                currentPage = 1;
                filterPosts();
            });
        }
    }
}

// Filter posts based on category and search
function filterPosts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    filteredPosts = blogPosts.filter(post => {
        // Skip featured posts in the grid
        if (post.featured) return false;
        
        // Filter by category
        if (currentCategory !== 'all' && post.category !== currentCategory) {
            return false;
        }
        
        // Filter by search term
        if (searchTerm && !post.title.toLowerCase().includes(searchTerm) && 
            !post.excerpt.toLowerCase().includes(searchTerm) &&
            !post.category.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    renderPosts();
}

// Render posts to the container
function renderPosts() {
    const startIndex = 0;
    const endIndex = currentPage * postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    if (postsToShow.length === 0) {
        postsContainer.innerHTML = `
            <div class="no-posts-message">
                <i class="fas fa-search"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }
    
    postsContainer.innerHTML = postsToShow.map(post => `
        <article class="blog-post-card ${currentView}-view" data-category="${post.category}">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-content">
                <div class="post-meta-top">
                    <span class="post-category-small">${post.category}</span>
                    <span class="post-date-small">${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p class="post-excerpt-small">${post.excerpt}</p>
                <div class="post-meta-bottom">
                    <div class="author-info-small">
                        <div class="author-avatar-small">
                            <img src="${post.author.avatar}" alt="${post.author.name}">
                        </div>
                        <div class="author-details-small">
                            <span class="author-name-small">${post.author.name}</span>
                            <span class="author-role">${post.author.role}</span>
                        </div>
                    </div>
                    <button class="btn-view-more" data-id="${post.id}">View More</button>
                </div>
            </div>
        </article>
    `).join('');
    
    // Show/hide load more button
    if (loadMoreBtn) {
        if (endIndex >= filteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
    
    // Add click events to view more buttons
    document.querySelectorAll('.btn-view-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const postId = parseInt(this.dataset.id);
            navigateToArticle(postId);
        });
    });
    
    // Add click events to post cards
    document.querySelectorAll('.blog-post-card').forEach(card => {
        card.addEventListener('click', function() {
            const postId = parseInt(this.querySelector('.btn-view-more').dataset.id);
            navigateToArticle(postId);
        });
    });
}

// Navigate to full article
function navigateToArticle(postId) {
    // Store the post data in sessionStorage for the article page
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        sessionStorage.setItem('currentArticle', JSON.stringify(post));
        window.location.href = `article.html?id=${postId}`;
    }
}

// Load more posts
function loadMorePosts() {
    currentPage++;
    renderPosts();
    
    // Scroll to newly loaded content
    const newPosts = document.querySelectorAll('.blog-post-card');
    if (newPosts.length > 0) {
        const lastPost = newPosts[newPosts.length - 1];
        lastPost.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Add some CSS for the no posts message and view more button
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .no-posts-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        color: var(--text-light);
    }
    
    .no-posts-message i {
        font-size: 3rem;
        margin-bottom: 20px;
        opacity: 0.5;
    }
    
    .no-posts-message h3 {
        margin-bottom: 10px;
        color: var(--text-light);
    }
    
    .btn-view-more {
        background: var(--primary);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .btn-view-more:hover {
        background: var(--secondary);
        transform: translateY(-2px);
    }
    
    .blog-search {
        display: flex;
        background: var(--light);
        border-radius: 30px;
        overflow: hidden;
        padding: 5px;
    }
    
    .blog-search input {
        border: none;
        background: transparent;
        padding: 8px 15px;
        outline: none;
        width: 200px;
    }
    
    .blog-search button {
        background: var(--primary);
        color: white;
        border: none;
        width: 40px;
        cursor: pointer;
        border-radius: 50%;
    }
`;
document.head.appendChild(additionalStyles);