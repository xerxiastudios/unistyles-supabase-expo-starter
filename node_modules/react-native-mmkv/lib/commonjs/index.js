"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MMKV = require("./MMKV");
Object.keys(_MMKV).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MMKV[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MMKV[key];
    }
  });
});
var _hooks = require("./hooks");
Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hooks[key];
    }
  });
});
//# sourceMappingURL=index.js.map