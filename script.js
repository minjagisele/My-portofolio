document.addEventListener('DOMContentLoaded', () => {
    
    // ========== 1. THÈME CLAIR/SOMBRE ==========
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            
            body.classList.replace(isDark ? 'dark' : 'light', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // ========== 2. NAVBAR SCROLL ==========
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // ========== 3. MENU MOBILE ==========
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ========== 4. ANIMATIONS AU SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .skill-category, .timeline-item, .section-title, .hero-content, .stat-card').forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });
    
    // ========== 5. SMOOTH SCROLL ==========
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
    
    // ========== 6. GRAPHIQUES CHART.JS ==========
    // Graphique d'impact
    const impactCtx = document.getElementById('impactChart')?.getContext('2d');
    if (impactCtx) {
        new Chart(impactCtx, {
            type: 'bar',
            data: {
                labels: ['Pertes récoltes', 'Productivité', 'Tracabilité', 'Accès marchés'],
                datasets: [{
                    label: 'Amélioration (%)',
                    data: [35, 42, 100, 38],
                    backgroundColor: '#2D6A4F',
                    borderRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }
    
    // Graphique des technologies
    const techCtx = document.getElementById('techChart')?.getContext('2d');
    if (techCtx) {
        new Chart(techCtx, {
            type: 'doughnut',
            data: {
                labels: ['Python', 'Flask', 'PostgreSQL', 'JavaScript', 'Docker', 'Reactjs'],
                datasets: [{
                    data: [30, 25, 20, 10, 5, 10],
                    backgroundColor: ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#D4A373'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    }
});