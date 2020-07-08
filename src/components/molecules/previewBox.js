import React from "react";

export default function PreviewBox({ divStyles, pStyles, slideText, slides, slideIndex }) {
  return (
    <div className={divStyles}>
      <p className={pStyles}>
        {slideText.length == 0 &&
        slides[slideIndex] &&
        slides[slideIndex].slideText
          ? slides[slideIndex].slideText
          : slideText}
      </p>
    </div>
  );
}
