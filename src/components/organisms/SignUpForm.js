import React from "react";
import { useRouter } from "next/router";
import firebase from "../../../firebase/clientApp";
import SignUpStyles from "../../../styles/signup.module.css";

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
    <fieldset className={SignUpStyles.fieldset}>
      <div className={SignUpStyles.container}>
        <h1 className={SignUpStyles.header}>Log In</h1>
        <label className={SignUpStyles.label} for="displayName">
          How would you like to be addressed?
        </label>
        <input
          className={SignUpStyles.textInput}
          type="text"
          name="displayName"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <label className={SignUpStyles.label} for="email">
          Email
        </label>
        <input
          className={SignUpStyles.textInput}
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className={SignUpStyles.label} for="password">
          Password
        </label>
        <input
          className={SignUpStyles.textInput}
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className={SignUpStyles.button} onClick={SignUp}>
          <p className={SignUpStyles.buttonText}>SEND</p>
        </button>
        <button className={SignUpStyles.buttonSecondary} onClick={NavToLogin}>
          <p className={SignUpStyles.buttonTextSecondary}>SIGN UP</p>
        </button>
      </div>
    </fieldset>
  );
}
