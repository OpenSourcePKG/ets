import {EtsUtils} from './utils.js';

/**
 * EtsError
 */
export class EtsError extends Error {

    /**
     * error namespace
     * @protected
     */
    public namespace: string = '';

    /**
     * constructor
     * @param message
     * @param name
     */
    public constructor(message: string, name?: string) {
        super(message);
        this.name = name || 'EtsError';

        Object.setPrototypeOf(this, new.target.prototype);

        this._setNameSpace();
    }

    /**
     * _setNameSpace
     * @protected
     */
    protected _setNameSpace(): void {
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
    public throw(): void {
        // eslint-disable-next-line no-throw-literal
        throw this;
    }

}