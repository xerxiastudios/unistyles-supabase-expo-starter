"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInitialTheme = void 0;
var _react = require("react");
var _core = require("../core");
const useInitialTheme = forName => {
  (0, _react.useMemo)(() => {
    if (!_core.unistyles.runtime.themeName) {
      _core.unistyles.runtime.setTheme(forName);
    }
  }, []);
};
exports.useInitialTheme = useInitialTheme;
//# sourceMappingURL=useInitialTheme.js.map