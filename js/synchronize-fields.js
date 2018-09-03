!function () {
    'use strict';

    function syncFields(el, el2, data, data2, cb) {

        syncFieldsHandler(el, el2, data, data2, cb);

        el.addEventListener('change', function () {
            syncFieldsHandler(el, el2, data, data2, cb);
        });
    }

    function syncFieldsHandler(el, el2, data, data2, cb) {
        var index = data.indexOf(el.value);
        if (typeof cb === 'function') {
            cb(el2, data2[index]);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        window.mapApp.syncFields = window.mapApp.syncFields || syncFields;
    });

}();