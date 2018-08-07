!function() {
    'use strict';

    var formApp = {

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
                var minLength = inp.minLength || 30;
                var maxLength = inp.maxLength || 100;
                var valueLength = trg.value.length;

                if (!valueLength) {
                    trg.setCustomValidity('Заполните поле')
                } else if (valueLength < minLength) {
                    trg.setCustomValidity('Должно быть не менее ' + minLength + ' символа, Сейчас: ' + valueLength + '')
                } else if (valueLength > maxLength) {
                    trg.setCustomValidity('Должно быть не более ' + maxLength + ' символа, Сейчас: ' + valueLength + '')
                } else {
                    trg.setCustomValidity(' ')
                }
                if (trg.getAttribute('type') === 'nubmer') {
                    app.numberValid()
                }

                app.toggleInputState(trg);
            });
        },

        setFormHandlers:function () {
            var app = this;
            this.submitBtn.addEventListener('click', function () {

                app.inputs.forEach(function (item) {
                    app.validateInput(item)
                });
            });
        },

        initCfg: function () {
            var app = this;
            this.submitBtn = this.form.querySelector('.form__submit');
            this.inputs = [
                {
                    selector: document.querySelector('#title'),
                    maxLength: 100,
                    minLength: 30
                },
                {
                    selector: document.querySelector('#price'),
                    maxLength: window.mapData.maxPrice,
                    minLength: window.mapData.minPrice
                }
            ];
            this._data = {};
        },

        init: function () {
            var app = this;
            this.form = document.querySelector('.notice__form');
            if (!this.form) {
                return false;
            }
            this.initCfg();
            this.setFormHandlers();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        formApp.init();
    });
}();