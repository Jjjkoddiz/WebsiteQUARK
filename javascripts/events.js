document.addEventListener('DOMContentLoaded', () => {
  // Меню toggle
  const btn = document.getElementById('menu-toggle');
  const overlay = document.getElementById('overlay');

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    overlay.classList.toggle('show', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  // Галерея изображений
  const galleryOverlay = document.querySelector('.gallery-overlay');
  const allGalleryImages = document.querySelectorAll('.gallery .img img');

  function openImage(img) {
    const imgContainer = img.parentElement;
    const rect = img.getBoundingClientRect();
    const originalWidth = rect.width;
    const originalHeight = rect.height;
    const originalTop = rect.top + window.scrollY;
    const originalLeft = rect.left + window.scrollX;

    img.dataset.originalWidth = originalWidth;
    img.dataset.originalHeight = originalHeight;
    img.dataset.originalTop = originalTop;
    img.dataset.originalLeft = originalLeft;

    imgContainer.dataset.originalWidth = getComputedStyle(imgContainer).width;
    imgContainer.dataset.originalHeight = getComputedStyle(imgContainer).height;
    img.dataset.originalPosition = getComputedStyle(img).position;
    img.dataset.originalObjectFit = getComputedStyle(img).objectFit;
    img.dataset.originalScale = 1;

    galleryOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';

    imgContainer.style.width = imgContainer.dataset.originalWidth;
    imgContainer.style.height = imgContainer.dataset.originalHeight;

    gsap.set(img, {
      position: 'fixed',
      top: originalTop,
      left: originalLeft,
      width: originalWidth,
      height: originalHeight,
      zIndex: 200,
      objectFit: 'cover',
      cursor: 'zoom-out',
      scale: 1,
    });
    img.classList.add('active');

    gsap.to(img, {
      duration: 0.5,
      top: '50%',
      left: '50%',
      scale: 4,
      xPercent: -50,
      yPercent: -50,
      objectFit: 'contain',
      boxShadow: '0 0 40px rgba(0, 0, 0, 0.6)',
    });
  }

  function closeImage(img) {
    const imgContainer = img.parentElement;
    const originalWidth = parseFloat(img.dataset.originalWidth);
    const originalHeight = parseFloat(img.dataset.originalHeight);
    const originalTop = parseFloat(img.dataset.originalTop);
    const originalLeft = parseFloat(img.dataset.originalLeft);

    const originalPosition = img.dataset.originalPosition;
    const originalObjectFit = img.dataset.originalObjectFit;
    const originalScale = parseFloat(img.dataset.originalScale);

    gsap.to(img, {
      duration: 0.5,
      top: originalTop,
      left: originalLeft,
      scale: originalScale,
      xPercent: 0,
      yPercent: 0,
      objectFit: originalObjectFit,
      boxShadow: 'none',
      onComplete: () => {
        img.classList.remove('active');
        galleryOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';

        imgContainer.style.width = imgContainer.dataset.originalWidth;
        imgContainer.style.height = imgContainer.dataset.originalHeight;

        img.style.position = originalPosition;
        img.style.top = '';
        img.style.left = '';
        img.style.width = '';
        img.style.height = '';
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
