// Achievement Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter Buttons Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gallerySections = document.querySelectorAll('.gallery-section');
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const filterCategory = button.getAttribute('data-filter');
            
            // Hide all sections first
            gallerySections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show filtered section or all sections
            if (filterCategory === 'all') {
                gallerySections.forEach(section => {
                    section.classList.add('active');
                });
                
                // Show all cards
                achievementCards.forEach(card => {
                    card.style.display = 'flex';
                });
            } else {
                // Show specific section
                const targetSection = document.getElementById(`${filterCategory}-section`);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                // Filter cards by category
                achievementCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterCategory) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            // Scroll to gallery
            const gallerySection = document.querySelector('.achievement-gallery');
            const headerOffset = 100;
            const elementPosition = gallerySection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Achievement Card Hover Effects
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add scale effect
            card.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add glow effect based on category
            const category = card.getAttribute('data-category');
            let glowColor = 'rgba(88, 101, 242, 0.1)';
            
            switch(category) {
                case 'playtime':
                    glowColor = 'rgba(79, 70, 229, 0.1)';
                    break;
                case 'love':
                    glowColor = 'rgba(236, 72, 153, 0.1)';
                    break;
                case 'donation':
                    glowColor = 'rgba(16, 185, 129, 0.1)';
                    break;
                case 'gift':
                    glowColor = 'rgba(245, 158, 11, 0.1)';
                    break;
            }
            
            card.style.boxShadow = `0 20px 40px ${glowColor}`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Initialize image loading
    function loadAchievementImages() {
        // In a real application, this would load actual achievement images
        // For now, we'll use placeholders and update them with proper icons
        
        const achievementImages = document.querySelectorAll('.achievement-image img');
        const categoryIcons = {
            playtime: '⏱️',
            love: '❤️',
            donation: '💰',
            gift: '🎁'
        };
        
        achievementImages.forEach(img => {
            const card = img.closest('.achievement-card');
            if (card) {
                const category = card.getAttribute('data-category');
                const title = card.querySelector('.achievement-title')?.textContent || '';
                
                // You can replace this with actual image URLs
                // For now, we'll just ensure the placeholder works
                if (!img.src || img.src.includes('flaticon')) {
                    // Keep using placeholder
                    img.alt = `${title} Achievement Icon`;
                }
            }
        });
    }
    
    // Load images after DOM is ready
    setTimeout(loadAchievementImages, 100);
    
    // Category Color Coding
    function applyCategoryColors() {
        achievementCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const cardHeader = card.querySelector('.card-header');
            const targetIcon = card.querySelector('.achievement-target i');
            const rewardIcon = card.querySelector('.achievement-reward i');
            
            if (category === 'playtime') {
                if (cardHeader) cardHeader.style.background = 'linear-gradient(135deg, #EEF2FF, #E0E7FF)';
                if (targetIcon) targetIcon.style.color = '#4F46E5';
                if (rewardIcon) rewardIcon.style.color = '#F59E0B';
            } else if (category === 'love') {
                if (cardHeader) cardHeader.style.background = 'linear-gradient(135deg, #FCE7F3, #FBCFE8)';
                if (targetIcon) targetIcon.style.color = '#EC4899';
                if (rewardIcon) rewardIcon.style.color = '#F59E0B';
            } else if (category === 'donation') {
                if (cardHeader) cardHeader.style.background = 'linear-gradient(135deg, #D1FAE5, #A7F3D0)';
                if (targetIcon) targetIcon.style.color = '#10B981';
                if (rewardIcon) rewardIcon.style.color = '#F59E0B';
            } else if (category === 'gift') {
                if (cardHeader) cardHeader.style.background = 'linear-gradient(135deg, #FEF3C7, #FDE68A)';
                if (targetIcon) targetIcon.style.color = '#F59E0B';
                if (rewardIcon) rewardIcon.style.color = '#8B5CF6';
            }
        });
    }
    
    // Apply category colors
    applyCategoryColors();
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Update current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Add animation to achievement cards on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all achievement cards
    achievementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Keyboard navigation for filter buttons
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filterButtonsArray = Array.from(filterButtons);
            const currentIndex = filterButtonsArray.indexOf(activeFilter);
            
            if (e.key === 'ArrowRight' && currentIndex < filterButtonsArray.length - 1) {
                filterButtonsArray[currentIndex + 1].click();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                filterButtonsArray[currentIndex - 1].click();
            }
        }
    });
    
    // Initialize with "all" filter active
    const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.click();
    }
});