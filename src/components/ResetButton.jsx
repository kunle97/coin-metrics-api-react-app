import React from "react";

const ResetButton = (props) => {
  return (
    <button className="btn btn-primary reset-button" onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default ResetButton;
