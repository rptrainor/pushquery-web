import React from "react";
import { useRouter } from "next/router";
// import { Machine } from "xstate";
import firebase from "../../../firebase/clientApp";
import { useUser } from "../../../context/userContext";
import CreateStyles from "../../../styles/createComponent.module.css";
import PrimaryBtn from "../molecules/primaryBtn";
import SecondaryBtn from "../molecules/secondaryBtn";
import PreviewBox from "../molecules/previewBox";
import IsImgQuestion from "../molecules/isImgQuestion";
import CreateTextSlide from "../molecules/createTextSlide";
import CreateImgSlide from "../molecules/createImgSlide";
import ReviewCompletedSlide from "../molecules/reviewCompletedSlide";

export default function CreateComponent() {
  const [slides, setSlides] = React.useState([{}, {}, {}, {}, {}]);
  const [slideText, setSlideText] = React.useState("");
  const [slideImg, setSlideImg] = React.useState("");
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isImg, setIsImg] = React.useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = React.useState(false);
  const [isUploadFileLoading, setIsUploadFileLoading] = React.useState(false);
  const { loadingUser, user, isBlocked } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const createTalk = () => {
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
          router.push(`/talk/${docRef.id}`);
        });
    } else {
      alert(
        "We are sorry, one of your posts has been flagged by our community. We are in the process of reviewing this flag, but until then you will not be allowed to host a Talk.  We appreciate your patience and will email you with more details about this review shortly. Thank you"
      );
    }
  };

  const addSlide = () => {
    if (!isImg && slideText.length !== 0) {
      slides[slideIndex].slideText = slideText;
      slides[slideIndex].isImg = false;
    }
    if (isImg && slideImg.length !== 0) {
      slides[slideIndex].slideImg = slideImg;
      slides[slideIndex].isImg = true;
    }
    if (slideIndex !== 4 && !slides[slideIndex + 1].isImg) {
      setIsImg(false);
    }
    if (slideIndex !== 4 && slides[slideIndex + 1].isImg) {
      setIsImg(true);
    }
    setIsQuestionAnswered(false);
    setSlideIndex(slideIndex + 1);
    setSlideText("");
    setSlideImg("");
  };

  async function uploadFile(event) {
    event.preventDefault();
    setIsUploadFileLoading(true);
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
    setIsUploadFileLoading(false);
  }

  console.log({
    slides,
    slideIndex,
    slideText,
    slideImg,
    isImg,
    isQuestionAnswered,
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
      />
    );
  if (slideIndex == 5)
    return (
      <ReviewCompletedSlide
        setSlideIndex={setSlideIndex}
        divStyles={CreateStyles.previewBox}
        pStyles={CreateStyles.textFont}
        slideText={slideText}
        slides={slides}
        slideImg={slideImg}
        setSlideIndex={setSlideIndex}
        setIsQuestionAnswered={setIsQuestionAnswered}
        setIsImg={setIsImg}
        isUploadFileLoading={isUploadFileLoading}
        createTalk={createTalk}
      />
    );
  return (
    <div className={CreateStyles.container}>
      {!isImg ||
      (slides[slideIndex].slideText && !slides[slideIndex].slideImg) ? (
        <CreateTextSlide
          CreateStyles={CreateStyles}
          createHeaderArray={createHeaderArray}
          slideIndex={slideIndex}
          slideText={slideText}
          PrimaryBtn={PrimaryBtn}
          addSlide={addSlide}
          setSlideText={setSlideText}
        />
      ) : (
        <CreateImgSlide
          CreateStyles={CreateStyles}
          createHeaderArray={createHeaderArray}
          slideIndex={slideIndex}
          SecondaryBtn={SecondaryBtn}
          addSlide={addSlide}
          uploadFile={uploadFile}
          isUploadFileLoading={isUploadFileLoading}
        />
      )}
      <PreviewBox
        divStyles={CreateStyles.previewBox}
        pStyles={CreateStyles.textFont}
        slideText={slideText}
        slides={slides}
        slideIndex={slideIndex}
        slideImg={slideImg}
        isUploadFileLoading={isUploadFileLoading}
        isImg={isImg}
      />
    </div>
  );
}
