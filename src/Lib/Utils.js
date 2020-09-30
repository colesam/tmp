import { generate } from "shortid";

export const isFunction = (functionToCheck) => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
};

export const removeQuotes = (str) => str.replace(/"/g, "");

export const formatCurrency = (amount) =>
  (amount > 0 ? "+" : "-") + "$" + Math.abs(amount).toFixed(2);

export const generateShortId = generate;
