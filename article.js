// Article page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));
    
    if (articleId) {
        loadArticle(articleId);
    } else {
        showError('Article not found');
    }
});

function loadArticle(articleId) {
    const article = blogPosts.find(post => post.id === articleId);
    
    if (article) {
        displayArticle(article);
        updateDocumentTitle(article);
    } else {
        showError('Article not found');
    }
}

function displayArticle(article) {
    const articleContainer = document.getElementById('articleContent');
    
    articleContainer.innerHTML = `
        <div class="container">
            <div class="article__header">
                <nav class="article__breadcrumb">
                    <a href="blog.html">Blog</a>
                    <i class="fas fa-chevron-right"></i>
                    <a href="blog.html?category=${article.category}">${article.category.toUpperCase()}</a>
                    <i class="fas fa-chevron-right"></i>
                    <span>Current Article</span>
                </nav>
                
                <span class="article__category">${article.category.toUpperCase()}</span>
                <h1 class="article__title">${article.title}</h1>
                <p class="article__excerpt">${article.excerpt}</p>
                
                <div class="article__meta">
                    <div class="article__author">
                        <div class="article__avatar">
                            <img src="${article.avatar}" alt="${article.author}">
                        </div>
                        <div class="article__author-info">
                            <span class="article__author-name">${article.author}</span>
                            <span class="article__date">${article.date} • ${article.readTime}</span>
                        </div>
                    </div>
                    <div class="article__actions">
                        <button class="article__action-btn" onclick="shareArticle()">
                            <i class="fas fa-share"></i>
                            Share
                        </button>
                        <button class="article__action-btn" onclick="toggleBookmark()">
                            <i class="far fa-bookmark"></i>
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <div class="article__image">
                <img src="${article.image}" alt="${article.title}">
            </div>

            <div class="article__content">
                <div class="article__body">
                    ${article.content}
                </div>

                <div class="article__sidebar">
                    <div class="article__sidebar-widget">
                        <h4>About the Author</h4>
                        <div class="article__author-card">
                            <img src="${article.avatar}" alt="${article.author}">
                            <div class="article__author-card-info">
                                <h5>${article.author}</h5>
                                <p>AI Solutions Architect at Autonify. Specializing in intelligent automation and customer experience transformation.</p>
                                <div class="article__author-social">
                                    <a href="#"><i class="fab fa-linkedin"></i></a>
                                    <a href="#"><i class="fab fa-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="article__sidebar-widget">
                        <h4>Related Articles</h4>
                        <div class="article__related-posts">
                            ${getRelatedArticles(article.id, article.category)}
                        </div>
                    </div>

                    <div class="article__sidebar-widget">
                        <h4>Newsletter</h4>
                        <p>Get the latest automation insights delivered to your inbox.</p>
                        <form class="article__newsletter-form">
                            <input type="email" placeholder="Enter your email" required>
                            <button type="submit" class="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="article__tags">
                <span>Tags:</span>
                <a href="blog.html?category=${article.category}" class="article__tag">${article.category.toUpperCase()}</a>
                <a href="#" class="article__tag">Automation</a>
                <a href="#" class="article__tag">Business Growth</a>
            </div>

            <div class="article__navigation">
                ${getPreviousArticle(article.id)}
                ${getNextArticle(article.id)}
            </div>
        </div>
    `;
}

function getRelatedArticles(currentId, category) {
    const related = blogPosts
        .filter(post => post.id !== currentId && post.category === category)
        .slice(0, 3);
    
    if (related.length === 0) {
        return '<p>No related articles found.</p>';
    }
    
    return related.map(post => `
        <a href="article.html?id=${post.id}" class="article__related-post">
            <h5>${post.title}</h5>
            <span>${post.readTime}</span>
        </a>
    `).join('');
}

function getPreviousArticle(currentId) {
    const currentIndex = blogPosts.findIndex(post => post.id === currentId);
    const prevArticle = blogPosts[currentIndex - 1];
    
    if (prevArticle) {
        return `
            <a href="article.html?id=${prevArticle.id}" class="article__nav-link article__nav-prev">
                <i class="fas fa-arrow-left"></i>
                <div>
                    <span>Previous Article</span>
                    <h4>${prevArticle.title}</h4>
                </div>
            </a>
        `;
    }
    return '<div class="article__nav-link article__nav-prev"></div>';
}

function getNextArticle(currentId) {
    const currentIndex = blogPosts.findIndex(post => post.id === currentId);
    const nextArticle = blogPosts[currentIndex + 1];
    
    if (nextArticle) {
        return `
            <a href="article.html?id=${nextArticle.id}" class="article__nav-link article__nav-next">
                <div>
                    <span>Next Article</span>
                    <h4>${nextArticle.title}</h4>
                </div>
                <i class="fas fa-arrow-right"></i>
            </a>
        `;
    }
    return '<div class="article__nav-link article__nav-next"></div>';
}

function updateDocumentTitle(article) {
    document.title = `${article.title} - Autonify`;
}

function showError(message) {
    const articleContainer = document.getElementById('articleContent');
    articleContainer.innerHTML = `
        <div class="container">
            <div class="article-error">
                <h2>${message}</h2>
                <p>The article you're looking for doesn't exist or has been moved.</p>
                <a href="blog.html" class="btn btn-primary">Back to Blog</a>
            </div>
        </div>
    `;
}

// Utility functions
function shareArticle() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
}

function toggleBookmark() {
    const btn = document.querySelector('.article__action-btn:nth-child(2)');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.innerHTML = '<i class="far fa-bookmark"></i> Save';
    }
}