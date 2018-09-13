!function () {
    'use strict';

    var pinApp = {

        exportToGlobal: function () {
            window.mapApp.removePinsActiveState = window.mapApp.removePinsActiveState || this.removePinsActiveState;
            window.mapApp.setPinActiveState =  window.mapApp.setPinActiveState || this.setPinActiveState;
            window.mapApp.renderPins =  window.mapApp.renderPins || this.renderPins;
            window.mapApp.clearPins =  window.mapApp.clearPins || this.clearPins;
        },

        /**
         * Генерирует разметку пина
         * @param {obj} item Объект объявления
         */
        generatePin: function (item) {
            var pin = document.createElement('div');
            pin.innerHTML = '<img src="' + item.author.avatar + '" class="round" width="40" height="40">';
            pin.className = 'pin';
            pin.dataset.offer = item.offerIndex;
            pin.setAttribute('tabindex', 0);
            setTimeout(function () {
                pin.style.left = (item.location.x - (pin.offsetWidth / 2)) + 'px';
                pin.style.top = (item.location.y - pin.offsetHeight) + 'px';
            }, 0); // without timeout offsetHeight is 0
            return pin;
        },

        clearPins: function (wrap) {
            wrap.innerHTML = '';
        },

        /**
         * Вставляет пины на карту
         */
        renderPins: function (data, wrap) {
            var fragment = document.createDocumentFragment();
            data.forEach(function (item) {
                fragment.append(pinApp.generatePin(item));
            });
            wrap.append(fragment);
        },

        /**
         * Убирает активное состояния у всех маркеров
         */
        removePinsActiveState: function () {
            if (window.mapApp.states.activePin) {
                window.mapApp.states.activePin.classList.remove('pin--active');
            }
            window.mapApp.states.activePin = null;
        },

        /**
         * Добавляет активное состояние выбранному маркеру
         * @param {dom node} el
         */
        setPinActiveState: function (el) {
            window.mapApp.states.activePin = el;
            el.classList.add('pin--active');
        },

        init: function () {
            this.exportToGlobal();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        pinApp.init();
    });
}();