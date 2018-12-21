'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (Component, opts) {
    var Container = function (_React$Component) {
        _inherits(Container, _React$Component);

        function Container(props) {
            _classCallCheck(this, Container);

            var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

            _this.getStyles = _this.getStyles.bind(_this);
            return _this;
        }

        _createClass(Container, [{
            key: 'getStyles',
            value: function getStyles() {
                var defaultStylePaths = [];

                if (Component.displayName) {
                    defaultStylePaths.push(Component.displayName + '.css');
                }

                var consumerDefinedStyles = opts && opts.styles ? opts.styles(this.props, this.state) : [];

                return {
                    componentName: Component.displayName ? Component.displayName : '',
                    stylePaths: [].concat(defaultStylePaths, consumerDefinedStyles)
                };
            }
        }, {
            key: 'render',
            value: function render() {
                var safeProps = _extends({}, this.props);

                return _react2.default.createElement(Component, safeProps);
            }
        }]);

        return Container;
    }(_react2.default.Component);

    Container.displayName = 'StaticCSS';
    return Container;
};

module.exports = exports['default'];