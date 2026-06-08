const form             = document.getElementById('ticketForm');
const firstNameInput   = document.getElementById('firstName');
const lastNameInput    = document.getElementById('lastName');
const emailInput       = document.getElementById('email');
const eventDateInput   = document.getElementById('eventDate');
const typeSelect       = document.getElementById('attendeeType');
const conditionalDiv   = document.getElementById('conditionalField');
const conditionalLabel = document.getElementById('conditionalLabel');
const accessCodeInput  = document.getElementById('accessCode');
const errorBox         = document.getElementById('errorBox');
const ticketDisplay    = document.getElementById('ticketDisplay');

(function setMinDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm   = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd   = String(tomorrow.getDate()).padStart(2, '0');
  eventDateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
})();

typeSelect.addEventListener('change', () => {
  const type = typeSelect.value;

  if (type === 'student') {
    conditionalLabel.textContent = 'Student I#';
    accessCodeInput.placeholder  = 'e.g. 123456789';
    accessCodeInput.maxLength    = 9;
    accessCodeInput.value        = '';
    conditionalDiv.classList.remove('hidden');

  } else if (type === 'guest') {
    conditionalLabel.textContent = 'Access Code';
    accessCodeInput.placeholder  = 'EVENT131';
    accessCodeInput.removeAttribute('maxLength');
    accessCodeInput.value        = '';
    conditionalDiv.classList.remove('hidden');

  } else {
    conditionalDiv.classList.add('hidden');
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidStudentId(id) {
  return /^\d{9}$/.test(id);
}

function isFutureDate(dateString) {
  const selected = new Date(dateString + 'T00:00:00');
  const today    = new Date();
  today.setHours(0, 0, 0, 0);
  return selected > today;
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

function showErrors(errors) {
  errorBox.innerHTML = errors.map(e => `<p>${e}</p>`).join('');
  errorBox.classList.remove('hidden');
  ticketDisplay.classList.add('hidden');
  errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearErrors() {
  errorBox.innerHTML = '';
  errorBox.classList.add('hidden');
}

function showTicket(data) {
  document.getElementById('t-name').textContent  = data.name;
  document.getElementById('t-email').textContent = data.email;
  document.getElementById('t-date').textContent  = formatDate(data.date);
  document.getElementById('t-type').textContent  = data.type === 'student' ? 'Student' : 'Guest';
  document.getElementById('t-code').textContent  = data.code;

  ticketDisplay.classList.remove('hidden');
  form.reset();
  conditionalDiv.classList.add('hidden');
  ticketDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const firstName = firstNameInput.value.trim();
  const lastName  = lastNameInput.value.trim();
  const email     = emailInput.value.trim();
  const date      = eventDateInput.value;
  const type      = typeSelect.value;
  const code      = accessCodeInput.value.trim();

  const errors = [];

  if (!firstName) errors.push('First name is required.');
  if (!lastName)  errors.push('Last name is required.');

  if (!email) {
    errors.push('Email address is required.');
  } else if (!isValidEmail(email)) {
    errors.push('Please enter a valid email address.');
  }

  if (!date) {
    errors.push('Event date is required.');
  } else if (!isFutureDate(date)) {
    errors.push('Event date must be after today.');
  }

  if (!type) {
    errors.push('Please select an attendee type.');
  } else if (type === 'student') {
    if (!code) {
      errors.push('Student I# is required.');
    } else if (!isValidStudentId(code)) {
      errors.push('Student I# must be exactly 9 digits.');
    }
  } else if (type === 'guest') {
    if (!code) {
      errors.push('Access code is required.');
    } else if (code.toUpperCase() !== 'EVENT131') {
      errors.push('Access code is incorrect. Please enter the event code.');
    }
  }

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  showTicket({ name: `${firstName} ${lastName}`, email, date, type, code });
});