"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTextEncoder = createTextEncoder;
/* global TextEncoder */
function createTextEncoder() {
  if (global.TextEncoder != null) {
    return new global.TextEncoder();
  } else {
    return {
      encode: () => {
        throw new Error('TextEncoder is not supported in this environment!');
      },
      encodeInto: () => {
        throw new Error('TextEncoder is not supported in this environment!');
      },
      encoding: 'utf-8'
    };
  }
}
//# sourceMappingURL=createTextEncoder.js.map