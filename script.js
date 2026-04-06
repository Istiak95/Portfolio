// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Theme toggle button listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Update icon
        themeToggle.innerHTML = isDarkMode ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    });
}

// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL OFFSET FOR FIXED NAVBAR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SCROLL ANIMATION FOR ELEMENTS WITH STAGGER ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const delay = index * 100;
            entry.target.style.animationDelay = delay + 'ms';
            
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
            } else if (entry.target.classList.contains('project-card')) {
                entry.target.style.animation = 'slideInRight 0.6s ease forwards';
            } else if (entry.target.classList.contains('education-item')) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            } else if (entry.target.classList.contains('contact-card')) {
                entry.target.style.animation = 'zoomIn 0.6s ease forwards';
            } else {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and skill items
document.querySelectorAll('.skill-card, .project-card, .education-item, .contact-card, .btn').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== SECTION HEADING ANIMATIONS ====================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const heading = entry.target.querySelector('h2');
            if (heading) {
                heading.style.animation = 'slideInDown 0.8s ease forwards';
            }
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--primary-color)';
            item.style.fontWeight = '700';
        }
    });

    // Dynamic background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
        navbar.style.backgroundColor = 'var(--bg-white)';
        navbar.style.backdropFilter = 'none';
    }
});

// ==================== ENHANCED CARD HOVER EFFECTS ====================
document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// ==================== INTERACTIVE BUTTONS ====================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6f46ff, #00d4ff);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(111, 70, 255, 0.4);
        transition: all 0.3s;
        z-index: 999;
    `;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 25px rgba(111, 70, 255, 0.5)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(111, 70, 255, 0.4)';
    });

    document.body.appendChild(button);
};

createScrollToTopButton();

// ==================== TYPING EFFECT (Optional) ====================
const typeWriterEffect = (element, text, speed = 50) => {
    let index = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// ==================== PERFORMANCE: LAZY LOAD EXTERNAL RESOURCES ====================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imgObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imgObserver.observe(img));
}

// ==================== FORM SUBMISSION (if contact form is added) ====================
const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const mailtoLink = `mailto:istiakabedin614@gmail.com?subject=${encodeURIComponent(data.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;

    window.location.href = mailtoLink;
};

// ==================== DYNAMIC COLOR THEME BASED ON SCROLL ====================
function getScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return window.scrollY / windowHeight;
}

console.log('Portfolio website loaded successfully!');
