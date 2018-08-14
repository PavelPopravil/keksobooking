!function () {
    'use strict';

    var cardApp = {

        /**
         * Импортирует данные об объявлениях в глобальную область видимости
         */
        importToGlobal: function () {
            window.mapApp.showOfferDialog =  window.mapApp.showOfferDialog || this.showOfferDialog;
            window.mapApp.removeOfferDialog =  window.mapApp.removeOfferDialog || this.removeOfferDialog;
            window.mapApp.generateOffer =  window.mapApp.generateOffer || this.generateOffer;
        },

        /**
         * Показывает окно с подробной инофрмацией об объявлении
         * @param {obj} item Объект с данными объявления
         */
        showOfferDialog: function (item) {
            this.data.offerIsOpen = true;
            this.selector.block.classList.add('active');
        },

        removeOfferDialog: function () {
            this.data.offerIsOpen = false;
            this.selector.block.classList.remove('active');
        },

        /**
         * Генерирует разметку для объявления
         * @param {obj} item Объект с данными объявления
         */
        generateOffer: function (item) {
            var template = document.querySelector('#lodge-template').content.querySelector('.dialog__panel').cloneNode(true);
            template.querySelector('.lodge__title').textContent = item.data.offer.title;
            template.querySelector('.lodge__address').textContent = item.data.offer.address;
            template.querySelector('.lodge__price').textContent = item.data.offer.price + ' руб/ночь';
            template.querySelector('.lodge__type').textContent = model.offerTypeTranslation[item.data.offer.type];
            template.querySelector('.lodge__rooms-and-guests').textContent = item.data.offer.guests + ' гостей  в ' + item.data.offer.rooms + ' комнатах';
            template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + item.data.offer.checkin + ', Выезд до ' + item.data.offer.checkin;
            item.data.offer.features.forEach(function (feature) {
                template.querySelector('.lodge__features').innerHTML += '<span class="feature__image feature__image--' + feature + '"></span>'
            });
            template.querySelector('.lodge__description').textContent = item.data.offer.description;
            this.selector.offerAvatar.src = item.data.author.avatar;
            this.appendMainOffer(template);
        },

        /**
         * Вставляет главрное объявление на страницу
         */
        appendMainOffer: function (template) {
            var currenItem =  this.selector.block.querySelector('.dialog__panel');
            this.selector.block.replaceChild(template, currenItem);
        },

        init: function () {
            this.selector = {};
            this.selector.block = document.querySelector('.dialog');
            if (!this.selector.block) {
                return false;
            }
            this.selector.offerAvatar = this.selector.block.querySelector('.dialog__title img');
            this.selector.dialogClose = this.selector.block.querySelector('.dialog__close');
            this.data = {
                offerIsOpen: false
            };
            this.importToGlobal();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        cardApp.init();
    });
}();