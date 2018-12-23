'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTreeWalker = require('react-tree-walker');

var _reactTreeWalker2 = _interopRequireDefault(_reactTreeWalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resolver = function () {
    function Resolver(app, adapter) {
        _classCallCheck(this, Resolver);

        this.app = app;
        this.adapter = adapter;
    }

    _createClass(Resolver, [{
        key: 'resolve',
        value: function resolve() {
            var _this = this;

            var styles = [];
            var components = [];

            return (0, _reactTreeWalker2.default)(this.app, function (element, instance) {
                if (instance && instance.getStyles) {
                    var stylesObject = instance.getStyles();
                    var alreadyContainStyle = styles.some(function (e) {
                        return stylesObject.stylePaths.includes(e);
                    });

                    if (alreadyContainStyle) {
                        return;
                    }

                    styles = [].concat(_toConsumableArray(styles), _toConsumableArray(stylesObject.stylePaths));
                    components = [].concat(_toConsumableArray(components), [stylesObject.componentName]);
                }
            }).then(function () {
                return _this.adapter.resolve(styles, components);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return this.resolve().then(function (rawResponse) {
                return _this2.adapter.render(rawResponse);
            });
        }
    }]);

    return Resolver;
}();

exports.default = Resolver;
module.exports = exports['default'];