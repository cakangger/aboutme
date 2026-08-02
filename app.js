/* ==========================================================================
   ANGGER KARTYASA PRIBADI PUTRA - PORTFOLIO LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. GOOGLE ANTIGRAVITY-GRADE DYNAMIC CANVAS & COSMIC PARTICLE SYSTEM
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track Mouse Cursor with Smooth Inertia
  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    radius: 180,
    active: false
  };

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Google Antigravity Color Palette
  const colors = [
    { r: 0, g: 242, b: 254 },   // Electric Cyan
    { r: 157, g: 78, b: 221 },  // Neon Purple
    { r: 16, g: 185, b: 129 },  // Emerald Mint
    { r: 251, g: 188, b: 4 }    // Solar Gold
  ];

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 10), 95);

  class GoogleAntigravityParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 30;
      
      // Upward Anti-Gravity Drift
      this.vy = -(Math.random() * 0.65 + 0.25);
      this.vx = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 2.4 + 1.1;
      
      // Select Color from Antigravity Palette
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.baseAlpha = Math.random() * 0.45 + 0.3;
      this.alpha = this.baseAlpha;
      
      // Zero-Gravity Oscillation
      this.angleX = Math.random() * Math.PI * 2;
      this.angleY = Math.random() * Math.PI * 2;
      this.speedX = (Math.random() - 0.5) * 0.02;
      this.speedY = (Math.random() - 0.5) * 0.015;
    }

    update() {
      // Oscillating Fluid Motion
      this.angleX += this.speedX;
      this.angleY += this.speedY;
      
      this.x += this.vx + Math.sin(this.angleX) * 0.45;
      this.y += this.vy + Math.cos(this.angleY) * 0.2;

      // Mouse Inertia Force Field
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const fx = (dx / dist) * force * 5;
          const fy = (dy / dist) * force * 5;

          this.x -= fx;
          this.y -= fy;
          this.alpha = Math.min(1, this.baseAlpha + 0.4);
        } else {
          this.alpha = this.baseAlpha;
        }
      }

      // Respawn at bottom when floating above screen
      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
      ctx.shadowBlur = 14;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.7)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new GoogleAntigravityParticle());
  }

  // Floating Ambient 3-Orb Cosmic Mesh
  let orbTime = 0;

  function drawCosmicAmbientOrbs() {
    orbTime += 0.004;

    // Orb 1: Electric Cyan
    const orb1X = width * 0.25 + Math.sin(orbTime) * 110;
    const orb1Y = height * 0.35 + Math.cos(orbTime * 0.8) * 80;
    const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 400);
    grad1.addColorStop(0, 'rgba(0, 242, 254, 0.09)');
    grad1.addColorStop(1, 'rgba(0, 242, 254, 0)');

    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.arc(orb1X, orb1Y, 400, 0, Math.PI * 2);
    ctx.fill();

    // Orb 2: Deep Purple
    const orb2X = width * 0.75 - Math.cos(orbTime * 0.7) * 120;
    const orb2Y = height * 0.65 + Math.sin(orbTime * 1.1) * 90;
    const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 450);
    grad2.addColorStop(0, 'rgba(157, 78, 221, 0.08)');
    grad2.addColorStop(1, 'rgba(157, 78, 221, 0)');

    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(orb2X, orb2Y, 450, 0, Math.PI * 2);
    ctx.fill();

    // Orb 3: Emerald Glow
    const orb3X = width * 0.5 + Math.cos(orbTime * 0.9) * 90;
    const orb3Y = height * 0.2 + Math.sin(orbTime * 0.6) * 70;
    const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 320);
    grad3.addColorStop(0, 'rgba(16, 185, 129, 0.06)');
    grad3.addColorStop(1, 'rgba(16, 185, 129, 0)');

    ctx.fillStyle = grad3;
    ctx.beginPath();
    ctx.arc(orb3X, orb3Y, 320, 0, Math.PI * 2);
    ctx.fill();
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Smooth Mouse Interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    // Render Cosmic Ambient Orbs
    drawCosmicAmbientOrbs();

    // Render Antigravity Particle Field & Constellations
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${0.16 - dist / 850})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Magnetic Line Connection to Cursor
      if (mouse.active) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${0.28 - mdist / 530})`;
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
    'Samsung Knox Solution Specialist',
    'Samsung R&D Institute Indonesia',
    'Android Enterprise Certified Expert',
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
  // 8. CONTACT FORM TELEGRAM BOT AUTOMATION & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');

  // Telegram Bot Credentials
  const TELEGRAM_CONFIG = {
    botToken: '8979652334:AAHoVk8hDeobG3zOVhCzxiQ0Bo3vXkmoujg',
    chatId: '166403797'
  };

  function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = isError ? 'fa-circle-xmark' : 'fa-circle-check';
    const color = isError ? '#ff4d4d' : 'var(--primary)';
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: ${color};"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  async function sendTelegramNotification(name, email, subject, message) {
    if (!TELEGRAM_CONFIG.botToken || TELEGRAM_CONFIG.botToken === 'YOUR_TELEGRAM_BOT_TOKEN') {
      console.log('Telegram Bot Token not configured yet. Form input captured locally.');
      return true;
    }

    const text = `<b>📩 New Portfolio Contact Inquiry!</b>\n\n` +
                 `<b>👤 Name:</b> ${escapeHtml(name)}\n` +
                 `<b>✉️ Email:</b> ${escapeHtml(email)}\n` +
                 `<b>📋 Subject:</b> ${escapeHtml(subject)}\n\n` +
                 `<b>💬 Message:</b>\n${escapeHtml(message)}\n\n` +
                 `<i>🌐 Sent from about.cakangger.online</i>`;

    const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.chatId,
          text: text,
          parse_mode: 'HTML'
        })
      });
      const data = await response.json();
      return data.ok;
    } catch (error) {
      console.error('Telegram notification error:', error);
      return false;
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Notification...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

      const success = await sendTelegramNotification(name, email, subject, message);

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();

      if (success) {
        showToast(`Thank you, ${name}! Your message has been sent to Angger.`);
      } else {
        showToast(`Thank you, ${name}! Your message has been received.`);
      }
    });
  }

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

  // --------------------------------------------------------------------------
  // 11. HTML5 BACKGROUND MUSIC (BGM) PLAYER LOGIC & MINIMIZE CONTROLS
  // --------------------------------------------------------------------------
  const bgmAudio = document.getElementById('bgm-audio');
  const bgmPlayBtn = document.getElementById('bgm-play-btn');
  const bgmPlayIcon = document.getElementById('bgm-play-icon');
  const bgmStatusText = document.getElementById('bgm-status-text');
  const vuSoundMeter = document.getElementById('vu-sound-meter');
  const bgmPlayerWidget = document.getElementById('bgm-player-widget');
  const bgmMinimizeBtn = document.getElementById('bgm-minimize-btn');

  // Minimize / Expand Widget Handler
  if (bgmMinimizeBtn && bgmPlayerWidget) {
    bgmMinimizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      bgmPlayerWidget.classList.toggle('minimized');
    });
  }

  function playUnmutedAudio() {
    if (!bgmAudio) return;
    bgmAudio.muted = false;
    bgmAudio.volume = 0.5;
    bgmAudio.play().then(() => {
      updateAudioUI(true);
    }).catch(err => {
      console.log("Unmuted autoplay restricted by browser policy:", err);
    });
  }

  function toggleAudio() {
    if (!bgmAudio) return;
    if (bgmAudio.paused) {
      playUnmutedAudio();
    } else {
      bgmAudio.pause();
      updateAudioUI(false);
    }
  }

  function updateAudioUI(playing) {
    if (playing) {
      if (bgmPlayIcon) bgmPlayIcon.className = "fa-solid fa-pause";
      if (bgmStatusText) bgmStatusText.textContent = "Playing 🎵";
      if (vuSoundMeter) vuSoundMeter.classList.add('active');
    } else {
      if (bgmPlayIcon) bgmPlayIcon.className = "fa-solid fa-play";
      if (bgmStatusText) bgmStatusText.textContent = "Paused";
      if (vuSoundMeter) vuSoundMeter.classList.remove('active');
    }
  }

  if (bgmPlayBtn) {
    bgmPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudio();
    });
  }

  // Play unmuted music immediately on script execution
  if (bgmAudio) {
    playUnmutedAudio();
  }

  // Triggers unmuted playback on any initial movement / touch / click / scroll
  const forceUnmutedOnActivity = () => {
    if (bgmAudio && bgmAudio.paused) {
      playUnmutedAudio();
    }
  };

  ['click', 'keydown', 'touchstart', 'scroll', 'mousemove'].forEach(evt => {
    document.addEventListener(evt, forceUnmutedOnActivity, { passive: true });
  });

});
