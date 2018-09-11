!function () {
    'use strict';

    function load(method, url, onLoad, onError) {

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.timeout = 10000;

        xhr.addEventListener('load', function () {
            if (onLoad !== undefined && xhr.status === 200) {
                onLoad(xhr.response);
            } else if (onError !== undefined) {
                onError('Произошла ошибка на сервере, код ошибки - ' + xhr.status, false);
            }
        });

        xhr.addEventListener('error', function () {
            if (onError !== undefined) {
                onError('Произошла ошибка на сервере, код ошибки - ' + xhr.status, false);
            }
        });

        xhr.addEventListener('timeout', function () {
            if (onError !== undefined) {
                onError('Превышено время ответа сервера, оно составило ' + (xhr.timeout / 1000) + ' секунд.', false);
            }
        });

        xhr.open(method, url);
        xhr.send();
    }

    window.mapApp = {};
    window.mapApp.load = window.mapApp.load || load;
}();