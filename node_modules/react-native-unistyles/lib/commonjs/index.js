"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AndroidContentSizeCategory", {
  enumerable: true,
  get: function () {
    return _common.AndroidContentSizeCategory;
  }
});
Object.defineProperty(exports, "IOSContentSizeCategory", {
  enumerable: true,
  get: function () {
    return _common.IOSContentSizeCategory;
  }
});
Object.defineProperty(exports, "ScreenOrientation", {
  enumerable: true,
  get: function () {
    return _common.ScreenOrientation;
  }
});
exports.UnistylesRuntime = exports.UnistylesRegistry = void 0;
Object.defineProperty(exports, "createStyleSheet", {
  enumerable: true,
  get: function () {
    return _createStyleSheet.createStyleSheet;
  }
});
Object.defineProperty(exports, "mq", {
  enumerable: true,
  get: function () {
    return _utils.mq;
  }
});
Object.defineProperty(exports, "useInitialTheme", {
  enumerable: true,
  get: function () {
    return _hooks.useInitialTheme;
  }
});
Object.defineProperty(exports, "useStyles", {
  enumerable: true,
  get: function () {
    return _useStyles.useStyles;
  }
});
var _core = require("./core");
var _utils = require("./utils");
var _hooks = require("./hooks");
var _common = require("./common");
var _useStyles = require("./useStyles");
var _createStyleSheet = require("./createStyleSheet");
/**
 * Utility to interact with the Unistyles
 * (should be called only once)
 */
const UnistylesRegistry = exports.UnistylesRegistry = {
  /**
   * Register themes to be used in the app
   * @param themes - Key value pair of themes
   */
  addThemes: _core.unistyles.registry.addThemes,
  /**
   * Register breakpoints to be used in the app
   * @param breakpoints - Key value pair of breakpoints
   */
  addBreakpoints: _core.unistyles.registry.addBreakpoints,
  /**
   * Register additional config to customize the Unistyles
   * @param config - Key value pair of config
   */
  addConfig: _core.unistyles.registry.addConfig
};
const UnistylesRuntime = exports.UnistylesRuntime = _core.unistyles.runtime;
//# sourceMappingURL=index.js.map