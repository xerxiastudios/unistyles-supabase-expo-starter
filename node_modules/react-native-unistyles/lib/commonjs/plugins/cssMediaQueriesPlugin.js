"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssMediaQueriesPlugin = void 0;
var _cssMediaQuery = require("../utils/cssMediaQuery");
// prevent recursive import

const cssMediaQueriesPlugin = exports.cssMediaQueriesPlugin = {
  name: '__unistylesCSSMediaQueries',
  onParsedStyle: (_key, styles, runtime) => (0, _cssMediaQuery.createMediaQueryForStyles)(styles, runtime)
};
//# sourceMappingURL=cssMediaQueriesPlugin.js.map