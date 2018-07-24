!function () {
    'use strict';

    /**
     * Объект представления
     * @type {{object}}
     */
    var view = {

    };

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
        minLoc5: 100
    };

    /**
     * Объект модели
     * @type {{object}}
     */
    var model = {

        adds: [],

        /**
         * Генерирует массив объявлений
         * @method createAdds
         */
        createAdds: function () {

            for (var i = 0; i < data.offerLength; i++) {
                this.adds.push(this.generateAdd());
            }
        },

        /**
         * Генерирует объект обяъвления
         * @method generateAdd
         * @return [number]
         */
        generateAdd: function () {
            return {
                author: {
                    avatar: 'img/avatars/users01.png'
                },
                offer: {
                    title: '',
                    address: '',
                    price: '',
                    type: '',
                    rooms: '',
                    guests: '',
                    checkin: '',
                    checkout: '',
                    features: '',
                    description: '',
                    photos: []
                },
                location: {
                    x: '',
                    y: ''
                }
            }
        }
    };

    /**
     * Объект контроллер (Обработка действий пользователя)
     * @type {{object}}
     */
    var controller = {

    };

    /**
     * Объект приложения
     * @type {{object}}
     */
    var mapApp = {
        init: function () {
            model.createAdds();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        mapApp.init();
    });
}();