"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactTreeWalker = _interopRequireDefault(require("react-tree-walker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Resolver =
/*#__PURE__*/
function () {
  function Resolver(app, adapter) {
    _classCallCheck(this, Resolver);

    this.app = app;
    this.adapter = adapter;
  }

  _createClass(Resolver, [{
    key: "resolve",
    value: function resolve() {
      var _this = this;

      var styles = [];
      var components = [];
      return (0, _reactTreeWalker.default)(this.app, function (element, instance) {
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
    key: "render",
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