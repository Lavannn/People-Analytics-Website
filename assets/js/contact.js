// Contact form handler.
//
// ==========================================================================
//  SET THIS ONE LINE to start receiving enquiries directly in your inbox.
//  1. Sign up free at https://formspree.io (or formsubmit.co / getform.io)
//  2. Create a form, copy the endpoint URL it gives you
//  3. Paste it below, replacing the empty string
// ==========================================================================
const FORM_ENDPOINT = ''; 'https://formspree.io/f/xvkoeyro'

const FALLBACK_EMAIL = 'lvangapandu@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const statusEl = document.getElementById('enquiry-status');
  const submitBtn = document.getElementById('enquiry-submit');

  function setStatus(msg, kind) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status' + (kind ? ' form-status-' + kind : '');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    // No endpoint configured yet — fall back to opening the visitor's mail client.
    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(
        `Website enquiry — ${data.get('Requirement') || 'General'} — ${data.get('Name') || ''}`
      );
      const body = encodeURIComponent(
        `Name: ${data.get('Name') || ''}\n` +
        `Organization: ${data.get('Organization') || ''}\n` +
        `Email: ${data.get('Email') || ''}\n` +
        `Requirement: ${data.get('Requirement') || ''}\n\n` +
        `${data.get('Message') || ''}`
      );
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      setStatus(`Opening your email app. If nothing happens, email ${FALLBACK_EMAIL} directly.`, 'note');
      return;
    }

    const originalLabel = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    setStatus('Sending your enquiry…', 'note');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setStatus("Thank you — your enquiry has been sent. I'll respond within one business day.", 'ok');
    } catch (err) {
      console.error(err);
      setStatus(`Something went wrong sending the form. Please email ${FALLBACK_EMAIL} directly.`, 'error');
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
    }
  });
});
