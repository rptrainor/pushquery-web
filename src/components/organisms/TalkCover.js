import React from "react";
import Link from "next/link";
import TalkCoverStyles from "../../../styles/talkCover.module.css";

export default function TalkCover({ talk }) {

  return (
    <Link href="/talk/[id]" as={`/talk/${talk._id}`}>
      <a>
        <div className={TalkCoverStyles.container}>
          <h2 className={TalkCoverStyles.title}>{talk.title}</h2>
          <p className={TalkCoverStyles.description}>
            {talk.description.length > 500
              ? `${talk.description.slice(0, 500)}...`
              : talk.description}
          </p>
        </div>
      </a>
    </Link>
  );
}
