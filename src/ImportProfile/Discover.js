import { removeQuotes } from "../Lib/Utils";

export default {
  name: "Discover",
  regex: /Discover-RecentActivity/,
  hasHeaders: true,
  config: {
    dateFormat: "MM/DD/YYYY",
    flipAmount: true,
    autoCategorize: (row) => {
      if (row.desc.match(/AMZN MKTP/)) return "Ignore";

      if (row.importData["Category"].match(/Gasoline/)) return "Gas";

      if (row.importData["Category"].match(/Supermarket/)) return "Food";

      return null;
    },
    columnMap: {
      date: "Trans. Date",
      amount: "Amount",
      desc: (row) => removeQuotes(row["Description"]),
    },
  },
};
