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
import IsImgQuestion from "../molecules/isImgQuestion";

export default function CreateComponent() {
  const [slides, setSlides] = React.useState([{}, {}, {}, {}, {}]);
  const [slideText, setSlideText] = React.useState("");
  const [slideImg, setSlideImg] = React.useState("");
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isImg, setIsImg] = React.useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = React.useState(false);
  const { loadingUser, user, isBlocked } = useUser();
  const router = useRouter();

  const addSlide = () => {
    if (!isImg) {
      slides[slideIndex].slideText = slideText;
      slides[slideIndex].isImg = false;
    }
    if (isImg) {
      slides[slideIndex].slideImg = slideImg;
      slides[slideIndex].isImg = true;
    }
    setIsQuestionAnswered(false);
    setSlideIndex(slideIndex + 1);
    setSlideText("");
    setSlideImg("");
  };

  const backOneSlide = () => {
    setSlideIndex(slideIndex - 1);
    setSlideText("");
  };

  const forwardOneSlide = () => {
    setSlideIndex(slideIndex + 1);
    setSlideText("");
  };

  async function uploadFile(event) {
    event.preventDefault();
    console.log("uploading file...");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "figure");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx35aw3ub/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setSlideImg(file.secure_url);
  }

  console.log({ slides, slideIndex, slideText, slideImg });

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

  if (!isQuestionAnswered)
    return (
      <IsImgQuestion
        setIsImg={setIsImg}
        setIsQuestionAnswered={setIsQuestionAnswered}
      />
    );
  return (
    <div className={CreateStyles.container}>
      {!isImg ? (
        <div className={CreateStyles.inputBox}>
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
          {/* <div className={CreateStyles.navBox}>
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
          </div> */}
        </div>
      ) : (
        <div className={CreateStyles.inputBox}>
          <h1 className={CreateStyles.header}>
            {createHeaderArray[slideIndex].createHeader}
          </h1>
          <h2>What is a good image or figure for your talk?</h2>
          <label htmlFor="image" className="file">
            UPLOAD
            <input
              type="file"
              className="custom-file-input"
              id="image"
              name="image"
              onChange={(event) => uploadFile(event)}
            />
          </label>
          <SecondaryBtn
            onClickFunction={addSlide}
            btnStyles={CreateStyles.button}
            textStyles={CreateStyles.buttonText}
            BTN_TEXT={"SAVE"}
          />
        </div>
      )}
      <PreviewBox
        divStyles={CreateStyles.previewBox}
        pStyles={CreateStyles.textFont}
        slideText={slideText}
        slides={slides}
        slideIndex={slideIndex}
        slideImg={slideImg}
      />
    </div>
  );
}
