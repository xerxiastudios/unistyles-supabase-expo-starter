import type { MMKVConfiguration, NativeMMKV } from 'react-native-mmkv';
declare global {
    function mmkvCreateNewInstance(configuration: MMKVConfiguration): NativeMMKV;
    function nativeCallSyncHook(): unknown;
}
export declare const createMMKV: (config: MMKVConfiguration) => NativeMMKV;
//# sourceMappingURL=createMMKV.d.ts.map