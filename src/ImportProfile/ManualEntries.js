import dayjs from "dayjs";

export default {
  name: "Manual Entries",
  regex: /Manual_Entries/,
  hasHeaders: true,
  config: {
    dateFormat: "MM/DD/YYYY",
    flipAmount: false,
    autoCategorize: () => null,
    columnMap: {
      date: () => dayjs().format("MM/DD/YYYY"),
      amount: "Amount",
      desc: "Description",
    },
  },
};
