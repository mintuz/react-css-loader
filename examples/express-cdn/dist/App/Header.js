'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../../../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Header() {
    return _react2.default.createElement(
        'header',
        { className: 'fake-header' },
        'My header'
    );
};

Header.displayName = "Header";

exports.default = (0, _.StaticCSS)(Header);
module.exports = exports['default'];