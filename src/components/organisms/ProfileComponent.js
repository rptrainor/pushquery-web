import React from "react";
import { useRouter } from "next/router";

import firebase from "../../../firebase/clientApp";
import { useUser } from "../../../context/userContext";
import LoginStyles from "../../../styles/login.module.css";

export default function ProfileComponent() {
  const { loadingUser, user, isBlocked } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    router.push("/");
    await firebase.auth().signOut();
  };

  return (
    <fieldset className={LoginStyles.fieldset}>
      <div className={LoginStyles.container}>
        <h1 className={LoginStyles.header}>
          Hello {user.displayName}, would you like to sign out?
        </h1>
        <button className={LoginStyles.button} onClick={handleSignOut}>
          <p className={LoginStyles.buttonText}>SIGN OUT</p>
        </button>
      </div>
    </fieldset>
  );
}
