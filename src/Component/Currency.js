import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../Lib/Utils";

function Currency({ amount, type }) {
  const classes = {
    colored: amount < 0 ? "text-red-600" : "text-green-600",
    ignored: "ignored",
  };

  return (
    <span className={classes.hasOwnProperty(type) ? classes[type] : null}>
      {formatCurrency(amount)}
    </span>
  );
}

Currency.propTypes = {
  amount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["colored", "ignored"]),
};

Currency.defaultProps = {
  type: null,
};

export default Currency;
