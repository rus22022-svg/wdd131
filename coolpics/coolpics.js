
const menuBtn = document.getElementById('menu-btn');
const mainNav = document.getElementById('main-nav');

menuBtn.addEventListener('click', () => {
  const isOpen = mainNav.style.display === 'block';
  mainNav.style.display = isOpen ? 'none' : 'block';
  menuBtn.textContent = isOpen ? 'Menu' : '✕ Close';
});