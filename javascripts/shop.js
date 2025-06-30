document.addEventListener('DOMContentLoaded', () => {
  // Меню toggle
  const btn = document.getElementById('menu-toggle');
  const overlay = document.getElementById('overlay');

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    overlay.classList.toggle('show', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  // Функция для настройки продукта
  function setupProductScreen(
    screenSelector,
    descriptionSelector,
    overlaySelector,
    showButtonSelector,
    closeButtonSelector
  ) {
    const showBtn = document.querySelector(
      `${screenSelector} ${showButtonSelector}`
    );
    const closeBtn = document.querySelector(
      `${screenSelector} ${closeButtonSelector}`
    );
    const description = document.querySelector(
      `${screenSelector} ${descriptionSelector}`
    );
    const overlay = document.querySelector(
      `${screenSelector} ${overlaySelector}`
    );

    if (showBtn) {
      showBtn.addEventListener('click', function (e) {
        console.log('Show button clicked for screen:', screenSelector);

        if (description) {
          description.style.display = 'flex';
        }
        if (overlay) {
          overlay.style.display = 'block';
          overlay.style.opacity = 1;
          overlay.style.pointerEvents = 'auto';
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        console.log('Close button clicked for screen:', screenSelector);

        if (description) {
          description.style.display = 'none';
        }
        if (overlay) {
          overlay.style.display = 'none';
          overlay.style.opacity = 0;
          overlay.style.pointerEvents = 'none';
        }
      });
    }
  }

  // Настройка для экранов продуктов
  setupProductScreen(
    '.first_screen_glasses',
    '.product-description',
    '.overlayshop',
    '.product-cha',
    '#close'
  );

  setupProductScreen(
    '.second_screen_camera',
    '.camera-product-description',
    '.camera-overlayshop',
    '.camera-cha',
    '#camera-close'
  );

  setupProductScreen(
    '.third_screen_book',
    '.book-product-description',
    '.book-overlayshop',
    '.book-cha',
    '#book-close'
  );

  setupProductScreen(
    '.fourth_screen_figure',
    '.figure-product-description',
    '.figure-overlayshop',
    '.figure-cha',
    '#figure-close'
  );

  // Переключение изображений
  function setupImageSwitcher() {
    const images = document.querySelectorAll('.product-image');
    let currentImageIndex = 0;

    function showNextImage() {
      images[currentImageIndex].classList.remove('active');
      currentImageIndex = (currentImageIndex + 1) % images.length;
      images[currentImageIndex].classList.add('active');
    }

    const container = document.querySelector('.product-images-container');
    if (container) {
      container.addEventListener('click', showNextImage);
    }
  }
  setupImageSwitcher();

  // Модальное окно
  const buyButtons = document.querySelectorAll('.product-btn');
  const modal = document.getElementById('Modal');
  const closeButton = document.querySelector('.close');

  function openModal() {
    if (modal) modal.style.display = 'block';
  }

  window.closeModal = function () {
    if (modal) modal.style.display = 'none';
  };

  if (buyButtons.length) {
    buyButtons.forEach((button) => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        openModal();
      });
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      closeModal();
    });
  }

  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  // Обработка кнопки "Оплатить"
  const payButton = document.getElementById('mod_btn');
  if (payButton) {
    payButton.addEventListener('click', function () {
      const nameInput = document.querySelector(
        '.modal-content input[type="text"][placeholder="ФИО"]'
      );
      const emailInput = document.querySelector(
        '.modal-content input[type="email"]'
      );
      const addressInput = document.querySelector(
        '.modal-content input[type="text"][placeholder="Номер счета"]'
      );

      setTimeout(function () {
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (addressInput) addressInput.value = '';
        closeModal();
      }, 1000);
    });
  }
});
