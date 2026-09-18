/* ==========================================================================
   PRICING PAGE — renders every category/service/plan from pricing-data.js
   using the exact same card markup & classes as the per-service pricing
   cards on service.html (service.css), so the visual design matches
   exactly with zero new component styling required.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var data = window.PRICING_DATA || [];
  var wrap = document.getElementById('pricingCategories');
  var quickNav = document.getElementById('pricingQuickNav');
  if (!wrap) return;

  function money(n) {
    return (window.MBS_DB ? window.MBS_DB.money(n) : ('₹' + Number(n).toLocaleString('en-IN')));
  }

  function slug(s) {
    return 'pricing-' + s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  var priceTierIcons = [
    '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
    '<path d="M12 2l2.9 6.26L21 9.27l-4.5 4.39L17.8 21 12 17.77 6.2 21l1.3-7.34L3 9.27l6.1-1.01z"/>',
    '<path d="M5 8l3 3 4-6 4 6 3-3-1.5 10h-11z"/><path d="M6 21h12"/>'
  ];

  // Builds one pricing card. `service` gives the id (for linking through to
  // its full service page) and name (for prefilling the enquiry form).
  function cardHtml(service, tier, iconIndex) {
    var icon = priceTierIcons[iconIndex % priceTierIcons.length];

    var gsParams = new URLSearchParams({
      service: service.name,
      plan: tier.name,
      price: tier.price
    });
    var gsHref = 'get-started.html?' + gsParams.toString();

    return '' +
      '<div class="svc-price-card js-price-card reveal-up' + (tier.recommended ? ' recommended' : '') + '">' +
        (tier.recommended ? '<span class="svc-price-badge">Recommended</span>' : '') +
        '<span class="svc-price-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6">' + icon + '</svg></span>' +
        '<h3>' + tier.name + '</h3>' +
        '<p class="svc-price-desc">' + (tier.desc || '') + '</p>' +
        (tier.startingFrom ? '<span class="svc-price-offer-tag">Starting from</span>' : '') +
        '<div class="svc-price-amount">' + money(tier.price) + '</div>' +
        '<span class="svc-price-fee-note">' + (service.category === 'Software Services' ? '+ GST applicable' : '+ GST &amp; Govt. fees applicable') + '</span>' +
        '<ul class="svc-price-includes">' + (tier.includes || []).map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' +
        '<a href="' + gsHref + '" class="btn ' + (tier.recommended ? 'btn-primary' : 'btn-outline') + '">' + (service.tiers.length > 1 ? 'Choose ' + tier.name : 'Get Started') + '</a>' +
        (service.id ? '<a href="service.html?id=' + service.id + '" class="pricing-learn-more">View full details</a>' : '') +
      '</div>';
  }

  var navChips = [];
  var sections = data.map(function (cat) {
    var catSlug = slug(cat.category);
    navChips.push('<a href="#' + catSlug + '" class="pricing-nav-chip">' + cat.category + '</a>');

    var multiTier = cat.services.filter(function (s) { return s.tiers.length > 1; });
    var singleTier = cat.services.filter(function (s) { return s.tiers.length === 1; });

    var multiHtml = multiTier.map(function (svc) {
      svc.category = cat.category;
      return '' +
        '<div class="pricing-service-block">' +
          '<h3 class="pricing-service-title reveal-up">' + svc.name + '</h3>' +
          '<div class="svc-pricing-grid">' +
            svc.tiers.map(function (t, i) { return cardHtml(svc, t, i); }).join('') +
          '</div>' +
        '</div>';
    }).join('');

    var singleHtml = '';
    if (singleTier.length) {
      singleHtml = '' +
        '<div class="pricing-service-block">' +
          (multiTier.length ? '<h3 class="pricing-service-title reveal-up">Other Services in ' + cat.category + '</h3>' : '') +
          '<div class="svc-pricing-grid pricing-grid-compact">' +
            singleTier.map(function (svc, i) {
              svc.category = cat.category;
              return cardHtml(svc, svc.tiers[0], i);
            }).join('') +
          '</div>' +
        '</div>';
    }

    return '' +
      '<section class="section svc-section pricing-category-section" id="' + catSlug + '">' +
        '<div class="container">' +
          '<div class="section-head">' +
            '<p class="eyebrow reveal-up">' + (cat.eyebrow || 'Pricing') + '</p>' +
            '<h2 class="section-title reveal-up">' + cat.category + '</h2>' +
            (cat.desc ? '<p class="section-desc reveal-up" data-delay="1">' + cat.desc + '</p>' : '') +
          '</div>' +
          multiHtml + singleHtml +
        '</div>' +
      '</section>';
  });

  wrap.innerHTML = sections.join('');
  if (quickNav) quickNav.innerHTML = navChips.join('');

  // Alternate background tint per category, matching the alt-section
  // pattern already used elsewhere on the site (e.g. Why Choose Us).
  document.querySelectorAll('.pricing-category-section').forEach(function (sec, i) {
    if (i % 2 === 1) sec.classList.add('svc-section-alt');
  });

  // Smooth-scroll for the quick nav chips.
  document.querySelectorAll('.pricing-nav-chip').forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      var target = document.querySelector(chip.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Tap-to-highlight for touch devices, same behaviour as service.html cards.
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.js-price-card')) {
      document.querySelectorAll('.js-price-card.is-tapped').forEach(function (c) { c.classList.remove('is-tapped'); });
    }
  });
  wrap.addEventListener('click', function (e) {
    var card = e.target.closest('.js-price-card');
    if (!card || e.target.closest('a')) return;
    var wasActive = card.classList.contains('is-tapped');
    document.querySelectorAll('.js-price-card.is-tapped').forEach(function (c) { c.classList.remove('is-tapped'); });
    if (!wasActive) card.classList.add('is-tapped');
  });

  // Reveal-up animation safety net for content injected after DOMContentLoaded.
  if (typeof window.IntersectionObserver === 'function') {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-up').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal-up').forEach(function (el) { el.classList.add('in-view'); });
  }
});
