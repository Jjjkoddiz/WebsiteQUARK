document.addEventListener('DOMContentLoaded', () => {
  // Меню-бургер
  const btn = document.getElementById('menu-toggle');
  const overlay = document.getElementById('overlay');

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    overlay.classList.toggle('show', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  // Обработчики для счетчиков категорий
  document.querySelectorAll('.category-controls').forEach((controls) => {
    const minusBtn = controls.querySelector('.control-button:first-child');
    const plusBtn = controls.querySelector('.control-button:last-child');
    const countElement = controls.querySelector('.category-count');

    minusBtn.addEventListener('click', () => {
      let count = parseInt(countElement.textContent);
      if (count > 0) {
        countElement.textContent = count - 1;
      }
    });

    plusBtn.addEventListener('click', () => {
      let count = parseInt(countElement.textContent);
      countElement.textContent = count + 1;
    });
  });

  // Обработчик для кнопки отправки
  document
    .querySelector('.payment-button')
    .addEventListener('click', function () {
      // Сбор данных из формы билетов
      const formData = {
        firstName: document.querySelector(
          '.tickets-section input[placeholder="Имя"]'
        ).value,
        lastName: document.querySelector(
          '.tickets-section input[placeholder="Фамилия"]'
        ).value,
        country: document.querySelector('.tickets-section .form-select').value,
        email: document.querySelector('.tickets-section input[type="email"]')
          .value,
        date: document.querySelector(
          '.tickets-section input[placeholder="Дата"]'
        ).value,

        // Сбор данных категорий
        categories: {
          adult: parseInt(
            document.querySelector('.category-row:nth-child(2) .category-count')
              .textContent
          ),
          pensioner: parseInt(
            document.querySelector('.category-row:nth-child(3) .category-count')
              .textContent
          ),
          student: parseInt(
            document.querySelector('.category-row:nth-child(4) .category-count')
              .textContent
          ),
          child: parseInt(
            document.querySelector('.category-row:nth-child(5) .category-count')
              .textContent
          ),
        },

        // Данные подписки
        newsletter: document.getElementById('newsCheckbox').checked,

        // Данные оплаты
        cardNumber: document.querySelector(
          '.payment-input[placeholder="Номер карты"]'
        ).value,
        cardDate: document.querySelector(
          '.payment-input[placeholder="Дата/Год"]'
        ).value,
        cardCVV: document.querySelector('.payment-input[placeholder="CVV"]')
          .value,
      };

      // Валидация обязательных полей
      const requiredFields = [
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.cardNumber,
        formData.cardDate,
        formData.cardCVV,
      ];

      if (requiredFields.some((field) => !field.trim())) {
        alert('Пожалуйста, заполните все обязательные поля!');
        return;
      }

      console.log('Отправленные данные:', formData);

      // Очистка всех полей
      clearAllForms();

      // Визуальное подтверждение отправки
      showSuccessMessage();
    });

  // Функция очистки всех форм
  function clearAllForms() {
    // Очистка основной формы
    document
      .querySelectorAll('.tickets-section input, .tickets-section select')
      .forEach((element) => {
        if (element.tagName === 'INPUT') {
          element.value = '';
        } else if (element.tagName === 'SELECT') {
          element.selectedIndex = 0;
        }
      });

    // Сброс счетчиков категорий
    document.querySelectorAll('.category-count').forEach((counter) => {
      counter.textContent = '0';
    });

    // Сброс чекбокса новостей
    document.getElementById('newsCheckbox').checked = false;

    // Очистка платежных данных
    document.querySelectorAll('.payment-input').forEach((input) => {
      input.value = '';
    });
  }

  // Функция показа сообщения об успешной отправке
  function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Форма успешно отправлена!';
    successMessage.style.cssText = `
      position: fixed;
      top: 1vw;
      left: 50%;
      transform: translateX(-50%);
      background-color: #a9a9a9;
      color: white;
      padding: 0.65vw 0.65vw;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 1000;
      font-size: 3vw;
      font-family: 'HelveticaNeueCyr-Roman';
      letter-spacing: 0.1vw;
    `;

    document.body.appendChild(successMessage);

    // Автоматическое скрытие сообщения через 3 секунды
    setTimeout(() => {
      successMessage.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 500);
    }, 3000);
  }
});
