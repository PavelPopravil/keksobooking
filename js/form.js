!function() {
    'use strict';

    var address = document.querySelector('#address');

    var formApp = {

        prices: [1000, 0, 10000],
        flats: ['flat', 'shanty', 'palace'],

        exportToGlobal: function () {
            window.mapApp.updateAddress = window.mapApp.updateAddress || this.updateAddress;
        },

        updateAddress: function (coords, el) {
            var picCoords =  {
                x: parseInt(coords.x + (el.offsetWidth / 2)),
                y: parseInt(coords.y - el.offsetHeight)
            };
            address.value = 'x: ' + picCoords.x + ', y: ' + picCoords.y + '';
        },

        syncValue: function (el, value) {
            el.value = value;
        },

        fieldsDependencies: function () {
            var type = document.querySelector('#type');
            var price = document.querySelector('#price');
            var roomNumber = document.querySelector('#room_number');
            var capracity = document.querySelector('#capacity');
            var time = document.querySelector('#time');
            var timeout = document.querySelector('#timeout');

            window.mapApp.syncFields(time, timeout, window.mapApp.data.checkIns, window.mapApp.data.checkIns, this.syncValue);
            window.mapApp.syncFields(timeout, time, window.mapApp.data.checkIns, window.mapApp.data.checkIns, this.syncValue);
            window.mapApp.syncFields(type, price, this.flats, this.prices, this.syncValue);
            window.mapApp.syncFields(roomNumber, capracity, ['none-guest', 'for-guest', 'for-guest'], ['none-guest', 'for-guest'], this.syncValue);
            window.mapApp.syncFields(capracity, roomNumber, ['none-guest', 'for-guest'], ['none-guest', 'for-guest', 'for-guest'], this.syncValue);
        },

        numberValid: function (value) {
            return /^\d*$/.test(value)
        },

        toggleInputState: function (trg) {
            if (!trg.checkValidity()) {
                trg.classList.add('has-error');
            } else {
                trg.classList.remove('has-error');
            }
        },

        validateInput: function (inp) {
            var app = this;
            this.toggleInputState(inp.selector);
            inp.selector.addEventListener('input', function () {
                var trg = this;

                if (trg.getAttribute('type') === 'nubmer') {
                    app.numberValid()
                }

                app.toggleInputState(trg);
            });
        },

        resetForm: function (e) {
            this.reset();
        },

        setFormHandlers:function () {
            var app = this;
            this.submitBtn.addEventListener('click', function () {

                app.inputs.forEach(function (item) {
                    app.validateInput(item)
                });
            });
            this.form.addEventListener('submit', app.resetForm);
        },

        initCfg: function () {
            var app = this;
            this.submitBtn = this.form.querySelector('.form__submit');
            this.inputs = [
                {
                    selector: document.querySelector('#title')
                },
                {
                    selector: document.querySelector('#price')
                }
            ];
        },

        init: function () {
            formApp.form = document.querySelector('.notice__form');
            if (!formApp.form) {
                return false;
            }
            formApp.initCfg();
            formApp.setFormHandlers();
            formApp.fieldsDependencies();
            formApp.exportToGlobal();
        }
    };

    window.mapApp.initForm = window.mapApp.initForm || formApp.init;
}();