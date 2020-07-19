import Head from "next/head";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";

import Home from "../src/components/organisms/Home";

export default function IndexPage() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!

      // console.log(user);
    }
    // You also have your firebase app initialized
    
    // console.log(firebase);
  }, [loadingUser, user]);

  return <Home />;
}
