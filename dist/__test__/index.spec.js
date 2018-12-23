"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = require("../../");

var _file = _interopRequireDefault(require("../../file"));

var _cdn = _interopRequireDefault(require("../../cdn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function buildComponent(displayName) {
  function MyComponent(props) {
    return _react.default.createElement("div", {
      "data-test-id": "my-mock-component"
    }, props.children);
  }

  MyComponent.displayName = displayName;
  return MyComponent;
}

describe('Resolver', function () {
  test('Should dedupe styles',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var MockComponentOne, MockComponentTwo, CustomApp, resolver, css;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            MockComponentOne = (0, _.StaticCSS)(buildComponent('MyComponent'));
            MockComponentTwo = (0, _.StaticCSS)(buildComponent('MyComponent2'));

            CustomApp = function CustomApp() {
              return _react.default.createElement(MockComponentOne, null, _react.default.createElement(MockComponentOne, null, _react.default.createElement(MockComponentTwo, null)));
            };

            resolver = new _.Resolver(_react.default.createElement(CustomApp), new _file.default({
              folderPath: __dirname,
              inline: false
            }));
            _context.next = 6;
            return resolver.resolve();

          case 6:
            css = _context.sent;
            expect(css.length).toEqual(2);
            expect(css[0].path).toContain('__test__/MyComponent.css');
            expect(css[1].path).toContain('__test__/MyComponent2.css');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  describe('FileSystem Adapter', function () {
    test('Should return CSS for a single module',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var resolver, css;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              resolver = new _.Resolver(_react.default.createElement((0, _.StaticCSS)(buildComponent('MyComponent'))), new _file.default({
                folderPath: __dirname,
                inline: false
              }));
              _context2.next = 3;
              return resolver.resolve();

            case 3:
              css = _context2.sent;
              expect(css.length).toEqual(1);
              expect(css[0].content).toContain('.mock-class');
              expect(css[0].success).toEqual(true);
              expect(css[0].path).toContain('__test__/MyComponent.css');

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    test('Should return CSS for multiple modules',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var MockComponentOne, MockComponentTwo, CustomApp, resolver, css;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              MockComponentOne = (0, _.StaticCSS)(buildComponent('MyComponent'));
              MockComponentTwo = (0, _.StaticCSS)(buildComponent('MyComponent2'));

              CustomApp = function CustomApp() {
                return _react.default.createElement(MockComponentOne, null, _react.default.createElement(MockComponentTwo, null));
              };

              resolver = new _.Resolver(_react.default.createElement(CustomApp), new _file.default({
                folderPath: __dirname,
                inline: false
              }));
              _context3.next = 6;
              return resolver.resolve();

            case 6:
              css = _context3.sent;
              expect(css.length).toEqual(2);
              expect(css[0].content).toContain('.mock-class');
              expect(css[1].content).toContain('.mock-class-two');
              expect(css[0].success).toEqual(true);
              expect(css[1].success).toEqual(true);
              expect(css[0].path).toContain('__test__/MyComponent.css');
              expect(css[1].path).toContain('__test__/MyComponent2.css');

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    test('Should return object with error when component css does not exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var MockComponentOne, MockComponentTwo, CustomApp, resolver, css;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              MockComponentOne = (0, _.StaticCSS)(buildComponent('MyComponent'));
              MockComponentTwo = (0, _.StaticCSS)(buildComponent('MyComponent-invalid'));

              CustomApp = function CustomApp() {
                return _react.default.createElement(MockComponentOne, null, _react.default.createElement(MockComponentTwo, null));
              };

              resolver = new _.Resolver(_react.default.createElement(CustomApp), new _file.default({
                folderPath: __dirname,
                inline: false
              }));
              _context4.next = 6;
              return resolver.resolve();

            case 6:
              css = _context4.sent;
              expect(css.length).toEqual(2);
              expect(css[0].content).toContain('.mock-class');
              expect(css[1].content).toContain('');
              expect(css[0].success).toEqual(true);
              expect(css[1].success).toEqual(false);
              expect(css[0].path).toContain('__test__/MyComponent.css');
              expect(css[1].path).toContain('__test__/MyComponent-invalid.css');
              expect(css[1].error.message).toEqual('Component stylesheet does not exist');

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    test('Should fetch user defined CSS files',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var MockComponentOne, resolver, css;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              MockComponentOne = (0, _.StaticCSS)(buildComponent('MyComponent'), {
                styles: function styles() {
                  return ['UserDefinedStyles.css'];
                }
              });
              resolver = new _.Resolver(_react.default.createElement(MockComponentOne), new _file.default({
                folderPath: __dirname,
                inline: false
              }));
              _context5.next = 4;
              return resolver.resolve();

            case 4:
              css = _context5.sent;
              expect(css.length).toEqual(2);
              expect(css[0].content).toContain('.mock-class');
              expect(css[1].content).toContain('.defined');
              expect(css[0].success).toEqual(true);
              expect(css[1].success).toEqual(true);
              expect(css[0].path).toContain('__test__/MyComponent.css');
              expect(css[1].path).toContain('__test__/UserDefinedStyles.css');

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
    describe('render', function () {
      test('should render a single css file',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var MockComponentOne, MockComponentTwo, CustomApp, resolver, css;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                MockComponentOne = (0, _.StaticCSS)(buildComponent('MyComponent'));
                MockComponentTwo = (0, _.StaticCSS)(buildComponent('MyComponent2'));

                CustomApp = function CustomApp() {
                  return _react.default.createElement(MockComponentOne, null, _react.default.createElement(MockComponentTwo, null));
                };

                resolver = new _.Resolver(_react.default.createElement(CustomApp), new _file.default({
                  folderPath: __dirname,
                  inline: false
                }));
                _context6.next = 6;
                return resolver.render();

              case 6:
                css = _context6.sent;
                expect(css).toEqual('.mock-class { background: red; }.mock-class-two { background: red; }');

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      })));
      test('should render css as inline styles',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var MockComponentOne, MockComponentTwo, CustomApp, resolver, css;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                MockComponentOne = (0, _.StaticCSS)(buildComponent('MyComponent'));
                MockComponentTwo = (0, _.StaticCSS)(buildComponent('MyComponent2'));

                CustomApp = function CustomApp() {
                  return _react.default.createElement(MockComponentOne, null, _react.default.createElement(MockComponentTwo, null));
                };

                resolver = new _.Resolver(_react.default.createElement(CustomApp), new _file.default({
                  folderPath: __dirname,
                  inline: true
                }));
                _context7.next = 6;
                return resolver.render();

              case 6:
                css = _context7.sent;
                expect(css).toEqual('<style data-css-component="MyComponent">.mock-class { background: red; }</style><style data-css-component="MyComponent2">.mock-class-two { background: red; }</style>');

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));
    });
  });
  describe('CDN Adapter', function () {
    test('output link tags for stylesheets',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var MockComponentOne, MockComponentTwo, CustomApp, resolver, css;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              MockComponentOne = (0, _.StaticCSS)(buildComponent('MyComponent'));
              MockComponentTwo = (0, _.StaticCSS)(buildComponent('MyComponent2'));

              CustomApp = function CustomApp() {
                return _react.default.createElement(MockComponentOne, null, _react.default.createElement(MockComponentTwo, null));
              };

              resolver = new _.Resolver(_react.default.createElement(CustomApp), new _cdn.default({
                cdnRoot: 'https://my-cdn.com'
              }));
              _context8.next = 6;
              return resolver.render();

            case 6:
              css = _context8.sent;
              expect(css).toEqual('<link data-css-component="MyComponent" rel="stylesheet" href="https://my-cdn.com/MyComponent.css"><link data-css-component="MyComponent2" rel="stylesheet" href="https://my-cdn.com/MyComponent2.css">');

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    })));
  });
});
describe('Dynamic CSS React Container', function () {
  test('Should wrap and render my component', function () {
    var fakeProps = {
      children: 'My fake content'
    };
    var Component = (0, _.DynamicCSS)(buildComponent('MyComponent'));
    var instance = (0, _enzyme.mount)(_react.default.createElement(Component, fakeProps));
    expect(Component.displayName).toEqual('DynamicCSS');
    expect(instance.find('[data-test-id="my-mock-component"]').exists()).toEqual(true);
    expect(instance.find('[data-test-id="my-mock-component"]').text()).toEqual('My fake content');
  });
  test('should not try render component css when display name not defined',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var resolver, css;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            resolver = new _.Resolver((0, _.DynamicCSS)(buildComponent()), new _file.default({
              folderPath: __dirname,
              inline: false
            }));
            _context9.next = 3;
            return resolver.resolve();

          case 3:
            css = _context9.sent;
            expect(css.length).toEqual(0);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  })));
});
describe('Static CSS React Container', function () {
  test('Should wrap and render my component', function () {
    var fakeProps = {
      children: 'My fake content'
    };
    var Component = (0, _.StaticCSS)(buildComponent('MyComponent'));
    var instance = (0, _enzyme.mount)(_react.default.createElement(Component, fakeProps));
    expect(Component.displayName).toEqual('StaticCSS');
    expect(instance.find('[data-test-id="my-mock-component"]').exists()).toEqual(true);
    expect(instance.find('[data-test-id="my-mock-component"]').text()).toEqual('My fake content');
  });
  test('should not try render component css when display name not defined',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var resolver, css;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            resolver = new _.Resolver((0, _.StaticCSS)(buildComponent()), new _file.default({
              folderPath: __dirname,
              inline: false
            }));
            _context10.next = 3;
            return resolver.resolve();

          case 3:
            css = _context10.sent;
            expect(css.length).toEqual(0);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  })));
});