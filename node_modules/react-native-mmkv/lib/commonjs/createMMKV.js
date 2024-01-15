"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMMKV = void 0;
var _reactNative = require("react-native");
// Root directory of all MMKV stores
const ROOT_DIRECTORY = null;
const createMMKV = config => {
  // Check if the constructor exists. If not, try installing the JSI bindings.
  if (global.mmkvCreateNewInstance == null) {
    // Get the native MMKV ReactModule
    const MMKVModule = _reactNative.NativeModules.MMKV;
    if (MMKVModule == null) {
      var _NativeModules$Native, _NativeModules$Native2;
      let message = 'Failed to create a new MMKV instance: The native MMKV Module could not be found.';
      message += '\n* Make sure react-native-mmkv is correctly autolinked (run `npx react-native config` to verify)';
      if (_reactNative.Platform.OS === 'ios' || _reactNative.Platform.OS === 'macos') {
        message += '\n* Make sure you ran `pod install` in the ios/ directory.';
      }
      if (_reactNative.Platform.OS === 'android') {
        message += '\n* Make sure gradle is synced.';
      }
      // check if Expo
      const ExpoConstants = (_NativeModules$Native = _reactNative.NativeModules.NativeUnimoduleProxy) === null || _NativeModules$Native === void 0 ? void 0 : (_NativeModules$Native2 = _NativeModules$Native.modulesConstants) === null || _NativeModules$Native2 === void 0 ? void 0 : _NativeModules$Native2.ExponentConstants;
      if (ExpoConstants != null) {
        if (ExpoConstants.appOwnership === 'expo') {
          // We're running Expo Go
          throw new Error('react-native-mmkv is not supported in Expo Go! Use EAS (`expo prebuild`) or eject to a bare workflow instead.');
        } else {
          // We're running Expo bare / standalone
          message += '\n* Make sure you ran `expo prebuild`.';
        }
      }
      message += '\n* Make sure you rebuilt the app.';
      throw new Error(message);
    }

    // Check if we are running on-device (JSI)
    if (global.nativeCallSyncHook == null || MMKVModule.install == null) {
      throw new Error('Failed to create a new MMKV instance: React Native is not running on-device. MMKV can only be used when synchronous method invocations (JSI) are possible. If you are using a remote debugger (e.g. Chrome), switch to an on-device debugger (e.g. Flipper) instead.');
    }

    // Call the synchronous blocking install() function
    const result = MMKVModule.install(ROOT_DIRECTORY);
    if (result !== true) throw new Error(`Failed to create a new MMKV instance: The native MMKV Module could not be installed! Looks like something went wrong when installing JSI bindings: ${result}`);

    // Check again if the constructor now exists. If not, throw an error.
    if (global.mmkvCreateNewInstance == null) throw new Error('Failed to create a new MMKV instance, the native initializer function does not exist. Are you trying to use MMKV from different JS Runtimes?');
  }
  return global.mmkvCreateNewInstance(config);
};
exports.createMMKV = createMMKV;
//# sourceMappingURL=createMMKV.js.map