import React from "react";
import { useRouter } from "next/router";
import firebase from "../../../firebase/clientApp";

//  COMPONENT IMPORTS
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import SpinLoader from "../atoms/SpinLoader";
// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";

export default function SignUpForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const SignUp = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  const NavToLogin = () => {
    setIsLoading(true);
    try {
      setEmail("");
      setPassword("");
      setDisplayName("");
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  if (isLoading) return <SpinLoader />;
  return (
    <fieldset className={ContainersCSS.FlexColStartOnTop66WideContainer}>
      <h1>Please Sign Up</h1>
      <label htmlFor="displayName">How would you like to be addressed?</label>
      <input
        type="text"
        name="displayName"
        id="displayName"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <PrimaryButton onClickFunction={SignUp} buttonText={"SIGN UP"} />
      <SecondaryButton onClickFunction={NavToLogin} buttonText={"LOG IN"} />
    </fieldset>
  );
}
