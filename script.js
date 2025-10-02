// script.js - Updated for namespaced HTML structure

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.header__mobile-menu-toggle');
    const navMenu = document.querySelector('.header__nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.header__nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
   // Enhanced Chatbot functionality
const chatbotIcon = document.querySelector('.chatbot-widget__icon');
const chatbotModal = document.querySelector('.chatbot-widget__modal');
const closeChatbot = document.querySelector('.chatbot-widget__close');
const chatbotInput = document.querySelector('.chatbot-widget__input input');
const chatbotSend = document.querySelector('.chatbot-widget__input button');
const chatbotMessages = document.querySelector('.chatbot-widget__messages');

// Chatbot state
let chatbotState = 'initial'; // initial, faq, agent
let currentQuestion = '';

if (chatbotIcon && chatbotModal) {
    chatbotIcon.addEventListener('click', function() {
        chatbotModal.classList.toggle('active');
        // Reset to initial state when opening chatbot
        if (chatbotModal.classList.contains('active') && chatbotMessages.children.length === 0) {
            setTimeout(() => {
                showInitialQuestion();
            }, 500);
        }
    });
    
    if (closeChatbot) {
        closeChatbot.addEventListener('click', function() {
            chatbotModal.classList.remove('active');
            // Reset state when closing
            chatbotState = 'initial';
            currentQuestion = '';
        });
    }
    
    // FAQ responses
    const faqResponses = {
        'implementation_time': {
            question: 'How long does implementation take?',
            answer: 'Implementation typically takes 2-6 weeks depending on complexity. Simple automations can be set up in days, while comprehensive workflow systems may take longer. We provide a detailed timeline during our free consultation.'
        },
        'team_resistance': {
            question: 'What if my team resists change?',
            answer: 'We provide comprehensive change management support including training, documentation, and gradual rollout strategies. Our team works closely with yours to ensure smooth adoption and address concerns proactively.'
        },
        'international': {
            question: 'Do you work with businesses outside Nigeria?',
            answer: 'Yes! We serve clients globally. Our remote-first approach allows us to work with businesses worldwide. We\'ve successfully implemented automation solutions for clients in Europe, North America, and across Africa.'
        },
        'automation_breaks': {
            question: 'What happens if an automation breaks?',
            answer: 'We provide 24/7 monitoring and immediate support. All our automations include error handling and alert systems. If something breaks, our team is notified instantly and we typically resolve issues within 2-4 hours.'
        },
        'start_small': {
            question: 'Can we start small and scale?',
            answer: 'Absolutely! We recommend starting with high-impact, low-complexity automations to demonstrate value quickly. Our modular approach allows you to scale gradually as you see results and build confidence.'
        },
        'nda': {
            question: 'Do you sign NDAs?',
            answer: 'Yes, we take confidentiality seriously. We\'re happy to sign NDAs before any discussions. Your business processes and data security are our top priorities.'
        }
    };

    // WhatsApp link
    const whatsappLink = 'https://wa.me/2345551234567?text=Hi%20TeeAutoflow!%20I%27d%20like%20to%20speak%20with%20a%20customer%20agent%20about%20automation%20solutions.';

    function addMessage(text, isUser = false, isQuickReply = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-widget__message');
        messageDiv.classList.add(isUser ? 'chatbot-widget__user-message' : 'chatbot-widget__bot-message');
        
        if (isQuickReply) {
            messageDiv.classList.add('chatbot-widget__quick-reply-message');
        }
        
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addQuickReplies(buttons) {
        const quickReplyDiv = document.createElement('div');
        quickReplyDiv.classList.add('chatbot-widget__quick-replies');
        
        buttons.forEach(button => {
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('chatbot-widget__quick-reply');
            buttonElement.textContent = button.text;
            buttonElement.addEventListener('click', function() {
                addMessage(button.text, true);
                button.action();
            });
            quickReplyDiv.appendChild(buttonElement);
        });
        
        chatbotMessages.appendChild(quickReplyDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showInitialQuestion() {
        addMessage('Welcome to TeeAutoflow! 🤖');
        setTimeout(() => {
            addMessage('Would you like to speak directly with a customer agent?');
            addQuickReplies([
                {
                    text: 'Yes, connect me',
                    action: () => connectToAgent()
                },
                {
                    text: 'No, show FAQs',
                    action: () => showFAQs()
                }
            ]);
        }, 1000);
    }

    function connectToAgent() {
        chatbotState = 'agent';
        addMessage('Great! Let me connect you with our customer agent.');
        setTimeout(() => {
            addMessage(`You can reach our team directly via WhatsApp:`, false, true);
            
            const whatsappButton = document.createElement('a');
            whatsappButton.href = whatsappLink;
            whatsappButton.target = '_blank';
            whatsappButton.classList.add('chatbot-widget__whatsapp-button');
            whatsappButton.innerHTML = `
                <i class="fab fa-whatsapp"></i>
                Chat on WhatsApp
            `;
            
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('chatbot-widget__button-container');
            buttonContainer.appendChild(whatsappButton);
            chatbotMessages.appendChild(buttonContainer);
            
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            setTimeout(() => {
                addMessage('Is there anything else I can help you with while you wait?');
                addQuickReplies([
                    {
                        text: 'Show FAQs',
                        action: () => showFAQs()
                    },
                    {
                        text: 'No, thanks',
                        action: () => addMessage('Thank you for chatting with us! Feel free to reach out anytime. 😊')
                    }
                ]);
            }, 1500);
        }, 1000);
    }

    function showFAQs() {
        chatbotState = 'faq';
        addMessage('Here are our frequently asked questions:');
        
        setTimeout(() => {
            const faqButtons = Object.keys(faqResponses).map(key => ({
                text: faqResponses[key].question,
                action: () => showFAQAnswer(key)
            }));
            
            // Add option to speak with agent
            faqButtons.push({
                text: 'Speak with customer agent',
                action: () => connectToAgent()
            });
            
            addQuickReplies(faqButtons);
        }, 500);
    }

    function showFAQAnswer(faqKey) {
        const faq = faqResponses[faqKey];
        currentQuestion = faqKey;
        
        addMessage(faq.question, true);
        setTimeout(() => {
            addMessage(faq.answer);
            
            setTimeout(() => {
                addMessage('Was this helpful? Do you have any other questions?');
                addQuickReplies([
                    {
                        text: 'Ask another question',
                        action: () => showFAQs()
                    },
                    {
                        text: 'Speak with agent',
                        action: () => connectToAgent()
                    },
                    {
                        text: 'No, thanks',
                        action: () => addMessage('Glad I could help! Feel free to reach out anytime. 😊')
                    }
                ]);
            }, 1000);
        }, 500);
    }

    function processGeneralMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = "I'm here to help with automation questions! Would you like to see our FAQs or speak with a customer agent?";
        
        // Check for FAQ keywords
        const faqKeywords = {
            'time': 'implementation_time',
            'long': 'implementation_time',
            'implement': 'implementation_time',
            'team': 'team_resistance',
            'resist': 'team_resistance',
            'change': 'team_resistance',
            'international': 'international',
            'global': 'international',
            'outside': 'international',
            'break': 'automation_breaks',
            'error': 'automation_breaks',
            'issue': 'automation_breaks',
            'small': 'start_small',
            'scale': 'start_small',
            'start': 'start_small',
            'nda': 'nda',
            'confidential': 'nda',
            'privacy': 'nda'
        };
        
        for (const [keyword, faqKey] of Object.entries(faqKeywords)) {
            if (lowerMessage.includes(keyword)) {
                showFAQAnswer(faqKey);
                return;
            }
        }
        
        // General responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = 'Hello! Welcome to TeeAutoflow. How can I assist you with automation today?';
        } else if (lowerMessage.includes('service')) {
            response = 'We specialize in workflow automation, AI integration, CRM setup, and custom automation solutions. Would you like to know more about any specific service?';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            response = 'Our pricing varies based on your specific needs. We offer flexible packages starting from basic automation to enterprise solutions. Would you like to speak with an agent for a custom quote?';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('call')) {
            response = 'You can reach us at hello@teeautoflow.com or connect with our team directly via WhatsApp for immediate assistance.';
        }
        
        setTimeout(() => {
            addMessage(response);
            addQuickReplies([
                {
                    text: 'Show FAQs',
                    action: () => showFAQs()
                },
                {
                    text: 'Speak with agent',
                    action: () => connectToAgent()
                }
            ]);
        }, 500);
    }

    // Message processing
    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', function() {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatbotInput.value = '';
                
                if (chatbotState === 'initial') {
                    processGeneralMessage(message);
                } else {
                    processGeneralMessage(message);
                }
            }
        });
        
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = chatbotInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    chatbotInput.value = '';
                    
                    if (chatbotState === 'initial') {
                        processGeneralMessage(message);
                    } else {
                        processGeneralMessage(message);
                    }
                }
            }
        });
    }
    
    // Add CSS for new elements
    const chatbotStyles = `
        .chatbot-widget__quick-replies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .chatbot-widget__quick-reply {
            background: rgba(67, 97, 238, 0.1);
            color: var(--primary);
            border: 1px solid rgba(67, 97, 238, 0.2);
            padding: 8px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }
        
        .chatbot-widget__quick-reply:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-1px);
        }
        
        .chatbot-widget__button-container {
            margin-top: 15px;
            text-align: center;
        }
        
        .chatbot-widget__whatsapp-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #25D366;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .chatbot-widget__whatsapp-button:hover {
            background: #128C7E;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
        }
        
        .chatbot-widget__quick-reply-message {
            background: #f8f9fa !important;
            border: 1px solid #e9ecef !important;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = chatbotStyles;
    document.head.appendChild(styleSheet);
}
    
    // Form submission
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // Add loading state
            const submitBtn = this.querySelector('.contact__btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll simulate API call with timeout
            setTimeout(() => {
                alert(`Thank you ${name}! We've received your message and will contact you at ${email} soon.`);
                
                // Reset form and button
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer__newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            const submitBtn = this.querySelector('.footer__btn');
            const originalText = submitBtn.textContent;
            
            // Add loading state
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // In a real application, you would send this to a newsletter service
            setTimeout(() => {
                alert(`Thank you for subscribing with ${email}! You'll receive automation tips soon.`);
                
                // Reset form and button
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
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
        const elements = document.querySelectorAll(
            '.services__card, .pricing__card, .why-choose-us__value-prop, .client-results__card'
        );
        
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
    document.querySelectorAll(
        '.services__card, .pricing__card, .why-choose-us__value-prop, .client-results__card'
    ).forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Read More functionality for About section
    const readMoreBtn = document.querySelector('.about__btn-read-more');
    const aboutSection = document.querySelector('.about');
    
    if (readMoreBtn && aboutSection) {
        readMoreBtn.addEventListener('click', function() {
            aboutSection.classList.toggle('expanded');
            
            // Smooth scroll to expanded content
            if (aboutSection.classList.contains('expanded')) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }
    
    // Video play/pause functionality
    const heroVideo = document.querySelector('.hero__video-container video');
    const playPauseBtn = document.querySelector('.hero__play-pause-btn');
    
    if (heroVideo && playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (heroVideo.paused) {
                heroVideo.play();
                this.classList.add('playing');
            } else {
                heroVideo.pause();
                this.classList.remove('playing');
            }
        });
        
        // Update button state when video ends
        heroVideo.addEventListener('ended', function() {
            playPauseBtn.classList.remove('playing');
        });
    }
    
    // Pricing package selection
    const packageButtons = document.querySelectorAll('.pricing__btn-package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            
            // In a real application, this would redirect to a booking page
            // or show a modal with package details
            switch(packageType) {
                case 'starter':
                    alert('Starting your Essential Automation package setup...');
                    break;
                case 'growth':
                    alert('Starting your Advanced Workflows package setup...');
                    break;
                case 'enterprise':
                    alert('Connecting you with our sales team for Enterprise solutions...');
                    break;
                default:
                    alert('Package selection received!');
            }
            
            // You could also track this event in analytics
            console.log(`Package selected: ${packageType}`);
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Back to top button functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Service card interactions
    const serviceCards = document.querySelectorAll('.services__card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Client results card interactions
    const resultCards = document.querySelectorAll('.client-results__card');
    
    resultCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Partner logo animations
    const partnerLogos = document.querySelectorAll('.why-choose-us__partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Form validation enhancements
    const formInputs = document.querySelectorAll('.contact__form-group input, .contact__form-group textarea, .contact__form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
        
        // Add real-time validation for email
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.classList.add('invalid');
                } else {
                    this.classList.remove('invalid');
                }
            });
        }
    });
    
    // Intersection Observer for more performant animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all animated elements
        document.querySelectorAll(
            '.services__card, .pricing__card, .why-choose-us__value-prop, .client-results__card, .about__content, .hero__content'
        ).forEach(el => {
            observer.observe(el);
        });
    }
    
    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Add CSS for new classes used in JavaScript
const additionalStyles = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: var(--secondary);
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
    }
    
    .contact__form-group input.invalid {
        border-color: #e53e3e;
        background: rgba(229, 62, 62, 0.02);
    }
    
    .contact__form-group input.filled {
        border-color: #38a169;
        background: rgba(56, 161, 105, 0.02);
    }
    
    img.lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img:not(.lazy) {
        opacity: 1;
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);