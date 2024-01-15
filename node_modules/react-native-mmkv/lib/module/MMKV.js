import { createMMKV } from './createMMKV';
import { createMockMMKV } from './createMMKV.mock';
import { isJest } from './PlatformChecker';
const onValueChangedListeners = new Map();

/**
 * A single MMKV instance.
 */
export class MMKV {
  /**
   * Creates a new MMKV instance with the given Configuration.
   * If no custom `id` is supplied, `'mmkv.default'` will be used.
   */
  constructor() {
    let configuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      id: 'mmkv.default'
    };
    this.id = configuration.id;
    this.nativeInstance = isJest() ? createMockMMKV() : createMMKV(configuration);
    this.functionCache = {};
  }
  get onValueChangedListeners() {
    if (!onValueChangedListeners.has(this.id)) {
      onValueChangedListeners.set(this.id, []);
    }
    return onValueChangedListeners.get(this.id);
  }
  getFunctionFromCache(functionName) {
    if (this.functionCache[functionName] == null) {
      this.functionCache[functionName] = this.nativeInstance[functionName];
    }
    return this.functionCache[functionName];
  }
  onValuesChanged(keys) {
    if (this.onValueChangedListeners.length === 0) return;
    for (const key of keys) {
      for (const listener of this.onValueChangedListeners) {
        listener(key);
      }
    }
  }
  set(key, value) {
    const func = this.getFunctionFromCache('set');
    func(key, value);
    this.onValuesChanged([key]);
  }
  getBoolean(key) {
    const func = this.getFunctionFromCache('getBoolean');
    return func(key);
  }
  getString(key) {
    const func = this.getFunctionFromCache('getString');
    return func(key);
  }
  getNumber(key) {
    const func = this.getFunctionFromCache('getNumber');
    return func(key);
  }
  getBuffer(key) {
    const func = this.getFunctionFromCache('getBuffer');
    return func(key);
  }
  contains(key) {
    const func = this.getFunctionFromCache('contains');
    return func(key);
  }
  delete(key) {
    const func = this.getFunctionFromCache('delete');
    func(key);
    this.onValuesChanged([key]);
  }
  getAllKeys() {
    const func = this.getFunctionFromCache('getAllKeys');
    return func();
  }
  clearAll() {
    const keys = this.getAllKeys();
    const func = this.getFunctionFromCache('clearAll');
    func();
    this.onValuesChanged(keys);
  }
  recrypt(key) {
    const func = this.getFunctionFromCache('recrypt');
    return func(key);
  }
  toString() {
    return `MMKV (${this.id}): [${this.getAllKeys().join(', ')}]`;
  }
  toJSON() {
    return {
      [this.id]: this.getAllKeys()
    };
  }
  addOnValueChangedListener(onValueChanged) {
    this.onValueChangedListeners.push(onValueChanged);
    return {
      remove: () => {
        const index = this.onValueChangedListeners.indexOf(onValueChanged);
        if (index !== -1) {
          this.onValueChangedListeners.splice(index, 1);
        }
      }
    };
  }
}
//# sourceMappingURL=MMKV.js.map