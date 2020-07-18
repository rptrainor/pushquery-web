import React from "react";
import Loader from "react-loader-spinner";
import QuestionStyles from "../../../styles/isImgQuestion.module.css";
export default function PreviewBox({
  divStyles,
  pStyles,
  slideText,
  slides,
  slideIndex,
  slideImg,
  isUploadFileLoading,
  isImg,
}) {
  React.useEffect(() => {
    if (slideImg !== "") slides[slideIndex].slideImg = slideImg;
    // if (isImg === true) slides[slideIndex].isImg = true;
  }, [slideImg]);

  if (slides[slideIndex].slideText || slides[slideIndex].slideImg)
    return (
      <div className={divStyles}>
        {!slides[slideIndex].isImg && !slides[slideIndex].slideImg ? (
          <p className={pStyles}>
            {slides[slideIndex] &&
            slides[slideIndex].slideText &&
            slideText === ""
              ? slides[slideIndex].slideText
              : slideText}
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

  if (isUploadFileLoading)
    return (
      <div className={divStyles}>
        <Loader type="TailSpin" color="#fff" height={100} width={100} />
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
