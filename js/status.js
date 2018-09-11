!function () {
    'use strict';

    function showStatus(msg, status) {
        var statusBlock = document.createElement('div');
        statusBlock.classList.add('status-block');
        statusBlock.innerText = msg;
        document.body.append(statusBlock);
        if (!status) {
            statusBlock.classList.add('error');
        } else {
            statusBlock.classList.add('success');
        }
        setTimeout(function () {
            statusBlock.remove();
            statusBlock = null;
        }, 5000);
    }

    window.mapApp.showStatus = window.mapApp.showStatus || showStatus;
}();