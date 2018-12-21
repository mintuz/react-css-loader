'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var readFile = _util2.default.promisify(_fs2.default.readFile);

function fileExists(filePath) {
    try {
        return _fs2.default.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

var FileSystem = function () {
    function FileSystem(opts) {
        _classCallCheck(this, FileSystem);

        this.folderPath = opts.folderPath;
        this.inline = opts.inline;
    }

    _createClass(FileSystem, [{
        key: 'resolve',
        value: function resolve(styles, components) {
            var _this = this;

            return Promise.all(styles.map(function (stylePath, index) {
                var filePath = _this.folderPath + '/' + stylePath;
                if (fileExists(filePath)) {
                    return readFile(filePath, 'utf8').then(function (content) {
                        return {
                            componentName: components[index],
                            error: null,
                            success: true,
                            path: filePath,
                            content: content
                        };
                    });
                }

                return Promise.resolve({
                    componentName: components[index],
                    error: new Error('Component stylesheet does not exist'),
                    success: false,
                    path: filePath,
                    content: ''
                });
            }));
        }
    }, {
        key: 'render',
        value: function render(rawResponse) {
            if (this.inline) {
                return rawResponse.filter(function (style) {
                    return style.success;
                }).reduce(function (result, style) {
                    return result + '<style data-css-component="' + style.componentName + '">' + style.content + '</style>';
                }, '').replace(/\r?\n|\r/g, '').trim();
            }

            return rawResponse.filter(function (style) {
                return style.success;
            }).reduce(function (result, style) {
                return '' + result + style.content;
            }, '').replace(/\r?\n|\r/g, '').trim();
        }
    }]);

    return FileSystem;
}();

exports.default = FileSystem;
module.exports = exports['default'];