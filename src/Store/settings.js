import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    startDate: localStorage.getItem("lastSessionEndDate"),
    endDate: dayjs().subtract(1, "day").format("MM/DD/YYYY"),
  },
  reducers: {
    setSettings: (oldSettings, { payload: newSettings }) => ({
      ...oldSettings,
      ...newSettings,
    }),
  },
});

const { actions } = settingsSlice;

// NOTE: Have to declare actions like this or webstorm botches the signatures
export const setSettingsAction = (settings) => actions.setSettings(settings);

export const selectStartAndEndDate = ({
  settings: { startDate, endDate },
}) => ({
  startDate,
  endDate,
});

export default settingsSlice.reducer;
