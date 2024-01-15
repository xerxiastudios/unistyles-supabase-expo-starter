"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeWebStylesPlugin = void 0;
var _normalizer = require("../normalizer");
const normalizeWebStylesPlugin = exports.normalizeWebStylesPlugin = {
  name: '__unistylesNormalizeWebStyles',
  onParsedStyle: (_key, styles) => (0, _normalizer.normalizeStyle)(styles)
};
//# sourceMappingURL=normalizeWebStylesPlugin.js.map