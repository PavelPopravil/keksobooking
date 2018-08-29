!function () {
    'use strict';

    function syncFields(el, el2, data1, data2, cb) {

        syncFieldsHandler(arguments);
        // el2.value = el.value;

        el.addEventListener('change', function () {
            syncFieldsHandler(arguments);
        });
    }

    function syncFieldsHandler() {

        if (cb === 'function') {
            cb();
        }
    }

    window.mapApp.syncFields = window.mapApp.syncFields || syncFields;
}();