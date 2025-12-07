// ==========================================
// Mobile Navigation Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'var(--bg-white)';
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // Skills Progress Bar Animation
    // ==========================================
    const skillsSection = document.querySelector('.skills-section');
    
    if (skillsSection) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = document.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress + '%';
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        skillsObserver.observe(skillsSection);
    }

    // ==========================================
    // Project Filter Functionality
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // Contact Form Validation & Submission
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('nameError', 'Name is required');
                isValid = false;
            } else if (name.length < 3) {
                showError('nameError', 'Name must be at least 3 characters');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                showError('subjectError', 'Subject is required');
                isValid = false;
            } else if (subject.length < 5) {
                showError('subjectError', 'Subject must be at least 5 characters');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                submitForm(name, email, subject, message);
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement && errorElement.textContent !== '') {
                    validateField(this);
                }
            });
        });
    }

    // ==========================================
    // Form Helper Functions
    // ==========================================
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateField(field) {
        const fieldId = field.id;
        const fieldValue = field.value.trim();
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (!errorElement) return;
        
        let errorMessage = '';
        
        switch(fieldId) {
            case 'name':
                if (fieldValue === '') {
                    errorMessage = 'Name is required';
                } else if (fieldValue.length < 3) {
                    errorMessage = 'Name must be at least 3 characters';
                }
                break;
            case 'email':
                if (fieldValue === '') {
                    errorMessage = 'Email is required';
                } else if (!isValidEmail(fieldValue)) {
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (fieldValue === '') {
                    errorMessage = 'Subject is required';
                } else if (fieldValue.length < 5) {
                    errorMessage = 'Subject must be at least 5 characters';
                }
                break;
            case 'message':
                if (fieldValue === '') {
                    errorMessage = 'Message is required';
                } else if (fieldValue.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
        }
        
        if (errorMessage) {
            showError(fieldId + 'Error', errorMessage);
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    function submitForm(name, email, subject, message) {
        const formStatus = document.getElementById('formStatus');
        const submitButton = contactForm.querySelector('.btn-submit');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
    }

    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    const revealElements = document.querySelectorAll('.project-card, .service-card, .timeline-item, .cert-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });

    // ==========================================
    // Typing Effect for Hero Title (Optional)
    // ==========================================
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && heroTitle.textContent === 'Your Name') {
        const text = 'Your Name';
        heroTitle.textContent = '';
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < text.length) {
                heroTitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }
        
        setTimeout(typeText, 500);
    }

    // ==========================================
    // Dynamic Year in Footer
    // ==========================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} MyPortfolio. All rights reserved.`;
    }

    // ==========================================
    // Scroll to Top Button (Optional Enhancement)
    // ==========================================
    const scrollTopBtn = createScrollTopButton();
    
    function createScrollTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'scroll-top-btn';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
        
        document.body.appendChild(button);
        return button;
    }

    // ==========================================
    // Console Log Welcome Message
    // ==========================================
    console.log('%c Welcome to My Portfolio! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 20px; padding: 10px;');
    console.log('%c Thanks for visiting! Feel free to explore and get in touch. ', 'color: #667eea; font-size: 14px;');
});

// ==========================================
// Page Load Animation
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
