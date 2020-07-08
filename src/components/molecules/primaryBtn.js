import React from "react";

export default function PrimaryBtn({
  onClickFunction,
  btnStyles,
  textStyles,
  BTN_TEXT,
}) {
  return (
    <button className={btnStyles} onClick={onClickFunction}>
      <p className={textStyles}>{BTN_TEXT}</p>
    </button>
  );
}
