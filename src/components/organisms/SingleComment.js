import React from "react";
import formatDistance from "date-fns/formatDistance";
// CSS IMPORTS
import TalkCSS from "../../../styles/talk.module.css";

export default function SingleComment({ user, message }) {
  const [
    isCurrentUserCommentAuthor,
    setIsCurrentUserCommentAuthor,
  ] = React.useState(false);
  const msgCreatedAt = message.createdAt;
  const howLongAgo = formatDistance(Date.now(), msgCreatedAt, []);

  React.useEffect(() => {
    if (user.uid == message.user._id) setIsCurrentUserCommentAuthor(true);
  });
  return (
    <div className={isCurrentUserCommentAuthor ? TalkCSS.right : TalkCSS.left}>
      <div
        className={
          isCurrentUserCommentAuthor
            ? TalkCSS.singleCommentRight
            : TalkCSS.singleCommentLeft
        }
        style={{ width: "auto" }}
      >
        <div className={TalkCSS.commentDetailsBox}>
          <p className={TalkCSS.displayName}>{message.user.displayName}</p>
          {/* <p className={TalkCSS.time}>{howLongAgo} ago</p> */}
        </div>
        <div className={TalkCSS.commentDetailsBox}>
          {/* <p className={TalkCSS.displayName}>{message.user.displayName}</p> */}
          <p className={TalkCSS.time}>{howLongAgo} ago</p>
        </div>
        <p>{message.text}</p>
      </div>
      <img
        src={message.user.photoURL}
        className={TalkCSS.avatar}
        className={
          isCurrentUserCommentAuthor ? TalkCSS.avatarRight : TalkCSS.avatarLeft
        }
      />
    </div>
  );
}
