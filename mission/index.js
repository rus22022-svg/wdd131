const select = document.querySelector('select');
const logo = document.querySelector('img');

select.addEventListener('change', () => {
  const dark = select.value === 'dark';
  document.body.classList.toggle('dark', dark);
  logo.src = dark ? 'byui-logo-white.png' : 'byui-logo-blue.webp';
});