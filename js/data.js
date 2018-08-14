!function () {
    'use strict';

    /**
     * Временные данные для объекта объявления
     * @type {{object}}
     */
    var data = {
        offerLength: 8,
        offerTitles: [
            'Большая уютная квартира',
            'Маленькая неуютная квартира',
            'Огромный прекрасный дворец',
            'Маленький ужасный дворец',
            'Красивый гостевой домик',
            'Некрасивый негостеприимный домик',
            'Уютное бунгало далеко от моря',
            'Неуютное бунгало по колено в воде'
        ],
        types: ['flat', 'house', 'bungalo'],
        minPrice: 1000,
        maxPrice: 1000000,
        minRooms: 1,
        maxRooms: 5,
        checkIns: ['12:00', '13:00', '14:00'],
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        minLocX: 300,
        maxLocX: 900,
        minLocY: 100,
        maxLocY: 500
    };

    var dataApp = {

        offerTypeTranslation: {
            flat: 'Квартира',
            house: 'Дом',
            bungalo: 'Бунгало'
        },

        adds: [],

        /**
         * Импортирует данные об объявлениях в глобальную область видимости
         */
        exportToGlobal: function () {
            window.mapApp = {};
            window.mapApp.adds = window.mapApp.adds || this.adds;
            window.mapApp.offerTypeTranslation = window.mapApp.offerTypeTranslation || this.offerTypeTranslation;
        },

        /**
         * Генерирует объект обяъвления
         * @method generateAdd
         * @param {number} i порядковый номер объекта в массиве
         * @return [obj]
         */
        generateAdd: function (i) {
            var locX = window.util.getRandomNumber(data.minLocX, data.maxLocX);
            var locY = window.util.getRandomNumber(data.minLocY, data.maxLocY);
            var checkTime = data.checkIns[window.util.getRandomNumber(0, data.checkIns.length - 1)];
            var rooms = window.util.getRandomNumber(data.minRooms, data.maxRooms);
            return {
                data: {
                    author: {
                        avatar: 'img/avatars/user' + window.util.convertNum(i + 1) +'.png'
                    },
                    offer: {
                        title: data.offerTitles[window.util.getRandomNumber(0, data.offerTitles.length - 1)],
                        address: '' + locX + ', ' + locY + '',
                        price: window.util.getRandomNumber(data.minPrice, data.maxPrice),
                        type: data.types[window.util.getRandomNumber(0, data.types.length - 1)],
                        rooms: rooms,
                        guests: rooms * 2,
                        checkin: checkTime,
                        checkout: checkTime,
                        features: window.util.arrayShuffler(data.features.slice(0, window.util.getRandomNumber(1, data.features.length))),
                        description: '',
                        photos: []
                    },
                    location: {
                        x: locX,
                        y: locY
                    }
                }
            };
        },

        /**
         * Генерирует массив объявлений
         * @method createAdds
         */
        createAdds: function () {
            for (var i = 0; i < data.offerLength; i++) {
                this.adds.push(this.generateAdd(i));
            }
            this.exportToGlobal();
        },

        /**
         * Инициализация объекта, отвечающего за создание данных
         */
        init: function () {
            this.createAdds();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        dataApp.init();
    });

}();