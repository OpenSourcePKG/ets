import { EtsStackLine } from './utils.js';
/**
 * EtsJson
 */
export type EtsJson = {
    name?: string;
    message?: string;
    namespace?: string;
    stack?: EtsStackLine[];
};
/**
 * Ets
 */
export declare class Ets {
    /**
     * _getStack
     * @protected
     */
    protected static _getStack(): object;
    /**
     * formate
     * @param err
     */
    static formate(err: unknown, withStack?: boolean, withNamespace?: boolean): string;
    /**
     * toJson
     * @param err
     * @param asStr
     */
    static toJson(err: unknown, asStr?: boolean): string | EtsJson;
}
