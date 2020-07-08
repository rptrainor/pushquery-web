import React from "react";
import QuestionStyles from "../../../styles/isImgQuestion.module.css";
import CreateStyles from "../../../styles/createComponent.module.css";
import PrimaryBtn from "../molecules/primaryBtn";

export default function IsImgQuestion({ setIsImg, setIsQuestionAnswered }) {
  const setToTest = () => {
    setIsQuestionAnswered(true);
    setIsImg(false);
  };
  const setToImg = () => {
    setIsQuestionAnswered(true);
    setIsImg(true);
  };

  return (
    <div className={QuestionStyles.container}>
      <h1>Would you like to create a Text or Image slide?</h1>
      <div className={QuestionStyles.questionBox}>
        <PrimaryBtn
          onClickFunction={setToTest}
          btnStyles={CreateStyles.button}
          textStyles={CreateStyles.buttonText}
          BTN_TEXT={" TEXT "}
        />
        <h2>OR</h2>
        <PrimaryBtn
          onClickFunction={setToImg}
          btnStyles={CreateStyles.button}
          textStyles={CreateStyles.buttonText}
          BTN_TEXT={"IMAGE"}
        />
      </div>
    </div>
  );
}
