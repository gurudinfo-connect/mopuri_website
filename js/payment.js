(function(){
  'use strict';

  function money(n){
    n = Number(n) || 0;
    return '₹' + n.toLocaleString('en-IN');
  }

  function getParams(){
    return new URLSearchParams(window.location.search);
  }

  function render(){
    var params = getParams();
    var serviceId = params.get('id') || '';
    var serviceName = params.get('service') || '';
    var planName = params.get('plan') || '';
    var price = params.get('price');
    var original = params.get('original');
    var discount = params.get('discount');
    var savings = params.get('savings');
    var gst = params.get('gst') || '';

    var emptyState = document.getElementById('payEmptyState');
    var content = document.getElementById('payContent');

    // If the page was opened directly (no service/plan/price in the URL),
    // there is nothing to check out — show a friendly fallback instead of
    // a broken order summary.
    if(!serviceName || !planName || !price){
      emptyState.style.display = '';
      content.style.display = 'none';
      return;
    }

    content.style.display = '';

    document.getElementById('payHeading').textContent = 'Complete your payment';
    document.getElementById('paySubHeading').textContent = 'You are purchasing ' + serviceName + ' — ' + planName + ' package.';

    document.getElementById('payServiceName').textContent = serviceName;
    document.getElementById('payPlanName').textContent = planName + ' Package';
    document.getElementById('payAmount').textContent = money(price) +
      (original && Number(original) > Number(price) ? '  ' : '');

    if(original && Number(original) > Number(price)){
      var small = document.createElement('small');
      small.className = 'svc-price-original';
      small.textContent = money(original);
      document.getElementById('payAmount').appendChild(small);
    }

    var discountRow = document.getElementById('payDiscountRow');
    if(discount || savings){
      discountRow.style.display = '';
      discountRow.innerHTML =
        (discount ? '<span class="svc-price-discount-badge">' + discount + '% OFF</span>' : '') +
        (savings ? '<span class="svc-price-savings">You save ' + money(savings) + '</span>' : '');
    }

    document.getElementById('payFeeNote').textContent = gst;

    // Hidden fields: the exact order data that would be sent to a real
    // payment gateway / backend order-creation endpoint.
    document.getElementById('payHiddenServiceId').value = serviceId;
    document.getElementById('payHiddenServiceName').value = serviceName;
    document.getElementById('payHiddenPlanName').value = planName;
    document.getElementById('payHiddenPrice').value = price;

    document.title = 'Payment — ' + serviceName + ' (' + planName + ') — Mopuri Business Solutions';
  }

  function wireForm(){
    var form = document.getElementById('paymentForm');
    if(!form) return;

    var submitBtn = document.getElementById('paySubmit');
    var success = document.getElementById('paySuccess');

    var nameInput = document.getElementById('payName');
    var emailInput = document.getElementById('payEmail');
    var phoneInput = document.getElementById('payPhone');

    // Reuse the exact same site-wide validation rules used by every other
    // enquiry form (see script.js): letters/spaces only for name, exactly
    // 10 digits for mobile, standard email format.
    var NAME_RE = (typeof MBS_NAME_RE !== 'undefined') ? MBS_NAME_RE : /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    var PHONE_RE = (typeof MBS_MOBILE_RE !== 'undefined') ? MBS_MOBILE_RE : /^\d{10}$/;
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ---- Prevent invalid characters from being typed or pasted ----
    nameInput.addEventListener('input', function(){
      nameInput.value = nameInput.value.replace(/[^A-Za-z ]/g, '');
      clearError(nameInput);
    });
    phoneInput.addEventListener('input', function(){
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      clearError(phoneInput);
    });
    emailInput.addEventListener('input', function(){ clearError(emailInput); });

    function clearError(input){
      input.closest('.form-field').classList.remove('invalid');
    }
    function setError(input, isInvalid){
      input.closest('.form-field').classList.toggle('invalid', isInvalid);
    }

    function validate(){
      var nameOk = NAME_RE.test(nameInput.value.trim());
      var emailOk = EMAIL_RE.test(emailInput.value.trim());
      var phoneOk = PHONE_RE.test(phoneInput.value.trim());

      setError(nameInput, !nameOk);
      setError(emailInput, !emailOk);
      setError(phoneInput, !phoneOk);

      return nameOk && emailOk && phoneOk;
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      success.classList.remove('show');

      if(!validate()){
        var firstInvalid = form.querySelector('.form-field.invalid input');
        if(firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // ---------------------------------------------------------------
      // Backend-ready placeholder: this is where a real payment gateway
      // (Razorpay/Stripe/PayU/etc.) would be initiated, passing:
      //   document.getElementById('payHiddenServiceId').value
      //   document.getElementById('payHiddenServiceName').value
      //   document.getElementById('payHiddenPlanName').value
      //   document.getElementById('payHiddenPrice').value
      //   nameInput.value, emailInput.value, phoneInput.value
      // Replace the setTimeout below with the real gateway checkout call.
      // ---------------------------------------------------------------
      setTimeout(function(){
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        success.classList.add('show');
        form.reset();
      }, 900);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ render(); wireForm(); });
  } else {
    render();
    wireForm();
  }
})();
