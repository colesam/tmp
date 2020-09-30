import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

function DateInput({ value, dateFormat, onChange, ...props }) {
  if (value && dateFormat) {
    value = dayjs(value, dateFormat).format("YYYY-MM-DD");
  }

  const handleChange = (e) => {
    let newVal = e.target.value;
    if (dateFormat) {
      newVal = dayjs(newVal, "YYYY-MM-DD").format(dateFormat);
    }
    onChange(newVal);
  };

  return (
    <input
      value={value !== null ? value : ""}
      className="px-2 py-1 border-solid border border-gray-500 rounded-sm"
      type="date"
      {...props}
      onChange={handleChange}
    />
  );
}

DateInput.propTypes = {
  dateFormat: PropTypes.string,
};

export default DateInput;
