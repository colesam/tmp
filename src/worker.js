/* eslint-disable no-restricted-globals */
import { parseCSV } from "./Lib/CSV";
import { convertData } from "./Lib/DataImport";
import { importProfiles } from "./config";

addEventListener("message", (event) => {
  const { fileList } = event.data;

  let result = null;

  if (!fileList) {
    postMessage({
      success: false,
      error: "Invalid request. Missing required properties.",
    });
    return;
  }

  try {
    result = fileList
      .map(({ id: fileId, textContent, importProfileName }) => {
        const importProfile = importProfiles.find(
          ({ name }) => name === importProfileName
        );

        const lineData = convertData(
          parseCSV(textContent, importProfile.hasHeaders),
          importProfile
        );

        return lineData.map((line) => ({
          fileId,
          ...line,
        }));
      })
      .flat();
  } catch (error) {
    postMessage({
      success: false,
      error,
    });
    return;
  }

  postMessage({
    success: true,
    result,
  });
});
