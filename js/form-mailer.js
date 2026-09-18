/* ==========================================================================
   MOPURI BUSINESS SOLUTIONS — Form → Email delivery
   ==========================================================================
   Every form on the site (consultation modal, homepage/service lead form,
   Get Started enquiry, careers application, newsletter signup) calls
   window.MBS_sendFormEmail(formData, subject) on submit — see script.js,
   get-started.js and careers.js. This one file is where that actually
   happens, so it must load BEFORE those files on every page.

   Submissions are sent using FormSubmit (https://formsubmit.co) — a free
   form-to-email relay. No backend/server of your own is needed, so this
   works exactly the same whether you're previewing the site locally
   (e.g. VS Code "Live Server" on 127.0.0.1) or after it's deployed
   anywhere, including hosts that don't support PHP.

   ONE-TIME STEP: on the very first submission from this site, FormSubmit
   sends an activation email to MBS_FORM_TO_EMAIL below with a "Confirm
   my email" link. Click that link once and every submission after it —
   from any page, any device — is delivered automatically. Until that
   link is clicked, submissions are accepted but not actually delivered.

   Nothing here needs to be edited to go live. To change where
   submissions are delivered, just change MBS_FORM_TO_EMAIL below (and
   re-do the one-time confirmation for the new address).

   Prefer sending mail through your own Hostinger PHP server instead?
   php/send-mail.php still does that — see README-EMAIL-SETUP.md for how
   to switch back to it once the site is actually deployed there.
   ========================================================================== */

window.MBS_FORM_TO_EMAIL = 'guruachari809@gmail.com';

window.MBS_FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + window.MBS_FORM_TO_EMAIL;

window.MBS_sendFormEmail = function (formData, subject) {
  try {
    // FormSubmit's own field names/switches:
    formData.append('_subject', subject || ('New website enquiry — ' + window.MBS_FORM_TO_EMAIL));
    formData.append('_template', 'table');   // nicely formatted email body
    formData.append('_captcha', 'false');    // no captcha step (this is a background fetch, not a page redirect)
    var visitorEmail = formData.get('email');
    if (visitorEmail) {
      formData.append('_replyto', visitorEmail); // lets you hit "Reply" and reach the visitor directly
    }

    return fetch(window.MBS_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        // FormSubmit replies with { success: "true" | "false", message: "..." }
        var ok = !!data && (data.success === true || data.success === 'true');
        if (!ok) console.error('Form email delivery failed:', data);
        return { success: ok, message: data && data.message };
      })
      .catch(function (err) {
        console.error('Form email delivery failed:', err);
        return { success: false, error: err };
      });
  } catch (err) {
    console.error('Form email delivery failed:', err);
    return Promise.resolve({ success: false, error: err });
  }
};
