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
export class EtsUtils {

    /**
     * stack only with files
     */
    public static stackOnlyFiles: boolean = true;

    /**
     * parseStack
     * @param stack
     */
    public static parseStack(stack: string): EtsStackLine[] | null {
        const lines = stack.split('\n').slice(1);

        if (lines.length > 0) {
            const stackLines: EtsStackLine[] = [];

            for (const line of lines) {
                const lineProperty = EtsUtils.parseStackLine(line);

                if (lineProperty) {
                    if (EtsUtils.stackOnlyFiles) {
                        if (!lineProperty.fileName?.startsWith('file:')) {
                            // eslint-disable-next-line no-continue
                            continue;
                        }
                    }

                    stackLines.push(lineProperty);
                }
            }

            return stackLines;
        }

        return null;
    }

    /**
     * parseStackLine
     * @param line
     */
    public static parseStackLine(line: string): EtsStackLine | null {
        const lineMatch = line.match(/at (?:(.+?)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/u);

        if (lineMatch) {
            let object = null;
            let method = null;
            let functionName = null;
            let typeName = null;
            let methodName = null;
            const isNative = lineMatch[5] === 'native';

            if (lineMatch[1]) {
                functionName = lineMatch[1];
                let methodStart = functionName.lastIndexOf('.');

                if (functionName[methodStart - 1] === '.') {
                    methodStart--;
                }

                if (methodStart > 0) {
                    object = functionName.substr(0, methodStart);
                    method = functionName.substr(methodStart + 1);
                    const objectEnd = object.indexOf('.Module');
                    if (objectEnd > 0) {
                        functionName = functionName.substr(objectEnd + 1);
                        object = object.substr(0, objectEnd);
                    }
                }
            }

            if (method) {
                typeName = object;
                methodName = method;
            }

            if (method === '<anonymous>') {
                methodName = null;
                functionName = null;
            }

            return {
                columnNumber: parseInt(lineMatch[4], 10) || null,
                fileName: lineMatch[2] || null,
                functionName: functionName,
                lineNumber: parseInt(lineMatch[3], 10) || null,
                methodName: methodName,
                native: isNative,
                typeName: typeName
            };
        }

        return null;
    }

}