import React from "react";
import firebase from "../../../firebase/clientApp";
import TalkCover2 from "./TalkCover2";

export default function Home() {
  const [talks, setTalks] = React.useState([]);
  const [lastDoc, setLastDoc] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isMoreLoading, setIsMoreLoading] = React.useState(false);

  const talksRef = firebase.firestore().collection("talks");

  // pulling the talks from Firebase
  React.useEffect(() => {
    getTalks();
  }, []);

  const getTalks = async () => {
    setLoading(true);

    const snapshot = await talksRef.orderBy("id").limit(1).get();

    if (!snapshot.empty) {
      let newTalks = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newTalks.push(snapshot.docs[i].data());
      }

      setTalks(newTalks);
    } else {
      setLastDoc(null);
    }

    setLoading(false);
  };

  const NextTalk = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await talksRef
          .orderBy("id")
          .startAfter("BBQXX2UZMa9GuGQiu4tL")
          .limit(1)
          .get();

        if (!snapshot.empty) {
          let newTalks = talks;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newTalks.push(snapshot.docs[i].data());
          }

          setTalks(newTalks);
          if (snapshot.docs.length < 3) setLastDoc(null);
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }
  };

  console.log(talks, lastDoc);

  if (loading || isMoreLoading) return "";
  return (
    <div>
      <h1>Hola</h1>
      <button onClick={NextTalk}>MAS</button>
      {/* {talks ? talks.map((talk) => <TalkCover2 talk={talk} key={talk._id} />) : null} */}
    </div>
  );
}
