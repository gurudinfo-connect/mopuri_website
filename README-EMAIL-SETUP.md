# Activating form-to-email delivery (FormSubmit)

Every form on the site sends its submission straight to
**mopurisolutions@gmail.com** using [FormSubmit](https://formsubmit.co), a
free form-to-email relay. There's no server, no backend, no API key —
it works the same whether you're previewing the site locally (e.g. VS
Code "Live Server" on `127.0.0.1`) or after it's deployed anywhere.

## How it works

1. Every form's Submit button runs `window.MBS_sendFormEmail(...)`,
   defined in **`js/form-mailer.js`**.
2. That function POSTs the form's data directly to FormSubmit's API
   (`https://formsubmit.co/ajax/mopurisolutions@gmail.com`).
3. FormSubmit emails the submission to **mopurisolutions@gmail.com**.

## One-time setup — required, do this first

FormSubmit needs the destination inbox to confirm it owns that address
before it will deliver anything:

1. Open the site (locally is fine) and submit **any one form**.
2. Check the **mopurisolutions@gmail.com** inbox (and Spam) for an email
   from FormSubmit titled something like *"Please Activate FormSubmit"*.
3. Click **"Confirm my email"** in that message.

That's it — every submission after that, from any form on any page,
is delivered automatically. This confirmation is a one-time step *per
destination address*; if you ever change `MBS_FORM_TO_EMAIL` in
`js/form-mailer.js` to a different address, repeat this step for the
new one.

## Forms wired up to send email

- Homepage / service page **consultation modal** (service.html)
- **Lead enquiry form** below the hero (service.html)
- **Get Started** enquiry form (get-started.html) — also still saves the
  enquiry to the on-site customer dashboard, exactly as before
- **Careers → Apply Now** job application form (careers.html), including
  the uploaded resume as a real email attachment (FormSubmit supports
  file attachments up to 5MB on the free plan, matching the site's own
  limit)
- **Newsletter signup** form in the footer (every page)

## Left as-is (on purpose)

- The **Pay Now** checkout form (payment.html) was **not** wired to
  this — it's a transactional flow, not a lead/contact form, and it
  doesn't collect any card details client-side, so nothing sensitive is
  at risk, but forwarding order/checkout submissions through email is a
  different decision than a contact form and wasn't part of what was
  asked. Let me know if you'd like that included too.

## Changing the destination address

Edit one line — `window.MBS_FORM_TO_EMAIL` near the top of
**`js/form-mailer.js`** — then repeat the one-time confirmation step
above for the new address.

## Files involved

- `js/form-mailer.js` — builds each submission and sends it to
  FormSubmit. Loads right before `js/script.js` on every page.
- `php/send-mail.php` — an alternative delivery method using your own
  Hostinger PHP server instead of FormSubmit (see below). Not used
  unless you switch to it.

## Prefer your own domain's mail server instead of FormSubmit?

`php/send-mail.php` is still included and fully working — it sends
mail through **Hostinger's own PHP `mail()` function** once the site is
actually deployed there (this only works on a real PHP-capable host,
never on a local static preview like Live Server). To switch to it:

1. Upload the whole site to Hostinger exactly as it's structured in
   this folder — `php/` must sit next to `html/`, `css/`, `js/` and
   `assets/` (i.e. all at the root of your hosting, commonly
   `public_html`).
2. In `js/form-mailer.js`, replace the `window.MBS_FORM_ENDPOINT` line
   with:
   ```js
   window.MBS_FORM_ENDPOINT = '../php/send-mail.php';
   ```
   and change the `.then(function (data) { ... })` block back to simply
   `return data;` (FormSubmit and send-mail.php both return a
   `{ success: true/false }` shape, so nothing else needs to change).
3. **Recommended:** in hPanel → **Emails**, create a mailbox on your own
   domain (e.g. **info@mopuri.in**) — see the deliverability note inside
   `send-mail.php` for why this matters even though the destination
   inbox is a Gmail address.

## Notes, limits & troubleshooting

- The careers résumé upload is capped at **5MB** and only accepts
  **PDF, DOC or DOCX** — matching what the form already tells
  applicants.
- If a submission ever fails, open the browser console —
  `form-mailer.js` logs the error there.
- Nothing arrives, ever? The most common cause is skipping the
  **one-time confirmation email** above — check
  mopurisolutions@gmail.com's Spam folder for it if it's not in the
  inbox.
- If you switch to the PHP method above and emails still don't land,
  PHP's `mail()` only reports that Hostinger's server *accepted* the
  message — not that it reached the inbox. Check Spam, and see
  `php/send-mail.php`'s own comments for the authenticated-SMTP
  alternative if deliverability stays unreliable.
