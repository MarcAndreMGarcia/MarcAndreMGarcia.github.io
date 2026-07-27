// Global slideshow function - works via inline onclick as a reliable fallback
window.moveSlide = function(btn, direction) {
    const slideshow = btn.closest('.slideshow');
    if (!slideshow) return;
    const slides = slideshow.querySelectorAll('.slide-img');
    const counter = slideshow.querySelector('.current-slide');
    let currentIndex = 0;
    slides.forEach((slide, i) => {
        if (slide.classList.contains('active')) currentIndex = i;
    });
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    if (counter) counter.textContent = currentIndex + 1;
};

// Smooth scroll animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Active section tracking
    const sections = document.querySelectorAll('section[id], header[id]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in animation
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling to anchor links (only for # links, not mailto: or http:)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default for actual anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // Offset for fixed bottom bar
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Back to top functionality on bottom action bar home button
    const homeButtons = document.querySelectorAll('a[href="#home"]');
    homeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Add scroll progress indicator (optional)
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--highlight), var(--accent));
            width: 0%;
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    createScrollProgress();

    // Log page load completion
    console.log('Portfolio loaded successfully with interactive navigation!');
});
