/* ==========================================================================
   MOPURI BUSINESS SOLUTIONS — Interactions
   ========================================================================== */

/* ---------------- Form → Email delivery ----------------
   window.MBS_sendFormEmail(formData, subject) is called by the
   consultation modal, homepage/service lead form, Get Started enquiry,
   careers application and newsletter signup below. The function itself
   now lives in js/form-mailer.js (loaded right before this file on every
   page) — it POSTs straight to php/send-mail.php on this same Hostinger
   hosting, which emails the submission to mopurisolutions@gmail.com. See that file
   for setup notes. */

/* ---------------- Shared icon library ----------------
   Generic icons (used for benefit/document cards on service.html via
   service.js) plus per-service icons (used for nav dropdown links,
   mobile nav links and Related Services cards). Lightweight inline SVG
   paths only — no emojis, orange/black theme preserved via currentColor. */
window.SERVICE_ICONS = {
  // generic (benefits / documents)
  shield: '<path d="M12 2.6 4.5 5.4v5.7c0 5.1 3.2 9.4 7.5 10.9 4.3-1.5 7.5-5.8 7.5-10.9V5.4L12 2.6Z"/><path d="M8.4 12.3 11 14.9l4.6-5.4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9"/>',
  growth: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  support: '<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="16" cy="14.5" r="1.2"/>',
  id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.6 2-2.4 3-2.4s2.5.8 3 2.4M14 9h5M14 13h5"/>',
  photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-4 4-3-2-4 4"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"/>',
  building: '<path d="M3 21h18M6 21V9l6-4 6 4v12M10 21v-6h4v6"/>',
  bank: '<path d="M3 10l9-6 9 6"/><path d="M4 10h16v2H4z"/><path d="M5 12v7M9 12v7M15 12v7M19 12v7"/><path d="M3 21h18"/>',
  doc: '<path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/>',

  // per-service (nav / related cards)
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18 14 14 0 010-18z"/>',
  code: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14"/>',
  smartphone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  megaphone: '<path d="M3 11v2a2 2 0 002 2h1l2 6 2-1-1.6-5H9l10 4V6L9 10H4a2 2 0 00-1 1z"/>',
  palette: '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10.5" r="1.1"/><circle cx="12" cy="8" r="1.1"/><circle cx="15.5" cy="10.5" r="1.1"/><path d="M12 21a4 4 0 01-1-7.9c1.6-.3 2-1 2-2.1a2 2 0 012-2h.3A7 7 0 1112 21z"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2l2.6 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L21 7H6"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  certificate: '<circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L6 22l6-3 6 3-2.5-9.5"/>',
  filecheck: '<path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/><path d="M9.5 14l2 2 4-4"/>',
  lightbulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
  copyright: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.5a3 3 0 100 5"/>',
  calculator: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1M8 19h1M12 19h1M16 19h1"/>',
  ledger: '<path d="M4 4h13a2 2 0 012 2v14l-3-2-3 2-3-2-3 2-3-2V6a2 2 0 012-2z"/><path d="M8 9h7M8 13h7"/>'
};

window.MEGA_ICONS = {
  'Website Designing & Development': 'globe',
  'App Development': 'smartphone',
  'Digital Marketing': 'megaphone',
  'Graphic Designing': 'palette',
  'Ecommerce Services': 'cart',
  'Proprietorship': 'building',
  'Partnership Firm': 'building',
  'One Person Company': 'building',
  'Private Limited Company': 'building',
  'Limited Liability Partnership (LLP)': 'building',
  'Public Limited Company': 'building',
  'Nidhi Limited Company': 'building',
  'Section 8 Company': 'building',
  'NGO Registration': 'building',
  'Indian Subsidiary Company': 'building',
  'Trademark Registration': 'shield',
  'Trademark Objection': 'shield',
  'Trademark Hearing': 'shield',
  'Trademark Opposition': 'shield',
  'Trademark Legal Certificate': 'shield',
  'Copyright Services': 'copyright',
  'Design Services': 'palette',
  'Patent Services': 'lightbulb',
  'Income Tax Returns': 'calculator',
  'Form ITR 1 (Form 16)': 'calculator',
  'Form ITR 2 (Directors / HUF)': 'calculator',
  'Form ITR 3 (Proprietor/Other)': 'calculator',
  'Form ITR 4 (Professional/Commission/Other)': 'calculator',
  'Form ITR 5 (Partnership/LLP)': 'calculator',
  'Form ITR 6 (Company)': 'calculator',
  'Tax Audit': 'calculator',
  'Financial Preparation': 'calculator',
  'Book-Keeping Services': 'ledger',
  'Income Tax Notice': 'calculator',
  'GST Registration': 'receipt',
  'GST Filings': 'receipt',
  'GST Modification': 'receipt',
  'GST E-Way Billing': 'receipt',
  'Import & Export License': 'certificate',
  'FSSAI Registration (FoSCoS)': 'certificate',
  'FSSAI State License (FoSCoS)': 'certificate',
  'FSSAI Central License (FoSCoS)': 'certificate',
  'FSSAI Modification (FoSCoS)': 'certificate',
  'FSSAI Renewal (FoSCoS)': 'certificate',
  'EPF Registration / Compliance': 'filecheck',
  'ESI Registration / Compliance': 'filecheck',
  'Private Limited Compliance': 'filecheck',
  'LLP Compliance': 'filecheck',
  'Public Limited Compliance': 'filecheck',
  'Section 8 Compliance': 'filecheck',
  'Director E-KYC (DIR 3)': 'filecheck',
  'ROC Modification': 'filecheck',
  'Share Transfer': 'filecheck',
  'CA Consultation': 'calculator',
  'Legal Consultation': 'shield'
};

function mopuriIconSvg(key, w){
  w = w || 16;
  var paths = window.SERVICE_ICONS[key] || window.SERVICE_ICONS.doc;
  return '<svg class="mega-link-icon" viewBox="0 0 24 24" width="'+w+'" height="'+w+'" fill="none" stroke="currentColor" stroke-width="1.7">'+paths+'</svg>';
}

// Shared across every enquiry form on the site: letters and single spaces
// only (no leading/trailing/double spaces, no digits or symbols).
const MBS_NAME_RE = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
// Shared across every enquiry form on the site: digits only, exactly 10.
const MBS_MOBILE_RE = /^\d{10}$/;

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Nav dropdown / mobile nav service icons ---------------- */
  document.querySelectorAll('.mega-panel a').forEach(a => {
    var label = a.textContent.trim();
    var key = window.MEGA_ICONS[label] || 'doc';
    a.innerHTML = mopuriIconSvg(key, 16) + '<span>' + label + '</span>';
  });

  /* ---------------- Nav dropdown: auto-split into 2 columns when > 5 links ---------------- */
  document.querySelectorAll('.mega-panel').forEach(panel => {
    var linkCount = panel.querySelectorAll('a').length;
    if (linkCount > 5){
      panel.classList.add('mega-panel-cols');
    }
    // keep the panel on-screen: flip to right-aligned if it would overflow the viewport
    var rect = panel.getBoundingClientRect();
    var parentRect = panel.parentElement.getBoundingClientRect();
    var wouldOverflow = parentRect.left + Math.max(rect.width, linkCount > 5 ? 460 : 280) > window.innerWidth - 16;
    if (wouldOverflow) panel.classList.add('align-right');
  });

  /* ---------------- Navbar shrink on scroll ---------------- */
  const navbar = document.getElementById('navbar');
  let lastY = window.scrollY;

  function onScroll(){
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- Hero parallax + particles ---------------- */
  const heroImg = document.getElementById('heroParallaxImg');
  const hero = document.getElementById('hero');
  window.addEventListener('scroll', () => {
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom > 0){
      const offset = window.scrollY * 0.35;
      heroImg.style.transform = `translateY(${offset}px) scale(1.08)`;
    }
  }, { passive:true });

  if (hero){
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      heroImg.style.marginLeft = `${x}px`;
      heroImg.style.marginTop = `${y}px`;
    });
  }

  const particlesWrap = document.getElementById('particles');
  if (particlesWrap){
    const PARTICLE_COUNT = 28;
    for (let i=0;i<PARTICLE_COUNT;i++){
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random()*100 + '%';
      p.style.bottom = '-10px';
      p.style.animationDuration = (10 + Math.random()*14) + 's';
      p.style.animationDelay = (Math.random()*14) + 's';
      p.style.opacity = (0.3 + Math.random()*0.5).toFixed(2);
      particlesWrap.appendChild(p);
    }
  }

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCount(el){
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Marquee seamless loop (duplicate content) ---------------- */
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack){
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
  }

  /* ---------------- Service card tilt ---------------- */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------------- Magnetic buttons ---------------- */
  const magneticEls = document.querySelectorAll('[data-magnetic]');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) * 0.25;
      const y = (e.clientY - rect.top - rect.height/2) * 0.4;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ---------------- Button ripple / stamp effect ---------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ---------------- Search ---------------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchClose = document.getElementById('searchClose');

  const allLinks = Array.from(document.querySelectorAll('.mega-panel a')).map(a => ({
    text: a.textContent.trim(), href: a.href
  }));

  function openSearch(){
    searchPanel.classList.add('active');
    setTimeout(() => searchInput.focus(), 200);
  }
  function closeSearch(){
    searchPanel.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }
  searchToggle.addEventListener('click', () => {
    searchPanel.classList.contains('active') ? closeSearch() : openSearch();
  });
  searchClose.addEventListener('click', closeSearch);
  document.addEventListener('click', (e) => {
    if (!searchPanel.contains(e.target) && !searchToggle.contains(e.target)) closeSearch();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    if (!q){ return; }
    const matches = allLinks.filter(l => l.text.toLowerCase().includes(q)).slice(0, 8);
    if (!matches.length){
      searchResults.innerHTML = '<div class="no-results">No services found. Try “GST”, “Trademark”, or “App Development”.</div>';
      return;
    }
    matches.forEach(m => {
      const a = document.createElement('a');
      a.href = m.href;
      a.textContent = m.text;
      searchResults.appendChild(a);
    });
  });

  /* ---------------- Mega-menu dropdowns (hover + click, delayed close) ---------------- */
  const megaItems = Array.from(document.querySelectorAll('.has-mega'));
  const CLOSE_DELAY = 260;

  megaItems.forEach(item => {
    const btn = item.querySelector('.nav-link');
    const panel = item.querySelector('.mega-panel');
    let closeTimer = null;

    function closeOthers(){
      megaItems.forEach(other => {
        if (other !== item){
          other.classList.remove('mega-active');
          other.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
        }
      });
    }
    function positionPanel(){
      panel.classList.remove('align-right');
      const rect = panel.getBoundingClientRect();
      const margin = 16;
      if (rect.right > window.innerWidth - margin){
        panel.classList.add('align-right');
      }
    }
    function open(){
      clearTimeout(closeTimer);
      closeOthers();
      positionPanel();
      item.classList.add('mega-active');
      btn.setAttribute('aria-expanded', 'true');
    }
    function scheduleClose(){
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        item.classList.remove('mega-active');
        btn.setAttribute('aria-expanded', 'false');
      }, CLOSE_DELAY);
    }
    function cancelClose(){
      clearTimeout(closeTimer);
    }

    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', scheduleClose);
    panel.addEventListener('mouseenter', cancelClose);
    panel.addEventListener('mouseleave', scheduleClose);

    function close(){
      clearTimeout(closeTimer);
      item.classList.remove('mega-active');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Toggle: a click on an already-open dropdown closes it (needed for
      // touch/mobile, where there is no hover to close it again). A click
      // on a closed dropdown opens it and closes any other open one.
      if (item.classList.contains('mega-active')) {
        close();
      } else {
        open();
      }
    });

    panel.addEventListener('click', (e) => {
      if (e.target.closest('a')){
        clearTimeout(closeTimer);
        item.classList.remove('mega-active');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-mega')){
      megaItems.forEach(item => {
        item.classList.remove('mega-active');
        item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      megaItems.forEach(item => {
        item.classList.remove('mega-active');
        item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ---------------- Consultation modal (Get Started / enquiry form) ----------------
     Opens from every element with class "js-consult-trigger" — the hero
     "Get Started" button, service page CTAs, nav "Consultation" link, etc.
     Ready for backend integration: swap the setTimeout in the submit
     handler below for a real fetch()/API call whenever a backend exists. */
  const consultOverlay = document.getElementById('consultOverlay');
  const consultClose = document.getElementById('consultClose');
  const consultModalBody = document.getElementById('consultModalBody');
  const consultForm = document.getElementById('consultForm');
  const consultSuccess = document.getElementById('consultSuccess');
  const consultSuccessClose = document.getElementById('consultSuccessClose');
  const consultSubmitBtn = document.getElementById('consultSubmit');
  const consultServiceSelect = document.getElementById('consultService');

  if (consultOverlay && consultForm){

    function resetConsultModal(){
      consultModalBody.hidden = false;
      consultSuccess.hidden = true;
      consultForm.querySelectorAll('.form-field.invalid').forEach(f => f.classList.remove('invalid'));
    }

    function openConsultModal(serviceName){
      resetConsultModal();
      consultOverlay.classList.add('active');
      consultOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (serviceName && consultServiceSelect){
        let matched = false;
        Array.from(consultServiceSelect.options).forEach(opt => {
          if (opt.value === serviceName || opt.textContent.trim() === serviceName){
            opt.selected = true;
            matched = true;
          }
        });
        if (!matched){
          const opt = document.createElement('option');
          opt.value = serviceName;
          opt.textContent = serviceName;
          opt.selected = true;
          consultServiceSelect.insertBefore(opt, consultServiceSelect.options[1] || null);
        }
      }

      setTimeout(() => {
        const nameField = document.getElementById('consultName');
        if (nameField) nameField.focus();
      }, 350);
    }

    function closeConsultModal(){
      consultOverlay.classList.remove('active');
      consultOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.js-consult-trigger');
      if (!trigger) return;
      e.preventDefault();
      openConsultModal(trigger.getAttribute('data-service') || '');
    });

    consultClose.addEventListener('click', closeConsultModal);
    consultSuccessClose.addEventListener('click', closeConsultModal);
    consultOverlay.addEventListener('click', (e) => {
      if (e.target === consultOverlay) closeConsultModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && consultOverlay.classList.contains('active')) closeConsultModal();
    });

    /* ---- Validation ---- */
    const PHONE_RE = MBS_MOBILE_RE;
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setInvalid(fieldEl, isInvalid){
      fieldEl.classList.toggle('invalid', isInvalid);
    }

    // Per-field checks, reused both on submit and for live re-validation.
    function consultNameOk(){ return MBS_NAME_RE.test(document.getElementById('consultName').value.trim()); }
    function consultPhoneOk(){ return PHONE_RE.test(document.getElementById('consultPhone').value.trim()); }
    function consultEmailOk(){ return EMAIL_RE.test(document.getElementById('consultEmail').value.trim()); }
    function consultServiceOk(){ return !consultServiceSelect || !!consultServiceSelect.value; }

    function validateConsultForm(){
      let valid = true;
      const nameEl = document.getElementById('consultName');
      const phoneEl = document.getElementById('consultPhone');
      const emailEl = document.getElementById('consultEmail');
      const serviceEl = consultServiceSelect;

      const nameField = nameEl.closest('.form-field');
      const phoneField = phoneEl.closest('.form-field');
      const emailField = emailEl.closest('.form-field');
      const serviceField = serviceEl ? serviceEl.closest('.form-field') : null;

      const nameOk = consultNameOk();
      setInvalid(nameField, !nameOk);
      if (!nameOk) valid = false;

      const phoneOk = consultPhoneOk();
      setInvalid(phoneField, !phoneOk);
      if (!phoneOk) valid = false;

      const emailOk = consultEmailOk();
      setInvalid(emailField, !emailOk);
      if (!emailOk) valid = false;

      if (serviceField){
        const serviceOk = consultServiceOk();
        setInvalid(serviceField, !serviceOk);
        if (!serviceOk) valid = false;
      }

      return valid;
    }

    // Digits-only, max 10 characters while typing the mobile number.
    const consultPhoneInput = document.getElementById('consultPhone');
    if (consultPhoneInput){
      consultPhoneInput.addEventListener('input', () => {
        consultPhoneInput.value = consultPhoneInput.value.replace(/\D/g, '').slice(0, 10);
      });
    }

    // Re-validate live as the person types/selects, so a field's red
    // border clears itself the moment its value becomes valid — but we
    // don't flag a field invalid just because it hasn't been touched yet.
    const consultFieldChecks = {
      consultName: consultNameOk,
      consultPhone: consultPhoneOk,
      consultEmail: consultEmailOk,
      consultService: consultServiceOk
    };
    Object.keys(consultFieldChecks).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const revalidate = () => {
        const field = el.closest('.form-field');
        if (field.classList.contains('invalid') && consultFieldChecks[id]()){
          setInvalid(field, false);
        }
      };
      el.addEventListener('input', revalidate);
      el.addEventListener('change', revalidate);
    });

    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateConsultForm()) return;

      consultSubmitBtn.classList.add('loading');
      consultSubmitBtn.disabled = true;

      const formData = new FormData(consultForm);
      window.MBS_sendFormEmail(formData, 'New Consultation Request — Mopuri Business Solutions')
        .finally(() => {
          consultSubmitBtn.classList.remove('loading');
          consultSubmitBtn.disabled = false;
          consultModalBody.hidden = true;
          consultSuccess.hidden = false;
          consultForm.reset();
        });
    });
  }

  /* ---------------- Homepage lead generation form (below hero) ----------------
     Ready for backend integration: swap the setTimeout in the submit
     handler below for a real fetch()/API call whenever a backend exists. */
  const leadForm = document.getElementById('leadForm');
  if (leadForm){
    const leadSubmitBtn = document.getElementById('leadSubmit');
    const leadSuccess = document.getElementById('leadFormSuccess');
    const leadGoogleBtn = document.getElementById('leadGoogleBtn');

    const LEAD_PHONE_RE = MBS_MOBILE_RE;
    const LEAD_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setLeadInvalid(fieldEl, isInvalid){
      if (fieldEl) fieldEl.classList.toggle('invalid', isInvalid);
    }

    // Per-field checks, reused both on submit and for live re-validation.
    function leadNameOk(){ return MBS_NAME_RE.test(document.getElementById('leadName').value.trim()); }
    function leadEmailOk(){ return LEAD_EMAIL_RE.test(document.getElementById('leadEmail').value.trim()); }
    function leadPhoneOk(){ return LEAD_PHONE_RE.test(document.getElementById('leadPhone').value.trim()); }
    function leadServiceOk(){ return !!document.getElementById('leadService').value; }

    function validateLeadForm(){
      let valid = true;
      const nameEl = document.getElementById('leadName');
      const emailEl = document.getElementById('leadEmail');
      const phoneEl = document.getElementById('leadPhone');
      const serviceEl = document.getElementById('leadService');

      const nameOk = leadNameOk();
      setLeadInvalid(nameEl.closest('.form-field'), !nameOk);
      if (!nameOk) valid = false;

      const emailOk = leadEmailOk();
      setLeadInvalid(emailEl.closest('.form-field'), !emailOk);
      if (!emailOk) valid = false;

      const phoneOk = leadPhoneOk();
      setLeadInvalid(phoneEl.closest('.form-field'), !phoneOk);
      if (!phoneOk) valid = false;

      const serviceOk = leadServiceOk();
      setLeadInvalid(serviceEl.closest('.form-field'), !serviceOk);
      if (!serviceOk) valid = false;

      return valid;
    }

    // Digits-only, max 10 characters while typing the mobile number.
    const leadPhoneInput = document.getElementById('leadPhone');
    if (leadPhoneInput){
      leadPhoneInput.addEventListener('input', () => {
        leadPhoneInput.value = leadPhoneInput.value.replace(/\D/g, '').slice(0, 10);
      });
    }

    // Re-validate live as the person types/selects, so a field's red
    // border clears itself the moment its value becomes valid — but we
    // don't flag a field invalid just because it hasn't been touched yet.
    const leadFieldChecks = {
      leadName: leadNameOk,
      leadEmail: leadEmailOk,
      leadPhone: leadPhoneOk,
      leadService: leadServiceOk
    };
    Object.keys(leadFieldChecks).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const revalidate = () => {
        const field = el.closest('.form-field');
        if (field.classList.contains('invalid') && leadFieldChecks[id]()){
          setLeadInvalid(field, false);
        }
      };
      el.addEventListener('input', revalidate);
      el.addEventListener('change', revalidate);
    });

    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateLeadForm()) return;

      leadSubmitBtn.classList.add('loading');
      leadSubmitBtn.disabled = true;

      const formData = new FormData(leadForm);
      window.MBS_sendFormEmail(formData, 'New Lead Enquiry — Mopuri Business Solutions')
        .finally(() => {
          leadSubmitBtn.classList.remove('loading');
          leadSubmitBtn.disabled = false;
          if (leadSuccess){
            leadSuccess.classList.add('show');
            setTimeout(() => leadSuccess.classList.remove('show'), 5000);
          }
          leadForm.reset();
        });
    });

    if (leadGoogleBtn){
      leadGoogleBtn.addEventListener('click', () => {
        // Placeholder — wire up real Google OAuth when a backend exists.
        leadGoogleBtn.disabled = true;
        setTimeout(() => { leadGoogleBtn.disabled = false; }, 600);
      });
    }
  }

  /* ---------------- Mobile nav (built from mega panels) ---------------- */
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavInner = document.getElementById('mobileNavInner');
  const navScrim = document.getElementById('navScrim');
  const hamburger = document.getElementById('hamburger');

  document.querySelectorAll('.has-mega').forEach(group => {
    const label = group.querySelector('.nav-link').textContent.trim();
    const links = Array.from(group.querySelectorAll('.mega-panel a'));
    const wrap = document.createElement('div');
    wrap.className = 'mobile-group';
    wrap.innerHTML = `
      <button class="mobile-group-toggle">
        <span>${label}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="mobile-submenu">
        ${links.map(l => {
          const label = l.textContent.trim();
          const key = window.MEGA_ICONS[label] || 'doc';
          return `<a href="${l.href}">${mopuriIconSvg(key, 15)}<span>${label}</span></a>`;
        }).join('')}
      </div>`;
    mobileNavInner.appendChild(wrap);
    wrap.querySelector('.mobile-group-toggle').addEventListener('click', () => {
      const isOpen = wrap.classList.contains('open');
      mobileNavInner.querySelectorAll('.mobile-group.open').forEach(g => g.classList.remove('open'));
      if (!isOpen) wrap.classList.add('open');
    });
  });

  document.querySelectorAll('.nav-item-plain .nav-link-plain').forEach(link => {
    const a = document.createElement('a');
    a.href = link.getAttribute('href');
    a.className = 'mobile-plain-link';
    a.textContent = link.textContent.trim();
    mobileNavInner.appendChild(a);
  });

  const signupLink = document.createElement('a');
  signupLink.href = '#signup';
  signupLink.className = 'btn btn-primary btn-lg mobile-nav-signup';
  signupLink.textContent = 'Sign Up';
  mobileNavInner.appendChild(signupLink);

  function openMobileNav(){
    mobileNav.classList.add('active');
    navScrim.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav(){
    mobileNav.classList.remove('active');
    navScrim.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('active') ? closeMobileNav() : openMobileNav();
  });
  navScrim.addEventListener('click', closeMobileNav);
  mobileNavInner.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMobileNav();
  });

  /* ---------------- Testimonial carousel ---------------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const carousel = document.getElementById('testimonialCarousel');

  if (track && dotsWrap && carousel){
    const slides = track.children;
    let current = 0;

    Array.from(slides).forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(i){
      current = i;
      track.style.transform = `translateX(-${i * 100}%)`;
      Array.from(dotsWrap.children).forEach((d, idx) => d.classList.toggle('active', idx === i));
    }

    let autoTimer = setInterval(() => goTo((current + 1) % slides.length), 5500);
    carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
    carousel.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goTo((current + 1) % slides.length), 5500);
    });

    // touch swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive:true });
    carousel.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40){
        if (diff < 0) goTo((current + 1) % slides.length);
        else goTo((current - 1 + slides.length) % slides.length);
      }
    }, { passive:true });
  }

  /* ---------------- Newsletter ---------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterSuccess = document.getElementById('newsletterSuccess');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(newsletterForm);
    window.MBS_sendFormEmail(formData, 'New Newsletter Signup — Mopuri Business Solutions');
    newsletterSuccess.classList.add('show');
    newsletterForm.reset();
    setTimeout(() => newsletterSuccess.classList.remove('show'), 4000);
  });

  /* ---------------- AI Chatbot ---------------- */
  const chatbot = document.getElementById('chatbot');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const chatbotBody = document.getElementById('chatbotBody');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotQuickReplies = document.getElementById('chatbotQuickReplies');

  // Canned responses for quick-reply topics. Replace this map (or the
  // sendBotReply function below) with a real API call to wire up a live AI backend.
  const CHATBOT_TOPIC_REPLIES = {
    website: "We build websites, apps, ecommerce stores and handle digital marketing. Head to our Software Services section to see the full list, or tap \u201cTalk to Expert\u201d and we'll call you.",
    gst: "We handle GST registration, filings, e-way billing and modifications end-to-end. Want a callback to get started?",
    trademark: "We can help with trademark registration, objections, hearings, oppositions and copyright/patent filing. Would you like our team to reach out?",
    company: "We register Proprietorships, OPCs, LLPs, Private/Public Limited Companies, Section 8 and more. Tell me which structure you're considering, or call us for a callback.",
    expert: "You can reach our team directly:\n📞 Call/WhatsApp: +91 63097 30419\n📧 Email: mopurisolutions@gmail.com\n⏱️ Response time: within 24 hours (often much sooner during business hours).\nOr share your details in chat and we'll call you back.",

    // Company Information
    aboutServices: "We offer end-to-end business services — company & startup registrations, GST, Income Tax, Trademark & IPR, ROC compliance, accounting, FSSAI, EPF/ESI, Import-Export Code and website/digital services. Tell me what you're looking for and I'll point you in the right direction!",
    serviceAreas: "We work with businesses across India and handle everything online, so you don't need to visit an office — just share your documents digitally and our team takes it from there.",

    // Business Registration
    bestRegistration: "It depends on your goals — Proprietorship and Partnership suit small, low-compliance setups, while OPC, LLP or Private Limited Company suit businesses planning to raise funding or scale. Tell us about your business and we'll recommend the right structure, or book a free consultation.",
    incorporationTime: "Most company incorporations (Private Limited, LLP, OPC) are completed in about 7–10 working days once documents are submitted, though this can vary based on department processing time.",

    // GST Services
    gstTime: "GST registration is typically completed in 3–7 working days from the date of application submission.",
    gstCost: "Our GST filing packages start from ₹1,999 for a Basic plan, with Standard and Premium tiers offering added support like priority processing and a dedicated relationship manager. Exact pricing depends on your business needs.",

    // Income Tax
    itr: "Yes — we prepare and file Income Tax Returns for individuals, professionals, partnerships/LLPs and companies (ITR-1 through ITR-6), usually within 1–3 working days once your documents are ready.",
    itNotice: "If you've received an Income Tax notice, our team can review it, explain what it means and help you respond correctly and on time. Reach out and we'll get a specialist to look into it.",

    // Trademark
    trademarkApply: "We handle the entire trademark process — search, application filing, objections, hearings and oppositions. Filing itself takes about a day, though registry approval can take 8–24 months. Want us to start your application?",

    // Company Compliance
    rocCompliance: "Yes, we handle ongoing ROC compliance for Private Limited, LLP, Public Limited and Section 8 companies, including annual filings, Director e-KYC (DIR-3) and other MCA requirements after your registration is complete.",
    rocAnnual: "Annual ROC compliance covers things like annual returns, financial statement filing and Director KYC that every registered company or LLP must complete each year to stay in good standing with the MCA.",

    // Accounting & Bookkeeping
    accounting: "Yes — we offer book-keeping, financial statement preparation and tax audit support to keep your accounts accurate and audit-ready year-round.",

    // Startup Services
    startupServices: "We help startups register as a Proprietorship, Partnership, OPC, LLP, Private/Public Limited Company, Section 8 Company, NGO or Indian Subsidiary — whichever structure suits your plans best.",
    pvtLtd: "Absolutely — Private Limited Company incorporation usually takes 7–10 working days and needs PAN, Aadhaar, photos, address proof and DIN/DSC for all directors. We handle the entire MCA filing for you.",

    // FSSAI
    fssaiProcess: "FSSAI registration/licensing is done through the FoSCoS portal and typically takes about 7–10 working days once your documents are submitted. We handle registration, state/central licensing, modification and renewal.",

    // ISO Certification
    isoCert: "We can guide you on ISO certification requirements for your business — share a few details about your company and our team will confirm the right certification and next steps.",

    // DSC
    dscHelp: "Yes, we can help you obtain a Digital Signature Certificate (DSC) for directors and authorised signatories — it's often needed for company incorporation and MCA/GST filings.",

    // Shop & Establishment
    shopEstablishment: "Yes, we assist with Shop & Establishment registration for your business premises — get in touch and our team will guide you through the requirements for your state.",

    // EPF & ESI
    epfEsi: "Yes — we handle both EPF and ESI registration and ongoing compliance, including monthly filings, usually completing registration within 3–5 working days.",

    // Import Export Code (IEC)
    iecCode: "An Import Export Code (IEC) is issued by DGFT and we typically get it processed in 1–2 working days once your documents are submitted. Want us to start your application?",

    // Contact & Support
    contactTeam: "You can reach our team at +91 63097 30419 or mopurisolutions@gmail.com — or tap \u201cTalk to Expert\u201d here and we'll call you back.",
    postSupport: "Yes, we stay with you after registration for compliance, renewals, notices and any follow-up questions — many of our packages even include a year of post-service support.",
    bookConsultation: "You can book a free consultation by tapping the \u201cRequest Free Consultation\u201d button on our site, or just share your number here and our team will call you back.",

    // Pricing
    pricingGeneral: "Pricing depends on the exact service and plan — most of our registration and filing packages start from ₹1,999 for a Basic plan, with Standard and Premium tiers for extra support. Tell us which service you need and we'll share an exact quote.",

    // Documents Required
    docsCompany: "For most company registrations you'll need PAN, Aadhaar, a passport-size photo, personal address proof, business address proof and DIN/DSC for directors — exact requirements vary slightly by business structure.",

    // Timelines
    generalTimeline: "Timelines vary by service — most registrations complete in about 3–10 working days, though government processing time can vary based on department workload.",

    // General
    applyOnline: "Yes — our entire process is online. Just share your documents digitally through our secure link and our team handles filing, follow-ups and delivery, so you don't need to visit any office.",

    // Software Services — added so free-text intent detection has a real
    // answer for every service the "Related Services Engine" can suggest.
    appDevelopment: "We develop secure and scalable Android, iOS, and cross-platform applications tailored to your business requirements.",
    digitalMarketing2: "We run full-funnel digital marketing — SEO, Google Ads, social media marketing, branding and content — to help you generate consistent, measurable leads.",
    graphicDesigning: "We handle logo design, branding kits, social media creatives, UI design and brochure/print design for your business.",
    ecommerceServices: "We build complete e-commerce stores with payment gateway integration, inventory management, SEO and ongoing maintenance.",
    softwareDevelopment: "We build custom software — ERP, CRM, HRMS, POS, billing and industry-specific solutions — matched to how your business actually works.",
    startupServicesTopic: "We help startups with company registration, branding, a website, app development, digital marketing and business consultation — everything needed to launch.",
    caConsultationTopic: "Our CA consultation covers GST registration, income tax filing, company compliance, accounting and audit — book a session and we'll take it from there.",
    legalConsultationTopic: "Our legal consultation covers company registration, trademark, copyright, contracts and legal compliance. Would you like to book a session?",

    // Related-service sub-topics (used by the "You may also need" chips)
    uiuxDesign: "Yes — every website and app project includes UI/UX design, so the end product is easy to use and on-brand.",
    seo: "We offer SEO as a standalone service or bundled with website/e-commerce projects, to help your site rank and get found.",
    hosting: "Yes, we provide reliable hosting and can manage it for you so your site stays fast and secure.",
    maintenance: "We offer ongoing maintenance plans for websites and apps — updates, fixes and monitoring — so you don't have to worry about it.",
    apiIntegration: "We handle API integration for payments, CRMs, logistics, and any third-party service your app or website needs to talk to.",
    cloudServices: "We set up and manage cloud infrastructure (AWS, GCP, Azure) for your app or software, including migration from on-prem systems.",
    testing: "Every app and software build goes through structured QA/testing before release, covering functionality, performance and security.",
    socialMediaMarketing: "We manage social media marketing — content calendars, posting, ads and community management — as part of our digital marketing services.",
    googleAds: "Yes, we run and optimise Google Ads campaigns to drive targeted traffic and leads to your business.",
    branding: "We build complete brand identities — logo, colours, tone of voice and guidelines — so your business looks consistent everywhere.",
    contentMarketing: "We create content marketing plans — blogs, videos, social posts — to build organic reach and authority for your brand.",
    analytics: "We set up analytics and reporting dashboards so you can see exactly how your website, app or campaigns are performing.",
    logoDesign: "Yes, logo design is part of our graphic design and branding services.",
    socialMediaCreatives: "We design social media creatives — post templates, reels covers, ad creatives — to keep your brand consistent online.",
    brochureDesign: "We design brochures, flyers and other print materials as part of our graphic design services.",
    paymentGateway: "We integrate payment gateways (Razorpay, PayU, Stripe and others) into your e-commerce store or app.",
    inventorySystem: "Our e-commerce builds include inventory management, so stock updates automatically as orders come in.",
    erp: "We build custom ERP systems to bring your operations, inventory and finance into one connected platform.",
    crm: "We build CRM systems to help you track leads, customers and follow-ups in one place.",
    apiDevelopment: "We build custom APIs for your software so it can connect with other systems and platforms.",
    cloudSolutions: "We design and manage cloud solutions — hosting, storage, scaling — for your software or app.",
    businessConsultation: "We offer business consultation to help you choose the right structure, services and roadmap for your startup.",
    companyCompliance: "We handle ongoing company compliance — ROC filings, annual returns, Director e-KYC — so you stay in good standing.",
    accountingTopic: "We offer book-keeping and accounting support to keep your financials accurate and audit-ready.",
    auditTopic: "We support tax audit and statutory audit requirements as part of our accounting services.",
    contracts: "We draft and review contracts and agreements as part of our legal consultation service.",
    legalCompliance: "We help businesses stay on top of ongoing legal compliance requirements relevant to their structure and industry.",

    // Homepage service-category headings — so tapping/typing any of the 6
    // service cards on the homepage ("Software Services", "IPR", etc.)
    // always gets a direct, accurate overview instead of falling through
    // to the generic escalation reply.
    softwareServicesOverview: "Our Software Services cover Website Designing & Development, App Development, Digital Marketing, Graphic Designing and E-commerce Services. Which one would you like to know more about?",
    iprOverview: "IPR covers Trademark Registration (plus objections, hearings & opposition), Copyright Services, Patent Services and Design Services — everything to protect your brand and creative work. Which one can I help with?",
    taxAccountingOverview: "Tax & Accounting covers Income Tax Returns (ITR-1 to ITR-6), Tax Audit, Book-Keeping and Financial Preparation. Which one would you like help with?",
    registrationsRocOverview: "Registrations & ROC Compliance covers annual filings, Director e-KYC (DIR-3), ROC Modification and Share Transfer for Private Limited, LLP, Public Limited and Section 8 companies. Want us to review your compliance status?",
    registrationsOverview: "Registrations covers GST Registration, GST Filings, Import & Export License, FSSAI Registration (State/Central/Modification/Renewal), and EPF/ESI Registration & Compliance. Which one would you like help with?",
    startupOverview: "Startup registration covers Proprietorship, Partnership Firm, One Person Company, Private Limited Company, LLP, Public Limited Company, Nidhi Limited Company, Section 8 Company, NGO Registration and Indian Subsidiary Company. Which structure fits your business?",
    consultationOverview: "We offer CA Consultation for tax, accounting and financial planning queries, and Legal Consultation for contracts, compliance and legal advice. Which one would you like to book?"
  };

  // ---- Related Services Engine (mirrors the internal knowledge-base
  // relationships) — each answered topic surfaces 4–6 related chips. ----
  const RELATED_SERVICES = {
    website: [
      { label: 'UI/UX Design', topic: 'uiuxDesign' },
      { label: 'Digital Marketing', topic: 'digitalMarketing2' },
      { label: 'SEO', topic: 'seo' },
      { label: 'Hosting', topic: 'hosting' },
      { label: 'Maintenance', topic: 'maintenance' },
      { label: 'E-commerce', topic: 'ecommerceServices' }
    ],
    appDevelopment: [
      { label: 'UI/UX Design', topic: 'uiuxDesign' },
      { label: 'API Integration', topic: 'apiIntegration' },
      { label: 'Cloud Services', topic: 'cloudServices' },
      { label: 'Maintenance', topic: 'maintenance' },
      { label: 'Testing', topic: 'testing' },
      { label: 'Software Development', topic: 'softwareDevelopment' }
    ],
    digitalMarketing2: [
      { label: 'SEO', topic: 'seo' },
      { label: 'Social Media Marketing', topic: 'socialMediaMarketing' },
      { label: 'Google Ads', topic: 'googleAds' },
      { label: 'Branding', topic: 'branding' },
      { label: 'Content Marketing', topic: 'contentMarketing' },
      { label: 'Analytics', topic: 'analytics' }
    ],
    graphicDesigning: [
      { label: 'Logo Design', topic: 'logoDesign' },
      { label: 'Branding', topic: 'branding' },
      { label: 'Social Media Creatives', topic: 'socialMediaCreatives' },
      { label: 'UI Design', topic: 'uiuxDesign' },
      { label: 'Brochure Design', topic: 'brochureDesign' }
    ],
    ecommerceServices: [
      { label: 'Website Development', topic: 'website' },
      { label: 'Payment Gateway', topic: 'paymentGateway' },
      { label: 'Inventory System', topic: 'inventorySystem' },
      { label: 'SEO', topic: 'seo' },
      { label: 'Hosting', topic: 'hosting' },
      { label: 'Maintenance', topic: 'maintenance' }
    ],
    softwareDevelopment: [
      { label: 'Web Development', topic: 'website' },
      { label: 'Mobile Apps', topic: 'appDevelopment' },
      { label: 'ERP', topic: 'erp' },
      { label: 'CRM', topic: 'crm' },
      { label: 'API Development', topic: 'apiDevelopment' },
      { label: 'Cloud Solutions', topic: 'cloudSolutions' }
    ],
    startupServicesTopic: [
      { label: 'Company Registration', topic: 'company' },
      { label: 'Branding', topic: 'branding' },
      { label: 'Website', topic: 'website' },
      { label: 'App Development', topic: 'appDevelopment' },
      { label: 'Digital Marketing', topic: 'digitalMarketing2' },
      { label: 'Business Consultation', topic: 'businessConsultation' }
    ],
    caConsultationTopic: [
      { label: 'GST Registration', topic: 'gst' },
      { label: 'Income Tax Filing', topic: 'itr' },
      { label: 'Company Compliance', topic: 'companyCompliance' },
      { label: 'Accounting', topic: 'accountingTopic' },
      { label: 'Audit', topic: 'auditTopic' }
    ],
    legalConsultationTopic: [
      { label: 'Company Registration', topic: 'company' },
      { label: 'Trademark', topic: 'trademark' },
      { label: 'Copyright', topic: 'contracts' },
      { label: 'Contracts', topic: 'contracts' },
      { label: 'Legal Compliance', topic: 'legalCompliance' }
    ],

    // Homepage service-category headings
    softwareServicesOverview: [
      { label: 'Website Development', topic: 'website' },
      { label: 'App Development', topic: 'appDevelopment' },
      { label: 'Digital Marketing', topic: 'digitalMarketing2' },
      { label: 'Graphic Designing', topic: 'graphicDesigning' },
      { label: 'E-commerce Services', topic: 'ecommerceServices' }
    ],
    iprOverview: [
      { label: 'Trademark Registration', topic: 'trademark' },
      { label: 'Trademark Objection', topic: 'trademark' },
      { label: 'Copyright Services', topic: 'contracts' },
      { label: 'Patent Services', topic: 'trademarkApply' }
    ],
    taxAccountingOverview: [
      { label: 'Income Tax Returns', topic: 'itr' },
      { label: 'Tax Audit', topic: 'auditTopic' },
      { label: 'Book-Keeping', topic: 'accountingTopic' },
      { label: 'Income Tax Notice', topic: 'itNotice' }
    ],
    registrationsRocOverview: [
      { label: 'ROC Compliance', topic: 'rocCompliance' },
      { label: 'Annual ROC Filing', topic: 'rocAnnual' },
      { label: 'Director e-KYC', topic: 'companyCompliance' },
      { label: 'Company Compliance', topic: 'companyCompliance' }
    ],
    rocCompliance: [
      { label: 'Annual ROC Filing', topic: 'rocAnnual' },
      { label: 'Director e-KYC', topic: 'companyCompliance' },
      { label: 'Company Compliance', topic: 'companyCompliance' }
    ],
    registrationsOverview: [
      { label: 'GST Registration', topic: 'gst' },
      { label: 'Import & Export License', topic: 'gst' },
      { label: 'FSSAI Registration', topic: 'gst' },
      { label: 'EPF/ESI Registration', topic: 'gst' }
    ],
    startupOverview: [
      { label: 'Private Limited Company', topic: 'pvtLtd' },
      { label: 'LLP Registration', topic: 'bestRegistration' },
      { label: 'One Person Company', topic: 'bestRegistration' },
      { label: 'Documents Required', topic: 'docsCompany' },
      { label: 'Incorporation Timeline', topic: 'incorporationTime' }
    ],
    consultationOverview: [
      { label: 'CA Consultation', topic: 'caConsultationTopic' },
      { label: 'Legal Consultation', topic: 'legalConsultationTopic' }
    ],
    company: [
      { label: 'Private Limited Company', topic: 'pvtLtd' },
      { label: 'LLP Registration', topic: 'bestRegistration' },
      { label: 'One Person Company', topic: 'bestRegistration' },
      { label: 'Documents Required', topic: 'docsCompany' },
      { label: 'Incorporation Timeline', topic: 'incorporationTime' }
    ],
    gst: [
      { label: 'GST Timeline', topic: 'gstTime' },
      { label: 'GST Pricing', topic: 'gstCost' },
      { label: 'Book a Consultation', topic: 'bookConsultation' }
    ]
  };

  // ---- Intelligent Search: map varied natural-language phrasing onto a
  // single canonical topic, so "need mobile app" / "build android app" /
  // "app developer" all resolve the same way. ----
  const INTENT_KEYWORDS = [
    // Homepage service-category headings — matched first so tapping/typing
    // an exact card heading ("IPR", "Software Services", etc.) always
    // resolves to a precise category overview instead of a generic or
    // no match at all.
    { topic: 'iprOverview', words: ['ipr', 'intellectual property'] },
    { topic: 'softwareServicesOverview', words: ['software services', 'software & digital services', 'software and digital services'] },
    { topic: 'taxAccountingOverview', words: ['tax & accounting', 'tax and accounting'] },
    { topic: 'registrationsRocOverview', words: ['registrations & roc compliance', 'registrations and roc compliance'] },
    { topic: 'rocCompliance', words: ['roc compliance'] },
    { topic: 'registrationsOverview', words: ['registrations'] },
    { topic: 'startupOverview', words: ['startup'] },

    { topic: 'appDevelopment', words: ['mobile app', 'android app', 'ios app', 'app developer', 'app development', 'application development', 'build an app', 'flutter', 'react native'] },
    { topic: 'website', words: ['website', 'web design', 'web development', 'company website', 'business website', 'landing page', 'web app'] },
    { topic: 'digitalMarketing2', words: ['digital marketing', 'social media marketing', 'google ads', 'ppc', 'online marketing', 'content marketing'] },
    { topic: 'seo', words: ['seo', 'search engine optimi'] },
    { topic: 'graphicDesigning', words: ['graphic design', 'logo design', 'brochure design', 'branding kit', 'creatives', 'logo', 'branding'] },
    { topic: 'ecommerceServices', words: ['ecommerce', 'e-commerce', 'online store', 'online shop'] },
    { topic: 'softwareDevelopment', words: ['software development', 'custom software', 'erp', 'crm', 'hrms', 'pos software', 'billing software', 'school management software', 'hospital management software', 'software'] },
    { topic: 'startupServicesTopic', words: ['startup services', 'launch my startup', 'start a business', 'startup support'] },
    { topic: 'caConsultationTopic', words: ['ca consultation', 'chartered accountant'] },
    { topic: 'legalConsultationTopic', words: ['legal consultation', 'lawyer', 'legal advice'] },
    { topic: 'consultationOverview', words: ['consultation'] },
    { topic: 'gst', words: ['gst', 'goods and services tax'] },
    { topic: 'trademark', words: ['trademark', 'brand name registration'] },
    { topic: 'company', words: ['company registration', 'register a company', 'incorporate', 'private limited', 'llp registration', 'opc registration'] },
    { topic: 'itr', words: ['income tax return', 'itr filing', 'file itr', 'tax return'] },
    { topic: 'accounting', words: ['book-keeping', 'bookkeeping', 'accounting service'] },
    { topic: 'fssaiProcess', words: ['fssai', 'food license'] },
    { topic: 'iecCode', words: ['import export code', 'iec code'] },
    { topic: 'epfEsi', words: ['epf', 'esi registration'] }
  ];

  const BUYING_INTENT_WORDS = ['get started', 'sign me up', 'book a consultation', 'book consultation', 'i want to proceed', 'proceed with', 'i am interested', "i'm interested", 'give me a quote', 'want to hire', 'want to buy', 'i need a quote', 'lets start', "let's start", 'talk to expert', 'callback', 'call me back', 'contact me'];

  // Topics that are already a direct contact/CTA reply — showing another
  // "Talk to Expert" button right underneath them would be redundant.
  const NO_CTA_TOPICS = new Set(['expert', 'contactTeam', 'bookConsultation']);

  // ==========================================================================
  // SMALL TALK — handles greetings, thanks, goodbyes, and other casual
  // messages that aren't a service query at all. Each category has several
  // reply variants (picked at random) so it doesn't sound like a single
  // canned line repeating every time. Kept separate from the service
  // knowledge base so it never gets accidentally treated as a service query.
  // ==========================================================================
  const SMALL_TALK = {
    greeting: {
      words: ['hi','hii','hiii','hiya','hello','hellow','hey','heya','yo','hola','namaste','good morning','good afternoon','good evening'],
      replies: [
        "Hi there! 👋 How can I help you today — looking for a specific service, or just exploring?",
        "Hello! Great to have you here. What can I help you with — registrations, tax & GST, IPR, compliance, or software services?",
        "Hey! 😊 I'm the Mopuri AI Assistant. What are you looking for today?",
        "Hi! Happy to help — what would you like to know about?"
      ]
    },
    howAreYou: {
      words: ['how are you','how r u','how are u','hows it going',"how's it going",'whats up',"what's up",'wassup'],
      replies: [
        "I'm doing great, thanks for asking! How can I help you today?",
        "All good on my end! What can I help you with?",
        "Doing well, thank you! What brings you here today?"
      ]
    },
    thanks: {
      words: ['thank you','thanks','thankyou','thnx','tysm','ty','appreciate it','much appreciated'],
      replies: [
        "You're welcome! Let me know if there's anything else I can help with.",
        "Anytime! Happy to help further if you need anything else.",
        "Glad I could help! Feel free to ask if you have more questions.",
        "You're welcome — reach out anytime you need us."
      ]
    },
    bye: {
      words: ['bye','goodbye','see you','see ya','talk later','catch you later','gtg','good night'],
      replies: [
        "Take care! Feel free to come back anytime you have a question. 👋",
        "Goodbye! We're here whenever you need us.",
        "See you! Don't hesitate to reach out if anything comes up."
      ]
    },
    whoAreYou: {
      words: ['who are you','what are you','what can you do','what do you do','are you a bot','are you human','are you real'],
      replies: [
        "I'm the Mopuri AI Assistant! I can help you find the right service — registrations, tax & GST filing, IPR, ROC compliance, software & digital services, and more. What are you looking for?",
        "I'm here to help you navigate our services — from company registration to tax filing, trademarks, compliance and software. Ask me anything!"
      ]
    },
    acknowledgement: {
      words: ['ok','okay','okk','alright','sure','cool','great','nice one','sounds good','got it','noted','fine'],
      replies: [
        "Great! Let me know if there's anything specific you'd like help with.",
        "Awesome — I'm here if you need anything else.",
        "Sounds good! Feel free to ask about any of our services anytime."
      ]
    }
  };

  // Only treated as small talk for genuinely short, casual messages (<=6 words)
  // so it never intercepts a real service question that happens to contain a
  // filler word like "ok" or "thanks" partway through a longer sentence.
  function detectSmallTalk(text){
    const norm = text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim();
    if (!norm) return null;
    const wordCount = norm.split(' ').length;
    for (const cfg of Object.values(SMALL_TALK)){
      for (const phrase of cfg.words){
        const isPhrase = phrase.includes(' ');
        const matches = isPhrase
          ? norm.includes(phrase)
          : (wordCount <= 6 && new RegExp(`(^|\\s)${phrase}($|\\s|[!.?])`).test(norm + ' '));
        if (matches){
          return cfg.replies[Math.floor(Math.random() * cfg.replies.length)];
        }
      }
    }
    return null;
  }

  function detectIntent(text){
    const t = text.toLowerCase();
    for (const entry of INTENT_KEYWORDS){
      if (entry.words.some(w => t.includes(w))) return entry.topic;
    }
    return null;
  }

  // ==========================================================================
  // FULL KNOWLEDGE BASE — covers every service (startup registration, IPR,
  // tax, GST, ROC compliance, consultation, software), not just software.
  // Built from window.SERVICES_DATA (services-data.js) at runtime, so the
  // chatbot never needs the full list hard-coded, and any service added to
  // services-data.js is automatically searchable and suggestible.
  // ==========================================================================
  const STOPWORDS = new Set(['the','and','for','of','a','an','in','on','to','with','our','your','is','are','do','does','you','need','want','get','how','what','can','i','me','my','service','services','please','looking']);

  function normalizeWords(str){
    return (str || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w && !STOPWORDS.has(w));
  }

  let SERVICE_INDEX = null;
  function getServiceIndex(){
    if (SERVICE_INDEX) return SERVICE_INDEX;
    const data = (typeof window !== 'undefined' && window.SERVICES_DATA) ? window.SERVICES_DATA : [];
    const byId = {};
    const byNameLower = {};
    data.forEach(s => {
      byId[s.id] = s;
      byNameLower[s.name.toLowerCase()] = s.id;
    });
    SERVICE_INDEX = { data, byId, byNameLower };
    return SERVICE_INDEX;
  }

  // Resolve a display name (as used in a service's "related" array) to a
  // service id, tolerating minor wording differences.
  function resolveRelatedNameToId(name, index){
    const lower = name.toLowerCase().trim();
    if (index.byNameLower[lower]) return index.byNameLower[lower];
    let bestId = null, bestScore = 0;
    const targetWords = normalizeWords(lower);
    index.data.forEach(s => {
      const words = normalizeWords(s.name);
      const overlap = words.filter(w => targetWords.includes(w)).length;
      if (overlap > bestScore){ bestScore = overlap; bestId = s.id; }
    });
    return bestScore > 0 ? bestId : null;
  }

  function shortServiceAnswer(service){
    const timeline = service.timeline ? ` Typical timeline: ${service.timeline.toLowerCase()}` : '';
    return `We handle ${service.name} end-to-end — documentation, filing and follow-up, so you don't have to.${timeline} Would you like a free consultation?`;
  }

  // Free-text matching against every service name in the knowledge base
  // (word-overlap scoring), used as a fallback after the curated
  // INTENT_KEYWORDS list above so long-tail services (e.g. "director e-KYC",
  // "trademark opposition", "Nidhi company", "FSSAI renewal") still resolve.
  function findServiceByFreeText(text){
    const index = getServiceIndex();
    if (!index.data.length) return null;
    const inputWords = normalizeWords(text);
    if (!inputWords.length) return null;
    let best = null, bestScore = 0;
    index.data.forEach(s => {
      const nameWords = normalizeWords(s.name);
      const overlap = nameWords.filter(w => inputWords.includes(w)).length;
      if (overlap > bestScore){ bestScore = overlap; best = s; }
    });
    return bestScore > 0 ? best : null;
  }

  function renderDynamicRelatedChips(service){
    const index = getServiceIndex();
    const relatedNames = Array.isArray(service.related) ? service.related.slice(0, 6) : [];
    const chips = relatedNames
      .map(name => ({ label: name, id: resolveRelatedNameToId(name, index) }))
      .filter(item => item.id);
    if (!chips.length) return;

    const header = document.createElement('div');
    header.className = 'chatbot-msg bot';
    header.innerHTML = `<img src="../assets/logo.png" alt="" class="chatbot-msg-avatar" aria-hidden="true"><div class="chatbot-bubble">You may also need:</div>`;
    chatbotBody.insertBefore(header, chatbotQuickReplies);

    const group = document.createElement('div');
    group.className = 'chatbot-quick-replies chatbot-related-chips';
    chips.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chatbot-chip';
      btn.dataset.svcId = item.id;
      btn.textContent = item.label;
      group.appendChild(btn);
    });
    chatbotBody.insertBefore(group, chatbotQuickReplies);
    scrollChatToBottom();
  }

  function renderTalkToExpertCTA(){
    // Avoid stacking duplicate CTAs if one is already showing right above the input.
    const existing = chatbotBody.querySelector('.chatbot-cta-wrap:last-of-type');
    if (existing && existing.nextSibling === chatbotQuickReplies) return;

    const wrap = document.createElement('div');
    wrap.className = 'chatbot-cta-wrap';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chatbot-chip chatbot-cta';
    btn.dataset.topic = 'expert';
    btn.innerHTML = '💬 Talk to an Expert';
    wrap.appendChild(btn);
    chatbotBody.insertBefore(wrap, chatbotQuickReplies);
    scrollChatToBottom();
  }

  function answerWithService(service){
    sendBotReply(shortServiceAnswer(service));
    setTimeout(() => renderDynamicRelatedChips(service), 500);
    setTimeout(() => renderTalkToExpertCTA(), 900);
  }

  function hasBuyingIntent(text){
    const t = text.toLowerCase();
    return BUYING_INTENT_WORDS.some(w => t.includes(w));
  }

  function renderRelatedChips(topicKey){
    const related = RELATED_SERVICES[topicKey];
    if (!related || !related.length) return;

    const header = document.createElement('div');
    header.className = 'chatbot-msg bot';
    header.innerHTML = `<img src="../assets/logo.png" alt="" class="chatbot-msg-avatar" aria-hidden="true"><div class="chatbot-bubble">You may also need:</div>`;
    chatbotBody.insertBefore(header, chatbotQuickReplies);

    const group = document.createElement('div');
    group.className = 'chatbot-quick-replies chatbot-related-chips';
    related.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chatbot-chip';
      btn.dataset.topic = item.topic;
      btn.textContent = item.label;
      group.appendChild(btn);
    });
    chatbotBody.insertBefore(group, chatbotQuickReplies);
    scrollChatToBottom();
  }

  // ---- Lead Generation: ask one question at a time instead of a form dump,
  // once the visitor shows buying intent. ----
  const leadFlow = { active: false, step: 0, data: {} };
  const LEAD_STEPS = [
    { key: 'name', prompt: "Sure! Could you share your name?" },
    { key: 'company', prompt: "Thanks! What's your company or business name?" },
    { key: 'phone', prompt: "Got it. What's the best phone number to reach you on?" },
    { key: 'email', prompt: "Perfect, and your email address?" }
  ];

  function startLeadFlow(){
    leadFlow.active = true;
    leadFlow.step = 0;
    leadFlow.data = {};
    sendBotReply(LEAD_STEPS[0].prompt);
  }

  function continueLeadFlow(text){
    const current = LEAD_STEPS[leadFlow.step];
    leadFlow.data[current.key] = text;
    leadFlow.step++;
    if (leadFlow.step < LEAD_STEPS.length){
      sendBotReply(LEAD_STEPS[leadFlow.step].prompt);
    } else {
      leadFlow.active = false;
      sendBotReply(`Thanks, ${leadFlow.data.name || 'there'}! We've got your details — one of our specialists will call you at ${leadFlow.data.phone || 'the number you shared'} shortly. You can also reach us anytime at +91 63097 30419 or mopurisolutions@gmail.com.`);
    }
  }

  function sendEscalationReply(){
    sendBotReply("I'm unable to provide a confirmed answer for that. Our team will be happy to assist you.");
    const group = document.createElement('div');
    group.className = 'chatbot-quick-replies chatbot-related-chips';
    [
      { label: '📞 Call Us', topic: 'expert' },
      { label: '📧 Email Us', topic: 'expert' },
      { label: '💬 Contact Support', topic: 'contactTeam' }
    ].forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chatbot-chip';
      btn.dataset.topic = item.topic;
      btn.textContent = item.label;
      group.appendChild(btn);
    });
    setTimeout(() => {
      chatbotBody.insertBefore(group, chatbotQuickReplies);
      scrollChatToBottom();
    }, 500);
  }

  function scrollChatToBottom(){
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function appendMessage(text, sender){
    const msg = document.createElement('div');
    msg.className = `chatbot-msg ${sender}`;
    if (sender === 'bot'){
      msg.innerHTML = `<img src="../assets/logo.png" alt="" class="chatbot-msg-avatar" aria-hidden="true"><div class="chatbot-bubble"></div>`;
    } else {
      msg.innerHTML = `<div class="chatbot-bubble"></div>`;
    }
    msg.querySelector('.chatbot-bubble').textContent = text;
    chatbotBody.insertBefore(msg, chatbotQuickReplies);
    scrollChatToBottom();
  }

  function sendBotReply(text){
    // Hook point for a real backend: call your AI/chat API here and
    // pass the response into appendMessage('bot', responseText) instead.
    setTimeout(() => appendMessage(text, 'bot'), 450);
  }

  function openChatbot(){
    chatbot.classList.add('active');
    setTimeout(() => chatbotInput.focus(), 250);
  }
  function closeChatbot(){
    chatbot.classList.remove('active');
  }
  chatbotToggle.addEventListener('click', () => {
    chatbot.classList.contains('active') ? closeChatbot() : openChatbot();
  });
  chatbotClose.addEventListener('click', closeChatbot);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatbot.classList.contains('active')) closeChatbot();
  });

  // Delegated on chatbotBody so it also catches the "related services" chip
  // groups that get inserted dynamically after each answer.
  chatbotBody.addEventListener('click', (e) => {
    const chip = e.target.closest('.chatbot-chip');
    if (!chip) return;
    appendMessage(chip.textContent, 'user');

    // Dynamic, all-services chip (from the related-services engine below).
    const svcId = chip.dataset.svcId;
    if (svcId){
      const service = getServiceIndex().byId[svcId];
      if (service){ answerWithService(service); return; }
    }

    const topic = chip.dataset.topic;
    sendBotReply(CHATBOT_TOPIC_REPLIES[topic] || "Thanks — one of our specialists will follow up with you shortly.");
    if (CHATBOT_TOPIC_REPLIES[topic] && RELATED_SERVICES[topic]){
      setTimeout(() => renderRelatedChips(topic), 500);
    }
    if (CHATBOT_TOPIC_REPLIES[topic] && !NO_CTA_TOPICS.has(topic)){
      setTimeout(() => renderTalkToExpertCTA(), 900);
    }
  });

  chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatbotInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    chatbotInput.value = '';

    // 1. Mid-flow: treat the message as an answer to the current lead question.
    if (leadFlow.active){
      continueLeadFlow(text);
      return;
    }

    // 2. Small talk: greetings, thanks, goodbyes, "how are you", etc. —
    //    answered directly instead of falling through to the service
    //    knowledge base or the "unable to answer" escalation message.
    const smallTalkReply = detectSmallTalk(text);
    if (smallTalkReply){
      sendBotReply(smallTalkReply);
      return;
    }

    // 3. Intelligent search: match the free text to a curated core topic first.
    const topic = detectIntent(text);
    if (topic && CHATBOT_TOPIC_REPLIES[topic]){
      sendBotReply(CHATBOT_TOPIC_REPLIES[topic]);
      if (RELATED_SERVICES[topic]){
        setTimeout(() => renderRelatedChips(topic), 500);
      }
      if (!NO_CTA_TOPICS.has(topic)){
        setTimeout(() => renderTalkToExpertCTA(), 900);
      }
      return;
    }

    // 4. Fall back to the full knowledge base — every service across
    //    startup registration, IPR, tax, GST, ROC compliance, consultation
    //    and software, not just the curated core topics above.
    const service = findServiceByFreeText(text);
    if (service){
      answerWithService(service);
      return;
    }

    // 5. Buying intent — collect lead details one question at a time.
    if (hasBuyingIntent(text)){
      startLeadFlow();
      return;
    }

    // 6. Escalation — nothing confidently matched.
    sendEscalationReply();
  });

  // Existing code...

/* ---------------- Hero Typewriter ---------------- */

const typewriterElement = document.getElementById("typewriterWord");

if (typewriterElement) {

    const words = [
        "growth",
        "revenue",
        "business",
        "profits",
        "innovation"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

        }

        setTimeout(typeEffect, deleting ? 60 : 120);

    }

    typeEffect();

}

/* ---------------- Chatbot Welcome Popup ---------------- */
(() => {
  const welcome = document.getElementById('chatbotWelcome');
  if (!welcome) return; // only present on the home page

  const closeBtn = document.getElementById('chatbotWelcomeClose');
  const startBtn = document.getElementById('chatbotWelcomeStart');
  const SESSION_KEY = 'mbsChatbotWelcomeShown';

  const SHOW_DELAY = 2000;   // show 2s after page load
  const AUTO_HIDE_AFTER = 30000; // auto-close after 30s if untouched

  let autoHideTimer = null;

  function hideWelcome(){
    welcome.classList.remove('show');
    if (autoHideTimer){
      clearTimeout(autoHideTimer);
      autoHideTimer = null;
    }
  }

  function showWelcome(){
    // Don't show again if it already appeared once this browser session,
    // and never show it while the chat panel itself is open.
    if (sessionStorage.getItem(SESSION_KEY) === '1') return;
    if (document.getElementById('chatbot')?.classList.contains('active')) return;

    welcome.classList.add('show');
    sessionStorage.setItem(SESSION_KEY, '1');

    autoHideTimer = setTimeout(hideWelcome, AUTO_HIDE_AFTER);
  }

  setTimeout(showWelcome, SHOW_DELAY);

  closeBtn?.addEventListener('click', hideWelcome);

  startBtn?.addEventListener('click', () => {
    hideWelcome();
    document.getElementById('chatbotToggle')?.click();
  });
})();

// Keep this as the last line
});