
/**
 * Checks whether the position in the line is in between curly brackets.
 */
export function isInsideBrackets(currentLine: string, position: number): boolean {
  const prefix = currentLine.substring(0, position);
  return isBracketsInPrefix(prefix);
}

export function isInsideObject(currentLine: string, position: number): boolean {
  const prefix = currentLine.substring(0, position);
  return isObjectInPrefix(prefix);
}

/**
* Checks whether string before cursor contains'{{' or not
*/
function isBracketsInPrefix(prefix: string) {
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
function isObjectInPrefix(prefix: string) {
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

export const isLavaFilterable = new RegExp(/{%-?\s+assign\s+[a-zA-Z0-9]+\s+=\s+[a-zA-Z0-9.'"\[\]]+|{{-?\s+([^}\n\s|]+)\s/);

export const lineHasPipe = new RegExp(/[^}\n]\s*\|\s*\w*$/); // ([^}\n\s]+)\s+\|\s+\w+$