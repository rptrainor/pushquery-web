import React from "react";

export default function SecondaryBtn({
  onClickFunction,
  btnStyles,
  textStyles,
  BTN_TEXT,
  isUploadFileLoading
}) {
  return (
    <button className={btnStyles} onClick={onClickFunction} disabled={isUploadFileLoading}>
      <p className={textStyles}>{BTN_TEXT}</p>
    </button>
  );
}
