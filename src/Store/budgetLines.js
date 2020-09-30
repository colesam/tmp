import { createSlice } from "@reduxjs/toolkit";

const defaultLineProps = {
  date: null,
  amount: null,
  desc: null,
  category: null,
  fileId: null,
};

export const budgetLinesSlice = createSlice({
  name: "budgetLines",
  initialState: {},
  reducers: {
    setLines: (_, { payload: lines }) => lines,
    setLine: (budgetLines, { payload: line }) => ({
      ...budgetLines,
      [line.id]: {
        id: line.id,
        ...defaultLineProps,
        ...budgetLines[line.id],
        ...line,
      },
    }),
  },
});

const { actions } = budgetLinesSlice;

// NOTE: Have to declare actions like this or webstorm botches the signatures
export const setLinesAction = (lines) => actions.setLines(lines);
export const clearLinesAction = () => actions.setLines({});
export const setLineAction = (line) => actions.setLine(line);

export const selectBudgetLineList = (state) => {
  return Object.values(state.budgetLines);
};

export default budgetLinesSlice.reducer;
