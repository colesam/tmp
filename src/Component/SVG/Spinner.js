import React from "react";
import PropTypes from "prop-types";
import withSizes from "./withSizes";
import "./Spinner.css";

/**
 * NOTE: This component was based off of https://codepen.io/mrrocks/pen/EiplA.
 */
function Spinner({ color, ...svgProps }) {
  return (
    <svg
      className={`Spinner w-100 text-${color}-400`}
      viewBox="0 0 50 50"
      {...svgProps}
    >
      <circle className="Spinner_path" cx="25" cy="25" r="20" />
    </svg>
  );
}

Spinner.propTypes = {
  color: PropTypes.string,
};

Spinner.defaultProps = {
  color: "green",
};

export default withSizes(Spinner);
