import React from "react";
import { useRouter } from "next/router";
// import { Machine } from "xstate";
import firebase from "../../../firebase/clientApp";
import { useUser } from "../../../context/userContext";

//  COMPONENT IMPORTS
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import SpinLoader from "../atoms/SpinLoader";
import ReviewCompletedSlide from "../molecules/reviewCompletedSlide";
import IsImgQuestion from "../molecules/isImgQuestion";
import CreateTextSlide from "../molecules/createTextSlide";
import CreateImgSlide from "../molecules/createImgSlide";
import PreviewBox from "../molecules/previewBox";
// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";

export default function CreateComponent() {
  const [slides, setSlides] = React.useState([{}, {}, {}, {}, {}]);
  const [slideText, setSlideText] = React.useState("");
  const [slideImg, setSlideImg] = React.useState("");
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isImg, setIsImg] = React.useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = React.useState(false);
  const [isUploadFileLoading, setIsUploadFileLoading] = React.useState(false);
  const { loadingUser, user, isBlocked } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const createTalk = () => {
    setIsLoading(true);
    const db = firebase.firestore();
    if (!isBlocked) {
      db.collection("talks")
        .add({
          slides,
          createdBy: user.uid,
          createdOn: new Date().getTime(),
          flag: {
            flagged: false,
          },
          user: {
            _id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        })
        .then(async (docRef) => {
          db.collection("talks").doc(docRef.id).update({
            id: docRef.id,
          });
          setSlides([{}, {}, {}, {}, {}]);
          setIsLoading(false);
          router.push(`/talk/${docRef.id}`);
        });
    } else {
      setIsLoading(false);
      alert(
        "We are sorry, one of your posts has been flagged by our community. We are in the process of reviewing this flag, but until then you will not be allowed to host a Talk.  We appreciate your patience and will email you with more details about this review shortly. Thank you"
      );
    }
  };

  const addSlide = () => {
    setIsLoading(true);
    if (!isImg && slideText.length !== 0) {
      slides[slideIndex].slideText = slideText;
      slides[slideIndex].isImg = false;
      setIsLoading(false);
    }
    if (isImg && slideImg.length !== 0) {
      slides[slideIndex].slideImg = slideImg;
      slides[slideIndex].isImg = true;
      setIsLoading(false);
    }
    if (slideIndex !== 4 && !slides[slideIndex + 1].isImg) {
      setIsImg(false);
      setIsLoading(false);
    }
    if (slideIndex !== 4 && slides[slideIndex + 1].isImg) {
      setIsImg(true);
      setIsLoading(false);
    }
    setIsQuestionAnswered(false);
    setIsLoading(false);
    setSlideIndex(slideIndex + 1);
    setSlideText("");
    setSlideImg("");
  };

  async function uploadFile(event) {
    event.preventDefault();
    setIsLoading(true);
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
    setIsLoading(false);
  }

  console.log({
    slides,
    slideIndex,
    slideText,
    slideImg,
    isImg,
    isQuestionAnswered,
    isLoading,
  });

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

  if (isLoading || loadingUser) return <SpinLoader />;
  if (
    !isQuestionAnswered &&
    slideIndex !== 5 &&
    !slides[slideIndex].slideText &&
    !slides[slideIndex].slideImg
  )
    return (
      <IsImgQuestion
        setIsImg={setIsImg}
        setIsQuestionAnswered={setIsQuestionAnswered}
        PrimaryButton={PrimaryButton}
        ContainersCSS={ContainersCSS}
      />
    );
  if (slideIndex == 5)
    return (
      <ReviewCompletedSlide
        slides={slides}
        setIsQuestionAnswered={setIsQuestionAnswered}
        setIsImg={setIsImg}
        isUploadFileLoading={isUploadFileLoading}
        createTalk={createTalk}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSlideIndex={setSlideIndex}
      />
    );
    console.log(slideText);
  return (
    <div className={ContainersCSS.FlexColStartOnTop66WideContainer}>
      {!isImg ||
      (slides[slideIndex].slideText && !slides[slideIndex].slideImg) ? (
        <CreateTextSlide
          createHeaderArray={createHeaderArray}
          slideIndex={slideIndex}
          slideText={slideText}
          addSlide={addSlide}
          setSlideText={setSlideText}
          slides={slides}
        />
      ) : (
        <CreateImgSlide
          createHeaderArray={createHeaderArray}
          slideIndex={slideIndex}
          addSlide={addSlide}
          uploadFile={uploadFile}
          isUploadFileLoading={isUploadFileLoading}
        />
      )}

      <PreviewBox
        slideText={slideText}
        slides={slides}
        slideIndex={slideIndex}
        slideImg={slideImg}
        isUploadFileLoading={isUploadFileLoading}
        isImg={isImg}
        isLoading={isLoading}
      />
    </div>
  );
}
