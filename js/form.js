!function() {
    'use strict';

    var formApp = {

        costMap: {
            'shanty': 0,
            'flat': 1000,
            'palace': 10000
        },

        initDepency: function (inp, depInp, map) {
            var app = this;
            inp.addEventListener('change', function () {
                if (map !== undefined) {
                    depInp.value = map[this.value];
                } else {
                    depInp.value = this.value;
                }
            });
        },

        fieldsDependencies: function () {
            var type = document.querySelector('#type');
            var price = document.querySelector('#price');
            var roomNumber = document.querySelector('#room_number');
            var capracity = document.querySelector('#capacity');
            var time = document.querySelector('#time');
            var timeout = document.querySelector('#timeout');
            this.initDepency(type, price, this.costMap);
            this.initDepency(roomNumber, capracity);
            this.initDepency(time, timeout);
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
            var app = this;
            this.form = document.querySelector('.notice__form');
            if (!this.form) {
                return false;
            }
            this.initCfg();
            this.setFormHandlers();
            this.fieldsDependencies();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        formApp.init();
    });
}();