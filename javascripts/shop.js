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

function setupProductScreen(
  screenSelector,
  descriptionSelector,
  overlaySelector,
  showButtonSelector,
  closeButtonSelector
) {
  document.addEventListener('DOMContentLoaded', function () {
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
          description.style.display = 'flex'; // Показать описание
        }
        if (overlay) {
          overlay.style.display = 'block';
          overlay.style.opacity = 1; // Сделать оверлей видимым
          overlay.style.pointerEvents = 'auto'; // Разрешить взаимодействие с оверлеем
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
  });
}

// Настройка для первого экрана (Очки)
setupProductScreen(
  '.first_screen',
  '.product-description',
  '.overlayshop',
  '.product-cha',
  '#close'
);

// Настройка для второго экрана (Камера)
setupProductScreen(
  '.second_screen',
  '.camera-product-description',
  '.camera-overlayshop',
  '.camera-cha',
  '#camera-close'
);

setupProductScreen(
  '.third_screen',
  '.book-product-description',
  '.book-overlayshop',
  '.book-cha',
  '#book-close'
);

setupProductScreen(
  '.fourth_screen',
  '.figure-product-description',
  '.figure-overlayshop',
  '.figure-cha',
  '#figure-close'
);

function setupImageSwitcher() {
  const images = document.querySelectorAll('.product-image');
  let currentImageIndex = 0;

  function showNextImage() {
    // Скрываем текущее изображение
    images[currentImageIndex].classList.remove('active');

    // Увеличиваем индекс или возвращаемся к началу
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Показываем следующее изображение
    images[currentImageIndex].classList.add('active');
  }

  // Добавляем обработчик клика на контейнер с изображениями
  const container = document.querySelector('.product-images-container');
  container.addEventListener('click', showNextImage);
}

// Вызываем функцию после загрузки страницы
window.addEventListener('load', setupImageSwitcher);
