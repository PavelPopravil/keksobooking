!function () {
    'use strict';

    var filters = document.querySelector('.tokyo__filters');
    var houseType = filters.querySelector('#housing_type');
    var housePrice = filters.querySelector('#housing_price');
    var houseRoomNum = filters.querySelector('#housing_room-number');
    var houseGuestNum = filters.querySelector('#housing_guests-number');

    function filterBySelect(el, list, prop, cb) {

        el.addEventListener('change', function () {

            window.mapApp.filterAdds = list.filter(function (item) {
                if (el.value === 'any') {
                    return true
                } else {
                    return el.value === item.offer[prop];
                }
            });

            console.log(window.mapApp.filterAdds);

            if (cb !== undefined) {
                cb();
            }
            
            mapApp.selector.pinsWrapper.innerHTML = '';
            window.mapApp.renderPins(window.mapApp.filterAdds, mapApp.selector.pinsWrapper);
        });
    }

    function initFilter() {
        if (!filters) {
            return false;
        }

        filterBySelect(houseType, window.mapApp.filterAdds, 'type');
        // filterBySelect(houseRoomNum, window.mapApp.filterAdds, 'rooms');
        // filterBySelect(houseGuestNum, window.mapApp.filterAdds, 'guest');
    }

    window.mapApp.initFilter = window.mapApp.initFilter || initFilter;
}();