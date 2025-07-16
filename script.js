// Create background particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Animate cards on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// Parallax effect on particles
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');

        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add glow effect on cursor
function createCursorGlow() {
    document.addEventListener('mousemove', function (e) {
        const cursor = document.querySelector('.cursor-glow');
        if (!cursor) {
            const glowElement = document.createElement('div');
            glowElement.className = 'cursor-glow';
            glowElement.style.position = 'fixed';
            glowElement.style.width = '20px';
            glowElement.style.height = '20px';
            glowElement.style.background = 'radial-gradient(circle, rgba(100, 255, 218, 0.3) 0%, transparent 70%)';
            glowElement.style.borderRadius = '50%';
            glowElement.style.pointerEvents = 'none';
            glowElement.style.zIndex = '9999';
            glowElement.style.transition = 'transform 0.1s ease';
            document.body.appendChild(glowElement);
        }

        const glow = document.querySelector('.cursor-glow');
        glow.style.left = e.clientX - 10 + 'px';
        glow.style.top = e.clientY - 10 + 'px';
    });
}

// Play video when mouse over card
function setupVideoHover() {
    const cards = document.querySelectorAll('.project-card');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Autoplay on mobile
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (!video) return;

                video.muted = true;

                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }, {
            threshold: 0.5
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    } else {
        // Desktop: play on mouseover
        cards.forEach(card => {
            const video = card.querySelector('video');
            if (!video) return;

            video.muted = true;
            let isHovered = false;

            card.addEventListener('mouseenter', () => {
                isHovered = true;
                video.style.opacity = '1';
                video.play();
            });

            card.addEventListener('mouseleave', () => {
                isHovered = false;
                video.style.opacity = '0.5';
                setTimeout(() => {
                    video.pause();
                    video.currentTime = 0;
                    video.style.opacity = '1';
                }, 300);
            });

            video.addEventListener('ended', () => {
                if (isHovered) {
                    video.currentTime = 0;
                    video.play();
                }
            });
        });
    }
}

// Init all
function init() {
    createParticles();
    animateOnScroll();
    parallaxEffect();
    createCursorGlow();
    setupVideoHover();
}

// Launch when page is loaded
document.addEventListener('DOMContentLoaded', init);