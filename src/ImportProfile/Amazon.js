import { removeQuotes } from "../Lib/Utils";

export default {
  name: "Amazon",
  regex: /\d\d-.+_to_.+-\d\d\d\d/,
  hasHeaders: true,
  config: {
    dateFormat: "MM/DD/YY",
    flipAmount: true,
    autoCategorize: () => null,
    columnMap: {
      date: "Order Date",
      amount: "Item Total",
      desc: (row) => removeQuotes(row["Title"]),
    },
  },
};
