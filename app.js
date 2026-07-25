/* ==========================================================================
   ANGGER KARTYASA PRIBADI PUTRA - PORTFOLIO LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. ANTI-GRAVITY DYNAMIC CANVAS & PARTICLE FIELD
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track Mouse Cursor for Anti-Gravity Force Field
  const mouse = {
    x: null,
    y: null,
    radius: 160
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 12), 85);

  class AntiGravityParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 20;
      // Zero-Gravity Upward Drift
      this.vy = -(Math.random() * 0.7 + 0.3);
      this.vx = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2.2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.3;
      this.alpha = this.baseAlpha;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      // Gentle sine-wave horizontal drift (Zero-Gravity floating)
      this.angle += this.angularSpeed;
      this.x += this.vx + Math.sin(this.angle) * 0.35;
      this.y += this.vy;

      // Anti-Gravity Repulsion Force Field near mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 4;
          const directionY = forceDirectionY * force * 4;

          this.x -= directionX;
          this.y -= directionY;
          this.alpha = Math.min(1, this.baseAlpha + 0.4);
        } else {
          this.alpha = this.baseAlpha;
        }
      }

      // Respawn at bottom when floating out of top screen
      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new AntiGravityParticle());
  }

  // Floating Ambient Zero-Gravity Orbs
  let orbAngle = 0;

  function drawAmbientOrbs() {
    orbAngle += 0.005;
    
    // Primary Orb
    const orb1X = width * 0.2 + Math.sin(orbAngle) * 80;
    const orb1Y = height * 0.3 + Math.cos(orbAngle * 0.8) * 60;
    const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 350);
    grad1.addColorStop(0, 'rgba(0, 242, 254, 0.08)');
    grad1.addColorStop(1, 'rgba(0, 242, 254, 0)');

    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.arc(orb1X, orb1Y, 350, 0, Math.PI * 2);
    ctx.fill();

    // Secondary Orb
    const orb2X = width * 0.8 - Math.cos(orbAngle * 0.7) * 90;
    const orb2Y = height * 0.6 + Math.sin(orbAngle * 1.1) * 70;
    const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 400);
    grad2.addColorStop(0, 'rgba(157, 78, 221, 0.07)');
    grad2.addColorStop(1, 'rgba(157, 78, 221, 0)');

    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(orb2X, orb2Y, 400, 0, Math.PI * 2);
    ctx.fill();
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Draw ambient zero-gravity background glow
    drawAmbientOrbs();

    // Update & draw anti-gravity particle node field
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect Anti-Gravity Constellation Lines
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.18 - dist / 720})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Magnetic line to cursor if nearby
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.25 - mdist / 560})`;
          ctx.lineWidth = 1;
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
    'B2B Enterprise Technical Solution',
    'Samsung R&D Institute Indonesia',
    'Security & Systems Engineer',
    'Microsoft Azure & Intune Specialist'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at full text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
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
  // 6. SKILL FILTERING
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 7. PROJECT MODAL DATA & HANDLER
  // --------------------------------------------------------------------------
  const projectsData = {
    '1': {
      title: 'Samsung & Microsoft Intune Enterprise MDM',
      category: 'B2B Mobility & Device Security',
      description: 'End-to-end B2B mobile device management solution combining Samsung Knox suite policies with Microsoft Intune cloud architecture to secure corporate mobile fleets.',
      tech: ['Samsung Knox Suite', 'Microsoft Intune', 'Android Enterprise', 'Azure AD / Entra ID', 'Conditional Access'],
      features: [
        'Automated device enrollment & zero-touch enterprise deployment',
        'Granular compliance policy enforcement & remote device wipes',
        'Secure app containerization for corporate data isolation',
        'Integration with Azure Active Directory identity management'
      ]
    },
    '2': {
      title: 'Azure Sentinel & Defender SIEM Operations',
      category: 'Enterprise Cloud Security',
      description: 'Centralized Security Operations Center (SOC) threat detection and incident response pipeline engineered around Microsoft Sentinel and Azure Defender.',
      tech: ['Azure Sentinel SIEM', 'Microsoft Defender for Endpoint', 'Azure Security Center', 'KQL (Kusto Query)', 'Log Analytics'],
      features: [
        'Real-time security log ingestion & anomaly threat detection',
        'Custom KQL query playbooks for threat hunting and incident classification',
        'Automated alert routing for potential compromise indicators',
        'Security posture compliance reporting across enterprise workloads'
      ]
    },
    '3': {
      title: 'Hybrid Messaging & Windows Server Infrastructure',
      category: 'Enterprise Infrastructure & Messaging',
      description: 'Resilient hybrid messaging deployment supporting Microsoft Exchange Server, Exchange Online, ADFS authentication, and core Active Directory services.',
      tech: ['Windows Server (2012-2022)', 'Active Directory & ADFS', 'Exchange Online / O365', 'DNS / DHCP / WSUS', 'Microsoft Intune'],
      features: [
        'High-availability mailflow architecture & failover redundancy strategies',
        'Active Directory Domain Services & ADFS Single-Sign-On deployment',
        'Tier 2 & Tier 3 incident resolution and operational support',
        'WSUS update management and ADCS certificate services'
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
      
      <h4 style="font-family: var(--font-heading); margin-bottom: 12px;">Key Architectural Highlights:</h4>
      <ul style="list-style: none; padding-left: 0; margin-bottom: 24px; color: var(--text-muted);">
        ${data.features.map(f => `<li style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-shield-halved" style="color: var(--primary);"></i> ${f}</li>`).join('')}
      </ul>

      <h4 style="font-family: var(--font-heading); margin-bottom: 12px;">Enterprise Tech Stack:</h4>
      <div class="project-tech-stack" style="margin-bottom: 28px;">
        ${data.tech.map(t => `<span style="background: rgba(0, 242, 254, 0.1); border-color: var(--border-glow); color: var(--primary);">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 16px;">
        <a href="https://www.linkedin.com/in/anggerkpp/" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">
          <i class="fa-brands fa-linkedin"></i> Connect on LinkedIn
        </a>
        <button onclick="document.getElementById('project-modal').classList.remove('active')" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.9rem;">
          Close
        </button>
      </div>
    `;

    projectModal.classList.add('active');
  }

  document.querySelectorAll('.btn-project-preview, .view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
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
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();
      showToast(`Thank you, ${name}! Your message has been sent to Angger.`);
    }, 1200);
  });

  // --------------------------------------------------------------------------
  // 9. RECENT ACTIVITIES SWIPER SLIDER
  // --------------------------------------------------------------------------
  if (typeof Swiper !== 'undefined') {
    const activitiesSwiper = new Swiper('.activities-swiper-container', {
      slidesPerView: 1,
      spaceBetween: 28,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.activity-swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.activity-swiper-next',
        prevEl: '.activity-swiper-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. DYNAMIC SCROLL ZOOM & REVEAL OBSERVER
  // --------------------------------------------------------------------------
  const zoomElements = document.querySelectorAll('.scroll-zoom-in, .scroll-zoom-out');

  const scrollZoomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  zoomElements.forEach(el => scrollZoomObserver.observe(el));

  // Dynamic Parallax Zoom Scaling on Scroll
  const heroVisual = document.querySelector('.hero-visual');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroVisual && scrollY < 700) {
      heroVisual.style.transform = `scale(${1 - scrollY * 0.00025}) translateY(${scrollY * 0.08}px)`;
    }
  });

});
