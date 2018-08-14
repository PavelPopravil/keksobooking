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
            cardApp.data.offerIsOpen = true;
            cardApp.selector.block.classList.add('active');
        },

        removeOfferDialog: function () {
            cardApp.data.offerIsOpen = false;
            cardApp.selector.block.classList.remove('active');
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
            template.querySelector('.lodge__type').textContent = window.mapApp.offerTypeTranslation[item.data.offer.type];
            template.querySelector('.lodge__rooms-and-guests').textContent = item.data.offer.guests + ' гостей  в ' + item.data.offer.rooms + ' комнатах';
            template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + item.data.offer.checkin + ', Выезд до ' + item.data.offer.checkin;
            item.data.offer.features.forEach(function (feature) {
                template.querySelector('.lodge__features').innerHTML += '<span class="feature__image feature__image--' + feature + '"></span>'
            });
            template.querySelector('.lodge__description').textContent = item.data.offer.description;
            cardApp.selector.offerAvatar.src = item.data.author.avatar;
            cardApp.appendMainOffer(template);
        },

        /**
         * Вставляет главрное объявление на страницу
         */
        appendMainOffer: function (template) {
            var currenItem =  this.selector.block.querySelector('.dialog__panel');
            this.selector.block.replaceChild(template, currenItem);
        },

        setCardHandlers: function () {
            var app = this;
            document.addEventListener('keydown', function (e) {

                if ((window.util.isEscKey(e) && app.data.offerIsOpen) || window.util.isFocused(app.selector.dialogClose) && window.util.isEnterKey(e)) {
                    window.mapApp.removePinsActiveState();
                    app.removeOfferDialog();
                }
            });

            this.selector.dialogClose.addEventListener('click', app.removeOfferDialog);
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
            this.setCardHandlers();
            this.exportToGlobal();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        cardApp.init();
    });
}();