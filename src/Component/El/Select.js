import React from "react";
import PropTypes from "prop-types";
import "./Select.css";

function Select({ value, id, label, children, onChange }) {
  if (!value) {
    value = "null";
  }

  return (
    <select
      value={value}
      className="Select"
      id={id}
      aria-label={label}
      onChange={onChange}
    >
      <option value="null" disabled>
        Select
      </option>
      {children}
    </select>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  onChange: PropTypes.func,
};

export default Select;
