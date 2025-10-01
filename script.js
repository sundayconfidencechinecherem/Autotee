// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Chatbot functionality
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotModal = document.querySelector('.chatbot-modal');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    if (chatbotIcon && chatbotModal) {
        chatbotIcon.addEventListener('click', function() {
            chatbotModal.classList.toggle('active');
        });
        
        closeChatbot.addEventListener('click', function() {
            chatbotModal.classList.remove('active');
        });
        
        // Sample chatbot responses
        const responses = {
            'hello': 'Hello! How can I help you with automation today?',
            'hi': 'Hi there! What can I assist you with regarding automation?',
            'services': 'We offer workflow automation, AI integration, CRM setup, and industry-specific solutions. Which one interests you?',
            'pricing': 'Our pricing depends on the complexity of your needs. Would you like to book a free consultation to discuss?',
            'contact': 'You can reach us at hello@teeautoflow.com or book a call through our website.',
            'default': "I'm not sure I understand. Could you rephrase that? Or ask about our services, pricing, or how to contact us."
        };
        
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            messageDiv.innerHTML = `<p>${text}</p>`;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        function processMessage(message) {
            const lowerMessage = message.toLowerCase();
            let response = responses.default;
            
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                response = responses.hello;
            } else if (lowerMessage.includes('service')) {
                response = responses.services;
            } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
                response = responses.pricing;
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('call')) {
                response = responses.contact;
            }
            
            // Simulate typing delay
            setTimeout(() => {
                addMessage(response);
            }, 500);
        }
        
        if (chatbotSend && chatbotInput) {
            chatbotSend.addEventListener('click', function() {
                const message = chatbotInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    chatbotInput.value = '';
                    processMessage(message);
                }
            });
            
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const message = chatbotInput.value.trim();
                    if (message) {
                        addMessage(message, true);
                        chatbotInput.value = '';
                        processMessage(message);
                    }
                }
            });
        }
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you ${name}! We've received your message and will contact you at ${email} soon.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // In a real application, you would send this to a newsletter service
            alert(`Thank you for subscribing with ${email}! You'll receive automation tips soon.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .pain-point, .value-prop, .case-study-card, .blog-post');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .pain-point, .value-prop, .case-study-card, .blog-post').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

// Read More functionality for About section
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.querySelector('.btn-read-more');
    const aboutContent = document.querySelector('.about-content');
    
    if (readMoreBtn && aboutContent) {
        readMoreBtn.addEventListener('click', function() {
            aboutContent.classList.toggle('expanded');
            
            // Smooth scroll to expanded content
            if (aboutContent.classList.contains('expanded')) {
                aboutContent.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }
});