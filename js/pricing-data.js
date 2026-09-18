/* ==========================================================================
   PRICING PAGE DATA
   Central place to edit every price shown on pricing.html. Every service
   has three tiers — Basic / Professional (Recommended) / Premium — rendered
   through the exact same card markup & classes as the per-service pricing
   cards on service.html (service.css), so the visual design matches
   exactly with zero new component styling required. "id" links the card
   through to its full service.html page.
   ========================================================================== */

window.PRICING_DATA = [
  {
    category: 'Software Services',
    eyebrow: 'Build & Grow Online',
    desc: 'Website, app, marketing, design and ecommerce packages for businesses ready to go digital.',
    services: [
      {
        id: 'website-designing-development',
        name: 'Website Designing & Development',
        tiers: [
          { name: 'Basic', price: 7999, desc: 'A clean, professional website to get you online', includes: ['Up to 5 pages', 'Mobile-responsive design', 'Basic on-page SEO setup', '1 round of revisions'] },
          { name: 'Professional', price: 12999, recommended: true, desc: 'A feature-rich site built to convert visitors', includes: ['Everything in Basic', 'Up to 10 pages', 'Custom UI design', 'Contact & enquiry forms', '3 rounds of revisions'] },
          { name: 'Premium', price: 25999, desc: 'A scalable, fully custom web presence', includes: ['Everything in Professional', 'Unlimited pages', 'Advanced integrations', 'Priority delivery', '3 months post-launch support'] }
        ]
      },
      {
        id: 'app-development',
        name: 'App Development',
        tiers: [
          { name: 'Basic', price: 59999, desc: 'A single-platform app covering your core features', includes: ['Android or iOS app', 'Up to 5 core screens', 'Basic backend integration', 'Play Store/App Store submission support'] },
          { name: 'Professional', price: 89999, recommended: true, desc: 'A polished cross-platform app for growing businesses', includes: ['Android & iOS app', 'Up to 12 screens', 'API & payment gateway integration', 'Admin panel included'] },
          { name: 'Premium', price: 125999, desc: 'A fully custom, scalable app build', includes: ['Everything in Professional', 'Unlimited screens', 'Advanced backend architecture', 'Dedicated project manager', '3 months post-launch support'] }
        ]
      },
      {
        id: 'digital-marketing',
        name: 'Digital Marketing',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Get started with focused social & search visibility', includes: ['1 platform managed', 'Monthly content calendar', 'Basic performance report'] },
          { name: 'Professional', price: 4999, recommended: true, desc: 'A multi-channel plan to build steady momentum', includes: ['Up to 3 platforms managed', 'Ad campaign setup', 'Monthly analytics review', 'Priority support'] },
          { name: 'Premium', price: 8999, desc: 'Full-funnel marketing management', includes: ['Everything in Professional', 'Dedicated marketing manager', 'SEO + paid ads combined', 'Weekly performance reporting'] }
        ]
      },
      {
        id: 'graphic-designing',
        name: 'Graphic Designing',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Essential design assets to get you started', includes: ['Up to 3 design pieces', '2 revisions', 'Source files included'] },
          { name: 'Professional', price: 4999, recommended: true, desc: 'A complete brand-ready design set', includes: ['Up to 8 design pieces', 'Brand-consistent styling', '4 revisions', 'Source files included'] },
          { name: 'Premium', price: 8999, desc: 'End-to-end design support', includes: ['Unlimited design pieces (fair-use)', 'Dedicated designer', 'Priority turnaround', 'Source files included'] }
        ]
      },
      {
        id: 'ecommerce-services',
        name: 'Ecommerce Services',
        tiers: [
          { name: 'Basic', price: 14999, desc: 'A ready-to-sell online store', includes: ['Up to 50 products listed', 'Payment gateway setup', 'Mobile-responsive storefront'] },
          { name: 'Professional', price: 29999, recommended: true, desc: 'A full-featured store built to scale', includes: ['Up to 200 products listed', 'Inventory & order management', 'Coupon & offer setup', 'Basic SEO setup'] },
          { name: 'Premium', price: 49999, desc: 'A custom ecommerce build for serious sellers', includes: ['Unlimited products', 'Custom integrations (ERP/CRM)', 'Multi-payment gateway setup', '3 months post-launch support'] }
        ]
      }
    ]
  },
  {
    category: 'Startup',
    eyebrow: 'Start Right',
    desc: 'Register your business in the structure that fits, with end-to-end filing support.',
    services: [
      {
        id: 'proprietorship',
        name: 'Proprietorship',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Simple proprietorship setup to get you trading', includes: ['Business registration guidance', 'Basic documentation support', 'Application filing'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'Complete proprietorship setup with extra support', includes: ['Everything in Basic', 'Bank account opening support', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 3999, desc: 'Priority proprietorship setup, handled end-to-end', includes: ['Everything in Professional', 'Udyam (MSME) registration', 'Dedicated relationship manager'] }
        ]
      },
      {
        id: 'partnership-firm',
        name: 'Partnership Firm',
        tiers: [
          { name: 'Basic', price: 4999, desc: 'Core partnership deed drafting & filing', includes: ['Partnership deed drafting', 'Registration filing', 'Basic documentation support'] },
          { name: 'Professional', price: 6999, recommended: true, desc: 'Partnership registration with added support', includes: ['Everything in Basic', 'PAN application support', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 8999, desc: 'End-to-end partnership setup with priority handling', includes: ['Everything in Professional', 'GST registration support', 'Dedicated relationship manager'] }
        ]
      },
      {
        id: 'one-person-company',
        name: 'One Person Company (OPC)',
        tiers: [
          { name: 'Basic', price: 7999, desc: 'Core OPC incorporation filing', includes: ['Name approval support', 'Incorporation filing', 'Basic documentation support'] },
          { name: 'Professional', price: 9999, recommended: true, desc: 'OPC incorporation, handled end-to-end', includes: ['Everything in Basic', 'DIN & DSC for director', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 11999, desc: 'Priority OPC incorporation with extra support', includes: ['Everything in Professional', 'First-year compliance guidance', 'Dedicated relationship manager'] }
        ]
      },
      {
        id: 'private-limited-company',
        name: 'Private Limited Company',
        tiers: [
          { name: 'Basic', price: 9999, desc: 'Core private limited incorporation filing', includes: ['Name approval support', 'MOA & AOA drafting', 'Incorporation filing'] },
          { name: 'Professional', price: 12999, recommended: true, desc: 'Full private limited company incorporation', includes: ['Everything in Basic', 'DIN & DSC for 2 directors', 'Dedicated relationship manager'] },
          { name: 'Premium', price: 15999, desc: 'Priority incorporation with post-registration support', includes: ['Everything in Professional', 'GST & bank account opening support', 'First-year compliance guidance'] }
        ]
      },
      {
        id: 'limited-liability-partnership-llp',
        name: 'LLP Registration',
        tiers: [
          { name: 'Basic', price: 8999, desc: 'Core LLP incorporation filing', includes: ['Name approval support', 'LLP agreement drafting', 'Incorporation filing'] },
          { name: 'Professional', price: 10999, recommended: true, desc: 'LLP incorporation with agreement drafting', includes: ['Everything in Basic', 'DIN & DSC for 2 partners', 'Dedicated relationship manager'] },
          { name: 'Premium', price: 12999, desc: 'Priority LLP incorporation with extra support', includes: ['Everything in Professional', 'GST registration support', 'First-year compliance guidance'] }
        ]
      }
    ]
  },
  {
    category: 'Intellectual Property',
    eyebrow: 'Protect Your Brand',
    desc: 'Secure your trademark, respond to objections, and protect original work.',
    services: [
      {
        id: 'trademark-registration',
        name: 'Trademark Registration',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Core trademark application filing', includes: ['Trademark search', 'Application filing', 'Application tracking'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'End-to-end trademark application filing', includes: ['Everything in Basic', 'Class recommendation by an expert', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 3999, desc: 'Priority trademark filing with expert consultation', includes: ['Everything in Professional', 'Dedicated IP expert consultation', 'Priority application tracking'] }
        ]
      },
      {
        id: 'trademark-objection',
        name: 'Trademark Objection',
        tiers: [
          { name: 'Basic', price: 2999, desc: 'Core response to a trademark objection', includes: ['Objection analysis', 'Reply drafting & filing', 'Follow-up tracking'] },
          { name: 'Professional', price: 3999, recommended: true, desc: 'Expert response to a trademark objection', includes: ['Everything in Basic', 'Expert consultation', 'Evidence compilation support'] },
          { name: 'Premium', price: 4999, desc: 'Priority objection handling with hearing support', includes: ['Everything in Professional', 'Hearing representation support', 'Dedicated IP expert'] }
        ]
      },
      {
        id: 'copyright-services',
        name: 'Copyright Registration',
        tiers: [
          { name: 'Basic', price: 2999, desc: 'Core copyright application filing', includes: ['Application preparation', 'Filing with Copyright Office', 'Status tracking'] },
          { name: 'Professional', price: 3999, recommended: true, desc: 'Register your original work with the Copyright Office', includes: ['Everything in Basic', 'Expert review of work classification', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 4999, desc: 'Priority copyright filing with expert consultation', includes: ['Everything in Professional', 'Dedicated IP expert consultation', 'Priority status tracking'] }
        ]
      }
    ]
  },
  {
    category: 'Tax & Accounting',
    eyebrow: 'Stay Compliant',
    desc: 'Filing, audits and bookkeeping handled by qualified tax professionals.',
    services: [
      {
        id: 'income-tax-returns',
        name: 'Income Tax Return',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Core ITR filing for salaried individuals', includes: ['Income assessment', 'ITR preparation & filing', 'Acknowledgement copy'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'Accurate ITR filing by a tax professional', includes: ['Everything in Basic', 'Multiple income source handling', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 3999, desc: 'Priority ITR filing with dedicated CA support', includes: ['Everything in Professional', 'Capital gains & business income handling', 'Dedicated CA support'] }
        ]
      },
      {
        id: 'tax-audit',
        name: 'Tax Audit',
        tiers: [
          { name: 'Basic', price: 9999, desc: 'Core statutory tax audit support', includes: ['Books review', 'Audit report preparation', 'Form filing'] },
          { name: 'Professional', price: 14999, recommended: true, desc: 'Statutory tax audit support with CA guidance', includes: ['Everything in Basic', 'Dedicated CA support', 'Compliance gap review'] },
          { name: 'Premium', price: 19999, desc: 'Comprehensive tax audit for larger businesses', includes: ['Everything in Professional', 'Multi-location books consolidation', 'Priority turnaround'] }
        ]
      },
      {
        id: 'book-keeping-services',
        name: 'Bookkeeping Services',
        tiers: [
          { name: 'Basic', price: 2999, desc: 'Core monthly books-of-accounts management', includes: ['Monthly transaction entries', 'Ledger maintenance', 'Periodic financial summary'] },
          { name: 'Professional', price: 4999, recommended: true, desc: 'Ongoing books-of-accounts management', includes: ['Everything in Basic', 'Bank reconciliation', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 6999, desc: 'Full-service bookkeeping with dedicated accountant', includes: ['Everything in Professional', 'Dedicated accountant', 'Monthly MIS reporting'] }
        ]
      },
      {
        id: 'income-tax-notice',
        name: 'Income Tax Notice Response',
        tiers: [
          { name: 'Basic', price: 2999, desc: 'Core help responding to an IT notice', includes: ['Notice analysis', 'Response drafting & filing', 'Follow-up support'] },
          { name: 'Professional', price: 4999, recommended: true, desc: 'Expert help responding to an IT notice', includes: ['Everything in Basic', 'Expert consultation', 'Document compilation support'] },
          { name: 'Premium', price: 6999, desc: 'Priority notice handling with dedicated CA support', includes: ['Everything in Professional', 'Dedicated CA support', 'Representation support if required'] }
        ]
      }
    ]
  },
  {
    category: 'Registrations',
    eyebrow: 'Get Registered',
    desc: 'GST, import-export and food business registrations, filed correctly the first time.',
    services: [
      {
        id: 'gst-registration',
        name: 'GST Registration',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Core GST registration filing', includes: ['Application preparation', 'ARN tracking', 'GSTIN delivery'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'Complete GST registration filing', includes: ['Everything in Basic', 'HSN/SAC code guidance', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 3999, desc: 'Priority GST registration with expert support', includes: ['Everything in Professional', 'Dedicated relationship manager', 'Priority ARN follow-up'] }
        ]
      },
      {
        id: 'gst-filings',
        name: 'GST Return Filing',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Core monthly/quarterly GST filing', includes: ['Return preparation', 'Filing before due date', 'Filing acknowledgement'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'Timely, accurate monthly/quarterly GST filing', includes: ['Everything in Basic', 'Input tax credit reconciliation', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 3999, desc: 'Priority GST filing with dedicated support', includes: ['Everything in Professional', 'Dedicated relationship manager', 'Notice/mismatch alert support'] }
        ]
      },
      {
        id: 'import-export-license',
        name: 'Import Export Code (IEC)',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Core IEC registration filing', includes: ['Application preparation', 'DGFT portal filing', 'IEC certificate delivery'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'IEC registration for import/export businesses', includes: ['Everything in Basic', 'Document verification support', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 3999, desc: 'Priority IEC registration with dedicated support', includes: ['Everything in Professional', 'Dedicated relationship manager', 'Priority certificate delivery'] }
        ]
      },
      {
        id: 'fssai-registration-foscos',
        name: 'FSSAI Registration',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Core FSSAI basic registration filing', includes: ['Application preparation', 'FoSCoS portal filing', 'Certificate delivery'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'FSSAI basic registration for food businesses', includes: ['Everything in Basic', 'Document verification support', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 3999, desc: 'Priority FSSAI registration with dedicated support', includes: ['Everything in Professional', 'Dedicated relationship manager', 'Priority certificate delivery'] }
        ]
      }
    ]
  },
  {
    category: 'ROC Compliance',
    eyebrow: 'Annual Compliance',
    desc: 'Keep your company or LLP compliant with the Registrar of Companies, every year.',
    services: [
      {
        id: 'private-limited-compliance',
        name: 'Private Limited Compliance',
        tiers: [
          { name: 'Basic', price: 9999, desc: 'Core annual ROC compliance filing', includes: ['Annual return filing', 'Financial statement filing', 'Board resolution support'] },
          { name: 'Professional', price: 12999, recommended: true, desc: 'Annual ROC compliance for private limited companies', includes: ['Everything in Basic', 'Statutory register maintenance', 'Dedicated compliance manager'] },
          { name: 'Premium', price: 15999, desc: 'Priority ROC compliance with year-round support', includes: ['Everything in Professional', 'Ongoing compliance calendar tracking', 'Priority filing turnaround'] }
        ]
      },
      {
        id: 'llp-compliance',
        name: 'LLP Compliance',
        tiers: [
          { name: 'Basic', price: 9999, desc: 'Core annual ROC compliance filing for LLPs', includes: ['Form 11 & Form 8 filing', 'Statement of accounts support', 'Filing acknowledgement'] },
          { name: 'Professional', price: 12999, recommended: true, desc: 'Annual ROC compliance for LLPs', includes: ['Everything in Basic', 'Statutory register maintenance', 'Dedicated compliance manager'] },
          { name: 'Premium', price: 15999, desc: 'Priority ROC compliance with year-round support', includes: ['Everything in Professional', 'Ongoing compliance calendar tracking', 'Priority filing turnaround'] }
        ]
      },
      {
        id: 'director-e-kyc-dir-3',
        name: 'Director KYC',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'Core DIR-3 KYC filing', includes: ['Form preparation', 'DIN KYC filing', 'Filing acknowledgement'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'DIR-3 KYC filing for directors', includes: ['Everything in Basic', 'Document verification support', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 3999, desc: 'Priority DIR-3 KYC filing for multiple directors', includes: ['Everything in Professional', 'Multi-director filing support', 'Dedicated compliance manager'] }
        ]
      },
      {
        id: 'roc-modification',
        name: 'ROC Modification',
        tiers: [
          { name: 'Basic', price: 2999, desc: 'Core company/LLP detail update filing', includes: ['Change drafting (address/directors/capital etc.)', 'Form filing', 'Filing acknowledgement'] },
          { name: 'Professional', price: 3999, recommended: true, desc: 'Company/LLP detail updates with the ROC', includes: ['Everything in Basic', 'Document verification support', 'Email & WhatsApp support'] },
          { name: 'Premium', price: 4999, desc: 'Priority ROC modification with dedicated manager', includes: ['Everything in Professional', 'Dedicated compliance manager', 'Priority filing turnaround'] }
        ]
      }
    ]
  },
  {
    category: 'Consultation',
    eyebrow: 'Talk To An Expert',
    desc: 'Quick, focused consultations to get a clear answer before you commit.',
    services: [
      {
        id: 'ca-consultation',
        name: 'CA Consultation (10 Minutes)',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'A focused 10-minute call with a Chartered Accountant', includes: ['1-on-1 call with a CA', 'Query-specific guidance'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'A 10-minute CA call with written follow-up', includes: ['Everything in Basic', 'Follow-up notes over email'] },
          { name: 'Premium', price: 3999, desc: 'Priority 10-minute CA consultation', includes: ['Everything in Professional', 'Priority scheduling', 'Same-day slot availability'] }
        ]
      },
      {
        id: 'legal-consultation',
        name: 'Legal Consultation (10 Minutes)',
        tiers: [
          { name: 'Basic', price: 1999, desc: 'A focused 10-minute call with a legal expert', includes: ['1-on-1 call with a legal expert', 'Query-specific guidance'] },
          { name: 'Professional', price: 2999, recommended: true, desc: 'A 10-minute legal call with written follow-up', includes: ['Everything in Basic', 'Follow-up notes over email'] },
          { name: 'Premium', price: 3999, desc: 'Priority 10-minute legal consultation', includes: ['Everything in Professional', 'Priority scheduling', 'Same-day slot availability'] }
        ]
      },
      {
        id: 'ca-consultation',
        name: 'CA/Legal Consultation (20 Minutes)',
        tiers: [
          { name: 'Basic', price: 2999, desc: 'An extended 20-minute session with a CA or legal expert', includes: ['1-on-1 call with a CA or legal expert', 'In-depth query discussion'] },
          { name: 'Professional', price: 3999, recommended: true, desc: 'A 20-minute session with written follow-up', includes: ['Everything in Basic', 'Follow-up notes over email'] },
          { name: 'Premium', price: 4999, desc: 'Priority 20-minute consultation', includes: ['Everything in Professional', 'Priority scheduling', 'Same-day slot availability'] }
        ]
      },
      {
        id: 'legal-consultation',
        name: 'CA/Legal Consultation (30 Minutes)',
        tiers: [
          { name: 'Basic', price: 3999, desc: 'A comprehensive 30-minute consultation', includes: ['1-on-1 call with a CA or legal expert', 'Detailed discussion & guidance'] },
          { name: 'Professional', price: 4999, recommended: true, desc: 'A 30-minute consultation with written follow-up', includes: ['Everything in Basic', 'Follow-up notes over email'] },
          { name: 'Premium', price: 5999, desc: 'Priority 30-minute consultation', includes: ['Everything in Professional', 'Priority scheduling', 'Same-day slot availability'] }
        ]
      }
    ]
  }
];
