import { createSlice } from "@reduxjs/toolkit";

const defaultFileProps = {
  fileName: null,
  textContent: null,
  importProfileName: null,
  isLoaded: false,
};

export const filesSlice = createSlice({
  name: "files",
  initialState: {}, // Files are stored keyed by their id property
  reducers: {
    setFile: (files, { payload: file }) => ({
      ...files,
      [file.id]: {
        id: file.id,
        ...defaultFileProps,
        ...files[file.id],
        ...file,
      },
    }),
    clearFiles: () => ({}),
  },
});

const { actions } = filesSlice;

// NOTE: Have to declare actions like this or webstorm botches the signatures
export const setFileAction = (file) => actions.setFile(file);
export const clearFilesAction = () => actions.clearFiles();

export const selectFile = (state) => (fileName) =>
  state.files.hasOwnProperty(fileName) ? state.files[fileName] : null;

export const selectFileList = (state) => {
  return Object.values(state.files);
};

export const selectFilesExist = (state) => selectFileList(state).length > 0;

export default filesSlice.reducer;
