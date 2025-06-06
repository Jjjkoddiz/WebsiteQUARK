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

document.addEventListener('DOMContentLoaded', () => {
  const galleryOverlay = document.querySelector('.gallery-overlay');
  const allGalleryImages = document.querySelectorAll('.gallery .img img');

  function openImage(img) {
    const rect = img.getBoundingClientRect();
    const originalWidth = rect.width;
    const originalHeight = rect.height;
    const originalTop = rect.top + window.scrollY;
    const originalLeft = rect.left + window.scrollX;

    // Сохраняем исходные стили и размеры
    img.dataset.originalStyle = img.getAttribute('style') || ''; // Сохраняем все inline стили
    img.dataset.originalWidth = originalWidth;
    img.dataset.originalHeight = originalHeight;
    img.dataset.originalTop = originalTop;
    img.dataset.originalLeft = originalLeft;

    galleryOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';

    gsap.set(img, {
      position: 'fixed',
      top: originalTop,
      left: originalLeft,
      width: originalWidth,
      height: originalHeight,
      zIndex: 200,
      objectFit: 'cover',
      cursor: 'zoom-out',
    });

    img.classList.add('active');

    gsap.to(img, {
      duration: 0.5,
      top: '50%',
      left: '50%',
      width: '90%',
      height: '90%',
      xPercent: -50,
      yPercent: -50,
      objectFit: 'contain',
      boxShadow: '0 0 40px rgba(0, 0, 0, 0.6)',
    });
  }

  function closeImage(img) {
    const originalWidth = parseFloat(img.dataset.originalWidth);
    const originalHeight = parseFloat(img.dataset.originalHeight);
    const originalTop = parseFloat(img.dataset.originalTop);
    const originalLeft = parseFloat(img.dataset.originalLeft);

    gsap.to(img, {
      duration: 0.5,
      top: originalTop,
      left: originalLeft,
      width: originalWidth,
      height: originalHeight,
      xPercent: 0,
      yPercent: 0,
      objectFit: 'cover',
      boxShadow: 'none',
      onStart: () => {
        // Перед анимацией возврата, устанавливаем position: fixed и z-index
        gsap.set(img, {
          position: 'fixed',
          zIndex: 200,
        });
      },
      onComplete: () => {
        img.classList.remove('active');
        galleryOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Восстанавливаем исходные стили
        img.setAttribute('style', img.dataset.originalStyle);
      },
    });
  }

  allGalleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      if (img.classList.contains('active')) {
        closeImage(img);
      } else {
        openImage(img);
      }
    });
  });

  galleryOverlay.addEventListener('click', () => {
    const activeImg = document.querySelector('.gallery .img img.active');
    if (activeImg) {
      closeImage(activeImg);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeImg = document.querySelector('.gallery .img img.active');
      if (activeImg) {
        closeImage(activeImg);
      }
    }
  });
});
