import {EtsError} from './error.js';
import {EtsStackLine, EtsUtils} from './utils.js';

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
export class Ets {

    /**
     * _getStack
     * @protected
     */
    protected static _getStack(): object {
        const oldLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = Infinity;

        const dummyObject = {
            stack: {}
        };

        const v8Handler = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, v8StackTrace): any => {
            return v8StackTrace;
        };

        Error.captureStackTrace(dummyObject, Ets.formate || Ets.toJson);
        Error.prepareStackTrace = v8Handler;
        Error.stackTraceLimit = oldLimit;

        if (dummyObject.stack) {
            return dummyObject.stack;
        }

        return {};
    }

    /**
     * formate
     * @param err
     */
    public static formate(err: unknown, withStack: boolean = false, withNamespace: boolean = false): string {
        let buffer = '';

        if (typeof err === 'string') {
            buffer = err;

            if (withStack) {
                const stack = Ets._getStack();
                buffer += `\n ${stack}`;
            }
        } else if (err instanceof EtsError) {
            if (withNamespace) {
                buffer += `${err.namespace}: `;
            }

            if (err.message) {
                buffer += err.message;
            }

            if (err.stack && withStack) {
                buffer += `\n ${err.stack}`;
            }
        } else if (err instanceof Error) {
            if (err.message) {
                buffer += err.message;
            }

            if (err.stack && withStack) {
                buffer += `\n ${err.stack}`;
            }
        }

        return buffer;
    }

    /**
     * toJson
     * @param err
     * @param asStr
     */
    public static toJson(err: unknown, asStr: boolean = true): string | EtsJson {
        const result: EtsJson = {};

        if (typeof err === 'string') {
            result.message = err;

            const stack = Ets._getStack();

            if (stack) {
                const stackLines = EtsUtils.parseStack(`${stack}`);

                if (stackLines) {
                    result.stack = stackLines;
                }
            }
        } else if (err instanceof EtsError) {
            result.message = err.message;
            result.name = err.name;
            result.namespace = err.namespace;

            if (err.stack) {
                const stackLines = EtsUtils.parseStack(err.stack);

                if (stackLines) {
                    result.stack = stackLines;
                }
            }
        } else if (err instanceof Error) {
            result.message = err.message;
            result.name = err.name;

            if (err.stack) {
                const stackLines = EtsUtils.parseStack(err.stack);

                if (stackLines) {
                    result.stack = stackLines;
                }
            }
        }

        if (asStr) {
            return JSON.stringify(result);
        }

        return result;
    }

}