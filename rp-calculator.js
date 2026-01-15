// RP Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    // Constants
    const BASE_RP = 150; // Base RP per player
    const INTERVAL_MINUTES = 5; // RP given every 5 minutes
    
    // State variables
    let totalPlayers = 20;
    let nearbyPlayers = 5;
    let isPremium = false;
    let timeMultiplier = 1;
    let selectedTime = "Normal";
    let durationMinutes = 5;
    
    // DOM Elements
    const totalPlayersInput = document.getElementById('totalPlayers');
    const totalPlayersValue = document.getElementById('totalPlayersValue');
    const nearbyPlayersInput = document.getElementById('nearbyPlayers');
    const nearbyPlayersValue = document.getElementById('nearbyPlayersValue');
    const premiumStatusToggle = document.getElementById('premiumStatus');
    const timeButtons = document.querySelectorAll('.time-btn');
    const durationButtons = document.querySelectorAll('.duration-btn');
    
    // Result elements
    const totalRPElement = document.getElementById('totalRP');
    const rpPerMinuteElement = document.getElementById('rpPerMinute');
    const durationTextElement = document.getElementById('durationText');
    const defaultBenefitElement = document.getElementById('defaultBenefit');
    const premiumBenefitElement = document.getElementById('premiumBenefit');
    const nearPlayerBenefitElement = document.getElementById('nearPlayerBenefit');
    const subtotalRPElement = document.getElementById('subtotalRP');
    const timeMultiplierElement = document.getElementById('timeMultiplier');
    const timeBonusRPElement = document.getElementById('timeBonusRP');
    const finalRPElement = document.getElementById('finalRP');
    const totalPlayersFormula = document.querySelectorAll('#totalPlayersFormula, #totalPlayersFormula2');
    const nearbyPlayersFormula = document.getElementById('nearbyPlayersFormula');
    
    // Buttons
    const calculateButton = document.getElementById('calculateRP');
    const resetButton = document.getElementById('resetCalculator');
    
    // Initialize calculator
    initCalculator();
    
    function initCalculator() {
        updateSliders();
        setupEventListeners();
        calculateRP();
    }
    
    function setupEventListeners() {
        // Total players slider
        totalPlayersInput.addEventListener('input', function() {
            totalPlayers = parseInt(this.value);
            totalPlayersValue.textContent = totalPlayers;
            totalPlayersFormula.forEach(el => el.textContent = totalPlayers);
            calculateRP();
        });
        
        // Nearby players slider
        nearbyPlayersInput.addEventListener('input', function() {
            nearbyPlayers = parseInt(this.value);
            nearbyPlayersValue.textContent = nearbyPlayers;
            nearbyPlayersFormula.textContent = nearbyPlayers;
            calculateRP();
        });
        
        // Premium toggle
        premiumStatusToggle.addEventListener('change', function() {
            isPremium = this.checked;
            calculateRP();
        });
        
        // Time buttons
        timeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                timeButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get multiplier and time name
                timeMultiplier = parseInt(this.getAttribute('data-multiplier'));
                selectedTime = this.getAttribute('data-time');
                calculateRP();
            });
        });
        
        // Duration buttons
        durationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                durationButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get duration in minutes
                durationMinutes = parseInt(this.getAttribute('data-minutes'));
                calculateRP();
            });
        });
        
        // Calculate button
        calculateButton.addEventListener('click', calculateRP);
        
        // Reset button
        resetButton.addEventListener('click', resetCalculator);
    }
    
    function updateSliders() {
        totalPlayersValue.textContent = totalPlayers;
        totalPlayersFormula.forEach(el => el.textContent = totalPlayers);
        nearbyPlayersValue.textContent = nearbyPlayers;
        nearbyPlayersFormula.textContent = nearbyPlayers;
    }
    
    function calculateRP() {
        // Calculate base benefits
        const defaultBenefit = BASE_RP * totalPlayers;
        const premiumBenefit = isPremium ? BASE_RP * totalPlayers : 0;
        const nearPlayerBenefit = nearbyPlayers > 0 ? BASE_RP * nearbyPlayers : 0;
        
        // Calculate subtotal (before time multiplier)
        let subtotal = defaultBenefit + nearPlayerBenefit;
        if (isPremium) {
            subtotal += premiumBenefit;
        }
        
        // Apply time multiplier
        const timeBonus = subtotal * (timeMultiplier - 1);
        const finalPer5Minutes = subtotal * timeMultiplier;
        
        // Calculate for selected duration
        const intervals = durationMinutes / INTERVAL_MINUTES;
        const totalForDuration = finalPer5Minutes * intervals;
        
        // Calculate RP per minute
        const rpPerMinute = finalPer5Minutes / INTERVAL_MINUTES;
        
        // Update display
        updateDisplay(
            defaultBenefit,
            premiumBenefit,
            nearPlayerBenefit,
            subtotal,
            timeMultiplier,
            timeBonus,
            finalPer5Minutes,
            totalForDuration,
            rpPerMinute
        );
    }
    
    function updateDisplay(
        defaultBenefit,
        premiumBenefit,
        nearPlayerBenefit,
        subtotal,
        timeMultiplier,
        timeBonus,
        finalPer5Minutes,
        totalForDuration,
        rpPerMinute
    ) {
        // Update benefit displays
        defaultBenefitElement.textContent = formatNumber(defaultBenefit);
        premiumBenefitElement.textContent = formatNumber(premiumBenefit);
        nearPlayerBenefitElement.textContent = formatNumber(nearPlayerBenefit);
        
        // Update subtotal and multiplier
        subtotalRPElement.textContent = formatNumber(subtotal);
        timeMultiplierElement.textContent = timeMultiplier;
        timeBonusRPElement.textContent = formatNumber(timeBonus);
        finalRPElement.textContent = formatNumber(finalPer5Minutes);
        
        // Update totals
        totalRPElement.textContent = formatNumber(totalForDuration);
        rpPerMinuteElement.textContent = formatNumber(rpPerMinute);
        
        // Update duration text
        let durationText = '';
        if (durationMinutes === 5) {
            durationText = 'per 5 menit';
        } else if (durationMinutes === 30) {
            durationText = 'per 30 menit';
        } else if (durationMinutes === 60) {
            durationText = 'per 1 jam';
        } else if (durationMinutes === 180) {
            durationText = 'per 3 jam';
        }
        durationTextElement.textContent = durationText;
        
        // Show/hide premium benefit
        const premiumElements = document.querySelectorAll('.premium-only');
        premiumElements.forEach(el => {
            el.style.display = isPremium ? 'flex' : 'none';
        });
        
        // Update premium toggle text
        const premiumToggle = document.querySelector('.toggle-text.on');
        if (premiumToggle) {
            premiumToggle.textContent = isPremium ? 'Premium' : 'Non-Premium';
        }
    }
    
    function resetCalculator() {
        // Reset to default values
        totalPlayers = 20;
        nearbyPlayers = 5;
        isPremium = false;
        timeMultiplier = 1;
        durationMinutes = 5;
        
        // Reset UI elements
        totalPlayersInput.value = totalPlayers;
        nearbyPlayersInput.value = nearbyPlayers;
        premiumStatusToggle.checked = false;
        
        // Reset active buttons
        timeButtons.forEach((btn, index) => {
            if (index === 0) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        
        durationButtons.forEach((btn, index) => {
            if (index === 0) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        
        // Update displays
        updateSliders();
        calculateRP();
        
        // Show notification
        showNotification('Kalkulator telah direset ke nilai default', 'info');
    }
    
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => {
            notif.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on type
        let icon = 'fas fa-info-circle';
        if (type === 'success') icon = 'fas fa-check-circle';
        if (type === 'warning') icon = 'fas fa-exclamation-triangle';
        if (type === 'error') icon = 'fas fa-times-circle';
        
        notification.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // Auto-calculate on slider change
    totalPlayersInput.addEventListener('input', calculateRP);
    nearbyPlayersInput.addEventListener('input', calculateRP);
    
    // Initial calculation
    calculateRP();
});