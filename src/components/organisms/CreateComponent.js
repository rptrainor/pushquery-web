import React from "react";
import { useRouter } from "next/router";
// import { Machine } from "xstate";
import firebase from "../../../firebase/clientApp";
import { useUser } from "../../../context/userContext";
import CreateStyles from "../../../styles/createComponent.module.css";
import LoginStyles from "../../../styles/login.module.css";
import PrimaryBtn from "../molecules/primaryBtn";
import SecondaryBtn from "../molecules/secondaryBtn";
import PreviewBox from "../molecules/previewBox";

export default function CreateComponent() {
  const [slides, setSlides] = React.useState([{}, {}, {}, {}, {}]);
  const [slideText, setSlideText] = React.useState("");
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isImg, setIsImg] = React.useState(false);
  const { loadingUser, user, isBlocked } = useUser();
  const router = useRouter();

  const addSlide = () => {
    slides[slideIndex].slideText = slideText;
    setSlideIndex(slideIndex + 1);
    setSlideText("");
  };

  const backOneSlide = () => {
    setSlideIndex(slideIndex - 1);
    setSlideText("");
  };

  const forwardOneSlide = () => {
    setSlideIndex(slideIndex + 1);
    setSlideText("");
  };

  console.log({ slides, slideIndex, slideText });

  const createHeaderArray = [
    {
      createHeader: "What is the main takeaway from your research?",
    },
    {
      createHeader:
        "Add a key figure or a few sentences to illustrate your main takeaway",
    },
    {
      createHeader: "Why is this important?",
    },
    {
      createHeader: "What were the methods of your research?",
    },
    {
      createHeader: "How do you want to conclude your Talk?",
    },
  ];

  return (
    <div className={CreateStyles.container}>
      <div className={CreateStyles.inputBox}>
        <div className={CreateStyles.navBox}>
          {slideIndex > 0 ? (
            <SecondaryBtn
              onClickFunction={backOneSlide}
              btnStyles={CreateStyles.buttonSecondary}
              textStyles={CreateStyles.buttonTextSecondary}
              BTN_TEXT={`BACK`}
              slideIndex={slideIndex}
            />
          ) : (
            <div />
          )}
          {slideIndex < 4 ? (
            <SecondaryBtn
              onClickFunction={forwardOneSlide}
              btnStyles={CreateStyles.buttonSecondary}
              textStyles={CreateStyles.buttonTextSecondary}
              BTN_TEXT={`NEXT`}
              slideIndex={slideIndex}
            />
          ) : (
            <div />
          )}
        </div>
        <h1 className={CreateStyles.header}>
          {createHeaderArray[slideIndex].createHeader}
        </h1>

        <label className={CreateStyles.label} htmlFor="description">
          300 character limit
        </label>
        <textarea
          className={CreateStyles.textInput}
          name="text"
          value={slideText}
          rows="8"
          maxLength="300"
          onChange={(event) => setSlideText(event.target.value)}
        />
        <PrimaryBtn
          onClickFunction={addSlide}
          btnStyles={CreateStyles.button}
          textStyles={CreateStyles.buttonText}
          BTN_TEXT={"SAVE"}
        />
      </div>
      <PreviewBox
        divStyles={CreateStyles.previewBox}
        pStyles={CreateStyles.textFont}
        slideText={slideText}
        slides={slides}
        slideIndex={slideIndex}
      />
    </div>
  );
}
