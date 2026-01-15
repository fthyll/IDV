// DOM Elements
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const backToTop = document.getElementById('backToTop');
const currentYear = document.getElementById('currentYear');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ Toggle Function
function toggleFAQ(questionElement) {
    const answer = questionElement.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    
    // Close all FAQ answers
    document.querySelectorAll('.faq-answer').forEach(item => {
        item.classList.remove('open');
    });
    
    // Remove active class from all questions
    document.querySelectorAll('.faq-question').forEach(item => {
        item.classList.remove('active');
    });
    
    // If it wasn't open, open it
    if (!isOpen) {
        answer.classList.add('open');
        questionElement.classList.add('active');
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate the position to scroll to
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight current section in navigation
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = sectionId;
        }
    });
    
    // Update navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe cards and other elements
    document.querySelectorAll('.content-card, .feature-card, .achievement-card, .reason-card, .responsibility-card, .method-card').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize first FAQ as open
    const firstFAQ = document.querySelector('.faq-question');
    if (firstFAQ) {
        toggleFAQ(firstFAQ);
    }
});

// Update section highlighting on scroll
window.addEventListener('scroll', () => {
    highlightCurrentSection();
});

// Initialize section highlighting on page load
document.addEventListener('DOMContentLoaded', () => {
    highlightCurrentSection();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // Tab key navigation in FAQ
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('faq-question')) {
            e.preventDefault();
            toggleFAQ(e.target);
        }
    }
});

// Add print styles
const style = document.createElement('style');
style.textContent = `
    @media print {
        .navbar, .hero, .footer, .back-to-top, .cta-buttons {
            display: none !important;
        }
        
        .content-card {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            break-inside: avoid;
        }
        
        .section {
            margin-bottom: 40px !important;
        }
        
        a {
            color: #000 !important;
            text-decoration: underline !important;
        }
        
        .faq-answer {
            max-height: none !important;
            display: block !important;
        }
    }
`;
document.head.appendChild(style);