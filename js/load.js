!function () {
    'use strict';

    function load(method, url, onLoad, onError) {

        var xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.addEventListener('error', function () {
            onError();
        });

        xhr.addEventListener('load', function () {
            // console.log(xhr.status);
            if (onLoad !== undefined) {
                onLoad(xhr.response);
            }

        });

        xhr.send();
    }

    document.addEventListener('DOMContentLoaded', function () {
        window.mapApp = {};
        window.mapApp.load = window.mapApp.load || load;
    });
}();