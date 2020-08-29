import React from "react";
import ButtonsCSS from "../../../styles/buttons.module.css";

export default function PrimaryButton({ onClickFunction, buttonText }) {
  return (
    <button className={ButtonsCSS.tertiaryButton} onClick={onClickFunction}>
      <p className={ButtonsCSS.tertiaryButtonText}>{buttonText}</p>
    </button>
  );
}
