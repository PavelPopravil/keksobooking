!function () {
    'use strict';

    function DragApp() {}

    DragApp.prototype.onMouseDown = function (e) {
        console.log('mouseDown');
        var app = this;
        this.data.touch = true;
        this.data.startCoords = {
            x: e.pageX,
            y: e.pageY
        };
        this.selector.block.style.position = 'absolute';

        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();
            console.log('mousemove');

            var shift = {
                x: app.data.startCoords.x - moveEvt.pageX,
                y: app.data.startCoords.y - moveEvt.pageY
            };

            app.data.startCoords = {
                x: moveEvt.pageX,
                y: moveEvt.pageY
            };

            app.selector.block.style.top = (app.selector.block.offsetTop - shift.y) + 'px';
            app.selector.block.style.left = (app.selector.block.offsetLeft - shift.x) + 'px';
        }

        function onMouseUp() {
            app.data.touch = false;
            console.log('mouseup');
            app.selector.area.removeEventListener('mousemove', onMouseMove);
            app.selector.area.removeEventListener('mouseup', onMouseUp);
        }

        this.selector.area.addEventListener('mousemove', onMouseMove);
        this.selector.area.addEventListener('mouseup', onMouseUp);

        this.selector.block.addEventListener('dragstart', function () {
            return false;
        });
    };

    DragApp.prototype.setHandlers = function () {
        this.selector.block.addEventListener('mousedown', this.onMouseDown.bind(this));
    };

    DragApp.prototype.init = function (block, area) {
        this.selector = {
            block: block,
            area: area || document
        };
        this.data = {
            touch: false
        };

        this.setHandlers();
    };

    function dragApp(block, area) {
        if (block !== undefined) {
            (new DragApp()).init(block, area)
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        window.mapApp.dragInit = window.mapApp.dragInit || dragApp;
    });

}();