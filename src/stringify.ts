/** Primitive value. */
export type PrimitiveValue = string | number | boolean;

/** Token used for newlines. */
export const NEWLINE_TOKEN = '\n';

/**
 * Pads `str` on the left side with `char`.
 *
 * @param str String that should be padded.
 * @param char Character used to pad the string.
 * @param amount Amount by which the string should be padded.
 */
export function pad(str: string, char: string, amount: number): string {
  let output = '';

  for (let i = 0; i < amount; i++) {
    output += char;
  }

  return output + str;
}

function stringifyPrimitiveData(value: PrimitiveValue): string {
  switch (typeof value) {
    case 'string':
      return `"${value}"`;
    case 'boolean':
      return value ? 'true' : 'false';
    case 'bigint':
    case 'number':
      return value.toString();
  }
}

/**
 * @internal
 * @param segments Segments that should be merged.
 * @param open Token used to open the block.
 * @param term Token used to terminate the block.
 * @param compact If set to `true`, the output of this merge will always be compact.
 * @param space Space character.
 * @param level Nesting level.
 */
function merge(
  segments: string[],
  open: string,
  term: string,
  compact: boolean,
  space: string,
  level: number
) {
  if (segments.length === 0) {
    return open + term;
  }

  if (compact) {
    return [
      open,
      segments.join(', '),
      term
    ].join(' ');
  }

  let output = open;

  output += NEWLINE_TOKEN;
  output += segments
    .map(segment => pad(segment, space, level + 1))
    .join(',\n');

  output += NEWLINE_TOKEN;
  output += pad(term, space, level);

  return output;
}

/** @internal */
function _stringify(data: any, space = '\t', level = 0): string {
  const segments: string[] = [];

  // Open + terminate brackets. Objects use { and }, arrays use [ and ].
  let tkOpen = '{';
  let tkTerm = '}';

  // Flag if this block will have a compact or pretty output
  let compact = true;

  if (Array.isArray(data)) {
    tkOpen = '[';
    tkTerm = ']';

    for (const value of data) {
      if (typeof value === 'object') {
        // When this block encounters a non-primitive value, force the pretty print.
        compact = false;
        segments.push(_stringify(value, space, level + 1));
      }
      else {
        segments.push(stringifyPrimitiveData(value));
      }
    }
  }
  else {
    for (let key in data) {
      const value = data[ key ];

      let str;

      if (typeof value === 'object') {
        // Force pretty print if this value contains another block.
        compact = false;

        str = _stringify(value, space, level + 1);
      }
      else {
        str = stringifyPrimitiveData(value);
      }

      segments.push(`"${key}": ${str}`);
    }
  }

  // If we are the root level, force pretty unless the object is empty.
  if (level === 0 && segments.length > 0) {
    compact = false;
  }

  return merge(
    segments,
    tkOpen,
    tkTerm,
    compact,
    space,
    level
  );
}

/**
 * Stringifies the given JSON `data` as an alternative to the built-in `JSON.stringify()`.
 *
 * The built-in method is either too compact to be readable by humans or too verbose to
 * be practical. This produces a more compact pretty-print format that remains readable
 * while not blowing up the size of the resulting JSON string.
 *
 * It does this by chopping down blocks (arrays, lists) that only contain primitive values.
 *
 * @param data Data that should be stringified. Supports both arrays and objects as root.
 * @param space (optional) Character that should be used to indent individual lines. By
 *  default, the tab character '\t' is used.
 */
export function stringify(data: any, space = '\t'): string {
  let output = _stringify(data, space);

  // Trailing newline.
  output += NEWLINE_TOKEN;

  return output;
}