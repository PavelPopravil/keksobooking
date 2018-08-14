!function () {
    'use strict';

    var pinApp = {

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

        createPins: function () {
            this.renderPins();
        },

        /**
         * Устанавливает обработчики событий для маркеров
         */
        setPinHanders: function () {

            this.selector.pinsWrapper.addEventListener('click', function (e) {
                // controller.showOfferDialogEvent(e, this);
            });

            // this.selector.dialogClose.addEventListener('click', view.removeOfferDialog);

            this.selector.pinsWrapper.addEventListener('keydown', function (e) {

                if (document.activeElement.classList.contains('pin') && window.util.isEnterKey(e)) {
                    // controller.showOfferDialogEvent(e, this);
                }
            });

            document.addEventListener('keydown', function (e) {

                if ((window.util.isEscKey(e) && model.data.offerIsOpen) || window.util.isFocused(controller.selector.dialogClose) && window.util.isEnterKey(e)) {
                    // model.removePinsActiveState();
                    // view.removeOfferDialog();
                }
            });
        },

        /**
         * Убирает активное состояния у всех маркеров
         */
        removePinsActiveState: function () {
            if (this.data.activePin) {
                this.data.activePin.classList.remove('pin--active');
            }
            this.data.activePin = null;
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
            this.createPins();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        pinApp.init();
    });
}();