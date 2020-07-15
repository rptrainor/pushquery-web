import React from "react";

export default function CreateImgSlide({
  CreateStyles,
  createHeaderArray,
  slideIndex,
  SecondaryBtn,
  addSlide,
  uploadFile,
}) {
  return (
    <div className={CreateStyles.inputBox}>
      <h1 className={CreateStyles.header}>
        {createHeaderArray[slideIndex].createHeader}
      </h1>
      <label htmlFor="image" className={CreateStyles.file}>
        UPLOAD
        <input
          type="file"
          className={CreateStyles.customFileInput}
          id="image"
          name="image"
          onChange={(event) => uploadFile(event)}
        />
      </label>
      <SecondaryBtn
        onClickFunction={addSlide}
        btnStyles={CreateStyles.buttonSecondary}
        textStyles={CreateStyles.buttonTextSecondary}
        BTN_TEXT={"SAVE"}
      />
    </div>
  );
}
