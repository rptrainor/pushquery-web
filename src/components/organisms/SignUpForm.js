import React from "react";
import { useRouter } from "next/router";
import firebase from "../../../firebase/clientApp";
import LoginStyles from "../../../styles/login.module.css";

export default function SignUpForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const router = useRouter();

  const SignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.updateProfile({
        displayName,
        photoURL:
          "https://res.cloudinary.com/dx35aw3ub/image/upload/v1591064978/icon_prufa1.png",
      });
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          createdAt: new Date().getTime(),
          email: firebase.auth().currentUser.email,
          displayName: firebase.auth().currentUser.displayName,
          photoURL: firebase.auth().currentUser.photoURL,
          flag: {
            flagged: false,
          },
        });
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setDisplayName("");
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const NavToLogin = () => {
    try {
      setEmail("");
      setPassword("");
      setDisplayName("");
      router.push("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <fieldset className={LoginStyles.fieldset}>
      <div className={LoginStyles.container}>
        <h1 className={LoginStyles.header}>Sign Up</h1>
        <label className={LoginStyles.label} for="displayName">
          How would you like to be addressed?
        </label>
        <input
          className={LoginStyles.textInput}
          type="text"
          name="displayName"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <label className={LoginStyles.label} for="email">
          Email
        </label>
        <input
          className={LoginStyles.textInput}
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className={LoginStyles.label} for="password">
          Password
        </label>
        <input
          className={LoginStyles.textInput}
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className={LoginStyles.button} onClick={SignUp}>
          <p className={LoginStyles.buttonText}>SEND</p>
        </button>
        <button className={LoginStyles.buttonSecondary} onClick={NavToLogin}>
          <p className={LoginStyles.buttonTextSecondary}>LOG IN</p>
        </button>
      </div>
    </fieldset>
  );
}
