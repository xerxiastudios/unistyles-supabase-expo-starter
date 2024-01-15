"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVariants = void 0;
var _react = require("react");
const useVariants = variantsMap => {
  const variantsRef = (0, _react.useRef)(variantsMap);
  variantsRef.current = variantsMap;
  return variantsRef.current;
};
exports.useVariants = useVariants;
//# sourceMappingURL=useVariants.js.map