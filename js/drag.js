!function () {
    'use strict';

    function DragApp() {}

    DragApp.prototype.onMouseDown = function (e) {
        var app = this;
        this.data.touch = true;
        this.data.startCoords = {
            x: e.pageX,
            y: e.pageY
        };
        this.selector.block.style.position = 'absolute';
        this.selector.block.style.zIndex = 999;

        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: app.data.startCoords.x - moveEvt.pageX,
                y: app.data.startCoords.y - moveEvt.pageY
            };

            app.data.startCoords = {
                x: moveEvt.pageX,
                y: moveEvt.pageY
            };

            app.data.endCoords = {
                x: app.selector.block.offsetLeft - shift.x,
                y: app.selector.block.offsetTop - shift.y
            };

            if (app.data.endCoords.y < app.data.limits.top) {
                app.data.endCoords.y = app.data.limits.top
            } else if (app.data.endCoords.y > app.data.limits.bottom) {
                app.data.endCoords.y = app.data.limits.bottom
            }

            if (app.data.endCoords.x < app.data.limits.left) {
                app.data.endCoords.x = app.data.limits.left
            } else if (app.data.endCoords.x > app.data.limits.right) {
                app.data.endCoords.x = app.data.limits.right
            }

            app.selector.block.style.top = app.data.endCoords.y + 'px';
            app.selector.block.style.left = app.data.endCoords.x + 'px';

            app.cb(app.data.endCoords, app.selector.block);
        }

        function onMouseUp(upEvt) {
            upEvt.preventDefault();
            app.data.touch = false;
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

    DragApp.prototype.init = function (block, area, cb) {
        this.selector = {
            block: block,
            area: area || document
        };
        this.data = {
            touch: false,
            limits: {
                top: 0,
                left: 0,
                right: this.selector.area.offsetWidth - this.selector.block.offsetWidth,
                bottom: this.selector.area.offsetHeight - this.selector.block.offsetHeight
            }
        };

        this.setHandlers();

        if (typeof cb === 'function') {
            this.cb = cb;
        }
    };

    function dragApp(block, area, cb) {
        if (block !== undefined) {
            (new DragApp()).init(block, area, cb)
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        window.mapApp.dragInit = window.mapApp.dragInit || dragApp;
    });

}();