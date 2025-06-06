// document.addEventListener('DOMContentLoaded', () => {
//   const btn = document.getElementById('menu-toggle');
//   const overlay = document.getElementById('overlay');

//   btn.addEventListener('click', () => {
//     const isOpen = btn.classList.toggle('open');
//     overlay.classList.toggle('show', isOpen);

//     // Альтернативно: менять aria-label
//     btn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
//   });
// });

// function applyBlurEffect() {
//   const elementsToBlur = document.querySelectorAll(
//     '.site-header, .menu-toggle, .hamburger, .img:not ([data-enlarged=true])'
//   );
//   gsap.to(elementsToBlur, {
//     filter: 'blur(20px)',
//     duration: 0.75,
//     ease: 'power2.out',
//   });
// }

// function removeBlurEffect() {
//   const elementsToBlur = document.querySelectorAll(
//     '.site-header, .menu-toggle, .hamburger, .img:not ([data-enlarged=true])'
//   );
//   gsap.to(elementsToBlur, {
//     filter: 'blur(0px)',
//     duration: 1,
//     ease: 'power2.out',
//   });
// }

// function toggleImageSize(event) {
//   const img = event.currentTarget;
//   const isEnlarged = img.getAttribute('data-enlarged') === 'true';
//   const originalPosition = JSON.parse(
//     img.getAttribute('data-original-position')
//   );
//   const viewportWidth = window.innerWidth;
//   const viewportHeight = window.innerHeight;

//   if (!isEnlarged) {
//     const enlargedWidth = 500;
//     const enlargedHeight = 600;
//     const centeredLeft = (viewportWidth - enlargedWidth) / 2;
//     const centeredTop = (viewportHeight - enlargedHeight) / 2;
//     const topCorrection = 75;
//     const correctedTop = centeredTop - topCorrection;

//     gsap.to(img, {
//       zIndex: 1000,
//       top: centeredTop + 'px',
//       left: centeredLeft + 'px',
//       width: enlargedWidth + 'px',
//       height: enlargedHeight + 'px',
//       ease: 'power4.out',
//       duration: 1,
//     });
//     img.setAttribute('data-enlarged', 'true');
//     applyBlurEffect();
//   } else {
//     setTimeout(() => removeBlurEffect(), 100);
//     gsap.to(img, {
//       zIndex: 1,
//       top: originalPosition.top,
//       left: originalPosition.left,
//       width: '75px',
//       height: '100px',
//       ease: 'power4.out',
//       duration: 1,
//     });
//     img.setAttribute('data-enlarged', 'false');
//   }
// }

// imgs.forEach((img, i) => {
//   img.setAttribute('data-original-position', JSON.stringify(positions[i]));
//   img.setAttribute('data-enlarged', 'false');
//   img.addEventListener('click, toggleImageSize');
// });
