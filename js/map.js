!function () {
    'use strict';

    var mapApp = {

        exportToGlobal: function () {
            window.mapApp.states =  window.mapApp.states || this.data;
            window.mapApp.selector =  window.mapApp.selector || this.selector;
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
         * Показывает объявление
         * @method showOffer
         * @param {obj} item Объект с данными объявления
         * @param {dom node} el
         */
        showOffer: function (item, el) {
            window.mapApp.removePinsActiveState();
            window.mapApp.setPinActiveState(el);
            window.mapApp.generateOffer(item);
            window.mapApp.showOfferDialog();
        },

        handlePinEvent: function (e, ctx) {
            var pin = window.util.findDelegateEl(e.target, 'pin', ctx);
            if (pin && this.data.activePin !== pin) {
                this.showOffer(this.setPinDataObj(pin.dataset.offer), pin);
            }
        },

        setMapHandlers: function () {
            var app = this;

            this.selector.pinsWrapper.addEventListener('click', function (e) {
                app.handlePinEvent.call(app, e, this);
            });

            this.selector.pinsWrapper.addEventListener('keydown', function (e) {

                if (document.activeElement.classList.contains('pin') && window.util.isEnterKey(e)) {
                    app.handlePinEvent.call(app, e, this);
                }
            });

            document.addEventListener('keydown', function (e) {

                if ((window.util.isEscKey(e) && app.data.offerIsOpen) || window.util.isFocused(app.selector.dialogClose) && window.util.isEnterKey(e)) {
                    window.mapApp.removePinsActiveState();
                    window.mapApp.removeOfferDialog();
                }
            });

            this.selector.dialogClose.addEventListener('click', window.mapApp.removeOfferDialog);

            window.mapApp.dragInit(this.selector.mainPin, this.selector.block, window.mapApp.updateAddress);
        },

        initCfg: function () {
            this.data = {
                activePin: null,
                offerIsOpen: false
            };
            this.selector.pinsWrapper = this.selector.block.querySelector('.tokyo__pin-map');
            this.selector.mainPin = this.selector.pinsWrapper.querySelector('.pin.pin__main');
            
            this.selector.dialog = this.selector.block.querySelector('.dialog');
            this.selector.offerAvatar = this.selector.block.querySelector('.dialog__title img');
            this.selector.dialogClose = this.selector.block.querySelector('.dialog__close');
        },

        init: function () {
            mapApp.selector = {};
            mapApp.selector.block = document.querySelector('.tokyo');
            if (!mapApp.selector.block) {
                return false
            }
            mapApp.initCfg();
            mapApp.exportToGlobal();
            window.mapApp.renderPins(window.mapApp.adds, mapApp.selector.pinsWrapper);
            mapApp.showOffer(window.mapApp.adds[0], document.querySelector('[data-offer="' + 0 + '"]'));
            mapApp.setMapHandlers();
        }
    };

    window.mapApp.initMap = window.mapApp.initMap || mapApp.init;
}();