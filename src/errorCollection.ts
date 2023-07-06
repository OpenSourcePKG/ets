import {EtsError} from './error.js';

/**
 * function for try catch
 */
export type ErrorCollectionTryCatch = () => void;

/**
 * ErrorCollection
 */
export class ErrorCollection extends EtsError {

    /**
     * list
     * @protected
     */
    protected _list: Error[] = [];

    /**
     * constructor
     */
    public constructor() {
        super('');
    }

    /**
     * add
     * @param err
     */
    public add(err: Error): void {
        this._list.push(err);
    }

    /**
     * trycatch
     * @param func
     */
    public trycatch(func: ErrorCollectionTryCatch): void {
        try {
            func();
        } catch (e) {
            if (e instanceof Error) {
                this._list.push(e);
            } else if (typeof e === 'string') {
                this._list.push(new EtsError(e));
            }
        }
    }

    /**
     * getErrors
     */
    public getErrors(): Error[] {
        return this._list;
    }

}