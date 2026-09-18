/* ==========================================================================
   CAREERS PAGE — Job Application Modal
   Scoped entirely to careers.html. Opens from every element with class
   "js-job-apply-trigger" (hero Apply Now, per-job "Apply Now" buttons,
   and the "Submit Your Application" CTA). Does not touch or depend on
   the site-wide consultation modal / script.js logic in any way.
   Ready for backend integration: swap the setTimeout in the submit
   handler below for a real fetch()/API call whenever a backend exists.
   ========================================================================== */
(function () {
  'use strict';

  const overlay = document.getElementById('jobApplyOverlay');
  const closeBtn = document.getElementById('jobApplyClose');
  const modalBody = document.getElementById('jobApplyModalBody');
  const form = document.getElementById('jobApplyForm');
  const successView = document.getElementById('jobApplySuccess');
  const successCloseBtn = document.getElementById('jobApplySuccessClose');
  const submitBtn = document.getElementById('jobApplySubmit');
  const roleSelect = document.getElementById('jobRole');

  const firstNameEl = document.getElementById('jobFirstName');
  const lastNameEl = document.getElementById('jobLastName');
  const mobileEl = document.getElementById('jobMobile');
  const emailEl = document.getElementById('jobEmail');
  const yearEl = document.getElementById('jobPassedOutYear');
  const resumeEl = document.getElementById('jobResume');
  const resumeField = resumeEl ? resumeEl.closest('.job-apply-upload-field') : null;
  const resumeLabelText = document.getElementById('jobResumeLabelText');

  if (!overlay || !form) return;

  const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  let isSubmitting = false;

  function resetModal() {
    modalBody.hidden = false;
    successView.hidden = true;
    form.querySelectorAll('.form-field.invalid, .job-apply-upload-field.invalid').forEach((f) => {
      f.classList.remove('invalid');
    });
  }

  function openModal(role) {
    resetModal();
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (role && roleSelect) {
      Array.from(roleSelect.options).forEach((opt) => {
        opt.selected = opt.value === role;
      });
    }

    setTimeout(() => {
      if (firstNameEl) firstNameEl.focus();
    }, 350);
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-job-apply-trigger');
    if (!trigger) return;
    e.preventDefault();
    openModal(trigger.getAttribute('data-role') || '');
  });

  closeBtn.addEventListener('click', closeModal);
  successCloseBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  /* ---- Validation ---- */
  const MOBILE_RE = /^\d{10}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setInvalid(fieldEl, isInvalid) {
    if (fieldEl) fieldEl.classList.toggle('invalid', isInvalid);
  }

  function getFileExtension(filename) {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
  }

  function validateResume(showError) {
    const field = resumeField;
    const file = resumeEl.files && resumeEl.files[0];

    if (!file) {
      if (showError) setInvalid(field, true);
      return false;
    }

    const ext = getFileExtension(file.name);
    if (ALLOWED_EXTENSIONS.indexOf(ext) === -1) {
      field.querySelector('.field-error').textContent = 'Unsupported file type. Please upload a PDF, DOC or DOCX file.';
      setInvalid(field, true);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      field.querySelector('.field-error').textContent = 'File is too large. Maximum allowed size is 5MB.';
      setInvalid(field, true);
      return false;
    }

    field.querySelector('.field-error').textContent = 'Please upload a PDF, DOC or DOCX file under 5MB';
    setInvalid(field, false);
    return true;
  }

  resumeEl.addEventListener('change', () => {
    const file = resumeEl.files && resumeEl.files[0];
    if (file) {
      const ok = validateResume(true);
      resumeField.classList.toggle('has-file', ok);
      resumeLabelText.textContent = ok
        ? file.name
        : 'Upload Resume (PDF, DOC or DOCX — max 5MB)';
      if (!ok) {
        // Clear the invalid file so it can't be submitted accidentally.
        resumeEl.value = '';
      }
    } else {
      resumeField.classList.remove('has-file');
      resumeLabelText.textContent = 'Upload Resume (PDF, DOC or DOCX — max 5MB)';
    }
  });

  function validateForm() {
    let valid = true;

    const firstNameOk = firstNameEl.value.trim().length > 0;
    setInvalid(firstNameEl.closest('.form-field'), !firstNameOk);
    if (!firstNameOk) valid = false;

    const lastNameOk = lastNameEl.value.trim().length > 0;
    setInvalid(lastNameEl.closest('.form-field'), !lastNameOk);
    if (!lastNameOk) valid = false;

    const mobileOk = MOBILE_RE.test(mobileEl.value.trim());
    setInvalid(mobileEl.closest('.form-field'), !mobileOk);
    if (!mobileOk) valid = false;

    const emailOk = EMAIL_RE.test(emailEl.value.trim());
    setInvalid(emailEl.closest('.form-field'), !emailOk);
    if (!emailOk) valid = false;

    const yearOk = !!yearEl.value;
    setInvalid(yearEl.closest('.form-field'), !yearOk);
    if (!yearOk) valid = false;

    const roleOk = !!roleSelect.value;
    setInvalid(roleSelect.closest('.form-field'), !roleOk);
    if (!roleOk) valid = false;

    const resumeOk = validateResume(true);
    if (!resumeOk) valid = false;

    return valid;
  }

  [firstNameEl, lastNameEl, mobileEl, emailEl, yearEl, roleSelect].forEach((el) => {
    if (!el) return;
    el.addEventListener('input', () => setInvalid(el.closest('.form-field'), false));
    el.addEventListener('change', () => setInvalid(el.closest('.form-field'), false));
  });

  // Restrict mobile number to digits only, exactly 10 characters.
  mobileEl.addEventListener('input', () => {
    mobileEl.value = mobileEl.value.replace(/\D/g, '').slice(0, 10);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;

    isSubmitting = true;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // FormData automatically includes the resume file (input name="resume")
    // as a real attachment on the emailed submission.
    const formData = new FormData(form);
    window.MBS_sendFormEmail(formData, 'New Job Application — Mopuri Business Solutions')
      .finally(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        isSubmitting = false;
        modalBody.hidden = true;
        successView.hidden = false;
        form.reset();
        resumeField.classList.remove('has-file');
        resumeLabelText.textContent = 'Upload Resume (PDF, DOC or DOCX — max 5MB)';
      });
  });

  /* ========================================================================
     JOB DETAILS MODAL
     Opens from every element with class "js-job-details-trigger" (the
     "View Job Details" button on each job card). Content is rendered from
     the JOB_DETAILS data object below, so adding a new role only requires
     adding a new entry there — no HTML duplication needed.
     ======================================================================== */
  const detailsOverlay = document.getElementById('jobDetailsOverlay');
  if (detailsOverlay) {
    const detailsClose = document.getElementById('jobDetailsClose');
    const detailsCloseFooter = document.getElementById('jobDetailsCloseFooter');
    const detailsApplyBtn = document.getElementById('jobDetailsApply');
    const detailsScroll = document.getElementById('jobDetailsScroll');

    const detailsBadge = document.getElementById('jobDetailsBadge');
    const detailsTitle = document.getElementById('jobDetailsTitle');
    const detailsLocation = document.getElementById('jobDetailsLocation');
    const detailsDuration = document.getElementById('jobDetailsDuration');
    const detailsStipend = document.getElementById('jobDetailsStipend');
    const detailsDescription = document.getElementById('jobDetailsDescription');
    const detailsResponsibilities = document.getElementById('jobDetailsResponsibilities');
    const detailsSkills = document.getElementById('jobDetailsSkills');
    const detailsWhoCanApply = document.getElementById('jobDetailsWhoCanApply');
    const detailsPerks = document.getElementById('jobDetailsPerks');

    /* ====================================================================
       STIPEND CONFIG — the ONLY place to edit once amounts are finalised.
       Enter a plain number as a string, e.g. "8000", and it will render
       automatically as "₹8,000/month". Leave as "" to show "To be updated".
       ==================================================================== */
    const STIPEND_CONFIG = {
      'Software Development Intern': '',
      'Web Developer': '',
      'UI/UX Designer': '',
      'Digital Marketing Intern': ''
    };

    /* ====================================================================
       JOB DETAILS DATA — one entry per role. Keys must match the
       "data-role" values used on the "Apply Now" / "View Job Details"
       buttons and the Role Applying For dropdown. Add a new role here and
       a matching job card + trigger button to introduce a new opening.
       ==================================================================== */
    const JOB_DETAILS = {
      'Software Development Intern': {
        badge: 'Internship',
        location: 'Bengaluru \u2022 Hybrid',
        duration: '3\u20136 Months',
        description: 'Join Mopuri Business Solutions as a Software Development Intern and work alongside experienced developers on real-world client projects. You will contribute to designing, developing, testing, and maintaining web applications while gaining hands-on industry experience.',
        responsibilities: [
          'Develop responsive web applications.',
          'Write clean and maintainable code.',
          'Assist in frontend and backend development.',
          'Fix bugs and improve application performance.',
          'Participate in code reviews.',
          'Collaborate with designers and senior developers.',
          'Test applications before deployment.',
          'Learn company development standards.'
        ],
        skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js (Preferred)', 'Basic Python or Node.js', 'SQL', 'Git & GitHub', 'Problem-solving skills', 'Communication skills'],
        whoCanApply: [
          'B.E/B.Tech/MCA/BCA students or recent graduates.',
          'Passionate about software development.',
          'Willing to learn new technologies.'
        ],
        perks: ['Hands-on client projects', 'Mentorship', 'Internship Certificate', 'Career Growth Opportunities', 'PPO based on performance']
      },
      'Web Developer': {
        badge: 'Internship',
        location: 'Bengaluru \u2022 Hybrid',
        duration: '3\u20136 Months',
        description: 'Work on modern, responsive, and high-performance business websites for clients across different industries.',
        responsibilities: [
          'Build responsive websites.',
          'Convert UI designs into web pages.',
          'Optimize website performance.',
          'Fix layout issues.',
          'Maintain existing websites.',
          'Ensure cross-browser compatibility.',
          'Collaborate with UI/UX designers.',
          'Assist in website deployment.'
        ],
        skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap or Tailwind CSS', 'React.js (Preferred)', 'Git', 'Responsive Design', 'SEO Basics'],
        whoCanApply: ['Students and fresh graduates passionate about web development.'],
        perks: ['Real client work', 'Professional mentorship', 'Internship Certificate', 'Exposure to modern web technologies']
      },
      'UI/UX Designer': {
        badge: 'Internship',
        location: 'Bengaluru \u2022 Hybrid',
        duration: '3\u20136 Months',
        description: 'Design intuitive, user-friendly, and visually appealing digital experiences for websites and applications.',
        responsibilities: [
          'Create wireframes.',
          'Design UI screens.',
          'Build interactive prototypes.',
          'Improve user experience.',
          'Conduct basic user research.',
          'Work closely with developers.',
          'Maintain design consistency.',
          'Prepare design assets.'
        ],
        skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI Principles', 'UX Principles', 'Typography', 'Color Theory'],
        whoCanApply: ['Students and graduates interested in UI/UX Design.'],
        perks: ['Portfolio-worthy projects', 'Mentorship', 'Internship Certificate', 'Opportunity to work on live client products']
      },
      'Digital Marketing Intern': {
        badge: 'Internship',
        location: 'Bengaluru \u2022 Hybrid',
        duration: '3\u20136 Months',
        description: 'Support digital marketing initiatives including SEO, social media, paid campaigns, and content marketing for real client businesses.',
        responsibilities: [
          'Assist in SEO.',
          'Manage social media posts.',
          'Create digital content.',
          'Support paid campaigns.',
          'Analyze campaign performance.',
          'Research keywords.',
          'Prepare reports.',
          'Improve online brand presence.'
        ],
        skills: ['Social Media Marketing', 'SEO Basics', 'Google Analytics', 'Content Writing', 'Canva', 'Communication Skills', 'MS Excel'],
        whoCanApply: ['Students and graduates interested in Digital Marketing.'],
        perks: ['Real campaign experience', 'Mentorship', 'Internship Certificate', 'Opportunity to work with live businesses']
      }
    };

    function formatStipend(role) {
      const raw = STIPEND_CONFIG[role];
      if (!raw) return 'To be updated';
      const numeric = Number(String(raw).replace(/[^\d.]/g, ''));
      if (!numeric || isNaN(numeric)) return 'To be updated';
      return '\u20B9' + numeric.toLocaleString('en-IN') + '/month';
    }

    function fillList(el, items) {
      el.innerHTML = '';
      (items || []).forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        el.appendChild(li);
      });
    }

    function fillChips(el, items) {
      el.innerHTML = '';
      (items || []).forEach((item) => {
        const chip = document.createElement('span');
        chip.className = 'job-details-chip';
        chip.textContent = item;
        el.appendChild(chip);
      });
    }

    function openDetailsModal(role) {
      const data = JOB_DETAILS[role];
      if (!data) return;

      detailsBadge.textContent = data.badge;
      detailsTitle.textContent = role;
      detailsLocation.textContent = data.location;
      detailsDuration.textContent = data.duration;
      detailsStipend.textContent = formatStipend(role);
      detailsDescription.textContent = data.description;
      fillList(detailsResponsibilities, data.responsibilities);
      fillChips(detailsSkills, data.skills);
      fillList(detailsWhoCanApply, data.whoCanApply);
      fillList(detailsPerks, data.perks);
      detailsApplyBtn.setAttribute('data-role', role);

      detailsOverlay.classList.add('active');
      detailsOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (detailsScroll) detailsScroll.scrollTop = 0;
    }

    function closeDetailsModal() {
      detailsOverlay.classList.remove('active');
      detailsOverlay.setAttribute('aria-hidden', 'true');
      if (!overlay.classList.contains('active')) {
        document.body.style.overflow = '';
      }
    }

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.js-job-details-trigger');
      if (!trigger) return;
      e.preventDefault();
      openDetailsModal(trigger.getAttribute('data-role') || '');
    });

    detailsClose.addEventListener('click', closeDetailsModal);
    detailsCloseFooter.addEventListener('click', closeDetailsModal);
    detailsOverlay.addEventListener('click', (e) => {
      if (e.target === detailsOverlay) closeDetailsModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && detailsOverlay.classList.contains('active')) closeDetailsModal();
    });

    // "Apply Now" inside the details modal reuses the existing
    // .js-job-apply-trigger delegated handler above (it carries that class
    // and a data-role attribute set on open) — this listener just closes
    // the details modal first. Listeners on the clicked element itself run
    // before the event bubbles up to the document-level trigger, so the
    // details modal is already closed by the time the application modal
    // opens.
    detailsApplyBtn.addEventListener('click', closeDetailsModal);
  }
})();
