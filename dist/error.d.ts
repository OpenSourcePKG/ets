/**
 * EtsError
 */
export declare class EtsError extends Error {
    /**
     * error namespace
     * @protected
     */
    namespace: string;
    /**
     * constructor
     * @param message
     * @param name
     */
    constructor(message: string, name?: string);
    /**
     * _setNameSpace
     * @protected
     */
    protected _setNameSpace(): void;
    /**
     * throw
     */
    throw(): void;
}
