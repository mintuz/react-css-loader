"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("util"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var readFile = _util.default.promisify(_fs.default.readFile);

function fileExists(filePath) {
  try {
    return _fs.default.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

var FileSystemAdapter =
/*#__PURE__*/
function () {
  function FileSystemAdapter(opts) {
    _classCallCheck(this, FileSystemAdapter);

    this.folderPath = opts.folderPath;
    this.inline = opts.inline;
  }

  _createClass(FileSystemAdapter, [{
    key: "resolve",
    value: function resolve(styles, components) {
      var _this = this;

      return Promise.all(styles.map(function (stylePath, index) {
        var filePath = "".concat(_this.folderPath, "/").concat(stylePath);

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
    key: "render",
    value: function render(rawResponse) {
      if (this.inline) {
        return rawResponse.filter(function (style) {
          return style.success;
        }).reduce(function (result, style) {
          return "".concat(result, "<style data-css-component=\"").concat(style.componentName, "\">").concat(style.content, "</style>");
        }, '').replace(/\r?\n|\r/g, '').trim();
      }

      return rawResponse.filter(function (style) {
        return style.success;
      }).reduce(function (result, style) {
        return "".concat(result).concat(style.content);
      }, '').replace(/\r?\n|\r/g, '').trim();
    }
  }]);

  return FileSystemAdapter;
}();

exports.default = FileSystemAdapter;