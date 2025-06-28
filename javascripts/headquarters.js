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
  gsap.fromTo(
    '.text-line',
    {
      opacity: 0,
      translateY: '30px',
      rotateX: -15,
    },
    {
      opacity: 1,
      translateY: '0px',
      rotateX: 0,
      duration: 1.6,
      stagger: 0.2,
      ease: 'power3.out',
    }
  );
});

document.addEventListener('DOMContentLoaded', () => {
  const points = document.querySelectorAll('.point');
  const tooltips = document.querySelectorAll('.tooltip');

  points.forEach((point) => {
    point.addEventListener('mouseover', () => {
      const pointId = point.dataset.point;
      tooltips.forEach((tooltip) => {
        if (tooltip.dataset.tooltip === pointId) {
          tooltip.style.opacity = '1';
        } else {
          tooltip.style.opacity = '0';
        }
      });
    });

    point.addEventListener('mouseout', () => {
      tooltips.forEach((tooltip) => {
        tooltip.style.opacity = '0';
      });
    });
  });
});
