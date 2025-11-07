// Client-side form validation and confirmation modal for RSVP
// - validates fields, shows inline errors
// - shows an HTML-escaped confirmation modal for user review
// - only sends POST when user confirms
// - supports multi-language (Vietnamese, English, Chinese)

// Translation object for all messages
const translations = {
  vi: {
    // Form labels
    nameLabel: 'Tên của bạn',
    relationshipLabel: 'Mối quan hệ',
    attendanceLabel: 'Bạn có thể tham dự?',
    guestsLabel: 'Số người',
    messageLabel: 'Lời chúc',
    submitBtn: '✉️ GỬI LỜI CHÚC',
    
    // Placeholders
    namePlaceholder: 'Nhập tên của bạn...',
    relationshipPlaceholder: 'Bạn của cô dâu...',
    messagePlaceholder: 'Gửi lời chúc tới đôi uyên ương...',
    
    // Select options
    selectDefault: '-- Chọn --',
    attendYes: 'Tôi sẽ tham dự',
    attendNo: 'Xin lỗi, tôi bận mất rồi',
    attendMaybe: 'Chưa chắc chắn',
    
    // Validation errors
    nameRequired: 'Vui lòng nhập tên của bạn.',
    nameTooShort: 'Tên quá ngắn (ít nhất 2 ký tự).',
    nameTooLong: 'Tên quá dài (tối đa 60 ký tự).',
    nameInvalid: 'Tên chứa ký tự không hợp lệ.',
    nameSpaces: 'Tên không được chứa nhiều khoảng trắng liên tiếp.',
    relationshipTooLong: 'Mối quan hệ quá dài (tối đa 100 ký tự).',
    attendanceRequired: 'Vui lòng chọn bạn có tham dự hay không.',
    attendanceInvalid: 'Lựa chọn không hợp lệ.',
    guestsInvalid: 'Số người phải là số nguyên dương.',
    guestsMin: 'Số người phải >= 1.',
    guestsMax: 'Số người quá lớn (tối đa 50). Vui lòng liên hệ trực tiếp.',
    messageTooLong: 'Lời nhắn quá dài (tối đa 1000 ký tự).',
    messageInvalid: 'Lời nhắn chứa nội dung không hợp lệ (script/HTML tags).',
    
    // Modal
    confirmTitle: 'Xác nhận thông tin',
    confirmHint: 'Vui lòng kiểm tra kỹ thông tin. Nhấn "Gửi" để xác nhận.',
    confirmName: '👤 Tên:',
    confirmRelationship: '🤝 Quan hệ:',
    confirmAttendance: '🎉 Tham dự:',
    confirmGuests: '👥 Số người:',
    confirmMessage: '😍 Lời chúc:',
    btnEdit: 'Chỉnh sửa',
    btnSend: 'Gửi',
    noInfo: 'Không có',
    noMessage: 'Không có lời chúc',
    sending: 'Đang gửi...',
    errorSubmit: 'Có lỗi khi gửi. Vui lòng thử lại sau.',
  },
  en: {
    // Form labels
    nameLabel: 'Your Name',
    relationshipLabel: 'Relationship',
    attendanceLabel: 'Can you attend?',
    guestsLabel: 'Number of Guests',
    messageLabel: 'Your Message',
    submitBtn: '✉️ SEND MESSAGE',
    
    // Placeholders
    namePlaceholder: 'Enter your name...',
    relationshipPlaceholder: 'Friend of the bride...',
    messagePlaceholder: 'Send your wishes to the couple...',
    
    // Select options
    selectDefault: '-- Select --',
    attendYes: 'I will attend',
    attendNo: 'Sorry, I cannot attend',
    attendMaybe: 'Not sure yet',
    
    // Validation errors
    nameRequired: 'Please enter your name.',
    nameTooShort: 'Name is too short (at least 2 characters).',
    nameTooLong: 'Name is too long (max 60 characters).',
    nameInvalid: 'Name contains invalid characters.',
    nameSpaces: 'Name cannot contain multiple consecutive spaces.',
    relationshipTooLong: 'Relationship is too long (max 100 characters).',
    attendanceRequired: 'Please select whether you can attend.',
    attendanceInvalid: 'Invalid selection.',
    guestsInvalid: 'Number of guests must be a positive integer.',
    guestsMin: 'Number of guests must be >= 1.',
    guestsMax: 'Too many guests (max 50). Please contact directly.',
    messageTooLong: 'Message is too long (max 1000 characters).',
    messageInvalid: 'Message contains invalid content (script/HTML tags).',
    
    // Modal
    confirmTitle: 'Confirm Information',
    confirmHint: 'Please review carefully. Click "Send" to confirm.',
    confirmName: '👤 Name:',
    confirmRelationship: '🤝 Relationship:',
    confirmAttendance: '🎉 Attendance:',
    confirmGuests: '👥 Guests:',
    confirmMessage: '😍 Message:',
    btnEdit: 'Edit',
    btnSend: 'Send',
    noInfo: 'None',
    noMessage: 'No message',
    sending: 'Sending...',
    errorSubmit: 'Error sending. Please try again later.',
  },
  cn: {
    // Form labels
    nameLabel: '您的姓名',
    relationshipLabel: '关系',
    attendanceLabel: '您能参加吗？',
    guestsLabel: '人数',
    messageLabel: '祝福语',
    submitBtn: '✉️ 发送祝福',
    
    // Placeholders
    namePlaceholder: '请输入您的姓名...',
    relationshipPlaceholder: '新娘的朋友...',
    messagePlaceholder: '给新人送上祝福...',
    
    // Select options
    selectDefault: '-- 请选择 --',
    attendYes: '我会参加',
    attendNo: '抱歉，我不能参加',
    attendMaybe: '还不确定',
    
    // Validation errors
    nameRequired: '请输入您的姓名。',
    nameTooShort: '姓名太短（至少2个字符）。',
    nameTooLong: '姓名太长（最多60个字符）。',
    nameInvalid: '姓名包含无效字符。',
    nameSpaces: '姓名不能包含多个连续空格。',
    relationshipTooLong: '关系太长（最多100个字符）。',
    attendanceRequired: '请选择您是否参加。',
    attendanceInvalid: '选择无效。',
    guestsInvalid: '人数必须是正整数。',
    guestsMin: '人数必须 >= 1。',
    guestsMax: '人数太多（最多50人）。请直接联系。',
    messageTooLong: '祝福语太长（最多1000个字符）。',
    messageInvalid: '祝福语包含无效内容（script/HTML标签）。',
    
    // Modal
    confirmTitle: '确认信息',
    confirmHint: '请仔细检查信息。点击"发送"确认。',
    confirmName: '👤 姓名：',
    confirmRelationship: '🤝 关系：',
    confirmAttendance: '🎉 参加：',
    confirmGuests: '👥 人数：',
    confirmMessage: '😍 祝福语：',
    btnEdit: '编辑',
    btnSend: '发送',
    noInfo: '无',
    noMessage: '无祝福语',
    sending: '发送中...',
    errorSubmit: '发送错误。请稍后重试。',
  }
};

// Current language (default: Vietnamese)
let currentLang = 'vi';

// Get translation
function t(key) {
  return translations[currentLang][key] || key;
}

// Utility: escape HTML so we can safely show user's input in the confirmation box
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Clear previous inline error messages
function clearErrors(form) {
  const errs = form.querySelectorAll('.field-error');
  errs.forEach(e => e.remove());
}

// Show an inline error under a given input element
function showError(inputEl, message) {
  clearErrors(inputEl.form);
  const span = document.createElement('div');
  span.className = 'field-error';
  span.style.color = '#b00020';
  span.style.fontSize = '0.9em';
  span.style.marginTop = '6px';
  span.textContent = message;
  // Try to place after the input
  if (inputEl.nextSibling) inputEl.parentNode.insertBefore(span, inputEl.nextSibling);
  else inputEl.parentNode.appendChild(span);
}

// Basic validation rules
function validate(formData) {
  const errors = {};

  // name: required, 2-60 chars, allow unicode letters, spaces, and common punctuation
  const name = formData.senderName.trim();
  if (!name) {
    errors.senderName = t('nameRequired');
  } else if (name.length < 2) {
    errors.senderName = t('nameTooShort');
  } else if (name.length > 60) {
    errors.senderName = t('nameTooLong');
  } else {
    // Allow Vietnamese names with spaces, hyphens, apostrophes
    // Example valid: "Nguyễn Văn A", "Lê Thị B", "Mary-Jane O'Connor"
    const namePattern = /^[\p{L}\p{M}\s.''\-]+$/u;
    if (!namePattern.test(name)) {
      errors.senderName = t('nameInvalid');
    }
    // Check for multiple consecutive spaces
    if (/\s{2,}/.test(name)) {
      errors.senderName = t('nameSpaces');
    }
  }

  // relationship: optional but if provided should be reasonable
  const rel = formData.relationship.trim();
  if (rel.length > 100) {
    errors.relationship = t('relationshipTooLong');
  }

  // attendance: required (expect values like 'yes', 'no', 'maybe')
  const att = String(formData.attendance).trim().toLowerCase();
  if (!att) {
    errors.attendance = t('attendanceRequired');
  } else if (!['yes', 'no', 'maybe'].includes(att)) {
    errors.attendance = t('attendanceInvalid');
  }

  // numberOfGuests: must be integer >=1 and reasonable
  const numRaw = String(formData.numberOfGuests || '').trim();
  if (numRaw) {
    if (!/^\d+$/.test(numRaw)) {
      errors.numberOfGuests = t('guestsInvalid');
    } else {
      const n = parseInt(numRaw, 10);
      if (n < 1) {
        errors.numberOfGuests = t('guestsMin');
      } else if (n > 50) {
        errors.numberOfGuests = t('guestsMax');
      }
    }
  } else {
    // Default to 1 if not provided
    formData.numberOfGuests = '1';
  }

  // message: optional, max 1000 chars, disallow script tags and suspicious HTML
  const msg = formData.message ? String(formData.message).trim() : '';
  if (msg.length > 1000) {
    errors.message = t('messageTooLong');
  }
  // Check for script tags or suspicious patterns
  if (/<script|<iframe|javascript:|onerror=/gi.test(msg)) {
    errors.message = t('messageInvalid');
  }

  return errors;
}

// Build and show a simple confirmation modal. Returns a promise that resolves true if user confirms.
function showConfirmationModal(data) {
  return new Promise(resolve => {
    // If modal already exists, remove it
    const old = document.getElementById('confirmOverlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'confirmOverlay';
    overlay.style.position = 'fixed';
    overlay.style.left = 0;
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;

    const box = document.createElement('div');
    box.style.background = '#fff';
    box.style.borderRadius = '10px';
    box.style.maxWidth = '520px';
    box.style.width = '90%';
    box.style.padding = '20px';
    box.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
    box.style.color = '#222';
    box.style.lineHeight = '1.4';

    const title = document.createElement('h3');
    title.textContent = t('confirmTitle');
    title.style.marginTop = 0;
    box.appendChild(title);

    const list = document.createElement('div');
    list.style.margin = '10px 0 18px';
    list.style.lineHeight = '1.8';
    
    // Format attendance text based on language
    let attendanceText = data.attendance;
    if (data.attendance === 'yes') attendanceText = '✅ ' + t('attendYes');
    else if (data.attendance === 'no') attendanceText = '❌ ' + t('attendNo');
    else if (data.attendance === 'maybe') attendanceText = '🤔 ' + t('attendMaybe');
    
    list.innerHTML = `
      <div style="margin-bottom: 8px;"><strong>${t('confirmName')}</strong> ${escapeHtml(data.senderName)}</div>
      <div style="margin-bottom: 8px;"><strong>${t('confirmRelationship')}</strong> ${escapeHtml(data.relationship) || '<em>' + t('noInfo') + '</em>'}</div>
      <div style="margin-bottom: 8px;"><strong>${t('confirmAttendance')}</strong> ${escapeHtml(attendanceText)}</div>
      <div style="margin-bottom: 8px;"><strong>${t('confirmGuests')}</strong> ${escapeHtml(data.numberOfGuests || '1')}</div>
      <div style="margin-bottom: 8px;"><strong>${t('confirmMessage')}</strong><br><span style="font-style: italic; color: #555;">${escapeHtml(data.message) || '<em>' + t('noMessage') + '</em>'}</span></div>
    `;
    box.appendChild(list);

    const hint = document.createElement('div');
    hint.style.fontSize = '0.9em';
    hint.style.color = '#555';
    hint.style.marginBottom = '14px';
    hint.textContent = t('confirmHint');
    box.appendChild(hint);

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.justifyContent = 'flex-end';
    actions.style.gap = '10px';

    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.textContent = t('btnEdit');
    btnEdit.style.padding = '8px 12px';
    btnEdit.style.background = '#eee';
    btnEdit.style.border = 'none';
    btnEdit.style.borderRadius = '6px';
    btnEdit.onclick = () => { overlay.remove(); resolve(false); };

    const btnConfirm = document.createElement('button');
    btnConfirm.type = 'button';
    btnConfirm.textContent = t('btnSend');
    btnConfirm.style.padding = '8px 12px';
    btnConfirm.style.background = '#007bff';
    btnConfirm.style.color = '#fff';
    btnConfirm.style.border = 'none';
    btnConfirm.style.borderRadius = '6px';
    btnConfirm.onclick = () => { overlay.remove(); resolve(true); };

    actions.appendChild(btnEdit);
    actions.appendChild(btnConfirm);
    box.appendChild(actions);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
}

// Update form UI with current language
function updateFormLanguage() {
  // Update labels
  const labels = {
    senderName: t('nameLabel'),
    relationship: t('relationshipLabel'),
    attendance: t('attendanceLabel'),
    numberOfGuests: t('guestsLabel'),
    message: t('messageLabel')
  };
  
  for (const [id, text] of Object.entries(labels)) {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) {
      const icon = label.querySelector('span:first-child')?.textContent || '';
      const required = label.querySelector('.required')?.outerHTML || '';
      label.innerHTML = `${icon} <span class="label-text">${text}</span> ${required}`;
    }
  }
  
  // Update placeholders
  const nameInput = document.getElementById('senderName');
  if (nameInput) nameInput.placeholder = t('namePlaceholder');
  
  const relInput = document.getElementById('relationship');
  if (relInput) relInput.placeholder = t('relationshipPlaceholder');
  
  const msgInput = document.getElementById('message');
  if (msgInput) msgInput.placeholder = t('messagePlaceholder');
  
  // Update select options
  const attendSelect = document.getElementById('attendance');
  if (attendSelect) {
    attendSelect.innerHTML = `
      <option value="">${t('selectDefault')}</option>
      <option value="yes">${t('attendYes')}</option>
      <option value="no">${t('attendNo')}</option>
      <option value="maybe">${t('attendMaybe')}</option>
    `;
  }
  
  // Update submit button
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) submitBtn.textContent = t('submitBtn');
}

// Main submit handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  if (!form) return;
  
  // Initialize form with default language
  updateFormLanguage();

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrors(form);

    const formData = {
      senderName: (document.getElementById('senderName') || { value: '' }).value.trim(),
      relationship: (document.getElementById('relationship') || { value: '' }).value.trim(),
      attendance: (document.getElementById('attendance') || { value: '' }).value.trim(),
      numberOfGuests: (document.getElementById('numberOfGuests') || { value: '' }).value.trim(),
      message: (document.getElementById('message') || { value: '' }).value.trim(),
    };

    const errors = validate(formData);
    if (Object.keys(errors).length) {
      // show first error inline and focus
      for (const key of Object.keys(errors)) {
        const el = document.getElementById(key);
        if (el) {
          showError(el, errors[key]);
          el.focus();
          break;
        }
      }
      return;
    }

    // Show confirmation modal
    const confirmed = await showConfirmationModal(formData);
    if (!confirmed) return; // allow user to edit

    // proceed to send
    try {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.oldText = submitBtn.textContent; submitBtn.textContent = t('sending'); }

      const response = await fetch('/api/submit-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result && result.success) {
        // redirect to thank you with detailed information
        const params = new URLSearchParams({
          name: formData.senderName,
          attendance: formData.attendance,
          guests: formData.numberOfGuests,
          lang: currentLang
        });
        window.location.href = `/thank-you?${params.toString()}`;
      } else {
        alert(result.message || t('errorSubmit'));
      }
    } catch (err) {
      console.error('Submit error', err);
      alert(t('errorSubmit'));
    } finally {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.oldText || t('submitBtn'); }
    }
  });
  
  // Language selector event
  const langSelect = document.getElementById('languageSelect');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      updateFormLanguage();
    });
  }
});

// Add minimal styling for field errors so existing CSS will pick it up later if needed
// If you already have a central stylesheet, you can move these styles there.
const styleTag = document.createElement('style');
styleTag.textContent = `
  .field-error { 
    color: #d32f2f; 
    font-size: 0.875rem;
    margin-top: 6px;
    display: block;
    animation: shake 0.3s;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  #confirmOverlay button { 
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  #confirmOverlay button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(styleTag);
document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        senderName: document.getElementById('senderName').value,
        relationship: document.getElementById('relationship').value,
        attendance: document.getElementById('attendance').value,
        numberOfGuests: document.getElementById('numberOfGuests').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/submit-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = `/thank-you?name=${encodeURIComponent(formData.senderName)}`;
        } else {
            alert(result.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
});