"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPlugins = void 0;
var _core = require("../core");
const withPlugins = (key, style) => _core.unistyles.registry.plugins.reduce((acc, plugin) => {
  if (plugin.onParsedStyle) {
    return plugin.onParsedStyle(key, acc, _core.unistyles.runtime);
  }
  return acc;
}, style);
exports.withPlugins = withPlugins;
//# sourceMappingURL=withPlugins.js.map