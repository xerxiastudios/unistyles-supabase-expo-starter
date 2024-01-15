"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCSS = void 0;
var _react = require("react");
var _core = require("../core");
var _utils = require("../utils");
const useCSS = stylesheet => {
  const insertedIds = (0, _react.useRef)([]);
  (0, _react.useInsertionEffect)(() => {
    if (!_core.unistyles.registry.config.experimentalCSSMediaQueries) {
      return;
    }
    Object.entries(stylesheet).forEach(([_key, value]) => {
      Object.entries(value).forEach(([prop, val]) => {
        if (!val.toString().includes('@media')) {
          return;
        }
        const id = (0, _utils.generateReactNativeWebId)(prop, '""');
        if (insertedIds.current.includes(id)) {
          return;
        }
        const style = document.createElement('style');
        style.id = id;
        style.innerHTML = val;
        document.head.appendChild(style);
        insertedIds.current = [...insertedIds.current, id];
      });
    });
    return () => {
      insertedIds.current.forEach(id => {
        const style = document.getElementById(id);
        if (style) {
          style.remove();
        }
      });
      insertedIds.current = [];
    };
  }, [stylesheet]);
};
exports.useCSS = useCSS;
//# sourceMappingURL=useCSS.js.map