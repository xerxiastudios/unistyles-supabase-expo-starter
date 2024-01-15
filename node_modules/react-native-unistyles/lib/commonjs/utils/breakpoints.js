"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueForBreakpoint = void 0;
var _core = require("../core");
var _common = require("../common");
var _mqParser = require("./mqParser");
const getValueForBreakpoint = value => {
  const customMediaQueryKey = (0, _mqParser.getKeyForUnistylesMediaQuery)(Object.entries(value), _core.unistyles.runtime.screen);
  if (customMediaQueryKey) {
    return value[customMediaQueryKey];
  }
  const hasBreakpoints = _core.unistyles.registry.sortedBreakpointPairs.length > 0;
  if (!hasBreakpoints && _common.isMobile && (_common.ScreenOrientation.Landscape in value || _common.ScreenOrientation.Portrait in value)) {
    return value[_core.unistyles.runtime.orientation];
  }
  const breakpoint = _core.unistyles.runtime.breakpoint;
  if (!breakpoint) {
    return undefined;
  }
  const directBreakpoint = value[breakpoint];
  if (directBreakpoint || breakpoint in value) {
    return directBreakpoint;
  }
  const breakpointPairs = _core.unistyles.registry.sortedBreakpointPairs;
  const currentBreakpointIndex = breakpointPairs.findIndex(([key]) => key === breakpoint);
  const availableBreakpoints = breakpointPairs.filter(([key], index) => index < currentBreakpointIndex && key in value).map(([key]) => key);
  return value[availableBreakpoints[availableBreakpoints.length - 1]];
};
exports.getValueForBreakpoint = getValueForBreakpoint;
//# sourceMappingURL=breakpoints.js.map