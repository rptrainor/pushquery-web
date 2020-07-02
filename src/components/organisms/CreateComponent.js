import React from "react";
import { useRouter } from "next/router";
import firebase from "../../../firebase/clientApp";
import { useUser } from "../../../context/userContext";
import CreateStyles from "../../../styles/createComponent.module.css";
import LoginStyles from "../../../styles/login.module.css";

export default function CreateComponent() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { loadingUser, user, isBlocked } = useUser();
  const router = useRouter();

  const createTalk = () => {
    const db = firebase.firestore();
    if (!isBlocked) {
      if (title.length > 0 && description.length > 0) {
        db.collection("talks")
          .add({
            title,
            description,
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
            await firebase
              .firestore()
              .collection("talks")
              .doc(docRef.id)
              .collection("messages")
              .add({
                text: description,
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
            setTitle("");
            setDescription("");
            router.push(`/talk/${docRef.id}`);
          });
      }
    } else {
      alert(
        "We are sorry, one of your posts has been flagged by our community. We are in the process of reviewing this flag, but until then you will not be allowed to host a Talk.  We appreciate your patience and will email you with more details about this review shortly. Thank you"
      );
    }
  };

  return (
    <fieldset className={LoginStyles.fieldset}>
      <div className={LoginStyles.container}>
        <h1 className={LoginStyles.header}>Log In</h1>
        <label className={LoginStyles.label} htmlFor="title">
          The title of your Talk
        </label>
        <input
          className={LoginStyles.textInput}
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label className={LoginStyles.label} htmlFor="description">
          A short summary of your work
        </label>
        <textarea
          className={LoginStyles.textInput}
          name="title"
          value={description}
          rows="20"
          onChange={(event) => setDescription(event.target.value)}
        />
        <button className={LoginStyles.button} onClick={createTalk}>
          <p className={LoginStyles.buttonText}>SEND</p>
        </button>
      </div>
    </fieldset>
  );
}
