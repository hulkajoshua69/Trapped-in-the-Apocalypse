// --- Atmospheric Ember & Ash Canvas ---
const canvas = document.getElementById('apocalypseCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * -1 - 0.5; 
        this.speedX = Math.random() * 2 - 1;
        // Blending Burned Copper and Kerosene Amber
        this.color = Math.random() > 0.5 ? 'rgba(179, 138, 81, ' : 'rgba(104, 63, 57, ';
        this.opacity = Math.random() * 0.8 + 0.2;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;

        // Reset particle to bottom when it floats off screen
        if (this.y < 0) {
            this.y = height;
            this.x = Math.random() * width;
        }
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.fill();
        
        // Add a subtle glow to larger particles
        if(this.size > 1.5) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(179, 138, 81, 0.8)';
        } else {
            ctx.shadowBlur = 0;
        }
    }
}

function initParticles() {
    particles = [];
    // Adjust particle count based on screen size for performance
    const count = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// --- Scroll-Triggered Reveals ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
