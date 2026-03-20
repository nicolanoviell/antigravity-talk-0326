document.addEventListener('DOMContentLoaded', () => {
    // 1. Stardust Particles Generation
    const stardustContainer = document.getElementById('stardust');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random sizes
        const size = Math.random() * 4 + 2;
        
        // Random animation timing
        const duration = Math.random() * 10 + 10; // 10-20s
        const delay = Math.random() * -20; // Start at random point in cycle
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animation = `drift ${duration}s linear infinite ${delay}s`;
        
        stardustContainer.appendChild(particle);
    }

    // 2. Scroll-Triggered Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1 // Trigger at 10% visibility as per guide
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Interactive Icons (Subtle Tilt)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20; // Subtle tilt
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
});
