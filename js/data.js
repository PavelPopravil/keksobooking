!function () {
    'use strict';

    /**
     * Временные данные для объекта объявления
     * @type {{object}}
     */
    var data = {
        types: ['flat', 'house', 'bungalo'],
        checkIns: ['12:00', '13:00', '14:00']
    };

    var dataApp = {

        offerTypeTranslation: {
            flat: 'Квартира',
            house: 'Дом',
            bungalo: 'Бунгало'
        },

        /**
         * Импортирует данные об объявлениях в глобальную область видимости
         */
        exportToGlobal: function () {
            window.mapApp.adds = window.mapApp.adds || this.adds;
            window.mapApp.offerTypeTranslation = window.mapApp.offerTypeTranslation || this.offerTypeTranslation;
            window.mapApp.data = {
                flatTypes: data.types,
                checkIns: data.checkIns
            }
        },

        /**
         * Генерирует массив объявлений
         * @method createAdds
         */
        createAdds: function (data) {
            dataApp.adds = data;
            dataApp.exportToGlobal();
            window.mapApp.initForm();
            window.mapApp.initMap();
        },

        /**
         * Инициализация объекта, отвечающего за создание данных
         */
        init: function () {
            window.mapApp.load('GET', 'https://js.dump.academy/keksobooking/data', this.createAdds, window.mapApp.showStatus);
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        dataApp.init();
    });

}();