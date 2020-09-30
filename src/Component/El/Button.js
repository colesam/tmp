import React from "react";
import "./Button.css";

function Button({ children, type, ...buttonProps }) {
  return (
    <button className={`Button Button_${type}`} {...buttonProps}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "normal",
};

export default Button;
