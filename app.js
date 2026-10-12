const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (navbarToggle && navbarMenu) {
  const syncMenuState = () => {
    const isActive = navbarToggle.classList.contains('active');
    navbarToggle.setAttribute('aria-expanded', String(isActive));
  };

  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    syncMenuState();
  });

  syncMenuState();
}