/* ==========================================================================
   GET STARTED PAGE — enquiry form logic
   - Searchable "Service Required" field (typeahead against every service
     listed in the site's navigation menus, free typing always allowed)
   - Validation for Name / Email / Mobile Number
   Reuses the shared MBS_NAME_RE / MBS_MOBILE_RE patterns already declared
   in script.js (loaded before this file) so validation rules stay
   identical across every enquiry form on the site.
   ========================================================================== */

// Every service listed across the site's navigation mega-menus
// (Software Services, Startup, IPR, Tax & Accounting, Registrations,
// ROC Compliance, Consultation) — used as suggestions for the
// "Service Required" field.
var GS_SERVICES = [
  'Website Designing & Development',
  'App Development',
  'Digital Marketing',
  'Graphic Designing',
  'Ecommerce Services',
  'Proprietorship',
  'Partnership Firm',
  'One Person Company',
  'Private Limited Company',
  'Limited Liability Partnership (LLP)',
  'Public Limited Company',
  'Nidhi Limited Company',
  'Section 8 Company',
  'NGO Registration',
  'Indian Subsidiary Company',
  'Trademark Registration',
  'Trademark Objection',
  'Trademark Hearing',
  'Trademark Opposition',
  'Trademark Legal Certificate',
  'Copyright Services',
  'Design Services',
  'Patent Services',
  'Income Tax Returns',
  'Form ITR 1 (Form 16)',
  'Form ITR 2 (Directors / HUF)',
  'Form ITR 3 (Proprietor/Other)',
  'Form ITR 4 (Professional/Commission)',
  'Form ITR 5 (Partnership/LLP)',
  'Form ITR 6 (Company)',
  'Tax Audit',
  'Financial Preparation',
  'Book-Keeping Services',
  'Income Tax Notice',
  'GST Registration',
  'GST Filings',
  'Import & Export License',
  'FSSAI Registration (FoSCoS)',
  'FSSAI State License (FoSCoS)',
  'FSSAI Central License (FoSCoS)',
  'FSSAI Modification (FoSCoS)',
  'FSSAI Renewal (FoSCoS)',
  'EPF Registration / Compliance',
  'ESI Registration / Compliance',
  'Private Limited Compliance',
  'LLP Compliance',
  'Public Limited Compliance',
  'Section 8 Compliance',
  'Director E-KYC (DIR 3)',
  'ROC Modification',
  'Share Transfer',
  'CA Consultation',
  'Legal Consultation'
];

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- No auto-focused field on arrival ----------------
     Arriving here via a "Choose Plan" / "Get Started" link should never
     leave a field focused (and therefore ringed with the focus-highlight
     border) — the person should land on a clean, unfocused form. */
  (function clearAutoFocus() {
    function blurActive() {
      var active = document.activeElement;
      if (active && active !== document.body && typeof active.blur === 'function') {
        active.blur();
      }
    }
    blurActive();
    window.addEventListener('load', blurActive);
    setTimeout(blurActive, 0);
  })();

  /* ---------------- Prefill from a "Get Started" / "Choose Plan" link ----------------
     pricing.html and service.html link here with ?service=...&plan=...&price=...
     so the enquiry only has to be typed once. */
  (function prefillFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var svc = params.get('service');
    var plan = params.get('plan');
    var price = params.get('price');

    var serviceEl = document.getElementById('gsService');
    var planEl = document.getElementById('gsPlan');
    var priceEl = document.getElementById('gsPrice');
    var chip = document.getElementById('gsPlanChip');
    var chipValue = document.getElementById('gsPlanChipValue');
    var chipClear = document.getElementById('gsPlanChipClear');

    if (svc && serviceEl) serviceEl.value = svc;
    if (plan && planEl) planEl.value = plan;
    if (price && priceEl) priceEl.value = price;

    if (svc && chip && chipValue) {
      var label = svc;
      if (plan) label += ' — ' + plan;
      if (price) label += ' (₹' + Number(price).toLocaleString('en-IN') + ')';
      chipValue.textContent = label;
      chip.hidden = false;
    }

    if (chipClear && chip) {
      chipClear.addEventListener('click', function () {
        chip.hidden = true;
        if (planEl) planEl.value = '';
        if (priceEl) priceEl.value = '';
        if (serviceEl) serviceEl.value = '';
      });
    }
  })();

  /* ---------------- Searchable "Service Required" field ---------------- */
  var serviceInput = document.getElementById('gsService');
  var suggestBox = document.getElementById('gsSuggestions');
  var serviceField = document.getElementById('gsServiceField');
  var currentMatches = [];
  var activeIndex = -1;

  function revalidateService() {
    if (serviceField && serviceField.classList.contains('invalid') && gsServiceOk()) {
      serviceField.classList.remove('invalid');
    }
  }

  function highlightActive(items) {
    items.forEach(function (item, i) {
      item.classList.toggle('active', i === activeIndex);
    });
  }

  function renderSuggestions(matches, query) {
    suggestBox.innerHTML = '';

    if (!matches.length) {
      suggestBox.hidden = true;
      return;
    }

    matches.forEach(function (label, i) {
      var item = document.createElement('div');
      item.className = 'gs-suggestion';
      item.setAttribute('role', 'option');

      // Plain text only — no character splitting, no highlighting markup.
      item.textContent = label;

      // Selecting a suggestion fills the field automatically.
      item.addEventListener('mousedown', function (e) {
        e.preventDefault();
        serviceInput.value = label;
        suggestBox.hidden = true;
        activeIndex = -1;
        revalidateService();
      });

      suggestBox.appendChild(item);
    });

    suggestBox.hidden = false;
  }

  function updateSuggestions() {
    var query = serviceInput.value.trim();
    activeIndex = -1;

    if (!query) {
      currentMatches = [];
      suggestBox.hidden = true;
      return;
    }

    var q = query.toLowerCase();
    // Only ever suggests services already listed in the site's nav menus —
    // the person can still keep typing a custom service that isn't matched.
    currentMatches = GS_SERVICES.filter(function (s) {
      return s.toLowerCase().indexOf(q) > -1;
    }).slice(0, 8);

    renderSuggestions(currentMatches, query);
  }

  if (serviceInput && suggestBox && serviceField) {
    serviceInput.addEventListener('input', function () {
      updateSuggestions();
      revalidateService();
    });

    serviceInput.addEventListener('focus', function () {
      if (serviceInput.value.trim()) updateSuggestions();
    });

    document.addEventListener('click', function (e) {
      if (!serviceField.contains(e.target)) suggestBox.hidden = true;
    });

    serviceInput.addEventListener('keydown', function (e) {
      var items = suggestBox.querySelectorAll('.gs-suggestion');
      if (suggestBox.hidden || !items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        highlightActive(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        highlightActive(items);
      } else if (e.key === 'Enter') {
        if (activeIndex > -1 && currentMatches[activeIndex]) {
          e.preventDefault();
          serviceInput.value = currentMatches[activeIndex];
          suggestBox.hidden = true;
          activeIndex = -1;
          revalidateService();
        }
        // Otherwise let Enter submit the form as normal (custom typed value).
      } else if (e.key === 'Escape') {
        suggestBox.hidden = true;
      }
    });
  }

  /* ---------------- Form validation ---------------- */
  var form = document.getElementById('getStartedForm');
  if (!form) return;

  var submitBtn = document.getElementById('gsSubmit');
  var successMsg = document.getElementById('gsFormSuccess');
  var GS_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function gsNameOk() {
    return MBS_NAME_RE.test(document.getElementById('gsName').value.trim());
  }
  function gsEmailOk() {
    return GS_EMAIL_RE.test(document.getElementById('gsEmail').value.trim());
  }
  function gsPhoneOk() {
    return MBS_MOBILE_RE.test(document.getElementById('gsPhone').value.trim());
  }
  function gsServiceOk() {
    return document.getElementById('gsService').value.trim().length >= 2;
  }

  function setInvalid(fieldEl, isInvalid) {
    if (fieldEl) fieldEl.classList.toggle('invalid', isInvalid);
  }

  function validateForm() {
    var valid = true;

    var nameField = document.getElementById('gsName').closest('.form-field');
    var emailField = document.getElementById('gsEmail').closest('.form-field');
    var phoneField = document.getElementById('gsPhone').closest('.form-field');

    var nameOk = gsNameOk();
    setInvalid(nameField, !nameOk);
    if (!nameOk) valid = false;

    var emailOk = gsEmailOk();
    setInvalid(emailField, !emailOk);
    if (!emailOk) valid = false;

    var phoneOk = gsPhoneOk();
    setInvalid(phoneField, !phoneOk);
    if (!phoneOk) valid = false;

    var serviceOk = gsServiceOk();
    setInvalid(serviceField, !serviceOk);
    if (!serviceOk) valid = false;

    return valid;
  }

  // ---- Full Name: letters + spaces only, blocked at keystroke level ----
  // (no numbers, symbols, or emoji — and nothing invalid is ever allowed
  // to render, not even for a single frame).
  var nameInput = document.getElementById('gsName');
  function sanitizeName(value) {
    return value.replace(/[^A-Za-z ]/gu, '');
  }
  if (nameInput) {
    // Blocks a bad character before it's ever inserted (typing, IME, drop).
    nameInput.addEventListener('beforeinput', function (e) {
      if (typeof e.data === 'string' && /[^A-Za-z ]/u.test(e.data)) {
        e.preventDefault();
      }
    });
    // Pasting: strip anything invalid out of the pasted text itself,
    // rather than letting it land in the field first.
    nameInput.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData('text');
      var cleaned = sanitizeName(text);
      var start = nameInput.selectionStart, end = nameInput.selectionEnd;
      var val = nameInput.value;
      nameInput.value = val.slice(0, start) + cleaned + val.slice(end);
      var pos = start + cleaned.length;
      nameInput.setSelectionRange(pos, pos);
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    });
    // Safety net for anything that slips through the above (e.g. autofill).
    nameInput.addEventListener('input', function () {
      var cleaned = sanitizeName(nameInput.value);
      if (cleaned !== nameInput.value) {
        var start = nameInput.selectionStart;
        nameInput.value = cleaned;
        if (start !== null) nameInput.setSelectionRange(start - 1, start - 1);
      }
    });
  }

  // ---- Mobile Number: digits only, max 10, blocked at keystroke level ----
  var phoneInput = document.getElementById('gsPhone');
  function sanitizePhone(value) {
    return value.replace(/\D/g, '').slice(0, 10);
  }
  if (phoneInput) {
    // Blocks a non-digit before it's ever inserted.
    phoneInput.addEventListener('beforeinput', function (e) {
      if (typeof e.data === 'string' && /\D/.test(e.data)) {
        e.preventDefault();
      }
    });
    // Pasting: strip non-digits out of the pasted text and cap at 10.
    phoneInput.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData('text');
      var digits = text.replace(/\D/g, '');
      var start = phoneInput.selectionStart, end = phoneInput.selectionEnd;
      var val = phoneInput.value;
      var next = (val.slice(0, start) + digits + val.slice(end)).replace(/\D/g, '').slice(0, 10);
      phoneInput.value = next;
      phoneInput.setSelectionRange(next.length, next.length);
      phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
    });
    // Safety net (also covers drag-and-drop, autofill).
    phoneInput.addEventListener('input', function () {
      phoneInput.value = sanitizePhone(phoneInput.value);
    });
  }

  // Re-validate live as the person types, so a field's red border clears
  // itself the moment its value becomes valid.
  var fieldChecks = {
    gsName: gsNameOk,
    gsEmail: gsEmailOk,
    gsPhone: gsPhoneOk
  };
  Object.keys(fieldChecks).forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var revalidate = function () {
      var f = el.closest('.form-field');
      if (f.classList.contains('invalid') && fieldChecks[id]()) {
        setInvalid(f, false);
      }
    };
    el.addEventListener('input', revalidate);
    el.addEventListener('change', revalidate);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    var planEl = document.getElementById('gsPlan');
    var priceEl = document.getElementById('gsPrice');
    var planValue = planEl ? planEl.value.trim() : '';
    var priceValue = priceEl ? priceEl.value.trim() : '';

    var formData = new FormData(form);
    if (planValue) formData.append('plan', planValue);
    if (priceValue) formData.append('price', priceValue);

    window.MBS_sendFormEmail(formData, 'New Get Started Enquiry — Mopuri Business Solutions')
      .finally(function () {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Save the enquiry: this auto-creates the customer account (or reuses
        // the existing one if the email already has an account) and signs
        // the customer in — no OTP/email verification step, matching the
        // site's enquiry flow. See account.js for the storage layer.
        if (window.MBS_DB) {
          window.MBS_DB.addEnquiry({
            name: document.getElementById('gsName').value.trim(),
            email: document.getElementById('gsEmail').value.trim(),
            phone: document.getElementById('gsPhone').value.trim(),
            service: document.getElementById('gsService').value.trim(),
            plan: planValue,
            price: priceValue,
            message: document.getElementById('gsMessage').value.trim()
          });
        }

        if (successMsg) successMsg.classList.add('show');
        form.reset();
        suggestBox.hidden = true;
      });
  });
});
