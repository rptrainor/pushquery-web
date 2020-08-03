import React from "react";
import PrimaryButton from "../atoms/PrimaryButton";
// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";

export default function CreateTextSlide({
  createHeaderArray,
  slideIndex,
  slideText,
  addSlide,
  setSlideText,
}) {
  return (
    <div className={ContainersCSS.FlexColStartOnTop66WideContainer}>
      <h1>{createHeaderArray[slideIndex].createHeader}</h1>
      <label>280 character limit</label>
      <textarea
        name="text"
        value={slideText}
        rows="8"
        maxLength="280"
        onChange={(event) => setSlideText(event.target.value)}
      />
      <PrimaryButton onClickFunction={addSlide} buttonText={"SAVE"} />
    </div>
  );
}
