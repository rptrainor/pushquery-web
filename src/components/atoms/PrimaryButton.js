import React from "react";
import ButtonsCSS from "../../../styles/buttons.module.css";
export default function PrimaryButton({ onClickFunction, buttonText }) {
  return (
    <button className={ButtonsCSS.primaryButton} onClick={onClickFunction}>
      <p className={ButtonsCSS.primaryButtonText}>{buttonText}</p>
    </button>
  );
}
