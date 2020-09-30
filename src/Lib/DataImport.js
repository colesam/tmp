import dayjs from "dayjs";
import { isFunction } from "./Utils";

/**
 * Auto match file uploads with import profiles based on regex. Unmatched files
 * will not be returned.
 *
 * @param {string} fileName
 * @param {array} importProfiles
 */
export const autoMatchProfile = (fileName, importProfiles) => {
  let match = null;

  importProfiles.forEach(({ name, regex }) => {
    if (fileName.match(regex) !== null) {
      match = name;
    }
  });

  return match;
};

/**
 * Convert the imported CSV data according to the matched import profile.
 *
 * @param {object} fileContents
 * @param {object} importProfile
 * @returns {array}
 */
export const convertData = (fileContents, importProfile) => {
  const {
    columnMap,
    dateFormat,
    flipAmount,
    autoCategorize,
  } = importProfile.config;

  return fileContents.map((row) => {
    const result = {
      date: null,
      amount: null,
      desc: null,
      category: null,
      importData: null,
    };

    try {
      // Column map either specifies property as string, or function to calculate property from row
      const date = isFunction(columnMap.date)
        ? columnMap.date(row)
        : row[columnMap.date];

      let amount = isFunction(columnMap.amount)
        ? columnMap.amount(row)
        : row[columnMap.amount];

      const desc = isFunction(columnMap.desc)
        ? columnMap.desc(row)
        : row[columnMap.desc];

      const result = {
        date: dayjs(date, dateFormat).format("MM/DD/YYYY"),
        amount: (flipAmount ? -1 : 1) * parseFloat(amount?.replace("$", "")),
        desc,
        importData: { ...row },
      };

      result.category = autoCategorize(result);

      return result;
    } catch (error) {
      console.error(error);
      console.debug("Failed row: ", JSON.stringify(row));
    }

    return result;
  });
};
