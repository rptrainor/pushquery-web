import React from "react";

export default function CreateTextSlide({
  CreateStyles,
  createHeaderArray,
  slideIndex,
  slideText,
  PrimaryBtn,
  addSlide,
  setSlideText
}) {
  return (
    <div className={CreateStyles.inputBox}>
      <h1 className={CreateStyles.header}>
        {createHeaderArray[slideIndex].createHeader}
      </h1>

      <label className={CreateStyles.label} htmlFor="description">
        280 character limit
      </label>
      <textarea
        className={CreateStyles.textInput}
        name="text"
        value={slideText}
        rows="8"
        maxLength="280"
        onChange={(event) => setSlideText(event.target.value)}
      />
      <PrimaryBtn
        onClickFunction={addSlide}
        btnStyles={CreateStyles.button}
        textStyles={CreateStyles.buttonText}
        BTN_TEXT={"SAVE"}
      />
    </div>
  );
}
