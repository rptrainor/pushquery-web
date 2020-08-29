import React from "react";
import { useRouter } from "next/router";
import firebase from "../../../firebase/clientApp";

//  COMPONENT IMPORTS
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import SpinLoader from '../atoms/SpinLoader'
// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter();

  const logIn = async () => {
    setIsLoading(true)
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      router.push("/");
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert(error);

    }
  };

  const NavToSignUp = () => {
    setIsLoading(true)
    try {
      setEmail("");
      setPassword("");
      setIsLoading(false)
      router.push("/signup");
    } catch (error) {
      setIsLoading(false)
      alert(error);
    }
  };
  console.log(email);

  if (isLoading) return <SpinLoader />
  return (
    <fieldset className={ContainersCSS.FlexColStartOnTop66WideContainer}>
      <h1>Please Log In</h1>
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
      <PrimaryButton onClickFunction={logIn} buttonText={"LOG IN"} />
      <SecondaryButton onClickFunction={NavToSignUp} buttonText={"SIGN UP"} />
    </fieldset>
  );
}
