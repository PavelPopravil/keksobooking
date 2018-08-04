!function () {
    'use strict';

    var KeyCodes = {
        ESC: 27,
        ENT: 13
    };

    window.util = {


        findDelegateEl: function (el, cls) {
            if (!el.className) {
                return false;
            }
            while (el.className !== cls) {
                el = el.parentNode;
                // console.log(el);
            }
            return el;
        },

        /**
         * Проверяет в фокусе ли элемент
         * @param el {dom}
         * @return {boolean}
         */
        isFocused: function (el) {
            return document.activeElement === el;
        },
        /**
         * Проверяет были ли нажата кнопка ENT
         * @param {obj} e Объект события
         * @return {boolean}
         */
        isEnterKey: function (e) {
            return e.keyCode === KeyCodes.ENT;
        },

        /**
         * Проверяет были ли нажата кнопка ESK
         * @param {obj} e Объект события
         * @return {boolean}
         */
        isEscKey: function (e) {
            return e.keyCode === KeyCodes.ESC;
        },

        /** Генерирует случайное число в указанном диапазоне, включая максимаььное число
         * @method getRandomNumber
         * @param {number} min Минимальное число в диапазоне
         * @param {number} max Максмимальное число в диапазоне
         * @return {number} Случайное число d
         */
        getRandomNumber: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        /**
         * Возвращает перетасованный массив https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
         * @param array
         * @return {array}
         */
        arrayShuffler: function (array) {
            var arrLength = array.length;
            array.forEach(function (item, i) {
                var rand = Math.floor(Math.random() * arrLength);
                arrLength--;
                var temp = array[i];
                array[i] = array[rand];
                array[rand] = temp;
            });
            return array;
        },
        /**
         * Ковертируется число в строку с добавлением ведущего нуля
         * @param {nubmer} num
         * return {string}
         */
        convertNum: function (num) {
            return num >= 10 ? '' : '0' + num;
        }
    };
}();