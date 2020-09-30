import { removeQuotes } from "./Utils";

/**
 * Regex to split a CSV on its commas, ignoring any commas embedded in strings.
 *
 * @type {RegExp}
 */
export const splitRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

/**
 * Parses CSV string into an array of objects. If CSV has headers, it returns an
 * array of objects with headers as keys. Otherwise, it uses the indices as the
 * object keys.
 *
 * @param {string} csvString
 * @param {boolean} hasHeaders
 * @returns {object[]}
 */
export const parseCSV = (csvString, hasHeaders) => {
  const rows = csvString.trim().split("\n");

  let headers;

  if (hasHeaders) {
    headers = rows
      .shift()
      .split(splitRegex)
      .map((header) => removeQuotes(header.trim()));
  } else {
    headers = rows[0].split(splitRegex).map((_, index) => index);
  }

  // This ensures all rows are the same dimension, even if CSV is incorrect
  const emptyRow = headers.reduce((acc, header) => {
    acc[header] = null;
    return acc;
  }, {});

  return rows.map((row) =>
    row.split(splitRegex).reduce((acc, val, index) => {
      const header = headers[index];

      if (index < headers.length) {
        val = val.trim();
        acc[header] = val !== "" ? val : null;
      }

      return acc;
    }, Object.assign({}, emptyRow))
  );
};

/**
 * Converts CSV string rows and headers into a complete URI encoded CSV string.
 *
 * @param {string[]} headers
 * @param {array} rows
 */
export const makeCSV = (headers, rows) => {
  const headersText = headers.join(",");
  const csvText = rows
    .map((arr) => arr.join(","))
    .reduce((acc, str) => acc + "\n" + str, headersText);

  return "data:text/csv;charset=utf-8," + encodeURIComponent(csvText);
};
