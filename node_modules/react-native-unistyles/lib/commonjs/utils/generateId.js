"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateReactNativeWebId = void 0;
var _hash = require("./hash32");
// eslint-disable-next-line camelcase

const generateReactNativeWebId = (key, value) => {
  const hashedString = (0, _hash.murmurhash2_32_gc)(key + value, 1).toString(36);
  return process.env.NODE_ENV !== 'production' ? `r-${key}-${hashedString}` : `r-${hashedString}`;
};
exports.generateReactNativeWebId = generateReactNativeWebId;
//# sourceMappingURL=generateId.js.map