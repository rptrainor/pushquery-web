import React from "react";
import firebase from "../../../firebase/clientApp";

export default function Home() {
  const [talks, setTalks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // pulling the talks from Firebase
  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("talks")
      .where("flag.flagged", "==", false)
      .orderBy("createdOn", "asc")
      .onSnapshot((querySnapshot) => {
        const talks = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            title: "",
            description: "",
            createdBy: "",
            createdOn: "",
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

        setTalks(talks);
        console.log(talks);

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);
  if (loading) return "loading...";
  return (
    <React.Fragment>
      {talks ? talks.map((talk) => <p>{talk.title}</p>) : null}
    </React.Fragment>
  );
}
