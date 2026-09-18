# Activating form-to-email delivery

This site is static (HTML/CSS/JS only, no server), so a form in the browser
can't send an email by itself — it needs a small relay service in between.
The forms are already wired up to use **Web3Forms** (https://web3forms.com),
a free service made exactly for this. You just need to plug in your own key.

## One-time setup (about 2 minutes, no coding)

1. Go to https://web3forms.com
2. Enter **info@mopuri.in** and submit — Web3Forms immediately emails that
   inbox a free **Access Key**. No account or login required.
3. Open **script.js** in this project, near the very top, and find:

   ```js
   window.MBS_FORM_ACCESS_KEY = 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY';
   ```

4. Replace `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` with the key from the
   email, save the file, and re-upload it to your host.

That's it — every form below will now deliver straight to **info@mopuri.in**.

## Forms wired up to send email

- Homepage / service page **consultation modal** (service.html)
- **Lead enquiry form** below the hero (service.html)
- **Get Started** enquiry form (get-started.html) — also still saves the
  enquiry to the on-site customer dashboard, exactly as before
- **Careers → Apply Now** job application form (careers.html), including
  the uploaded resume as a real email attachment
- **Newsletter signup** form in the footer (every page)

## Left as-is (on purpose)

- The **Pay Now** checkout form (payment.html) was **not** wired to this —
  it's a transactional flow, not a lead/contact form, and it doesn't
  collect any card details client-side, so nothing sensitive is at risk,
  but forwarding order/checkout submissions through a third-party email
  relay is a different decision than a contact form and wasn't part of
  what was asked. Let me know if you'd like that included too.

## Notes

- Until the access key is pasted in, forms will still validate normally and
  show their usual "Thanks!" success message — they just won't deliver an
  email yet (check the browser console for a "Form email delivery failed"
  message as confirmation).
- Web3Forms' free plan covers generous monthly volume; if the site outgrows
  it, Web3Forms, Formspree, and EmailJS all work with the same `FormData`
  fetch pattern used in `script.js` (`window.MBS_sendFormEmail`).
- Every visible email address across the site (footers, chatbot replies,
  and the careers page's own contact link) has been updated to
  **info@mopuri.in**.
