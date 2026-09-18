/* ==========================================================================
   MBS ACCOUNT / ENQUIRY DATA LAYER
   --------------------------------------------------------------------------
   This site is a static front-end with no server, so this file simulates
   the account + enquiry backend entirely in the browser using localStorage.
   It powers:
     - Auto account creation on enquiry submit (get-started.html)
     - Enquiry records, kept in localStorage for potential future use
       (e.g. an admin panel), though nothing currently renders them

   IMPORTANT (production note): localStorage is per-browser, not a real
   database — data does not sync across devices and is not secure enough
   for real customer records or admin auth. Before going live, wire these
   same function names to real API calls against a proper backend/database
   and add real authentication. Everything below is intentionally isolated
   in this one file so that swap is a single-file change.
   ========================================================================== */

(function (window) {
  'use strict';

  var USERS_KEY = 'mbs_users';
  var ENQUIRIES_KEY = 'mbs_enquiries';
  var SESSION_KEY = 'mbs_session_user_id';
  var ADMIN_SESSION_KEY = 'mbs_admin_session';

  // Demo-only admin passcode. Client-side gating like this is NOT real
  // security — anyone can read this file. Replace with real server-side
  // authentication before production use.
  var ADMIN_PASSCODE = 'Mopuri@Admin1';

  function money(n) {
    n = Number(n) || 0;
    return '₹' + n.toLocaleString('en-IN');
  }

  function uid(prefix) {
    return (prefix || 'id') + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('MBS_DB storage error:', e);
      return false;
    }
  }

  function getUsers() { return readJSON(USERS_KEY, []); }
  function saveUsers(list) { return writeJSON(USERS_KEY, list); }

  function getEnquiries() { return readJSON(ENQUIRIES_KEY, []); }
  function saveEnquiries(list) { return writeJSON(ENQUIRIES_KEY, list); }

  function findUserByEmail(email) {
    email = (email || '').trim().toLowerCase();
    if (!email) return null;
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if ((users[i].email || '').toLowerCase() === email) return users[i];
    }
    return null;
  }

  // Finds an existing customer account by email, or creates a new one.
  // No OTP / email verification is performed, per the site's enquiry flow.
  function createOrGetUser(details) {
    var name = (details.name || '').trim();
    var email = (details.email || '').trim().toLowerCase();
    var phone = (details.phone || '').trim();

    var users = getUsers();
    var existing = findUserByEmail(email);

    if (existing) {
      // Keep the account's contact details current.
      existing.name = name || existing.name;
      existing.phone = phone || existing.phone;
      saveUsers(users);
      return existing;
    }

    var user = {
      id: uid('user'),
      name: name,
      email: email,
      phone: phone,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
    return user;
  }

  function setSession(userId) { localStorage.setItem(SESSION_KEY, userId); }
  function getSessionUserId() { return localStorage.getItem(SESSION_KEY); }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }

  function getSessionUser() {
    var id = getSessionUserId();
    if (!id) return null;
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) return users[i];
    }
    return null;
  }

  // Creates the account (or reuses it) and logs an enquiry against it.
  // This is the single entry point get-started.html calls on submit —
  // it also becomes the automatic "sign in" for the customer, since no
  // OTP/email verification step is used at enquiry time.
  function addEnquiry(details) {
    var user = createOrGetUser({
      name: details.name,
      email: details.email,
      phone: details.phone
    });
    setSession(user.id);

    var enquiries = getEnquiries();
    var enquiry = {
      id: uid('enq'),
      userId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      service: details.service || '',
      plan: details.plan || '',
      price: details.price != null && details.price !== '' ? Number(details.price) : null,
      message: details.message || '',
      status: 'Enquiry Received',
      createdAt: new Date().toISOString(),
      statusHistory: [{ status: 'Enquiry Received', at: new Date().toISOString() }],
      documents: []
    };
    enquiries.push(enquiry);
    saveEnquiries(enquiries);
    return enquiry;
  }

  function getEnquiriesForUser(userId) {
    return getEnquiries().filter(function (e) { return e.userId === userId; })
      .sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
  }

  function getEnquiryById(id) {
    var list = getEnquiries();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  var STATUS_OPTIONS = ['Enquiry Received', 'In Progress', 'Documents Pending', 'Completed', 'On Hold'];

  function updateEnquiryStatus(id, status) {
    var list = getEnquiries();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].status = status;
        list[i].statusHistory = list[i].statusHistory || [];
        list[i].statusHistory.push({ status: status, at: new Date().toISOString() });
        saveEnquiries(list);
        return list[i];
      }
    }
    return null;
  }

  // Stores a document reference against an enquiry. `dataUrl` is a
  // base64 data URL (from FileReader) so small files can persist in
  // localStorage without a real file-storage backend.
  function addDocumentToEnquiry(id, doc) {
    var list = getEnquiries();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].documents = list[i].documents || [];
        list[i].documents.push({
          id: uid('doc'),
          name: doc.name,
          dataUrl: doc.dataUrl || null,
          uploadedBy: doc.uploadedBy || 'admin',
          uploadedAt: new Date().toISOString()
        });
        saveEnquiries(list);
        return list[i];
      }
    }
    return null;
  }

  function removeDocumentFromEnquiry(enquiryId, docId) {
    var list = getEnquiries();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === enquiryId) {
        list[i].documents = (list[i].documents || []).filter(function (d) { return d.id !== docId; });
        saveEnquiries(list);
        return list[i];
      }
    }
    return null;
  }

  function isAdminLoggedIn() { return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'; }
  function adminLogin(passcode) {
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      return true;
    }
    return false;
  }
  function adminLogout() { sessionStorage.removeItem(ADMIN_SESSION_KEY); }

  window.MBS_DB = {
    money: money,
    getUsers: getUsers,
    findUserByEmail: findUserByEmail,
    createOrGetUser: createOrGetUser,
    setSession: setSession,
    getSessionUserId: getSessionUserId,
    getSessionUser: getSessionUser,
    clearSession: clearSession,
    addEnquiry: addEnquiry,
    getEnquiries: getEnquiries,
    getEnquiriesForUser: getEnquiriesForUser,
    getEnquiryById: getEnquiryById,
    updateEnquiryStatus: updateEnquiryStatus,
    addDocumentToEnquiry: addDocumentToEnquiry,
    removeDocumentFromEnquiry: removeDocumentFromEnquiry,
    STATUS_OPTIONS: STATUS_OPTIONS,
    isAdminLoggedIn: isAdminLoggedIn,
    adminLogin: adminLogin,
    adminLogout: adminLogout
  };

})(window);
