import React from "react";
import PrimaryButton from "../atoms/PrimaryButton";
// CSS IMPORTS

import ContainersCSS from "../../../styles/containers.module.css";
import ButtonsCSS from "../../../styles/buttons.module.css";

export default function CreateImgSlide({
  createHeaderArray,
  slideIndex,
  addSlide,
  uploadFile,
  isUploadFileLoading,
}) {
  return (
    <>
      <div className={ContainersCSS.FlexColStartOnTop66WideContainer}>
        <h1>{createHeaderArray[slideIndex].createHeader}</h1>
        <label htmlFor="image" className={ButtonsCSS.file}>
          UPLOAD
          <input
            type="file"
            id="image"
            name="image"
            disabled={isUploadFileLoading}
            className={ButtonsCSS.customFileInput}
            onChange={(event) => uploadFile(event)}
          />
        </label>
        <PrimaryButton onClickFunction={addSlide} buttonText={"SAVE"} />
      </div>
    </>
  );
}
