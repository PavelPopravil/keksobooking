!function () {
    'use strict';

    var filters = document.querySelector('.tokyo__filters');
    var houseType = filters.querySelector('#housing_type');
    var housePrice = filters.querySelector('#housing_price');
    var houseRoomNum = filters.querySelector('#housing_room-number');
    var houseGuestNum = filters.querySelector('#housing_guests-number');
    var selectList = filters.querySelectorAll('.tokyo__filter');

    // function houseTypeFilter() {
    //     if (houseType)
    // }

    function filterAllFields(offerItem) {
        console.log(offerItem);
        // console.log(selectList);
        selectList.forEach(function (item) {
            // console.log(item.value);
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