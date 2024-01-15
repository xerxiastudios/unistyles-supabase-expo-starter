"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeStyle = void 0;
var _normalizer = require("./normalizer");
var _common = require("../common");
const normalizeBoxShadow = style => {
  const requiredBoxShadowProperties = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius'];
  if (!requiredBoxShadowProperties.every(prop => prop in style)) {
    (0, _common.warn)(`can't apply box shadow as you miss at least one of these properties: ${requiredBoxShadowProperties.join(', ')}`);
    return {
      shadowColor: undefined,
      shadowOffset: undefined,
      shadowOpacity: undefined,
      shadowRadius: undefined
    };
  }
  return {
    boxShadow: _normalizer.preprocessor.createBoxShadowValue(style),
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined
  };
};
const normalizeTextShadow = style => {
  const requiredTextShadowProperties = ['textShadowColor', 'textShadowOffset', 'textShadowRadius'];
  if (!requiredTextShadowProperties.every(prop => prop in style)) {
    (0, _common.warn)(`can't apply text shadow as you miss at least one of these properties: ${requiredTextShadowProperties.join(', ')}`);
    return {
      textShadowColor: undefined,
      textShadowOffset: undefined,
      textShadowRadius: undefined
    };
  }
  return {
    textShadow: _normalizer.preprocessor.createTextShadowValue(style),
    textShadowColor: undefined,
    textShadowOffset: undefined,
    textShadowRadius: undefined
  };
};
const normalizeStyle = style => {
  const normalizedTransform = 'transform' in style && Array.isArray(style.transform) ? {
    transform: _normalizer.preprocessor.createTransformValue(style.transform)
  } : {};
  const normalizedBoxShadow = 'shadowColor' in style || 'shadowOffset' in style || 'shadowOpacity' in style || 'shadowRadius' in style ? normalizeBoxShadow(style) : {};
  const normalizedTextShadow = 'textShadowColor' in style || 'textShadowOffset' in style || 'textShadowRadius' in style ? normalizeTextShadow(style) : {};
  return {
    ...style,
    ...normalizedTransform,
    ...normalizedBoxShadow,
    ...normalizedTextShadow
  };
};
exports.normalizeStyle = normalizeStyle;
//# sourceMappingURL=normalizeStyle.js.map