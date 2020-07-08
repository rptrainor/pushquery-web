import React from "react";

export default function SecondaryBtn({
  onClickFunction,
  btnStyles,
  textStyles,
  BTN_TEXT,
  slideIndex
}) {
  return (
    <button className={btnStyles} onClick={onClickFunction}>
      <p className={textStyles}>{BTN_TEXT}</p>
    </button>
  );
}
