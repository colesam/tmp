import React from "react";
import PropTypes from "prop-types";

function Label({ children, htmlFor, ...props }) {
  return (
    <label className="block font-semibold" {...props}>
      {children}
    </label>
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
};

export default Label;
