import { removeQuotes } from "../Lib/Utils";

export default {
  name: "IdealCU",
  regex: /ExportedTransactions/,
  hasHeaders: true,
  config: {
    dateFormat: "M/D/YYYY",
    flipAmount: false,
    autoCategorize: (row) => {
      if (
        row.importData["Transaction Category"].match(/Transfer/) ||
        row.desc.match(/DISCOVER DC PYMNTS/)
      )
        return "Ignore";

      if (row.desc.match(/WASTE MANAGEMENT|XCEL ENERGY/))
        return "Utilities + Trash";

      if (row.desc.match(/Mortgage/)) return "Mortgage";

      if (row.desc.match(/COMCAST CABLE COMM/)) return "Internet";

      if (row.desc.match(/NEXTEP/)) return "Income";

      return null;
    },
    columnMap: {
      date: (row) => removeQuotes(row["Posting Date"]),
      amount: (row) => removeQuotes(row["Amount"]),
      desc: (row) => removeQuotes(row["Description"]),
    },
  },
};
