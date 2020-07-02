import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../../../context/userContext";
import firebase from "../../../firebase/clientApp";
import TalkMsg from "./TalkMsg";
import TalkStyles from "../../../styles/talk.module.css";

export default function Talk({ id }) {
  const [messages, setMessages] = React.useState([]);
  const [talk, setTalk] = React.useState({});
  const [inputText, setInputText] = React.useState("");
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
          await setInputText("");
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

  // Component will return loading... until the messages load from Firestore
  if (!messages) return <Text>loading...</Text>;
  return (
    <div className={TalkStyles.container}>
      <h1 className={TalkStyles.title}>{talk.title}</h1>
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
                {/* <p className={TalkStyles.warningText}>
                You must be logged in to join the converstion
              </p> */}
                <textarea
                  className={TalkStyles.textInput}
                  onChange={(event) => setInputText(event.target.value)}
                  placeholder="What are you curious about?"
                />
                <button className={TalkStyles.button} onClick={handleMsgSend}>
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
              placeholder="What are you curious about?"
            />
            <button className={TalkStyles.button} onClick={handleMsgSend}>
              <p className={TalkStyles.buttonText}>SEND</p>
            </button>
          </div>
        )}
      </>
    </div>
  );
}
