!function () {
    'use strict';

    var cardApp = {

        exportToGlobal: function () {
            window.mapApp.showOfferDialog =  window.mapApp.showOfferDialog || this.showOfferDialog;
            window.mapApp.removeOfferDialog =  window.mapApp.removeOfferDialog || this.removeOfferDialog;
            window.mapApp.generateOffer =  window.mapApp.generateOffer || this.generateOffer;
        },

        /**
         * Показывает окно с подробной инофрмацией об объявлении
         * @param {obj} item Объект с данными объявления
         */
        showOfferDialog: function (item) {
            window.mapApp.states.offerIsOpen = true;
            window.mapApp.selector.dialog.classList.add('active');
        },

        removeOfferDialog: function () {
            window.mapApp.states.offerIsOpen = false;
            window.mapApp.selector.dialog.classList.remove('active');
        },

        /**
         * Генерирует разметку для объявления
         * @param {obj} item Объект с данными объявления
         */
        generateOffer: function (item) {
            var template = document.querySelector('#lodge-template').content.querySelector('.dialog__panel').cloneNode(true);
            template.querySelector('.lodge__title').textContent = item.offer.title;
            template.querySelector('.lodge__address').textContent = item.offer.address;
            template.querySelector('.lodge__price').textContent = item.offer.price + ' руб/ночь';
            template.querySelector('.lodge__type').textContent = window.mapApp.offerTypeTranslation[item.offer.type];
            template.querySelector('.lodge__rooms-and-guests').textContent = item.offer.guests + ' гостей  в ' + item.offer.rooms + ' комнатах';
            template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + item.offer.checkin + ', Выезд до ' + item.offer.checkin;
            item.offer.features.forEach(function (feature) {
                template.querySelector('.lodge__features').innerHTML += '<span class="feature__image feature__image--' + feature + '"></span>'
            });
            template.querySelector('.lodge__description').textContent = item.offer.description;
            window.mapApp.selector.offerAvatar.src = item.author.avatar;
            cardApp.appendMainOffer(template);
        },

        /**
         * Вставляет главрное объявление на страницу
         */
        appendMainOffer: function (template) {
            var currenItem =  window.mapApp.selector.dialog.querySelector('.dialog__panel');
            window.mapApp.selector.dialog.replaceChild(template, currenItem);
        },

        init: function () {
            this.exportToGlobal();
        }
    };

    cardApp.init();
}();