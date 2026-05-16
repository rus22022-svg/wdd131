const menuBtn = document.getElementById('menu-btn');
const mainNav = document.getElementById('main-nav');

menuBtn.addEventListener('click', () => {
  const isOpen = mainNav.classList.contains('open');

  if (isOpen) {
    mainNav.classList.remove('open');
    menuBtn.textContent = 'Menu';
    menuBtn.setAttribute('aria-expanded', 'false');
  } else {
    mainNav.classList.add('open');
    menuBtn.textContent = '✕ Close';
    menuBtn.setAttribute('aria-expanded', 'true');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) {
    mainNav.classList.remove('open');
    menuBtn.textContent = 'Menu';
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

const modal        = document.getElementById('modal');
const modalImg     = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeBtn     = document.getElementById('modal-close');

document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src             = img.src;
    modalImg.alt             = img.alt;
    modalCaption.textContent = img.alt;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});