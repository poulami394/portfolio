// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Mobile Navigation ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close nav when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once revealed
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    root: null,
    threshold: 0.15,
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// --- Contact Form Submission (Mock) ---
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    
    // Animate button
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // Simulate network request
    setTimeout(() => {
        btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
        btn.style.background = '#4facfe';
        btn.style.color = '#fff';
        btn.style.opacity = '1';
        
        // Reset form
        contactForm.reset();

        // Restore button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
});

// --- Dynamic Gradient Glow tracking Mouse ---
const glow1 = document.querySelector('.glow-1');
const glow2 = document.querySelector('.glow-2');

// Animate glow positioning to follow cursor
document.addEventListener('mousemove', (e) => {
    if(!glow1 || !glow2) return;
    
    // Animate the glows directly to the mouse position.
    // purple tracks cursor, blue tracks invert position
    glow1.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 3000, fill: "forwards" });

    glow2.animate({
        left: `${window.innerWidth - e.clientX}px`,
        top: `${window.innerHeight - e.clientY}px`
    }, { duration: 3000, fill: "forwards" });
});

// Intensify neon reflection heavily on click
document.addEventListener('mousedown', () => {
    if(glow1) glow1.classList.add('glow-pulse');
    if(glow2) glow2.classList.add('glow-pulse');
});

document.addEventListener('mouseup', () => {
    if(glow1) glow1.classList.remove('glow-pulse');
    if(glow2) glow2.classList.remove('glow-pulse');
});

// --- Cinematic Hero Particles ---


// --- Certificate Lightbox Modal ---
window.openCert = function(imgSrc, title) {
    const modal = document.getElementById('cert-modal');
    const img   = document.getElementById('cert-modal-img');
    const label = document.getElementById('cert-modal-title');
    if (modal && img && label) {
        img.src     = imgSrc;
        label.textContent = title;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }
};

window.closeCert = function(event) {
    // Only close if clicking directly on the dark backdrop
    if (event.target === document.getElementById('cert-modal')) {
        closeCertBtn();
    }
};

window.closeCertBtn = function() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
};

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertBtn();
});
