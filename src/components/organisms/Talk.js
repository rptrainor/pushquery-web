import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../../../context/userContext";
import firebase from "../../../firebase/clientApp";
import TalkMsg from "./TalkMsg";
import TalkStyles from "../../../styles/talk.module.css";
import TalkSlideShow from "../molecules/TalkSlideShow";

export default function Talk({ id }) {
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
      .where("flag.flagged", "==", true)
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
        console.log({ messages });
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

  console.log({ talk });

  // Component will return loading... until the messages load from Firestore
  if (!talk.slides) return <div />;
  return (
    <div className={TalkStyles.container}>
      <button
        className={TalkStyles.toggleBbutton}
        onClick={() => setShowSlideShow(!showSlideShow)}
      >
        <p className={TalkStyles.toggleButtonText}>
          {!showSlideShow ? "SHOW SLIDES" : "SHOW CONVERSATION"}
        </p>
      </button>
      {!showSlideShow ? (
        <>
          <div className={TalkStyles.msgList}>
            {messages
              ? messages.map((message) => (
                  <TalkMsg message={message} key={message._id} />
                ))
              : null}
          </div>
          <>
            {!user ? (
              <Link href="/login">
                <a>
                  <div className={TalkStyles.msgBox}>
                    <textarea
                      className={TalkStyles.textInput}
                      onChange={(event) => setInputText(event.target.value)}
                      value={inputText}
                      placeholder="What are you curious about?"
                    />
                    <button
                      className={TalkStyles.button}
                      onClick={handleMsgSend}
                    >
                      <p className={TalkStyles.buttonText}>SEND</p>
                    </button>
                  </div>
                </a>
              </Link>
            ) : (
              <div className={TalkStyles.msgBox}>
                <textarea
                  className={TalkStyles.textInput}
                  onChange={(event) => setInputText(event.target.value)}
                  value={inputText}
                  placeholder="What are you curious about?"
                />
                <button className={TalkStyles.button} onClick={handleMsgSend}>
                  <p className={TalkStyles.buttonText}>SEND</p>
                </button>
              </div>
            )}
          </>
        </>
      ) : (
        <TalkSlideShow slides={talk.slides} />
      )}
    </div>
  );
}
