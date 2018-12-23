'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../../../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Body(props) {
    return _react2.default.createElement(
        'div',
        { className: 'fake-body' },
        _react2.default.createElement(
            'p',
            null,
            props.text
        )
    );
};

Body.displayName = "Body";

exports.default = (0, _.StaticCSS)(Body);
module.exports = exports['default'];