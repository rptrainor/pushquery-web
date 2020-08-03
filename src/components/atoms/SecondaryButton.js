import React from "react";
import ButtonsCSS from "../../../styles/buttons.module.css";
export default function SecondaryButton({ onClickFunction, buttonText }) {
  return (
    <button className={ButtonsCSS.secondaryButton} onClick={onClickFunction}>
      <p className={ButtonsCSS.secondaryButtonText}>{buttonText}</p>
    </button>
  );
}
