'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _ = require('../../../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Root(props) {
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_Header2.default, null),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_Body2.default, { text: props.bodyText })
        )
    );
}

Root.displayName = "Root";

exports.default = (0, _.StaticCSS)(Root, {
    styles: function styles() {
        return ['core.css'];
    }
});
module.exports = exports['default'];