import React from "react";

import "./error.scss";

export const ErrorComponent = ({ isError }) => {
  return (
    <div className="error_container">
      <span>{isError}</span>
    </div>
  );
};
