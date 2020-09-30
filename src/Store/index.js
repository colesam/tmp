import { configureStore } from "@reduxjs/toolkit";
import files from "./files";
import budgetLines from "./budgetLines";
import settings from "./settings";

export default configureStore({
  reducer: {
    files,
    budgetLines,
    settings,
  },
  devTools: true,
});
