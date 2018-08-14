!function () {
    'use strict';

    var pinApp = {

        exportToGlobal: function () {
            window.mapApp.removePinsActiveState =  window.mapApp.removePinsActiveState || this.removePinsActiveState;
        },

        /**
         * Соотносит ноду маркера с объектом объявления
         * @param {num} dataOffer
         * @return {obj}
         */
        setPinDataObj: function (dataOffer) {
            return window.mapApp.adds[dataOffer]
        },

        /**
         * Генерирует разметку пина
         * @param {obj} item Объект объявления
         * @param {num} i Порядковый номер объекта объявления
         */
        generatePin: function (item, i) {
            var pin = document.createElement('div');
            pin.innerHTML = '<img src="' + item.data.author.avatar + '" class="round" width="40" height="40">';
            pin.className = 'pin';
            pin.dataset.offer = i;
            pin.setAttribute('tabindex', 0);
            setTimeout(function () {
                pin.style.left = (item.data.location.x - (pin.offsetWidth / 2)) + 'px';
                pin.style.top = (item.data.location.y - pin.offsetHeight) + 'px';
            }, 0); // without timeout offsetHeight is 0
            return pin;
        },

        /**
         * Вставляет пины на карту
         */
        renderPins: function () {
            var app = this;
            var fragment = document.createDocumentFragment();
            window.mapApp.adds.forEach(function (item, i) {
                fragment.append(app.generatePin(item, i));
            });
            this.selector.pinsWrapper.append(fragment);
        },

        /**
         * Устанавливает обработчики событий для маркеров
         */
        setPinHanders: function () {
            var app = this;

            this.selector.pinsWrapper.addEventListener('click', function (e) {
                app.handlePinEvent(e, this);
            });

            this.selector.pinsWrapper.addEventListener('keydown', function (e) {

                if (document.activeElement.classList.contains('pin') && window.util.isEnterKey(e)) {
                    app.handlePinEvent(e, this);
                }
            });
        },

        handlePinEvent: function (e, ctx) {
            var pin = window.util.findDelegateEl(e.target, 'pin', ctx);
            if (pin && pinApp.data.activePin !== pin) {
                pinApp.showOffer(pinApp.setPinDataObj(pin.dataset.offer), pin);
            }
        },

        /**
         * Показывает объявление
         * @method showOffer
         * @param {obj} item Объект с данными объявления
         * @param {dom node} el
         */
        showOffer: function (item, el) {
            this.removePinsActiveState();
            this.setPinActiveState(el);
            window.mapApp.generateOffer(item);
            window.mapApp.showOfferDialog();
        },
        
        /**
         * Убирает активное состояния у всех маркеров
         */
        removePinsActiveState: function () {
            if (pinApp.data.activePin) {
                pinApp.data.activePin.classList.remove('pin--active');
            }
            pinApp.data.activePin = null;
        },

        /**
         * Добавляет активное состояние выбранному маркеру
         * @param {dom node} el
         */
        setPinActiveState: function (el) {
            this.data.activePin = el;
            el.classList.add('pin--active');
        },

        init: function () {
            this.selector = {};
            this.selector.block = document.querySelector('.tokyo');
            if (!this.selector.block) {
                return false
            }
            this.data = {
                activePin: null
            };
            this.selector.pinsWrapper = this.selector.block.querySelector('.tokyo__pin-map');
            this.selector.mainPin = this.selector.pinsWrapper.querySelector('.pin.pin__main');
            this.renderPins();
            this.showOffer(window.mapApp.adds[0], document.querySelector('[data-offer="' + 0 + '"]'));
            this.setPinHanders();
            this.exportToGlobal();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        pinApp.init();
    });
}();