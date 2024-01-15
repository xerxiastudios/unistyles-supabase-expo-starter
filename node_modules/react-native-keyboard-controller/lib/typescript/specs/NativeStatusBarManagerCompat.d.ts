import type { TurboModule } from "react-native";
export interface Spec extends TurboModule {
    readonly getConstants: () => {};
    setHidden(hidden: boolean): void;
    setColor(color: number, animated: boolean): void;
    setTranslucent(translucent: boolean): void;
    setStyle(style: string): void;
}
declare const _default: Spec | null;
export default _default;
