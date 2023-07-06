import { EtsError } from './error.js';
/**
 * function for try catch
 */
export type ErrorCollectionTryCatch = () => void;
/**
 * ErrorCollection
 */
export declare class ErrorCollection extends EtsError {
    /**
     * list
     * @protected
     */
    protected _list: Error[];
    /**
     * constructor
     */
    constructor();
    /**
     * add
     * @param err
     */
    add(err: Error): void;
    /**
     * trycatch
     * @param func
     */
    trycatch(func: ErrorCollectionTryCatch): void;
    /**
     * getErrors
     */
    getErrors(): Error[];
}
