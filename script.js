// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(17, 17, 17, 0.95)';
        } else {
            navbar.style.background = 'transparent';
        }
    }
});

// Terminal typing animation for home page
const terminalCommands = [
    'nmap -sS -O target.domain.com',
    'sqlmap -u "http://target.com" --dbs',
    'msfconsole -q',
    'use exploit/multi/handler',
    'set payload windows/x64/meterpreter/reverse_tcp',
    'exploit -j',
    'sessions -l',
    'use post/windows/gather/hashdump'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeCommand() {
    const commandElement = document.querySelector('.typing-animation');
    if (!commandElement) return;
    
    const currentCommand = terminalCommands[commandIndex];
    
    if (isDeleting) {
        commandElement.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;
    } else {
        commandElement.textContent = currentCommand.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentCommand.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 3000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % terminalCommands.length;
    }
    
    const typingSpeed = isDeleting ? 30 : 80;
    setTimeout(typeCommand, typingSpeed);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stats-grid') || entry.target.classList.contains('stats-overview')) {
                animateCounters();
            }
            
            // Trigger statistics animation
            if (entry.target.classList.contains('statistics-section')) {
                animateStatistics();
            }
        }
    });
}, observerOptions);

// Form submission handling
function handleFormSubmission() {
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = this.querySelector('#firstName').value;
            const lastName = this.querySelector('#lastName').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value;
            const privacy = this.querySelector('#privacy').checked;
            
            // Simple validation
            if (!firstName || !lastName || !email || !subject || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!privacy) {
                alert('Please agree to the privacy policy');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully! We\'ll get back to you soon.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// FAQ Toggle functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-question i');
                otherAnswer.style.maxHeight = '0px';
                otherIcon.style.transform = 'rotate(0deg)';
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
        
        // Initialize closed state
        answer.style.maxHeight = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        icon.style.transition = 'transform 0.3s ease';
    });
}

// Page load animations
function initializePageAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll(
        '.nav-card, .service-card, .value-item, .award-card, .project-card, ' +
        '.team-member, .leader-card, .contact-card, .timeline-item, .stat-card, .achievement-box, .feature-achievement-box, .compact-achievement-box'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Observe stats grids for counter animation
    const statsGrids = document.querySelectorAll('.stats-grid, .stats-overview, .statistics-section');
    statsGrids.forEach(grid => observer.observe(grid));
}

// Statistics counter animation
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.statistics-section .stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.getAttribute('data-target');
        
        // Skip animation if no data-target attribute (static values)
        if (!target) {
            return;
        }
        
        const targetNum = parseInt(target);
        const increment = targetNum / 100;
        let current = 0;
        
        const updateStat = () => {
            if (current < targetNum) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateStat, 30);
            } else {
                stat.textContent = targetNum;
            }
        };
        
        updateStat();
    });
}

// Glitch effect for hero title
function initializeGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        setInterval(() => {
            glitchElement.style.animation = 'none';
            setTimeout(() => {
                glitchElement.style.animation = 'glitch 2s infinite';
            }, 100);
        }, 5000);
    }
}

// Cyber sphere animation for about page
function initializeCyberSphere() {
    const cyberSphere = document.querySelector('.cyber-sphere');
    if (cyberSphere) {
        const orbits = cyberSphere.querySelectorAll('.orbit');
        orbits.forEach((orbit, index) => {
            orbit.style.animation = `rotate ${3 + index}s linear infinite`;
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start terminal animation for home page
    setTimeout(typeCommand, 1000);
    
    // Initialize form handling
    handleFormSubmission();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize page animations
    initializePageAnimations();
    
    // Initialize glitch effect
    initializeGlitchEffect();
    
    // Initialize cyber sphere
    initializeCyberSphere();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Initialize collaborators slider
    setTimeout(() => {
        initializeCollaboratorsSlider();
    }, 1000);
    
    // Initialize gallery functionality
    initializeGallery();
});

// Collaborators Slider Functionality
let currentSlideIndex = 0;
let autoSlideInterval;

function initializeCollaboratorsSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;
    
    // Clone cards for infinite scroll effect
    const cards = Array.from(document.querySelectorAll('.collaborator-card'));
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        sliderContainer.appendChild(clone);
    });
    
    startAutoSlide();
    
    // Pause on hover
    const sliderSection = document.querySelector('.collaborators-slider');
    if (sliderSection) {
        sliderSection.addEventListener('mouseenter', stopAutoSlide);
        sliderSection.addEventListener('mouseleave', startAutoSlide);
    }
}

function slideCollaborators(direction) {
    const sliderContainer = document.querySelector('.slider-container');
    const totalCards = document.querySelectorAll('.collaborator-card').length / 2; // Divided by 2 because we cloned
    
    if (direction === 'next') {
        currentSlideIndex = currentSlideIndex >= 2 ? 0 : currentSlideIndex + 1;
    } else {
        currentSlideIndex = currentSlideIndex <= 0 ? 2 : currentSlideIndex - 1;
    }
    
    updateSliderPosition();
    updateDots();
}

function currentSlide(slideIndex) {
    currentSlideIndex = slideIndex - 1;
    updateSliderPosition();
    updateDots();
}

function updateSliderPosition() {
    const sliderContainer = document.querySelector('.slider-container');
    const cardWidth = 320; // Card width + gap
    const translateX = -currentSlideIndex * cardWidth * 2;
    sliderContainer.style.transform = `translateX(${translateX}px)`;
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

// Auto-slide functionality
let slidePosition = 0;

function autoSlide() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;
    
    slidePosition -= 1; // Move 1px left
    
    const cardWidth = 320;
    const totalWidth = cardWidth * 6; // 6 cards total (3 original + 3 cloned)
    
    // Reset when halfway through (after original cards)
    if (Math.abs(slidePosition) >= totalWidth / 2) {
        slidePosition = 0;
    }
    
    sliderContainer.style.transform = `translateX(${slidePosition}px)`;
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    autoSlideInterval = setInterval(autoSlide, 50); // Smooth 20fps animation
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Add CSS for rotating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .loaded .hero-main > * {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .orbit {
        position: absolute;
        border: 1px solid rgba(255, 107, 53, 0.2);
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .orbit-1 {
        width: 100px;
        height: 100px;
    }
    
    .orbit-2 {
        width: 150px;
        height: 150px;
    }
    
    .orbit-3 {
        width: 200px;
        height: 200px;
    }
    
    .satellite {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        color: #ff6b35;
        font-size: 1.2rem;
    }
    
    .sphere-core {
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, #ff6b35, #f7931e);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
    }
    
    /* Image Modal Styles */
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        text-align: center;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    }
    
    .modal-content h3 {
        color: #ff6b35;
        margin-top: 15px;
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: #fff;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 107, 53, 0.2);
        color: #ff6b35;
    }
`;
document.head.appendChild(style);

// Gallery Functionality
function initializeGallery() {
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Gallery Action Buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    const expandButtons = document.querySelectorAll('.expand-btn');

    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const galleryCard = button.closest('.gallery-card');
            const img = galleryCard.querySelector('img');
            
            // Open image in new tab
            window.open(img.src, '_blank');
        });
    });

    expandButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const galleryCard = button.closest('.gallery-card');
            const img = galleryCard.querySelector('img');
            const title = img.alt || 'Gallery Image'; // Use alt text as title
            
            // Create fullscreen modal
            createImageModal(img.src, title);
        });
    });
}

// Create Image Modal Function
function createImageModal(imageSrc, title) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${imageSrc}" alt="${title}">
                <h3>${title}</h3>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}
