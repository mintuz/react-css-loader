'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _appRootPath = require('app-root-path');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _index = require('../../../dist/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('styles'));

app.get('/', function (req, res) {
    var app = _react2.default.createElement(_App2.default, {
        bodyText: 'hello world, from the server yo'
    });

    var htmlBody = _server2.default.renderToString(app);

    var resolver = new _index.Resolver(app, new _index.CDNAdapter({
        cdnRoot: ''
    }));

    resolver.render().then(function (css) {
        res.send('\n            <html>\n                <head>\n                    ' + css + '\n                </head>\n                <body>\n                    ' + htmlBody + '\n                </body>\n            </html>\n            ');
    });
});

app.listen(8080, function () {
    console.log('Example application running');
});