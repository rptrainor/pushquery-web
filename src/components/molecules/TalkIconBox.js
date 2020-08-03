import React from "react";
import Link from "next/link";
import {
  MessageOutlined,
  UserAddOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

// STYLE IMPORTS
import SlideShowCSS from "../../../styles/slideShow.module.css";

export default function TalkIconBox({ id, send, user }) {
  function alertWithUrlForSharing() {
    alert(`You can copy and share this Talk's URL shown below:
    https://pushquery.com/talk/${id}`);
    send("PAUSE");
  }

  function followThisUser() {
    alert(`You have followed ${user.displayName}`);
    send("PAUSE");
  }

  return (
    <div className={SlideShowCSS.iconBox}>
      <Link href="/talk/[id]" as={`/talk/${id}`}>
        <a>
          <MessageOutlined
            style={{ fontSize: "4rem", color: "#fff" }}
            className={SlideShowCSS.icon}
            onClick={() => console.log("MessageOutlined")}
          />
        </a>
      </Link>
      <UserAddOutlined
        style={{ fontSize: "4rem", color: "#fff" }}
        className={SlideShowCSS.icon}
        onClick={followThisUser}
      />
      <ShareAltOutlined
        style={{ fontSize: "4rem", color: "#fff" }}
        className={SlideShowCSS.icon}
        onClick={alertWithUrlForSharing}
      />
    </div>
  );
}
