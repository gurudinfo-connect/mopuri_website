<?php
/**
 * ==========================================================================
 * MOPURI BUSINESS SOLUTIONS — Form → Email handler
 * ==========================================================================
 * Runs on Hostinger's own PHP + mail server. No third-party service, no
 * API key. Every form on the site POSTs its FormData here (see
 * js/form-mailer.js) and this script emails it straight to
 * guruachari809@gmail.com.
 *
 * SETUP (Hostinger hPanel):
 *   1. Upload this whole "php" folder to your site's root on Hostinger,
 *      as a sibling of "html", "css", "js", "assets" (same level).
 *   2. (Strongly recommended, avoids spam folders) In hPanel → Emails,
 *      create a mailbox on your own domain — e.g. info@mopuri.in — even
 *      though submissions are delivered to a Gmail inbox below. This
 *      address is only used as the technical "From" sender identity;
 *      see the note on $FROM_EMAIL just below for why it must stay on
 *      your own domain rather than being the Gmail address itself.
 *   3. That's it — no password, no API key needed. Hostinger's server
 *      sends the mail directly using PHP's built-in mail() function.
 *
 * TEST: open your site, submit any form, and check the
 * guruachari809@gmail.com inbox (and its Spam folder, the first few
 * times — see the deliverability note below, this matters more for a
 * Gmail destination than it would for a mopuri.in one).
 * ==========================================================================
 */

// ---------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------
$TO_EMAIL   = 'guruachari809@gmail.com';   // every submission is delivered here
$SITE_NAME  = 'Mopuri Business Solutions Website';

// $FROM_EMAIL is the sender identity in the email header — it must stay
// an address on YOUR OWN domain (mopuri.in), not the Gmail address above.
// Gmail enforces strict anti-spoofing rules (DMARC) on its own domain, so
// a "From: guruachari809@gmail.com" header sent from a non-Google
// server (like this Hostinger box) would very likely be rejected or
// dumped straight in spam. Sending "From" your own domain "To" a Gmail
// inbox works fine — it's the reverse that breaks.
$FROM_EMAIL = 'info@mopuri.in';

// ---------------------------------------------------------------------
// Basic request checks
// ---------------------------------------------------------------------
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Optional honeypot: if any form ever adds a hidden field named "_gotcha",
// a filled-in value means it was a bot. Pretend success, send nothing.
if (!empty($_POST['_gotcha'])) {
    echo json_encode(['success' => true]);
    exit;
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

// Strips characters that could be used for email header injection.
function mbs_clean_header($value) {
    $value = (string) $value;
    $value = str_replace(["\r", "\n", "%0a", "%0d"], '', $value);
    return trim($value);
}

// Turns "passedOutYear" into "Passed Out Year" for a readable email body.
function mbs_label($key) {
    $key = str_replace(['_', '-'], ' ', $key);
    $key = preg_replace('/(?<!^)([A-Z])/', ' $1', $key);
    return ucwords(trim($key));
}

// Fields that are meta/internal — not shown as a "field" line in the body.
$reserved = ['subject', 'from_name', 'replyto', 'access_key', '_gotcha', 'g-recaptcha-response'];

// ---------------------------------------------------------------------
// Build the email body from whatever fields this particular form sent
// (consultation modal, lead form, get-started, careers, newsletter all
// post different field names — this handles any of them generically).
// ---------------------------------------------------------------------
$lines = [];
foreach ($_POST as $key => $value) {
    if (in_array($key, $reserved, true)) continue;
    if (is_array($value)) $value = implode(', ', $value);
    $value = trim((string) $value);
    if ($value === '') continue;
    $lines[] = mbs_label($key) . ': ' . $value;
}

if (!empty($_FILES['resume']['name'])) {
    $lines[] = 'Resume: ' . basename($_FILES['resume']['name']) . ' (attached)';
}

// Checked BEFORE the footer lines are added below, so a submission with
// no real fields is correctly rejected instead of emailing a blank form.
if (empty($lines)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Empty submission.']);
    exit;
}

$pageUrl = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'unknown page';
$lines[] = '';
$lines[] = '— Submitted from: ' . $pageUrl;
$lines[] = '— Submitted at: ' . date('d M Y, h:i A');

$body = implode("\n", $lines);

// ---------------------------------------------------------------------
// Subject + Reply-To
// ---------------------------------------------------------------------
$subject = isset($_POST['subject']) ? mbs_clean_header($_POST['subject']) : ('New website enquiry — ' . $SITE_NAME);

$replyTo = $FROM_EMAIL;
if (!empty($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $replyTo = mbs_clean_header($_POST['email']);
}

// ---------------------------------------------------------------------
// Send — with or without a file attachment (careers résumé upload)
// ---------------------------------------------------------------------
$hasAttachment = !empty($_FILES['resume']['tmp_name']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK;

if ($hasAttachment) {
    // Validate the upload server-side (never trust the browser alone).
    $allowedExt  = ['pdf', 'doc', 'docx'];
    $maxBytes    = 5 * 1024 * 1024; // 5MB, matches the site's own label
    $fileName    = basename($_FILES['resume']['name']);
    $fileExt     = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $fileTmpPath = $_FILES['resume']['tmp_name'];
    $fileSize    = $_FILES['resume']['size'];

    if (!in_array($fileExt, $allowedExt, true)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Resume must be a PDF, DOC or DOCX file.']);
        exit;
    }
    if ($fileSize > $maxBytes) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Resume must be under 5MB.']);
        exit;
    }

    $fileContent = file_get_contents($fileTmpPath);
    $fileContent = chunk_split(base64_encode($fileContent));

    $boundary = md5(uniqid((string) time()));

    $headers  = "From: {$SITE_NAME} <{$FROM_EMAIL}>\r\n";
    $headers .= "Reply-To: {$replyTo}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    $mimeTypes = ['pdf' => 'application/pdf', 'doc' => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    $message  = "--{$boundary}\r\n";
    $message .= "Content-Type: text/plain; charset=utf-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $body . "\r\n\r\n";
    $message .= "--{$boundary}\r\n";
    $message .= "Content-Type: {$mimeTypes[$fileExt]}; name=\"{$fileName}\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n\r\n";
    $message .= $fileContent . "\r\n";
    $message .= "--{$boundary}--";

    $sent = mail($TO_EMAIL, $subject, $message, $headers);
} else {
    $headers  = "From: {$SITE_NAME} <{$FROM_EMAIL}>\r\n";
    $headers .= "Reply-To: {$replyTo}\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    $sent = mail($TO_EMAIL, $subject, $body, $headers);
}

// ---------------------------------------------------------------------
// Response — js/form-mailer.js just checks the "success" flag.
// ---------------------------------------------------------------------
if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'The server could not send the email. Check the php error log.']);
}
