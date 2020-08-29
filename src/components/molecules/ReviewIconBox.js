import React from "react";
import Link from "next/link";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  DesktopOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

//  CONFIG IMPORTS
import { useUser } from "../../../context/userContext";
// STYLE IMPORTS
import SlideShowCSS from "../../../styles/slideShow.module.css";

export default function ReviewIconBox({
  toggleShowSlideShow,
  showSlideShow,
  reviewSlideIndex,
  backOneSlide,
  forwardOneSlide,
}) {
  return (
    <div className={SlideShowCSS.reviewIconBox}>
      {reviewSlideIndex !== 0 && showSlideShow ? (
        <LeftCircleOutlined
          style={{ fontSize: "4rem", color: "#fff" }}
          onClick={() => backOneSlide()}
        />
      ) : (
        <div style={{ width: 40, height: 40 }} />
      )}
      {showSlideShow ? (
        <MessageOutlined
          style={{ fontSize: "4rem", color: "#fff" }}
          onClick={() => toggleShowSlideShow()}
        />
      ) : (
        <DesktopOutlined
          style={{ fontSize: "4rem", color: "#fff" }}
          onClick={() => toggleShowSlideShow()}
        />
      )}
      {reviewSlideIndex !== 4 && showSlideShow ? (
        <RightCircleOutlined
          style={{ fontSize: "4rem", color: "#fff" }}
          onClick={() => forwardOneSlide()}
        />
      ) : (
        <div style={{ width: 40, height: 40 }} />
      )}
    </div>
  );
}
