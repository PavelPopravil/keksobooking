!function () {
    'use strict';

    function load(method, url, onLoad, onError) {

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open(method, url);

        xhr.addEventListener('error', function () {
            onError();
        });

        xhr.addEventListener('load', function () {
            if (onLoad !== undefined && xhr.status === 200) {
                onLoad(xhr.response);
            }
        });

        xhr.send();
    }

    window.mapApp = {};
    window.mapApp.load = window.mapApp.load || load;
}();