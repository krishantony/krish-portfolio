// ==========================================================================
// KRISH ANTONY PORTFOLIO - SCRIPT & MOUSE ANIMATIONS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Dual Custom Mouse Cursor System (Dot + Smooth Lerp Ring)
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const ambientGlow = document.getElementById('ambientCursorGlow');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Direct Dot positioning
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            if (ambientGlow) {
                ambientGlow.style.left = `${mouseX}px`;
                ambientGlow.style.top = `${mouseY}px`;
            }
        });

        // Smooth Lerp Animation Loop for Cursor Ring
        function renderCursorRing() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(renderCursorRing);
        }
        requestAnimationFrame(renderCursorRing);

        // Hover expansions for links, buttons, cards, and interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .card-spotlight, .skill-card-clean, .project-card-clean, .floating-chip, .check-pill, input, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });
    }

    // 2. Interactive Spotlight on Cards (Follows Cursor)
    const spotlightCards = document.querySelectorAll('.card-spotlight, .skill-card-clean, .project-card-clean, .contact-info-panel, .contact-form-panel');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3. Floating Background Code Glyphs Generator
    function createFloatingGlyphs() {
        const symbols = ['{ }', '</>', 'C', 'Python', 'Java', 'HTML', '=>', 'div', ';', 'return'];
        const container = document.body;

        for (let i = 0; i < 8; i++) {
            const glyph = document.createElement('div');
            glyph.className = 'floating-code-symbol';
            glyph.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            glyph.style.left = `${Math.random() * 95}vw`;
            glyph.style.animationDuration = `${14 + Math.random() * 10}s`;
            glyph.style.animationDelay = `${Math.random() * 8}s`;
            glyph.style.fontSize = `${14 + Math.random() * 8}px`;
            container.appendChild(glyph);
        }
    }
    createFloatingGlyphs();

    // 4. Scroll Progress Line & Active Navbar Link Spy
    const scrollLine = document.getElementById('scrollProgressLine');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item-link');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / docHeight) * 100;

        if (scrollLine) {
            scrollLine.style.width = `${progress}%`;
        }

        if (scrollTop > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Section Detection
        let currentId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 140;
            const height = sec.offsetHeight;
            if (scrollTop >= top && scrollTop < top + height) {
                currentId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navLinksWrap = document.getElementById('navLinksWrap');

    if (mobileToggle && navLinksWrap) {
        mobileToggle.addEventListener('click', () => {
            navLinksWrap.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navLinksWrap.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksWrap.classList.remove('open');
                mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // 6. Multi-Role Dynamic Typewriter for Krish Antony
    const typewriterElement = document.getElementById('typewriterDynamic');
    const developerRoles = [
        'Web Development',
        'Coding & Logic',
        'Web Designing',
        'Creative Projects',
        'Problem Solving'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function runTypewriter() {
        if (!typewriterElement) return;

        const activeRole = developerRoles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = activeRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = activeRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 90;

        if (!isDeleting && charIndex === activeRole.length) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % developerRoles.length;
            speed = 350;
        }

        setTimeout(runTypewriter, speed);
    }

    runTypewriter();

    // 7. Scroll Reveal Observer & Skill Meter Animation
    const revealItems = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Animate skill meter fill bars
                const meterBars = entry.target.querySelectorAll('.skill-bar-fill');
                meterBars.forEach(bar => {
                    const pct = bar.getAttribute('data-percent') || '85%';
                    bar.style.width = pct;
                });

                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(el => observer.observe(el));

    // 8. Dark / Light Theme Switcher
    const themeBtn = document.getElementById('themeSwitchBtn');
    const savedTheme = localStorage.getItem('user-theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const active = document.documentElement.getAttribute('data-theme');
            const target = active === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('user-theme', target);
            updateThemeIcon(target);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }

    // 9. Interactive Contact Form with Toast Popup
    const form = document.getElementById('contactFormStandard');
    const toast = document.getElementById('toastMsgBox');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('🚀 Message sent successfully! Thank you for reaching out.');
            form.reset();
        });
    }

    function showToast(msg) {
        if (!toast) return;
        toast.querySelector('.toast-inner-text').textContent = msg;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }
});
