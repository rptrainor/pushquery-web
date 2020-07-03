import React from "react";
import { useRouter } from "next/router";

import firebase from "../../../firebase/clientApp";
import LoginStyles from "../../../styles/login.module.css";

export default function componentName() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const logIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const NavToSignUp = () => {
    try {
      setEmail("");
      setPassword("");
      router.push("/signup");
    } catch (error) {
      alert(error);
    }
  };
  console.log(email);

  return (
    <fieldset className={LoginStyles.fieldset}>
      <div className={LoginStyles.container}>
        <h1 className={LoginStyles.header}>Log In</h1>
        <label className={LoginStyles.label} htmlFor="email">
          Email
        </label>
        <input
          className={LoginStyles.textInput}
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className={LoginStyles.label} htmlFor="password">
          Password
        </label>
        <input
          className={LoginStyles.textInput}
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className={LoginStyles.button} onClick={logIn}>
          <p className={LoginStyles.buttonText}>SEND</p>
        </button>
        <button className={LoginStyles.buttonSecondary} onClick={NavToSignUp}>
          <p className={LoginStyles.buttonTextSecondary}>SIGN UP</p>
        </button>
      </div>
    </fieldset>
  );
}
