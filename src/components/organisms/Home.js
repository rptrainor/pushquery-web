import React from "react";
import firebase from "../../../firebase/clientApp";
import TalkCover from "./TalkCover";

export default function Home() {
  const [talks, setTalks] = React.useState([]);
  const [lastDoc, setLastDoc] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isMoreLoading, setIsMoreLoading] = React.useState(false);
  const [currentTalkIndex, setCurrentTalkIndex] = React.useState(0);

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
    // if (!talks[currentTalkIndex]) {
    //   setCurrentTalkIndex(0);
    //   console.log("RESET INDEX");
    // }
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await talksRef
          .orderBy("id")
          .startAfter(lastDoc.data().id)
          .limit(1)
          .get();

        if (!snapshot.empty) {
          let newTalks = talks;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newTalks.push(snapshot.docs[i].data());
          }

          setTalks(newTalks);
          setCurrentTalkIndex(currentTalkIndex + 1);
          if (snapshot.docs.length < 1) setLastDoc(null);
        } else {
          setCurrentTalkIndex(0);
          setTalks([]);
          getTalks()
          // setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }
  };

  // console.log(talks[currentTalkIndex]);
  // console.log(talks);
  // console.log(currentTalkIndex);
  console.log({
    talks,
    currentTalkIndex,
  });

  if (loading || isMoreLoading) return "";
  return (
    <div>
      {talks[currentTalkIndex] && talks[currentTalkIndex].slides ? (
        <>
          <TalkCover
            slides={talks[currentTalkIndex].slides}
            id={talks[currentTalkIndex].id}
            user={talks[currentTalkIndex].user}
            NextTalk={NextTalk}
          />
        </>
      ) : (
        <button onClick={NextTalk}>mas</button>
      )}
    </div>
  );
}
