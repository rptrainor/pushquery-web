import React from "react";
import ContainersCSS from "../../../styles/containers.module.css";

export default function ReviewBox({ slides, reviewSlideIndex }) {
  return (
    <>
      <div
        className={ContainersCSS.FlexColCenteredContainer}
        style={{
          backgroundColor: "#6BC88F",
          width: "100vw",
          height: "100vh",
          color: "#fff",
        }}
      >
        {!slides[reviewSlideIndex].isImg ? (
          <p
            style={{
              color: "#fff",
              padding: "1rem",
              fontSize: "3rem",
              lineHeight: "1.5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {slides[reviewSlideIndex] && slides[reviewSlideIndex].slideText ? (
              slides[reviewSlideIndex].slideText
            ) : (
              <div />
            )}
          </p>
        ) : (
          <img
            style={{
              width: "100%",
              // padding: "1rem",
              // top: "50%",
              // left: "50%",
            }}
            src={
              slides[reviewSlideIndex] && slides[reviewSlideIndex].slideImg ? (
                slides[reviewSlideIndex].slideImg
              ) : (
                <div />
              )
            }
          />
        )}
      </div>
    </>
  );
}
