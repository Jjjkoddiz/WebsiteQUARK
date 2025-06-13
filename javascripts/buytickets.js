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

document.addEventListener('DOMContentLoaded', function () {
  // Счетчики
  document.querySelectorAll('.counter').forEach((counter) => {
    const decrementBtn = counter.querySelector('.decrement');
    const incrementBtn = counter.querySelector('.increment');
    const counterValue = counter.querySelector('.counter-value');

    let count = 0;

    decrementBtn.addEventListener('click', () => {
      if (count > 0) count--;
      counterValue.textContent = count;
    });

    incrementBtn.addEventListener('click', () => {
      count++;
      counterValue.textContent = count;
    });
  });

  // Чекбокс
  const newsCheckbox = document.getElementById('newsCheckbox');
  if (newsCheckbox) {
    const customCheckbox = newsCheckbox.querySelector('.custom-checkbox');

    newsCheckbox.addEventListener('click', () => {
      customCheckbox.classList.toggle('checked');
    });
  }

  // Прокрутка к оплате
  const paymentBtn = document.querySelector('.to-payment-btn');
  if (paymentBtn) {
    paymentBtn.addEventListener('click', () => {
      document.querySelector('.payment-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  // Закрытие меню при клике вне области
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      menuToggle.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
});
