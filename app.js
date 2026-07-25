/* ==========================================================================
   ANGGER PORTFOLIO - INTERACTIVE LOGIC & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. PARTICLE CANVAS BACKGROUND
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.5)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 - dist / 800})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // --------------------------------------------------------------------------
  // 2. TYPEWRITER EFFECT FOR HERO SUBTITLE
  // --------------------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Senior Software Engineer',
    'Full-Stack Architect',
    'Creative Technologist',
    'Cloud Systems Developer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at full text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // --------------------------------------------------------------------------
  // 3. STAT COUNTER ANIMATION
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let count = 0;
      const speed = Math.ceil(target / 40);

      const updateCount = () => {
        count += speed;
        if (count >= target) {
          stat.textContent = target;
        } else {
          stat.textContent = count;
          setTimeout(updateCount, 40);
        }
      };
      updateCount();
    });
  }

  // Trigger counters on scroll into hero view
  const heroSection = document.getElementById('hero');
  const observerOptions = { threshold: 0.5 };
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animateCounters();
        animatedStats = true;
      }
    });
  }, observerOptions);
  heroObserver.observe(heroSection);

  // --------------------------------------------------------------------------
  // 4. NAVBAR STICKY & ACTIVE SCROLL OBSERVER
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileToggle.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
    });
  });

  // --------------------------------------------------------------------------
  // 5. THEME SWITCHER LOGIC
  // --------------------------------------------------------------------------
  const themeSelectBtns = document.querySelectorAll('[data-set-theme]');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themes = ['cyber', 'aurora', 'oled', 'matrix'];
  let currentThemeIndex = 0;

  function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    
    themeSelectBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-set-theme') === themeName) {
        btn.classList.add('active');
      }
    });
    showToast(`Theme changed to ${themeName.toUpperCase()}`);
  }

  themeSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-set-theme');
      setTheme(selectedTheme);
    });
  });

  themeToggleBtn.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex]);
  });

  // --------------------------------------------------------------------------
  // 6. SKILL FILTERING & PROJECT FILTERING
  // --------------------------------------------------------------------------
  // Skill Filters
  const skillFilterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Project Filters
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-project-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. PROJECT MODAL POPUP DATA & HANDLER
  // --------------------------------------------------------------------------
  const projectsData = {
    '1': {
      title: 'Nexus Cloud Analytics Dashboard',
      category: 'Full-Stack & Cloud Architecture',
      description: 'An enterprise-grade real-time infrastructure metrics portal designed to process high-throughput server telemetry data. Supports customizable widget layouts, threshold triggers, and real-time alerts via WebSockets.',
      tech: ['Next.js 14', 'TypeScript', 'Node.js', 'Redis', 'WebSockets', 'Chart.js', 'Docker'],
      features: [
        'Sub-100ms real-time metric streaming over WebSockets',
        'Interactive customizable dashboard widgets & historical data playback',
        'Automated alert notification integration via Discord & Slack webhooks',
        'Multi-node Docker orchestration setup'
      ]
    },
    '2': {
      title: 'Aura E-Commerce Engine',
      category: 'Headless E-Commerce Platform',
      description: 'A ultra-fast headless e-commerce application engineered for instant page loads and seamless shopping experiences. Features client-side state caching, optimistic UI updates, and integrated checkout flows.',
      tech: ['React', 'Tailwind CSS', 'Stripe Payments', 'GraphQL API', 'Vite', 'Framer Motion'],
      features: [
        'Faceted instant product filtering & semantic text search',
        'Smooth micro-interactions and shopping cart animations',
        'Stripe Checkout API integration with PCI compliance',
        'Lighthouse performance score of 98+'
      ]
    },
    '3': {
      title: 'Synthetix AI Code Assistant',
      category: 'Developer Productivity & AI Tools',
      description: 'An AI-powered development workflow helper designed to automatically inspect code changes, generate comprehensive unit tests, create API docs, and flag anti-patterns.',
      tech: ['Python 3.11', 'FastAPI', 'OpenAI GPT-4 API', 'Docker', 'React', 'Monaco Editor'],
      features: [
        'Automated test suite generation for Python and JS/TS codebases',
        'In-browser interactive code editor with real-time AI suggestions',
        'AST (Abstract Syntax Tree) parsing for precise contextual prompts',
        'Export generated tests directly into GitHub PR workflows'
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body-content');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <span class="project-type-badge" style="margin-bottom: 12px; display: inline-block;">${data.category}</span>
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 16px;">${data.title}</h2>
      <p style="color: var(--text-muted); margin-bottom: 24px;">${data.description}</p>
      
      <h4 style="font-family: var(--font-heading); margin-bottom: 12px;">Key Highlights:</h4>
      <ul style="list-style: none; padding-left: 0; margin-bottom: 24px; color: var(--text-muted);">
        ${data.features.map(f => `<li style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-check" style="color: var(--primary);"></i> ${f}</li>`).join('')}
      </ul>

      <h4 style="font-family: var(--font-heading); margin-bottom: 12px;">Tech Stack Used:</h4>
      <div class="project-tech-stack" style="margin-bottom: 28px;">
        ${data.tech.map(t => `<span style="background: rgba(0, 242, 254, 0.1); border-color: var(--border-glow); color: var(--primary);">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 16px;">
        <a href="https://github.com/anggerkpp" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">
          <i class="fa-brands fa-github"></i> View Repository
        </a>
        <button onclick="document.getElementById('project-modal').classList.remove('active')" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.9rem;">
          Close
        </button>
      </div>
    `;

    projectModal.classList.add('active');
  }

  document.querySelectorAll('.btn-project-preview, .view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    projectModal.classList.remove('active');
  });

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
    }
  });

  // --------------------------------------------------------------------------
  // 8. CONTACT FORM SIMULATION & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--primary);"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    
    // Simulate sending state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();
      showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    }, 1200);
  });

});
