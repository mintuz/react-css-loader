'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CDN = function () {
    function CDN(opts) {
        _classCallCheck(this, CDN);

        this.cdnRoot = opts.cdnRoot;
    }

    _createClass(CDN, [{
        key: 'resolve',
        value: function resolve(styles, components) {
            var _this = this;

            return Promise.all(styles.map(function (stylePath, index) {
                var filePath = _this.cdnRoot + '/' + stylePath;
                return Promise.resolve({
                    componentName: components[index],
                    error: null,
                    success: true,
                    path: filePath,
                    content: '<link data-css-component="' + components[index] + '" rel="stylesheet" href="' + filePath + '">'
                });
            }));
        }
    }, {
        key: 'render',
        value: function render(rawResponse) {
            return rawResponse.filter(function (style) {
                return style.success;
            }).reduce(function (result, style) {
                return '' + result + style.content;
            }, '');
        }
    }]);

    return CDN;
}();

exports.default = CDN;
module.exports = exports['default'];