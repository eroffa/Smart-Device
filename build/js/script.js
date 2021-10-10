'use strict';

document.addEventListener('DOMContentLoaded', function () {

  var iMask = window.IMask;
  var callButton = document.querySelector('.page-header__call');
  var modal = document.querySelector('.page-modal');
  var modalWrapp = document.querySelector('.page-modal__wrapp');
  var modalButtonClose = document.querySelector('.page-modal__close');
  var form = document.querySelectorAll('.form form');
  var adviceButton = document.querySelector('.page-promo__advice');
  var widget = document.querySelectorAll('.page-footer__widget');
  var tel = document.querySelectorAll('input[type="tel"]');

  // Клик по кнопке "Заказать звонок"
  if (callButton) {
    callButton.addEventListener('click', feedModal);
  }

  // Закрытие модального окна
  if (modal) {
    modalButtonClose.addEventListener('click', feedModal);

    modal.addEventListener('click', function (evt) {
      var target = evt.target;
      var its = target === modalWrapp || modalWrapp.contains(target);

      if (!its) {
        feedModal(evt);
      }
    });
  }

  // Отправка данных с формы обратной связи
  if (form) {
    form.forEach(function (item) {
      var inputName = item.querySelector('input[type="text"]');
      var inputPhone = item.querySelector('input[type="tel"]');
      var inputMessage = item.querySelector('textarea');

      inputName.value = localStorage.getItem('name');
      inputPhone.value = localStorage.getItem('phone');
      inputMessage.value = localStorage.getItem('message');

      item.addEventListener('submit', function () {
        localStorage.setItem('name', inputName.value);
        localStorage.setItem('phone', inputPhone.value);
        localStorage.setItem('message', inputMessage.value);
      });
    });
  }

  // Скрол до формы обратной связи
  if (adviceButton) {
    adviceButton.addEventListener('click', function () {
      var feedback = document.querySelector('#feedback');

      window.scrollBy({
        top: (feedback.offsetTop - window.scrollY),
        behavior: 'smooth'
      });
    });
  }

  // Аккордеон в подвале
  if (widget) {

    widget.forEach(function (item) {
      var widgetButton = item.querySelector('button');

      item.classList.remove('page-footer__widget--nojs');

      widgetButton.addEventListener('click', function () {
        if (item.previousElementSibling) {
          item.previousElementSibling.classList.remove('page-footer__widget--show');
        }

        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('page-footer__widget--show');
        }

        item.classList.toggle('page-footer__widget--show');
      });
    });
  }

  // Валидация телефона
  // iMask - хранится в vendor.js
  tel.forEach(function (item) {
    iMask(item, {mask: '+{7} 000 000 00 00'});
  });

  // Модальное окно обратной связи
  function feedModal(evt) {
    evt.preventDefault();

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        feedModal(evt);
      }
    });

    document.body.classList.toggle('no-scroll');
    modal.classList.toggle('page-modal--show');

    var inputName = modal.querySelector('form input[type="text"]');
    inputName.focus();
  }

});
