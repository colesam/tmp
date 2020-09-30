import React from "react";

function Card({ heading, children }) {
  return (
    <div className={`p-5 bg-white rounded-md border border-gray-500 shadow-md`}>
      {heading && <h3 className="mb-4">{heading}</h3>}
      {children}
    </div>
  );
}

export default Card;
