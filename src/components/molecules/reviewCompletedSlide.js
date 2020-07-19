import React from "react";
import Loader from "react-loader-spinner";
import CreateStyles from "../../../styles/createComponent.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ReviewBox from "./reviewBox";

export default function ReviewCompletedSlide({
  slideText,
  divStyles,
  pStyles,
  slides,
  slideImg,
  setSlideIndex,
  setIsQuestionAnswered,
  setIsImg,
  isUploadFileLoading,
  createTalk,
}) {
  const [reviewSlideIndex, setReviewSlideIndex] = React.useState(0);

  const backOneSlide = () => {
    setReviewSlideIndex(reviewSlideIndex - 1);
  };

  const forwardOneSlide = () => {
    setReviewSlideIndex(reviewSlideIndex + 1);
  };

  const editSlide = () => {
    setSlideIndex(reviewSlideIndex);
    setIsQuestionAnswered(true);
    if (!slides[reviewSlideIndex].isImg) {
      setIsImg(false);
    } else {
      setIsImg(true);
    }
  };

  if (isUploadFileLoading)
    return (
      <div className={CreateStyles.reviewContainer}>
        <div className={CreateStyles.reviewBox}>
          <Loader type="TailSpin" color="#fff" height={100} width={100} />
        </div>
      </div>
    );
  return (
    <div className={CreateStyles.reviewContainer}>
      <div className={CreateStyles.reviewBox}>
        {reviewSlideIndex !== 0 ? (
          <button onClick={backOneSlide} className={CreateStyles.reviewBtn}>
            <LeftOutlined style={{ fontSize: "3rem", color: "#333" }} />
          </button>
        ) : (
          <div />
        )}
        {reviewSlideIndex !== 4 ? (
          <button onClick={forwardOneSlide} className={CreateStyles.reviewBtn}>
            <RightOutlined style={{ fontSize: "3rem", color: "#333" }} />
          </button>
        ) : (
          <div />
        )}
      </div>
      <ReviewBox
        divStyles={divStyles}
        pStyles={pStyles}
        slideText={slideText}
        slides={slides}
        slideIndex={reviewSlideIndex}
        slideImg={slideImg}
      />
      <button onClick={editSlide} className={CreateStyles.buttonSecondary}>
        <p className={CreateStyles.buttonTextSecondary}>EDIT THIS SLIDE</p>
      </button>
      <button onClick={createTalk} className={CreateStyles.button}>
        <p className={CreateStyles.buttonText}>PUBLISH TALK</p>
      </button>
    </div>
  );
}