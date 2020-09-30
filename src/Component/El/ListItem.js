import React from "react";
import PropTypes from "prop-types";

function ListItem({ children, icon, margin }) {
  return (
    <li className={`flex items-center ${margin}`}>
      {icon && <div className="w-6 mr-2">{icon}</div>}
      {children}
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.element.isRequired,
  icon: PropTypes.element,
  margin: PropTypes.string,
};

ListItem.defaultProps = {
  icon: null,
  margin: "",
};

export default ListItem;
