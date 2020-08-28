import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// COMPONENT IMPORTS
import TertiaryButton from "../atoms/TertiaryButton";
import ReviewBox from "./ReviewBox";
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

  return (
    <>
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
            marginTop: "5rem"
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
        <TertiaryButton
          onClickFunction={toggleShowSlideShow}
          buttonText={`SEE ${showSlideShow ? "CONVERSATION" : "SLIDES"}`}
        />
        <ReviewBox
          slides={slides}
          reviewSlideIndex={reviewSlideIndex}
          // slideText={slideText}
          // slideIndex={reviewSlideIndex}
          // slideImg={slideImg}
        />
      </div>
    </>
  );
}
