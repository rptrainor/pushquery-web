import React from "react";
import { useRouter } from "next/router";
// import { Machine } from "xstate";
import firebase from "../../../firebase/clientApp";
import { useUser } from "../../../context/userContext";
import CreateStyles from "../../../styles/createComponent.module.css";
import LoginStyles from "../../../styles/login.module.css";

export default function CreateComponent() {
  const [slides, setSlides] = React.useState([]);
  const [slideText, setSlideText] = React.useState("");
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isImg, setIsImg] = React.useState(false);
  const { loadingUser, user, isBlocked } = useUser();
  const router = useRouter();

  const addSlide = () => {
    setSlides([
      ...slides,
      {
        slideText,
        isImg,
      },
    ]);
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
  // console.log(createHeaderArray[index].createHeader);
  console.log(slides);
  // console.log(slides[index].slideText);

  return (
    <div className={CreateStyles.container}>
      <div className={CreateStyles.inputBox}>
        <div>
          {slideIndex > 0 ? (
            <button onClick={() => setSlideIndex(slideIndex - 1)}>
              back to slide #{slideIndex}
            </button>
          ) : (
            <div />
          )}
          {slideIndex < 4 ? (
            <button onClick={() => setSlideIndex(slideIndex + 1)}>
              forward to slide #{slideIndex + 2}
            </button>
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
        <button className={CreateStyles.button} onClick={addSlide}>
          <p className={CreateStyles.buttonText}>SAVE</p>
        </button>
        <h2>OR</h2>
        <button className={CreateStyles.buttonSecondary} onClick={addSlide}>
          <p className={CreateStyles.buttonTextSecondary}>UPLOAD AN IMAGE</p>
        </button>
      </div>
      <div className={CreateStyles.previewBox}>
        <p className={CreateStyles.textFont}>
          {slideText.length == 0 &&
          slides[slideIndex] &&
          slides[slideIndex].slideText
            ? slides[slideIndex].slideText
            : slideText}
        </p>
      </div>
    </div>
  );
}
