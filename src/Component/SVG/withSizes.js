import React from "react";
import PropTypes from "prop-types";

/**
 * Add size prop and implementation to an SVG component.
 */
function withSizes(WrappedComponent) {
  function EnhancedComponent({ size, ...props }) {
    const sizeIndex = {
      sm: "20px",
      md: "50px",
      lg: "75px",
    };
    return <WrappedComponent width={sizeIndex[size]} {...props} />;
  }

  EnhancedComponent.propTypes = {
    ...WrappedComponent.propTypes,
    size: PropTypes.oneOf(["sm", "md", "lg"]),
  };

  EnhancedComponent.defaultProps = {
    ...WrappedComponent.defaultProps,
  };

  return EnhancedComponent;
}

export default withSizes;
