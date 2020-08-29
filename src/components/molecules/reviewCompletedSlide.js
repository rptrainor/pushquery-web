import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

//  COMPONENT IMPORTS
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import SpinLoader from "../atoms/SpinLoader";
import ReviewBox from "./reviewBox";
// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";
import SlideShowCSS from "../../../styles/slideShow.module.css";

export default function ReviewCompletedSlide({
  slideText,
  slides,
  slideImg,
  setSlideIndex,
  setIsQuestionAnswered,
  setIsImg,
  isUploadFileLoading,
  createTalk,
  isLoading,
  setIsLoading
}) {
  const [reviewSlideIndex, setReviewSlideIndex] = React.useState(0);

  const backOneSlide = () => {
    setReviewSlideIndex(reviewSlideIndex - 1);
  };

  const forwardOneSlide = () => {
    setReviewSlideIndex(reviewSlideIndex + 1);
  };

  const editSlide = () => {
    setIsLoading(true);
    setSlideIndex(reviewSlideIndex);
    setIsQuestionAnswered(true);
    if (!slides[reviewSlideIndex].isImg) {
      setIsImg(false);
    } else {
      setIsImg(true);
    }
    setIsLoading(false);
  };

  if (isUploadFileLoading || isLoading) return <SpinLoader />;
  return (
    <div
      className={ContainersCSS.FlexColCenteredContainer}
      style={{ marginTop: "3rem", marginBottom: "8rem" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {reviewSlideIndex !== 0 ? (
          <button
            onClick={backOneSlide}
            style={{ backgroundColor: "transparent", border: 0 }}
          >
            <LeftOutlined style={{ fontSize: "3rem", color: "#333" }} />
          </button>
        ) : (
          <div />
        )}
        {reviewSlideIndex !== 4 ? (
          <button
            onClick={forwardOneSlide}
            style={{ backgroundColor: "transparent", border: 0 }}
          >
            <RightOutlined style={{ fontSize: "3rem", color: "#333" }} />
          </button>
        ) : (
          <div />
        )}
      </div>
      <ReviewBox
        slides={slides}
        reviewSlideIndex={reviewSlideIndex}
        // slideText={slideText}
        // slideIndex={reviewSlideIndex}
        // slideImg={slideImg}
      />
      <SecondaryButton
        onClickFunction={editSlide}
        buttonText={"EDIT THIS SLIDE"}
      />
      <PrimaryButton onClickFunction={createTalk} buttonText={"PUBLISH TALK"} />
    </div>
  );
}
