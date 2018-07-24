!function () {
    'use strict';

    window.util = {

        /** Генерирует случайное число в указанном диапазоне, включая максимаььное число
         * @method getRandomNumber
         * @param {number} min Минимальное число в диапазоне
         * @param {number} max Максмимальное число в диапазоне
         * @return {number} Случайное число d
         */
        getRandomNumber: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    };

}();