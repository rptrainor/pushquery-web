import React from "react";
import QuestionStyles from "../../../styles/isImgQuestion.module.css";
export default function PreviewBox({
  divStyles,
  pStyles,
  slideText,
  slides,
  slideIndex,
  slideImg,
}) {
  if (slides[slideIndex].slideText || slides[slideIndex].slideImg)
    return (
      <div className={divStyles}>
      {!slides[slideIndex].isImg ? (
          <p className={pStyles}>
            {slides[slideIndex] && slides[slideIndex].slideText ? (
              slides[slideIndex].slideText
            ) : (
              <div />
            )}
          </p>
        ) : (
          <img
            className={QuestionStyles.img}
            src={
              slides[slideIndex] && slides[slideIndex].slideImg ? (
                slides[slideIndex].slideImg
              ) : (
                <div />
              )
            }
          />
        )}
      </div>
    );
  return (
    <div className={divStyles}>
      {!slideImg ? (
        <p className={pStyles}>
          {slideText.length == 0 &&
          slides[slideIndex] &&
          slides[slideIndex].slideText
            ? slides[slideIndex].slideText
            : slideText}
        </p>
      ) : (
        <img className={QuestionStyles.img} src={slideImg} />
      )}
    </div>
  );
}
