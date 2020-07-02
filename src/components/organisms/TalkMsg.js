import React from "react";
import formatDistance from "date-fns/formatDistance";
import TalkMsgStyles from "../../../styles/talkMsg.module.css";
export default function TalkMsg({ message }) {
  const msgCreatedAt = message.createdAt;
  const howLongAgo = formatDistance(Date.now(), msgCreatedAt, []);
  console.log(message);

  // function to report a comment
  const handleReport = (event) => {
    event.preventDefault();
    console.log("reported!");
    // if (!currentUser) {
    //   alert(
    //     "We are sorry, you will have to log in before you can report or edit a Query"
    //   );
    //   navigation.navigate("Me", { screen: "Log In" });
    // } else {
    //   navigation.navigate("Report", {
    //     id: item._id,
    //     type: "comment",
    //     displayName: item.user.displayName,
    //     userIdToReport: item.user._id,
    //     talkId,
    //   });
    // }
  };

  return (
    <div className={TalkMsgStyles.container}>
      <img
        className={TalkMsgStyles.avatar}
        src={message.user.photoURL}
        alt="Avatar of talk message author"
      />
      <div className={TalkMsgStyles.msgBox}>
        <div className={TalkMsgStyles.msgDetailBox}>
          <div className={TalkMsgStyles.msgDetailUsernameAndHowLongAgo}>
            <p className={TalkMsgStyles.username}>
              {message.user.displayName
                ? message.user.displayName
                : message.user.email}
            </p>
            <p className={TalkMsgStyles.time}>
              {"    "}
              {howLongAgo}
            </p>
          </div>
          {/* <button onClick={(event) => handleReport(event)}>REPORT</button> */}
        </div>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
