import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../../../context/userContext";
import firebase from "../../../firebase/clientApp";

// Component imports
import SpinLoader from "../atoms/SpinLoader";
import TertiaryButton from "../atoms/TertiaryButton";
import TalkCover from "./TalkCover";

// Style imports
import ContainersCSS from "../../../styles/containers.module.css";
import TalkCSS from "../../../styles/talk.module.css";
import SingleComment from "./SingleComment";
import PrimaryButton from "../atoms/PrimaryButton";
import ReviewBox from "../molecules/ReviewBox";
import SingleTalkSlideShow from "../molecules/SingleTalkSlideShow";

export default function SingleTalk({ id }) {
  const [messages, setMessages] = React.useState([]);
  const [talk, setTalk] = React.useState({});
  const [inputText, setInputText] = React.useState("");
  const [showSlideShow, setShowSlideShow] = React.useState(false);
  const { loadingUser, user, isBlocked } = useUser();
  const router = useRouter();

  // function that pulls the Talk from Firestore
  // And listens for any messages
  React.useEffect(() => {
    if (!id) return undefined;
    const messageListener = firebase
      .firestore()
      .collection("talks")
      .doc(id)
      .collection("messages")
      .where("flag.flagged", "==", false)
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            flag: {
              flagged: false,
            },
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              email: firebaseData.user.email,
              displayName: firebaseData.user.displayName,
            };
          }

          return data;
        });
        setMessages(messages);
      });

    // pulls the talk from Firestore
    firebase
      .firestore()
      .collection("talks")
      .doc(id)
      .get()
      .then((doc) => setTalk(doc.data()));

    return () => messageListener();
  }, [id]);

  // Function that sends the message to the Talk in Firestore
  const handleMsgSend = async () => {
    const text = inputText;
    setInputText("");
    if (!isBlocked) {
      if (inputText.length > 0) {
        if (user) {
          await firebase
            .firestore()
            .collection("talks")
            .doc(id)
            .collection("messages")
            .add({
              text,
              createdAt: new Date().getTime(),
              flag: {
                flagged: false,
              },
              user: {
                _id: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
            });
        } else {
          alert("You Me Be Logged In To Comment");
          router.push("/profile");
        }
      } else {
        alert("Please Type A Comment Before Pressing Send");
      }
    } else {
      alert(
        "We are sorry, one of your posts has been flagged by our community. We are in the process of reviewing this flag, but until then you will not be allowed to ask a question.  We appreciate your patience and will email you with more details about this review shortly. Thank you"
      );
    }
  };

  // function the navigate back Home
  const returnToMainHome = () => {
    router.push("/");
  };

  const toggleShowSlideShow = () => setShowSlideShow(!showSlideShow);
  console.log(talk);
  // WAITING FOR MESSAGE AND USER TO LOAD
  if (!messages || loadingUser) return <SpinLoader />;
  if (showSlideShow)
    return (
      <SingleTalkSlideShow
        slides={talk.slides}
        showSlideShow={showSlideShow}
        toggleShowSlideShow={toggleShowSlideShow}
      />
    );
  console.log(messages);
  return (
    <div className={ContainersCSS.FlexColStartOnTopContainer}>
      <TertiaryButton
        onClickFunction={toggleShowSlideShow}
        buttonText={`SEE ${showSlideShow ? "CONVERSATION" : "SLIDES"}`}
      />
      <div className={TalkCSS.msgList}>
        {/* WE NEED TO DO SINGLE COMMENT ONCE WE HAVE USE LOGIN BUILT */}
        {messages ? (
          messages.map((message) => (
            <SingleComment message={message} key={message._id} user={user} />
          ))
        ) : (
          <div />
        )}
        {messages.length == 0 ? (
          <h1 style={{ padding: "2rem" }}>
            Post a comment below to get the conversation started!
          </h1>
        ) : (
          <div />
        )}
      </div>
      <div>
        {!user ? (
          <Link href="login">
            <a>
              <div className={TalkCSS.msgBox}>
                <textarea
                  className={TalkCSS.textInput}
                  onChange={(event) => setInputText(event.target.value)}
                  value={inputText}
                  placeholder="What are you curious about?"
                />
                <PrimaryButton
                  onClickFunction={handleMsgSend}
                  buttonText={"SEND"}
                />
              </div>
            </a>
          </Link>
        ) : (
          <div className={TalkCSS.msgBox}>
            <textarea
              className={TalkCSS.textInput}
              onChange={(event) => setInputText(event.target.value)}
              value={inputText}
              placeholder="What are you curious about?"
            />
            <PrimaryButton
              onClickFunction={handleMsgSend}
              buttonText={"SEND"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
