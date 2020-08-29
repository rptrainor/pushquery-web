import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// COMPONENT IMPORTS
import TertiaryButton from "../atoms/TertiaryButton";
import ReviewIconBox from "./ReviewIconBox";
import ReviewBox from "./reviewBox";
// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";

export default function SingleTalkSlideShow({
  slides,
  showSlideShow,
  toggleShowSlideShow,
}) {
  const [reviewSlideIndex, setReviewSlideIndex] = React.useState(0);

  const backOneSlide = () => {
    setReviewSlideIndex(reviewSlideIndex - 1);
  };

  const forwardOneSlide = () => {
    setReviewSlideIndex(reviewSlideIndex + 1);
  };

  console.log({ reviewSlideIndex });
  return (
      <div style={{
        backgroundColor: "#6bc88f",
        width: "100vw"
      }}>
        <ReviewIconBox
          toggleShowSlideShow={toggleShowSlideShow}
          showSlideShow={showSlideShow}
          reviewSlideIndex={reviewSlideIndex}
          backOneSlide={backOneSlide}
          forwardOneSlide={forwardOneSlide}
        />
        <ReviewBox
          slides={slides}
          reviewSlideIndex={reviewSlideIndex}
          // slideText={slideText}
          // slideIndex={reviewSlideIndex}
          // slideImg={slideImg}
        />
      </div>
  );
}
