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

    /**
     * Объект модели
     * @type {{object}}
     */
    var model = {

        adds: [],

        offerTypeTranslation: {
            flat: 'Квартира',
            house: 'Дом',
            bungalo: 'Бунгало'
        },

        /**
         * Генерирует массив объявлений
         * @method createAdds
         */
        createAdds: function () {

            for (var i = 0; i < data.offerLength; i++) {
                this.adds.push(this.generateAdd(i));
            }

            controller.createPins();
            controller.showOffer(this.adds[0]);
            controller.setPinHanders();
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
                },
                selector: {}
            };
        },

        /**
         * Убирает активное состояния у всех маркеров
         */
        removePinsActiveState: function () {
            this.adds.forEach(function (item) {
                item.data.isActive = false;
                item.selector.pin.classList.remove('pin--active');
            });
        },

        setPinActiveState: function (item) {
            item.selector.pin.classList.add('pin--active');
            item.data.isActive = true;
        }
    };

    /**
     * Объект контроллер (Обработка действий пользователя)
     * @type {{object}}
     */
    var controller = {

        /**
         * Инициализация переменных дом-дерева
         */
        initCfg: function () {
            this.selector = {
                block: document.querySelector('.tokyo')
            };
            this.selector.offerDialog = this.selector.block.querySelector('.dialog');
            this.selector.offerAvatar = this.selector.offerDialog.querySelector('.dialog__title img');
            this.selector.dialogClose = this.selector.offerDialog.querySelector('.dialog__close');
        },

         /**
         * @method createPins
         */
        createPins: function () {
            view.renderPins();
        },

        /**
         * @method showOffer
         */
        showOffer: function (item) {
            if (item.data.isActive) {
                return false;
            }
            model.removePinsActiveState();
            model.setPinActiveState(item);
            view.generateOffer(item);
            view.showOfferDialog();
        },

        /**
         * Устанавливает обработчики событий для маркеров
         */
        setPinHanders: function () {
            model.adds.forEach(function (item) {
                item.selector.pin.addEventListener('click', function () {
                    controller.showOffer(item);
                });
            });

            this.selector.dialogClose.addEventListener('click', view.removeOfferDialog);
        }
    };

    /**
     * Объект представления
     * @type {{object}}
     */
    var view = {

        /**
         * Показывает окно с подробной инофрмацией об объявлении
         */
        showOfferDialog: function (item) {
            controller.selector.offerDialog.classList.add('active');
        },
        
        removeOfferDialog: function () {
            controller.selector.offerDialog.classList.remove('active');
        },

        /**
         * Генерирует разметку для объявления
         * @param {obj} item Объект с данными объявления
         */
        generateOffer: function (item) {
            var template = document.querySelector('#lodge-template').content.querySelector('.dialog__panel').cloneNode(true);
            template.querySelector('.lodge__title').textContent = item.data.offer.title;
            template.querySelector('.lodge__address').textContent = item.data.offer.address;
            template.querySelector('.lodge__price').textContent = item.data.offer.price + ' руб/ночь';
            template.querySelector('.lodge__type').textContent = model.offerTypeTranslation[item.data.offer.type];
            template.querySelector('.lodge__rooms-and-guests').textContent = item.data.offer.guests + ' гостей  в ' + item.data.offer.rooms + ' комнатах';
            template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + item.data.offer.checkin + ', Выезд до ' + item.data.offer.checkin;
            item.data.offer.features.forEach(function (feature) {
                template.querySelector('.lodge__features').innerHTML += '<span class="feature__image feature__image--' + feature + '"></span>'
            });
            template.querySelector('.lodge__description').textContent = item.data.offer.description;
            controller.selector.offerAvatar.src = item.data.author.avatar;
            this.appendMainOffer(template);
        },

        /**
         * Вставляет главрное объявление на страницу
         */
        appendMainOffer: function (template) {
            var currenItem =  controller.selector.offerDialog.querySelector('.dialog__panel');
            controller.selector.offerDialog.replaceChild(template, currenItem);
        },

        /**
         * Генерирует разметку пина
         * @param {obj} item Объект объявления
         */
        generatePin: function (item) {
            var pin = document.createElement('div');
            pin.innerHTML = '<img src="' + item.data.author.avatar + '" class="round" width="40" height="40">';
            pin.className = 'pin';
            setTimeout(function () {
                pin.style.left = (item.data.location.x - (pin.offsetWidth / 2)) + 'px';
                pin.style.top = (item.data.location.y - pin.offsetHeight) + 'px';
            }, 0); // without timeout offsetHeight is 0
            item.selector.pin = pin;
            return pin;
        },

        /**
         * Вставляет пины на карту
         */
        renderPins: function () {
            var pinsWrapper = document.querySelector('.tokyo__pin-map');
            var fragment = document.createDocumentFragment();
            model.adds.forEach(function (item) {
                fragment.append(view.generatePin(item));
            });
            pinsWrapper.append(fragment);
        }
    };

    /**
     * Объект приложения
     * @type {{object}}
     */
    var mapApp = {
        init: function () {
            controller.initCfg();
            model.createAdds();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        mapApp.init();
    });
}();