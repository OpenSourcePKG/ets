/**
 * EtsStackLine
 */
export type EtsStackLine = {
    fileName: string | null;
    lineNumber: number | null;
    functionName: string | null;
    typeName: string | null;
    methodName: string | null;
    columnNumber: number | null;
    native: boolean;
};
/**
 * EtsUtils
 */
export declare class EtsUtils {
    /**
     * stack only with files
     */
    static stackOnlyFiles: boolean;
    /**
     * parseStack
     * @param stack
     */
    static parseStack(stack: string): EtsStackLine[] | null;
    /**
     * parseStackLine
     * @param line
     */
    static parseStackLine(line: string): EtsStackLine | null;
}
