import React from "react";

const ActivateButton = ({ activated, onClick }) => {
  let classes = `btn btn-${activated ? "success" : "warning"} btn-sm`;
  return (
    <button onClick={onClick} className={classes}>
      {activated ? "Activated" : "Activate"}
    </button>
  );
};

export default ActivateButton;
