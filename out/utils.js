"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineHasPipe = exports.isLavaFilterable = exports.isInsideObject = exports.isInsideBrackets = void 0;
/**
 * Checks whether the position in the line is in between curly brackets.
 */
function isInsideBrackets(currentLine, position) {
    const prefix = currentLine.substring(0, position);
    return isBracketsInPrefix(prefix);
}
exports.isInsideBrackets = isInsideBrackets;
function isInsideObject(currentLine, position) {
    const prefix = currentLine.substring(0, position);
    return isObjectInPrefix(prefix);
}
exports.isInsideObject = isInsideObject;
/**
* Checks whether string before cursor contains'{{' or not
*/
function isBracketsInPrefix(prefix) {
    let prevChar = '';
    for (let index = prefix.length - 1; index >= 0; index--) {
        if (prefix.charAt(index) === '}' && prevChar === '}') {
            return false;
        }
        if (prefix.charAt(index) === '{' && prevChar === '{') {
            return true;
        }
        prevChar = prefix.charAt(index);
    }
    return false;
}
/**
* Checks whether string before cursor contains'{{' or not
*/
function isObjectInPrefix(prefix) {
    let prevChar = '';
    for (let index = prefix.length - 1; index >= 0; index--) {
        if (prefix.charAt(index) === '%' && prevChar === '}') {
            return false;
        }
        if (prefix.charAt(index) === '{' && prevChar === '%') {
            return true;
        }
        prevChar = prefix.charAt(index);
    }
    return false;
}
exports.isLavaFilterable = new RegExp(/{%-?\s+assign\s+[a-z]+\s+=\s+[a-zA-Z0-9.'"\[\]]+|{{-?\s+([^}\n\s|]+)\s/);
exports.lineHasPipe = new RegExp(/[^}\n]\s*\|\s*\w*$/); // ([^}\n\s]+)\s+\|\s+\w+$
//# sourceMappingURL=utils.js.map