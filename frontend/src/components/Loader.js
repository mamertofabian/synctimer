import React from "react";
import { Spinner } from "react-bootstrap";

import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner className="loader" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
