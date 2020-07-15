import React from "react";
import QuestionStyles from "../../../styles/isImgQuestion.module.css";

export default function ReviewBox({
  divStyles,
  pStyles,
  slideText,
  slides,
  slideIndex,
}) {
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
}
