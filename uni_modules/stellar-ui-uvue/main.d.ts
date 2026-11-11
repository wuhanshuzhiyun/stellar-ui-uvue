/**
 * 与 main.uts 一一对应的类型声明，供标准 TypeScript 解析 npm 包主入口。
 *
 * uni-app x / HBuilderX 工具链会直接读取 .uts 源码获得精确类型；此文件仅用于
 * 普通 TS 语言服务的兜底，因此工具集（utils / System / Color）做了宽松化处理。
 */

/** 全局主题色取值 */
export type ColorValueType = {
    steThemeColor: string
    defaultColor: string
}

/** useColorStore() 返回值 */
export type ColorStoreResult = {
    getColor: () => ColorValueType
    setColor: (value: Record<string, unknown>) => void
}

/** setConfig() 参数 */
export type SetConfigOptions = { fontScale?: number }

/** useFontSize() 返回值（兼容旧 API） */
export type UseFontSizeResult = {
    getScale: () => number
    setScale: (scale: number) => void
    normalizeFontSize: (rpx: number) => string
    normalizeFontSizeNum: (rpx: number) => number
    onChange: (fn: () => void) => void
}

// 通用工具与颜色 store
export declare const utils: Record<string, (...args: any[]) => any>
export declare const System: any
export declare const Color: any
export declare function useColorStore(): ColorStoreResult

// 全局配置（字号缩放、主题色）
export declare function normalizeFontSize(rpx: number): string
export declare function normalizeFontSizeNum(rpx: number): number
export declare function getFontScale(): number
export declare function setFontScale(scale: number): void
export declare function onFontSizeChange(fn: () => void): void
export declare function useFontSize(): UseFontSizeResult
export declare function setThemeColor(params: Record<string, unknown>): void
export declare function getThemeColor(): ColorValueType
export declare function setConfig(options: SetConfigOptions): void

// 命令式 API（具体返回结构见各组件目录下的 use-*.uts）
export declare function useToast(): any
export declare function useMessageBox(customKey?: string): any
export declare function useTooltip(): any
