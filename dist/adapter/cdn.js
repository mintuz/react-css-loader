"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CDNAdapter =
/*#__PURE__*/
function () {
  function CDNAdapter(opts) {
    _classCallCheck(this, CDNAdapter);

    this.cdnRoot = opts.cdnRoot;
  }

  _createClass(CDNAdapter, [{
    key: "resolve",
    value: function resolve(styles, components) {
      var _this = this;

      return Promise.all(styles.map(function (stylePath, index) {
        var filePath = "".concat(_this.cdnRoot, "/").concat(stylePath);
        return Promise.resolve({
          componentName: components[index],
          error: null,
          success: true,
          path: filePath,
          content: "<link data-css-component=\"".concat(components[index], "\" rel=\"stylesheet\" href=\"").concat(filePath, "\">")
        });
      }));
    }
  }, {
    key: "render",
    value: function render(rawResponse) {
      return rawResponse.filter(function (style) {
        return style.success;
      }).reduce(function (result, style) {
        return "".concat(result).concat(style.content);
      }, '');
    }
  }]);

  return CDNAdapter;
}();

exports.default = CDNAdapter;