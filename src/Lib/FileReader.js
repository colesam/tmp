/**
 * Read File object as text using promises instead of a callback.
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    // Readers cannot read multiple files at a time, create for each call
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result);
    };

    reader.onerror = (e) => {
      reject(e);
    };

    reader.readAsText(file);
  });
};
