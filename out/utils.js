"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineHasPipe = exports.isLavaFilterable = exports.isInsideLavaTag = exports.isInsideHtmlTag = exports.isInsideObject = exports.isInsideBrackets = void 0;
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
function isInsideHtmlTag(currentLine, position) {
    const prefix = currentLine.substring(0, position);
    return isHtmlTagInPrefix(prefix);
}
exports.isInsideHtmlTag = isInsideHtmlTag;
function isHtmlTagInPrefix(prefix) {
    let prevChar = '';
    for (let index = prefix.length - 1; index >= 0; index--) {
        if (prefix.charAt(index) === '>' && prevChar === '/') {
            return false;
        }
        if (prefix.charAt(index) === '<' && prevChar !== '/') {
            return true;
        }
        prevChar = prefix.charAt(index);
    }
    return false;
}
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
// check if the current position is inside a unclosed multi-line comment
function isInsideLavaTag(document, position) {
    let line = position.line;
    // loop through previous lines to check if the current position is inside a multi-line comment
    for (let i = line; i >= 0; i--) {
        let text = document.lineAt(i).text;
        let startIndex = text.indexOf('{% lava');
        let endIndex = text.indexOf('%}');
        if (startIndex >= 0 && endIndex < 0) {
            console.log('inside lava tag');
            console.log('startIndex: ' + startIndex);
            console.log('endIndex: ' + endIndex);
            return true;
        }
        if (endIndex >= 0 && startIndex < 0) {
            return false;
        }
        if (startIndex >= 0 && endIndex >= 0 && startIndex > endIndex) {
            console.log('startIndex > endIndex');
            return true;
        }
    }
    return false;
}
exports.isInsideLavaTag = isInsideLavaTag;
exports.isLavaFilterable = new RegExp(/{%-?\s+assign\s+[a-zA-Z0-9]+\s+=\s+[a-zA-Z0-9.'"\[\]]+|{{-?\s*[^}\n\s|]+\s+/);
exports.lineHasPipe = new RegExp(/[^}\n]\s*\|\s*\w*$/); // ([^}\n\s]+)\s+\|\s+\w+$
//# sourceMappingURL=utils.js.map