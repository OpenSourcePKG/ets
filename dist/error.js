import { EtsUtils } from './utils.js';
/**
 * EtsError
 */
export class EtsError extends Error {
    /**
     * constructor
     * @param message
     * @param name
     */
    constructor(message, name) {
        super(message);
        /**
         * error namespace
         * @protected
         */
        this.namespace = '';
        this.name = name || 'EtsError';
        Object.setPrototypeOf(this, new.target.prototype);
        this._setNameSpace();
    }
    /**
     * _setNameSpace
     * @protected
     */
    _setNameSpace() {
        if (!this.stack) {
            return;
        }
        const lines = this.stack.split('\n').slice(1);
        if (lines.length > 0) {
            const properties = EtsUtils.parseStackLine(lines[0]);
            if (properties) {
                if (properties.typeName && properties.functionName) {
                    this.namespace = `${properties.functionName}`;
                }
            }
        }
    }
    /**
     * throw
     */
    throw() {
        // eslint-disable-next-line no-throw-literal
        throw this;
    }
}
