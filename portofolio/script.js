/**
 * COSMIC PORTFOLIO JAVASCRIPT
 * Features:
 * 1. Interactive 3D Space Canvas (Twinkling Stars, Parallax, Meteors/Shooting Stars)
 * 2. Typewriter Effect with Rotating Titles
 * 3. Floating Navbar Scrollspy & Mobile Navigation
 * 4. Education & Experience Timeline Switcher
 * 5. Web Audio API Cosmic Sound Synthesizer (Zero external dependencies)
 * 6. Contact Transmission Form Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set current year in footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Initialize all features
  initStarfieldCanvas();
  initTypewriter();
  initNavbarScroll();
  initTimelineTabs();
  initContactForm();
  initCosmicAudio();
});


/* ==========================================================================
   1. INTERACTIVE STARFIELD & METEOR CANVAS
   ========================================================================== */
function initStarfieldCanvas() {
  const canvas = document.getElementById('spaceCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = width / 2;
  let targetMouseY = height / 2;

  // Star parameters
  const starCount = Math.min(220, Math.floor((width * height) / 5000));
  const stars = [];

  // Star color palette (Space theme: whites, icy cyans, faint purples)
  const starColors = ['#ffffff', '#e0f2fe', '#bae6fd', '#38bdf8', '#c084fc', '#e9d5ff'];

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = (Math.random() - 0.5) * width * 2;
      this.y = (Math.random() - 0.5) * height * 2;
      this.z = Math.random() * width; // Depth
      this.size = Math.random() * 1.8 + 0.4;
      this.color = starColors[Math.floor(Math.random() * starColors.length)];
      this.alpha = Math.random() * 0.7 + 0.3;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleFactor = Math.random() * Math.PI;
    }

    update() {
      // Gentle forward drift
      this.z -= 0.35;
      if (this.z <= 0) {
        this.reset();
        this.z = width;
      }
      this.twinkleFactor += this.twinkleSpeed;
    }

    draw() {
      // Perspective projection
      const k = 250 / this.z;
      const px = this.x * k + width / 2 + (mouseX - width / 2) * 0.04 * (1 - this.z / width);
      const py = this.y * k + height / 2 + (mouseY - height / 2) * 0.04 * (1 - this.z / width);

      if (px < 0 || px >= width || py < 0 || py >= height) return;

      const currentSize = Math.max(0.3, this.size * k * 0.8);
      const currentAlpha = Math.max(0.15, this.alpha + Math.sin(this.twinkleFactor) * 0.25);

      ctx.save();
      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(px, py, currentSize, 0, Math.PI * 2);
      ctx.fill();

      // Subtle glow for larger stars
      if (this.size > 1.2 && k > 0.8) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // Shooting Stars (Meteors)
  const meteors = [];

  class Meteor {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width * 1.2;
      this.y = Math.random() * (height * 0.4);
      this.length = Math.random() * 100 + 60;
      this.speed = Math.random() * 9 + 6;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // ~45 deg
      this.dx = Math.cos(this.angle) * this.speed;
      this.dy = Math.sin(this.angle) * this.speed;
      this.opacity = 1;
      this.active = false;
    }

    trigger() {
      this.reset();
      this.active = true;
    }

    update() {
      if (!this.active) return;
      this.x += this.dx;
      this.y += this.dy;
      this.opacity -= 0.012;

      if (this.opacity <= 0 || this.x > width + 100 || this.y > height + 100) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active || this.opacity <= 0) return;

      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const gradient = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
      gradient.addColorStop(0.7, `rgba(56, 189, 248, ${this.opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);

      ctx.save();
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();

      // Bright head point
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate stars & meteors
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  for (let i = 0; i < 3; i++) {
    meteors.push(new Meteor());
  }

  // Periodically fire meteors
  setInterval(() => {
    const inactiveMeteor = meteors.find((m) => !m.active);
    if (inactiveMeteor && Math.random() > 0.3) {
      inactiveMeteor.trigger();
    }
  }, 2400);

  // Mouse interaction
  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Animation Loop
  function render() {
    // Smooth mouse lerp
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Update & draw stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }

    // Update & draw meteors
    for (let i = 0; i < meteors.length; i++) {
      meteors[i].update();
      meteors[i].draw();
    }

    requestAnimationFrame(render);
  }

  render();
}


/* ==========================================================================
   2. TYPEWRITER EFFECT (Teks Mengetik Sendiri Bergantian)
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Junior Web Developer',
    'Frontend Specialist',
    'React & Tailwind Enthusiast',
    'Full-Stack Explorer',
    'Creative UI/UX Builder',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const delayBetweenWords = 1600;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      currentSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      currentSpeed = 350; // Pause before next word
    }

    setTimeout(type, currentSpeed);
  }

  type();
}


/* ==========================================================================
   3. FLOATING NAVBAR (Scroll Effect, Scrollspy & Mobile Menu)
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('floatingNavbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Change navbar styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.querySelector('nav').classList.add('navbar-scrolled');
    } else {
      navbar.querySelector('nav').classList.remove('navbar-scrolled');
    }

    // Scrollspy active state
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active-nav');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (typeof lucide !== 'undefined') {
          mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
          lucide.createIcons();
        }
      } else {
        mobileMenu.classList.add('hidden');
        if (typeof lucide !== 'undefined') {
          mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
          lucide.createIcons();
        }
      }
    });

    // Close mobile menu on link click
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (typeof lucide !== 'undefined') {
          mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
          lucide.createIcons();
        }
      });
    });
  }
}


/* ==========================================================================
   4. EDUCATION & EXPERIENCE TAB SWITCHER
   ========================================================================== */
function initTimelineTabs() {
  const tabEduBtn = document.getElementById('tabEduBtn');
  const tabExpBtn = document.getElementById('tabExpBtn');
  const eduTimeline = document.getElementById('educationTimeline');
  const expTimeline = document.getElementById('experienceTimeline');

  if (!tabEduBtn || !tabExpBtn || !eduTimeline || !expTimeline) return;

  tabEduBtn.addEventListener('click', () => {
    // Show Education, Hide Experience
    tabEduBtn.classList.add('active-tab', 'text-white');
    tabEduBtn.classList.remove('text-slate-400');

    tabExpBtn.classList.remove('active-tab', 'text-white');
    tabExpBtn.classList.add('text-slate-400');

    eduTimeline.classList.remove('hidden');
    expTimeline.classList.add('hidden');

    playCosmicBeep(440, 'triangle');
  });

  tabExpBtn.addEventListener('click', () => {
    // Show Experience, Hide Education
    tabExpBtn.classList.add('active-tab', 'text-white');
    tabExpBtn.classList.remove('text-slate-400');

    tabEduBtn.classList.remove('active-tab', 'text-white');
    tabEduBtn.classList.add('text-slate-400');

    expTimeline.classList.remove('hidden');
    eduTimeline.classList.add('hidden');

    playCosmicBeep(560, 'sine');
  });
}


/* ==========================================================================
   5. CONTACT FORM TRANSMISSION INTERACTION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const formAlert = document.getElementById('formAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Visual button feedback
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    submitBtnText.textContent = 'Mentransmisikan sinyal...';
    playCosmicBeep(720, 'sine');

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      submitBtnText.textContent = 'Transmisi Terkirim!';

      if (formAlert) {
        formAlert.classList.remove('hidden');
      }

      playCosmicBeep(880, 'triangle');

      // Reset form
      form.reset();

      setTimeout(() => {
        submitBtnText.textContent = 'Kirim Transmisi Sekarang';
        if (formAlert) {
          formAlert.classList.add('hidden');
        }
      }, 5000);
    }, 1200);
  });
}


/* ==========================================================================
   6. COSMIC SOUND SYNTHESIZER (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let isAudioEnabled = false;

function initCosmicAudio() {
  const audioBtn = document.getElementById('cosmicAudioBtn');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isAudioEnabled = !isAudioEnabled;

    if (isAudioEnabled) {
      audioBtn.classList.add('text-cyan-400', 'border-cyan-400', 'shadow-glow-neon');
      audioBtn.innerHTML = '<i data-lucide="volume-2" class="w-4 h-4"></i>';
      playCosmicBeep(620, 'sine');
    } else {
      audioBtn.classList.remove('text-cyan-400', 'border-cyan-400', 'shadow-glow-neon');
      audioBtn.innerHTML = '<i data-lucide="volume-x" class="w-4 h-4"></i>';
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });

  // Attach hover sounds to buttons & cards
  const interactiveElements = document.querySelectorAll('button, a, .group');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (isAudioEnabled) {
        playCosmicBeep(320 + Math.random() * 80, 'sine', 0.05);
      }
    });
  });
}

function playCosmicBeep(freq = 440, type = 'sine', duration = 0.15) {
  if (!isAudioEnabled || !audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.error('Audio playback error:', err);
  }
}
