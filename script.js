// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const faqQuestions = document.querySelectorAll('.faq-question');
const backToTop = document.getElementById('backToTop');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Accordion functionality
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = header.nextElementSibling;
        const accordionIcon = header.querySelector('.accordion-icon');
        
        // Close other accordion items
        document.querySelectorAll('.accordion-content').forEach(content => {
            if (content !== accordionContent && content.classList.contains('active')) {
                content.classList.remove('active');
                content.previousElementSibling.querySelector('.accordion-icon').classList.remove('fa-chevron-up');
                content.previousElementSibling.querySelector('.accordion-icon').classList.add('fa-chevron-down');
            }
        });
        
        // Toggle current accordion item
        accordionContent.classList.toggle('active');
        
        // Toggle icon
        if (accordionContent.classList.contains('active')) {
            accordionIcon.classList.remove('fa-chevron-down');
            accordionIcon.classList.add('fa-chevron-up');
        } else {
            accordionIcon.classList.remove('fa-chevron-up');
            accordionIcon.classList.add('fa-chevron-down');
        }
    });
});

// FAQ functionality
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const faqAnswer = question.nextElementSibling;
        const faqIcon = question.querySelector('.faq-icon');
        
        // Close other FAQ items
        document.querySelectorAll('.faq-answer').forEach(answer => {
            if (answer !== faqAnswer && answer.classList.contains('active')) {
                answer.classList.remove('active');
                answer.previousElementSibling.querySelector('.faq-icon').classList.remove('fa-chevron-up');
                answer.previousElementSibling.querySelector('.faq-icon').classList.add('fa-chevron-down');
            }
        });
        
        // Toggle current FAQ item
        faqAnswer.classList.toggle('active');
        
        // Toggle icon
        if (faqAnswer.classList.contains('active')) {
            faqIcon.classList.remove('fa-chevron-down');
            faqIcon.classList.add('fa-chevron-up');
        } else {
            faqIcon.classList.remove('fa-chevron-up');
            faqIcon.classList.add('fa-chevron-down');
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 80; // Account for fixed navbar
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight current section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to first FAQ item
    if (faqQuestions.length > 0) {
        const firstFaqAnswer = faqQuestions[0].nextElementSibling;
        const firstFaqIcon = faqQuestions[0].querySelector('.faq-icon');
        firstFaqAnswer.classList.add('active');
        firstFaqIcon.classList.remove('fa-chevron-down');
        firstFaqIcon.classList.add('fa-chevron-up');
    }
    
    // Add active class to first accordion item
    if (accordionHeaders.length > 0) {
        const firstAccordionContent = accordionHeaders[0].nextElementSibling;
        const firstAccordionIcon = accordionHeaders[0].querySelector('.accordion-icon');
        firstAccordionContent.classList.add('active');
        firstAccordionIcon.classList.remove('fa-chevron-down');
        firstAccordionIcon.classList.add('fa-chevron-up');
    }
});