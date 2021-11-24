import React from "react";

const ActivateButton = ({ disabled = false, activated, onClick }) => {
  let classes = `btn btn-${activated ? "success" : "warning"} btn-sm`;
  return (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {activated ? "Activated" : "Activate"}
    </button>
  );
};

export default ActivateButton;
