import { EtsError } from './error.js';
/**
 * ErrorCollection
 */
export class ErrorCollection extends EtsError {
    /**
     * constructor
     */
    constructor() {
        super('');
        /**
         * list
         * @protected
         */
        this._list = [];
    }
    /**
     * add
     * @param err
     */
    add(err) {
        this._list.push(err);
    }
    /**
     * trycatch
     * @param func
     */
    trycatch(func) {
        try {
            func();
        }
        catch (e) {
            if (e instanceof Error) {
                this._list.push(e);
            }
            else if (typeof e === 'string') {
                this._list.push(new EtsError(e));
            }
        }
    }
    /**
     * getErrors
     */
    getErrors() {
        return this._list;
    }
}
