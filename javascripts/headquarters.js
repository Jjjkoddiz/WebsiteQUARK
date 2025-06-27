document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu-toggle');
  const overlay = document.getElementById('overlay');

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    overlay.classList.toggle('show', isOpen);

    // Альтернативно: менять aria-label
    btn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
});
