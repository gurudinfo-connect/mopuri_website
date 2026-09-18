(function(){
  'use strict';

  function iconSvg(name, w){
    w = w || 22;
    var paths = (window.SERVICE_ICONS && window.SERVICE_ICONS[name]) || (window.SERVICE_ICONS && window.SERVICE_ICONS.doc) || '';
    return '<svg viewBox="0 0 24 24" width="'+w+'" height="'+w+'" fill="none" stroke="currentColor" stroke-width="1.6">'+paths+'</svg>';
  }

  function initials(name){
    return name.split(' ').map(function(p){return p[0];}).join('').slice(0,2).toUpperCase();
  }

  function getParam(key){
    var params = new URLSearchParams(window.location.search);
    return params.get(key);
  }

  function renderNotFound(){
    var main = document.getElementById('serviceMain');
    main.innerHTML = '<div class="container" style="padding:160px 0 120px;text-align:center;">' +
      '<p class="eyebrow">Oops</p>' +
      '<h1 class="section-title" style="margin-bottom:16px;">Service not found</h1>' +
      '<p class="section-desc" style="margin:0 auto 32px;">The service you are looking for may have moved. Browse all our services from the menu or homepage.</p>' +
      '<a href="index.html#services" class="btn btn-primary btn-lg">Back to Services</a>' +
      '</div>';
  }

  function money(n){
    return '₹' + n.toLocaleString('en-IN');
  }

  function render(svc){
    // ---- SEO / meta ----
    document.title = svc.name + ' — Mopuri Business Solutions';
    var desc = (svc.about && svc.about.whatIsIt ? svc.about.whatIsIt.split('. ')[0] : svc.name) + '. Get expert help with ' + svc.name + ' from Mopuri Business Solutions.';
    var descTag = document.getElementById('pageDescription');
    if(descTag) descTag.setAttribute('content', desc.slice(0, 158));

    // ---- Hero (title only — no breadcrumb, no background image) ----
    var nameEl = document.getElementById('svcName');
    if(nameEl){
      nameEl.textContent = svc.name;
      nameEl.style.fontSize = '';
      // Auto-fit: shrink the title in small steps until it fits on one line,
      // so long service names never get ellipsis-truncated on smaller screens.
      requestAnimationFrame(function(){
        var computed = parseFloat(getComputedStyle(nameEl).fontSize);
        var minSize = window.innerWidth <= 480 ? 15 : (window.innerWidth <= 768 ? 17 : 20);
        var guard = 0;
        while(nameEl.scrollWidth > nameEl.clientWidth + 1 && computed > minSize && guard < 40){
          computed -= 1;
          nameEl.style.fontSize = computed + 'px';
          guard++;
        }
      });
    }

    // ---- Enquiry card copy + benefits (unique per service) ----
    var leadHeadingEl = document.getElementById('svcLeadHeading');
    if(leadHeadingEl){
      var noRepeatConsultationIds = ['ca-consultation', 'legal-consultation'];
      if(noRepeatConsultationIds.indexOf(svc.id) !== -1){
        // These pages are already about booking a consultation, so a
        // "Get Free Consultation" heading here is redundant — remove it.
        leadHeadingEl.style.display = 'none';
      } else {
        leadHeadingEl.style.display = '';
        leadHeadingEl.textContent = 'Get Free Consultation for ' + svc.name;
      }
    }

    var leadDescEl = document.getElementById('svcLeadDesc');
    if(leadDescEl){
      var leadFirstLine = (svc.about && svc.about.whatIsIt)
        ? svc.about.whatIsIt.split('. ')[0].replace(/\.$/, '') + '.'
        : svc.name + '.';
      var leadClosing = svc.category === 'software'
        ? ' Share your requirements and our team will get back to you with a clear plan and pricing.'
        : ' Share your requirements and our experts will get back to you with the right process and pricing.';
      leadDescEl.textContent = leadFirstLine + leadClosing;
    }

    var leadBenefitsEl = document.getElementById('svcLeadBenefits');
    if(leadBenefitsEl){
      var leadBenefits = (svc.benefits || []).slice(0, 4);
      leadBenefitsEl.innerHTML = leadBenefits.map(function(b, i){
        return '<li class="reveal-up" data-delay="'+(1 + (i % 2))+'"><span class="leadgen-check">'+iconSvg(b.i, 15)+'</span>'+b.t+'</li>';
      }).join('');
    }

    // ---- Service Required dropdown(s) ----
    // Populate every enquiry form's "Service Required" select with only the
    // services that belong to the same navigation menu (category) as the
    // service page currently open — never services from other menus.
    function populateServiceDropdown(selectEl){
      if(!selectEl) return;
      var sameCategory = (window.SERVICES_DATA || []).filter(function(s){
        return s.category === svc.category;
      });
      var html = '<option value="" disabled selected>Select a service</option>';
      sameCategory.forEach(function(s){
        html += '<option' + (s.id === svc.id ? ' selected' : '') + '>' + s.name + '</option>';
      });
      html += '<option value="Other">Other / Not sure yet</option>';
      selectEl.innerHTML = html;
    }
    populateServiceDropdown(document.getElementById('leadService'));
    populateServiceDropdown(document.getElementById('consultService'));

    // ---- "Selected Plan" dropdown on the enquiry form ----
    // Lists this service's own pricing tiers so a plan clicked on a
    // pricing card (or picked manually) travels with the enquiry.
    function populatePlanDropdown(selectEl, service){
      if(!selectEl) return;
      var fieldWrap = selectEl.closest('.form-field');
      if(!service.pricing || service.pricing.length < 2){
        // Single-tier / starting-from services don't need a plan picker.
        if(fieldWrap) fieldWrap.style.display = 'none';
        selectEl.innerHTML = '<option value="">General enquiry</option>';
        return;
      }
      if(fieldWrap) fieldWrap.style.display = '';
      var html = '<option value="">General enquiry (no plan selected)</option>';
      service.pricing.forEach(function(p){
        html += '<option value="'+p.name.replace(/"/g,'&quot;')+'">'+p.name+' — '+money(p.price)+(p.recommended ? ' (Recommended)' : '')+'</option>';
      });
      selectEl.innerHTML = html;
    }

    // ---- Starting price banner (below the form) — non-software services
    // only, since software services don't carry a pricing/documents section.
    var heroPriceBanner = document.getElementById('svcHeroPriceBanner');
    if(heroPriceBanner){
      if(svc.category === 'software' || !svc.pricing || !svc.pricing.length){
        heroPriceBanner.style.display = 'none';
      } else {
        heroPriceBanner.style.display = '';
        var lowestPrice = svc.pricing.reduce(function(min, p){
          return (typeof p.price === 'number' && p.price < min) ? p.price : min;
        }, svc.pricing[0].price);
        document.getElementById('svcHeroPriceName').textContent = svc.name;
        document.getElementById('svcHeroPriceAmount').textContent = money(lowestPrice);
      }
    }

    // ---- About ----
    document.getElementById('svcAboutTitle').textContent = 'Everything you need to know about ' + svc.name;
    var aboutIcons = [
      '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4"/>',
      '<path d="M13 2L3 14h7l-1 8 11-14h-8l1-6z"/>',
      '<path d="M3 21h18M6 21V9l6-4 6 4v12M10 21v-6h4v6"/>',
      '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'
    ];
    var aboutLowestPrice = svc.pricing.reduce(function(min, p){
      return (typeof p.price === 'number' && p.price < min) ? p.price : min;
    }, svc.pricing[0].price);
    var aboutItems = [
      { h:'What is ' + svc.name + '?', p: svc.about.whatIsIt, icon: aboutIcons[0] },
      { h:'Why is it important?', p: svc.about.whyImportant, icon: aboutIcons[1] },
      { h:'Why do businesses need it?', p: svc.about.whyBusinessNeeds, icon: aboutIcons[2] },
      { h:'What does it cost and how long does it take?', p:'Pricing for ' + svc.name + ' starts at ' + money(aboutLowestPrice) + ', with typical delivery in ' + svc.timeline + ' — so you always know what to expect before you begin.', icon: aboutIcons[3] },
    ];
    document.getElementById('svcAboutGrid').innerHTML = aboutItems.map(function(a){
      return '<div class="svc-about-card reveal-up">' +
        '<span class="svc-about-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6">'+a.icon+'</svg></span>' +
        '<h3>'+a.h+'</h3><p>'+a.p+'</p></div>';
    }).join('');

    // ---- Benefits ----
    document.getElementById('svcBenefitsGrid').innerHTML = svc.benefits.map(function(b, i){
      return '<div class="svc-benefit-card reveal-up" data-delay="'+(i%4)+'">' +
        '<span class="svc-benefit-icon">'+iconSvg(b.i, 22)+'</span>' +
        '<h3>'+b.t+'</h3><p>'+b.d+'</p></div>';
    }).join('');

    // ---- Documents ----
    // Software Services subtopics do not carry a Documents Required section
    // (not applicable to that category), so it is hidden entirely for
    // svc.category === 'software'. All other categories keep it.
    // (Eligibility is intentionally not rendered as a section anywhere.)
    var docsSection = document.getElementById('svc-documents');
    var isSoftware = svc.category === 'software';

    if(isSoftware || !svc.documents || !svc.documents.length){
      docsSection.style.display = 'none';
    } else {
      docsSection.style.display = '';
      document.getElementById('svcDocsGrid').innerHTML = svc.documents.map(function(d, i){
        return '<div class="svc-doc-card reveal-up" data-delay="'+(i%4)+'">' +
          '<span class="svc-doc-icon">'+iconSvg(d.i, 18)+'</span>' +
          '<div><h4>'+d.t+'</h4><p>'+d.d+'</p></div></div>';
      }).join('');
    }

    // ---- Process ----
    document.getElementById('svcProcessTitle').textContent = 'How we deliver ' + svc.name;
    document.getElementById('svcProcessGrid').innerHTML = svc.process.map(function(s, i){
      return '<div class="svc-process-step reveal-up" data-delay="'+(i%4)+'">' +
        '<span class="process-num">'+String(i+1).padStart(2,'0')+'</span>' +
        '<h3>'+s.t+'</h3><p>'+s.d+'</p></div>';
    }).join('');

    // ---- Timeline ----
    document.getElementById('svcTimelineTitle').textContent = 'Timeline for ' + svc.name;
    document.getElementById('svcTimelineText').textContent = svc.category === 'software'
      ? 'Delivery time depends on the scope and complexity of ' + svc.name + ', but we ensure your project moves as fast as possible without compromising on quality.'
      : 'Government processing time depends on the department handling ' + svc.name + ', but we ensure your file moves as fast as officially possible by getting the paperwork right the first time.';

    var timelineFactors = svc.category === 'software'
      ? [
          'Clarity and completeness of your requirements/brief',
          'Number of revisions and feedback rounds needed',
          'Complexity and scope of the project',
          'Package selected and priority turnaround opted for'
        ]
      : [
          'Completeness and accuracy of documents submitted',
          'Current processing load at the relevant government department',
          'Speed of response to any departmental queries or clarifications',
          'Package selected and priority processing opted for'
        ];
    document.getElementById('svcTimelineFactors').innerHTML = timelineFactors.map(function(f){
      return '<li>'+f+'</li>';
    }).join('');

    document.getElementById('svcTimelineNote').textContent = svc.category === 'software'
      ? 'Actual delivery time may vary based on project scope and feedback turnaround.'
      : 'Government processing time may vary based on department workload.';
    document.getElementById('svcTimelineBig').textContent = svc.timeline;

    // ---- Pricing ----
    // Every piece of text/number on these cards (GST note, payment options,
    // EMI note, offer line, CTA label, original price / discount / savings)
    // is read from data — window.PRICE_CARD_DEFAULTS for site-wide defaults,
    // with optional per-tier overrides on each svc.pricing[] entry. Nothing
    // below is hardcoded; edit services-data.js only.
    document.getElementById('svcPricingTitle').textContent = 'Pricing for ' + svc.name;
    var svcPricingGridEl = document.getElementById('svcPricingGrid');
    // Grid is a fixed 3-column layout for services with 3 tiers (unchanged
    // from the original design). Services with only 1 or 2 tiers get a
    // "count-N" class so CSS can center those cards instead of leaving
    // empty grid columns — see .svc-pricing-grid.count-1/.count-2 in
    // service.css. This only affects pages that don't already have 3 cards.
    svcPricingGridEl.className = 'svc-pricing-grid count-' + Math.min(svc.pricing.length, 3);
    var priceDefaults = window.PRICE_CARD_DEFAULTS || {};
    var defaultFeeNote = svc.category === 'software'
      ? (priceDefaults.gstTextSoftware || '')
      : (priceDefaults.gstTextGeneral || '');
    var priceTierIcons = [
      '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
      '<path d="M12 2l2.9 6.26L21 9.27l-4.5 4.39L17.8 21 12 17.77 6.2 21l1.3-7.34L3 9.27l6.1-1.01z"/>',
      '<path d="M5 8l3 3 4-6 4 6 3-3-1.5 10h-11z"/><path d="M6 21h12"/>'
    ];
    document.getElementById('svcPricingGrid').innerHTML = svc.pricing.map(function(p, i){
      var icon = priceTierIcons[i % priceTierIcons.length];

      var feeNote = p.gstText || defaultFeeNote;
      var paymentOptions = (p.paymentOptions && p.paymentOptions.length) ? p.paymentOptions : (priceDefaults.paymentOptions || []);
      var emiText = p.emiText || priceDefaults.emiText || '';
      var offerText = p.offerText || priceDefaults.offerText || '';
      var ctaTemplate = p.ctaText || priceDefaults.ctaText || 'Choose {plan}';
      var ctaLabel = ctaTemplate.replace('{plan}', p.name);

      var originalPriceHtml = (typeof p.originalPrice === 'number' && p.originalPrice > p.price)
        ? '<small class="svc-price-original">'+money(p.originalPrice)+'</small>' : '';

      // "Starting from" price label — used for services with a single,
      // from-price tier (set p.startingFrom = true in services-data.js).
      var startingFromHtml = p.startingFrom ? '<span class="svc-price-from-label">Starting from</span>' : '';

      var discountRowHtml = '';
      if(p.discountPercent || p.savings){
        discountRowHtml = '<div class="svc-price-discount-row">' +
          (p.discountPercent ? '<span class="svc-price-discount-badge">'+p.discountPercent+'% OFF</span>' : '') +
          (p.savings ? '<span class="svc-price-savings">You save '+money(p.savings)+'</span>' : '') +
          '</div>';
      }

      var paymentHtml = paymentOptions.length
        ? '<p class="svc-price-payment"><strong>Payment options:</strong> '+paymentOptions.join(', ')+'</p>' : '';

      // ---- Choose Plan → scrolls to this page's own enquiry form ----
      // No redirect to get-started.html: clicking a plan smooth-scrolls to
      // the "Get Free Consultation" form further up this same service page
      // and pre-selects this service + plan in it (see the click handler
      // attached to .js-choose-plan below).
      return '<div class="svc-price-card js-price-card reveal-up'+(p.recommended ? ' recommended' : '')+'">' +
        (p.recommended ? '<span class="svc-price-badge">Recommended</span>' : '') +
        '<span class="svc-price-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6">'+icon+'</svg></span>' +
        '<h3>'+p.name+'</h3>' +
        '<p class="svc-price-desc">'+p.desc+'</p>' +
        (offerText ? '<span class="svc-price-offer-tag">'+offerText+'</span>' : '') +
        '<div class="svc-price-amount">'+startingFromHtml+money(p.price)+originalPriceHtml+'</div>' +
        discountRowHtml +
        (feeNote ? '<span class="svc-price-fee-note">'+feeNote+'</span>' : '') +
        '<ul class="svc-price-includes">'+p.includes.map(function(i){return '<li>'+i+'</li>';}).join('')+'</ul>' +
        (emiText ? '<p class="svc-price-emi">'+emiText+'</p>' : '') +
        paymentHtml +
        '<a href="#svc-leadgen" class="btn js-choose-plan '+(p.recommended?'btn-primary':'btn-outline')+'" data-plan-name="'+p.name.replace(/"/g,'&quot;')+'">'+ctaLabel+'</a>' +
        '</div>';
    }).join('');

    // ---- Choose Plan click behaviour ----
    // Pre-selects this service (already the case by default) and the
    // chosen plan in the on-page enquiry form, then smooth-scrolls to it.
    // Every service page uses its own enquiry form — nothing here ever
    // navigates to another page.
    populatePlanDropdown(document.getElementById('leadPlan'), svc);
    document.querySelectorAll('.js-choose-plan').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var planName = btn.getAttribute('data-plan-name');
        var serviceSelect = document.getElementById('leadService');
        var planSelect = document.getElementById('leadPlan');
        if(serviceSelect){
          serviceSelect.value = svc.name;
          serviceSelect.classList.remove('invalid');
          serviceSelect.closest('.form-field').classList.remove('invalid');
        }
        if(planSelect) planSelect.value = planName;
        var leadSection = document.getElementById('svc-leadgen');
        if(leadSection && typeof leadSection.scrollIntoView === 'function'){
          leadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Tap-to-highlight for touch devices: tapping the card body (not the
    // "Choose" button) shows the same highlight as :hover, without
    // navigating anywhere. Tapping elsewhere clears the highlight.
    document.querySelectorAll('.js-price-card').forEach(function(card){
      card.addEventListener('click', function(e){
        if(e.target.closest('a')) return; // let the Choose button work normally
        var wasActive = card.classList.contains('is-tapped');
        document.querySelectorAll('.js-price-card.is-tapped').forEach(function(c){ c.classList.remove('is-tapped'); });
        if(!wasActive) card.classList.add('is-tapped');
      });
    });
    document.addEventListener('click', function(e){
      if(!e.target.closest('.js-price-card')){
        document.querySelectorAll('.js-price-card.is-tapped').forEach(function(c){ c.classList.remove('is-tapped'); });
      }
    });

    // ---- FAQs ----
    document.getElementById('svcFaqTitle').textContent = 'FAQs about ' + svc.name;
    document.getElementById('svcFaqList').innerHTML = svc.faqs.map(function(f, i){
      return '<div class="svc-faq-item" data-idx="'+i+'">' +
        '<div class="svc-faq-q"><span>'+f[0]+'</span><span class="svc-faq-plus"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg></span></div>' +
        '<div class="svc-faq-a"><p>'+f[1]+'</p></div></div>';
    }).join('');

    // FAQ schema for SEO
    var faqSchema = {
      '@context':'https://schema.org', '@type':'FAQPage',
      mainEntity: svc.faqs.map(function(f){
        return { '@type':'Question', name:f[0], acceptedAnswer:{ '@type':'Answer', text:f[1] } };
      })
    };
    var schemaTag = document.createElement('script');
    schemaTag.type = 'application/ld+json';
    schemaTag.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(schemaTag);

    // ---- Testimonials ----
    document.getElementById('svcTestimonialGrid').innerHTML = svc.testimonials.map(function(t){
      return '<div class="svc-testimonial-card reveal-up">' +
        '<span class="svc-testi-quote-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9.5 7C6.5 8.5 5 10.8 5 13.5c0 2 1.3 3.5 3.2 3.5 1.6 0 2.8-1.2 2.8-2.7 0-1.4-1-2.5-2.3-2.5-.2 0-.4 0-.6.1.3-1.5 1.6-2.9 3.4-3.6L9.5 7zm9 0c-3 1.5-4.5 3.8-4.5 6.5 0 2 1.3 3.5 3.2 3.5 1.6 0 2.8-1.2 2.8-2.7 0-1.4-1-2.5-2.3-2.5-.2 0-.4 0-.6.1.3-1.5 1.6-2.9 3.4-3.6L18.5 7z"/></svg></span>' +
        '<div class="stars">'+'★★★★★'.slice(0, t.rating || 5)+'</div>' +
        '<p>"'+t.review+'"</p>' +
        '<div class="svc-testi-person"><span class="svc-testi-avatar">'+initials(t.name)+'</span>' +
        '<div><strong>'+t.name+'</strong><span>'+t.biz+'</span></div></div></div>';
    }).join('');

    // ---- Related services ----
    var byName = {};
    (window.SERVICES_DATA || []).forEach(function(s){ byName[s.name] = s; });
    document.getElementById('svcRelatedGrid').innerHTML = svc.related.map(function(name){
      var r = byName[name];
      if(!r) return '';
      var iconKey = (window.MEGA_ICONS && window.MEGA_ICONS[r.name]) || 'doc';
      return '<a href="service.html?id='+r.id+'" class="svc-related-card reveal-up">' +
        '<span class="svc-related-card-left">' +
        '<span class="svc-related-icon">'+iconSvg(iconKey, 18)+'</span>' +
        '<span class="rel-name">'+r.name+'</span></span>' +
        '<svg class="rel-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>';
    }).join('');

    // ---- FAQ accordion behaviour ----
    document.querySelectorAll('.svc-faq-item').forEach(function(item){
      var q = item.querySelector('.svc-faq-q');
      var a = item.querySelector('.svc-faq-a');
      q.addEventListener('click', function(){
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.svc-faq-item.open').forEach(function(other){
          other.classList.remove('open');
          other.querySelector('.svc-faq-a').style.maxHeight = null;
        });
        if(!isOpen){
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });

    // ---- Reveal-up animation for dynamically injected content ----
    // script.js already observes elements present at DOMContentLoaded; this
    // catches everything rendered afterwards by this script, using the same
    // 'in-view' class the stylesheet expects.
    var dynamicRevealEls = document.querySelectorAll('.reveal-up:not(.in-view)');
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      dynamicRevealEls.forEach(function(el){ io.observe(el); });
    } else {
      dynamicRevealEls.forEach(function(el){ el.classList.add('in-view'); });
    }
  }

  function boot(){
    var id = getParam('id');
    var data = window.SERVICES_DATA || [];
    var svc = data.find(function(s){ return s.id === id; });
    if(!svc){
      renderNotFound();
      return;
    }
    render(svc);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
