import React from "react";

export default function IsImgQuestion({
  setIsImg,
  setIsQuestionAnswered,
  PrimaryButton,
  ContainersCSS,
}) {
  const setToTest = () => {
    setIsQuestionAnswered(true);
    setIsImg(false);
  };
  const setToImg = () => {
    setIsQuestionAnswered(true);
    setIsImg(true);
  };

  return (
    <div className={ContainersCSS.FlexColCenteredContainer}>
      <h1>
        <center>Would you like to create a Text or Image slide?</center>
      </h1>
      <div className={ContainersCSS.questionBox}>
        <PrimaryButton onClickFunction={setToTest} buttonText={" TEXT "} />
        <h2>OR</h2>
        <PrimaryButton onClickFunction={setToImg} buttonText={"IMAGE"} />
      </div>
    </div>
  );
}
