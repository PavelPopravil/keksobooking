!function () {
    'use strict';

    var filters = document.querySelector('.tokyo__filters');
    var houseType = filters.querySelector('#housing_type');
    var housePrice = filters.querySelector('#housing_price');
    var houseRoomNum = filters.querySelector('#housing_room-number');
    var houseGuestNum = filters.querySelector('#housing_guests-number');
    var features = filters.querySelector('#housing_features');

    var Prices = {
        min: 10000,
        max: 50000
    };

    var selectData = [
        {
            selector: houseType,
            cb: function (data) {
                return this.selector.value === 'any' ? true : this.selector.value === data.offer.type;
            }
        },
        {
            selector: housePrice,
            cb: function (data) {
                switch (this.selector.value) {
                    case 'any':
                        return true;
                        break;
                    case 'low':
                        return data.offer.price <= Prices.min;
                        break;
                    case 'middle':
                        return Prices.min <= data.offer.price && data.offer.price <= Prices.max;
                        break;
                    case 'high':
                        return data.offer.price >= Prices.max;
                    default:
                        return true;
                }
            }
        },
        {
            selector: houseRoomNum,
            cb: function (data) {
                return this.selector.value === 'any' ? true : parseInt(this.selector.value) === data.offer.rooms;
            }
        },
        {
            selector: houseGuestNum,
            cb: function (data) {
                return this.selector.value === 'any' ? true : parseInt(this.selector.value) === data.offer.guests;
            }
        },
        {
            selector: features,
            cb: function (data) {
                var checkedFeatures = features.querySelectorAll('[type="checkbox"]:checked');
                return Array.from(checkedFeatures).every(function (feature) {
                    return data.offer.features.includes(feature.value);
                })
            }
        }
    ];

    function filterAllFields(offerItem) {
        return selectData.every(function (item) {
            return item.cb(offerItem);
        });
    }

    function filterAdds(addsList) {
        return addsList.filter(filterAllFields);
    }

    function debouncedUpdatePins() {
        window.mapApp.clearPins(mapApp.selector.pinsWrapper);
        window.mapApp.renderPins(filterAdds(window.mapApp.adds), mapApp.selector.pinsWrapper);
    }

    function initFilter() {
        if (!filters) {
            return false;
        }
        var timer = null;
        filters.addEventListener('change', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                debouncedUpdatePins();
            }, 300);
        });
    }

    window.mapApp.initFilter = window.mapApp.initFilter || initFilter;
}();