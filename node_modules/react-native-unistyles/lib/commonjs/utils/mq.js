"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mq = void 0;
var _core = require("../core");
const getMQValue = value => {
  if (typeof value === 'number') {
    return value;
  }
  if (value === null) {
    return 0;
  }
  return _core.unistyles.registry.breakpoints[value] ?? 0;
};

/**
 * Utility to create cross-platform media queries
 * @returns - JavaScript symbol to be used in your stylesheet
 */
const mq = exports.mq = {
  only: {
    width: (wMin = 0, wMax = Infinity) => `:w[${getMQValue(wMin)}, ${getMQValue(wMax)}]`,
    height: (hMin = 0, hMax = Infinity) => `:h[${getMQValue(hMin)}, ${getMQValue(hMax)}]`
  },
  width: (wMin = 0, wMax = Infinity) => ({
    and: {
      height: (hMin = 0, hMax = Infinity) => `:w[${getMQValue(wMin)}, ${getMQValue(wMax)}]:h[${getMQValue(hMin)}, ${getMQValue(hMax)}]`
    }
  }),
  height: (hMin = 0, hMax = Infinity) => ({
    and: {
      width: (wMin = 0, wMax = Infinity) => `:w[${getMQValue(wMin)}, ${getMQValue(wMax)}]:h[${getMQValue(hMin)}, ${getMQValue(hMax)}]`
    }
  })
};
//# sourceMappingURL=mq.js.map