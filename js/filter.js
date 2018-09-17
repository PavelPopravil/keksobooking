!function () {
    'use strict';

    var filters = document.querySelector('.tokyo__filters');
    var houseType = filters.querySelector('#housing_type');
    var housePrice = filters.querySelector('#housing_price');
    var houseRoomNum = filters.querySelector('#housing_room-number');
    var houseGuestNum = filters.querySelector('#housing_guests-number');
    var selectList = filters.querySelectorAll('.tokyo__filter');



    var selectData = [
        {
            selector: houseType,
            cb: function (data) {
                return this.selector.value === 'any' ? true : this.selector.value === data.offer.type;
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
        filters.addEventListener('change', function () {
            debouncedUpdatePins();
        });
    }

    window.mapApp.initFilter = window.mapApp.initFilter || initFilter;
}();