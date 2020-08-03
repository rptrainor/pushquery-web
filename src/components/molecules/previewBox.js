import React from "react";
import SpinLoader from "../atoms/SpinLoader";

// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";

export default function PreviewBox({
  slideText,
  slides,
  slideIndex,
  slideImg,
  isUploadFileLoading,
  isImg,
  isLoading,
}) {
  React.useEffect(() => {
    if (slideImg !== "") slides[slideIndex].slideImg = slideImg;
    // if (isImg === true) slides[slideIndex].isImg = true;
  }, [slideImg]);

  if (slides[slideIndex].slideText || slides[slideIndex].slideImg)
    return (
      <div
        className={ContainersCSS.FlexColCenteredContainer}
        style={{
          backgroundColor: "#009900",
          width: "80vw",
          minHeight: "80vh",
          borderRadius: "1rem",
          margin: "3rem",
          padding: "1rem",
          color: "#fff",
          maxWidth: "100rem",
        }}
      >
        {!slides[slideIndex].isImg && !slides[slideIndex].slideImg ? (
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
            {slides[slideIndex] &&
            slides[slideIndex].slideText &&
            slideText === ""
              ? slides[slideIndex].slideText
              : slideText}
          </p>
        ) : (
          <img
            style={{
              width: "80vw",
              padding: "1rem",
            }}
            src={
              slides[slideIndex] &&
              slides[slideIndex].slideImg &&
              slideImg === ""
                ? slides[slideIndex].slideImg
                : slideImg
            }
          />
        )}
      </div>
    );
  if (isLoading || isUploadFileLoading) return <SpinLoader />;
  return (
    <div
      // className={SlideShowCSS.container}
      className={ContainersCSS.FlexColCenteredContainer}
      style={{
        backgroundColor: "#009900",
        width: "80vw",
        minHeight: "80vh",
        borderRadius: "1rem",
        margin: "3rem",
        padding: "1rem",
        color: "#fff",
        maxWidth: "100rem",
      }}
    >
      {!slideImg ? (
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
          {slideText.length == 0 &&
          slides[slideIndex] &&
          slides[slideIndex].slideText
            ? slides[slideIndex].slideText
            : slideText}
        </p>
      ) : (
        <img
          src={slideImg}
          style={{
            width: "80vw",
            padding: "1rem",
            // top: "50%",
            // left: "50%",
          }}
        />
      )}
    </div>
  );
}
