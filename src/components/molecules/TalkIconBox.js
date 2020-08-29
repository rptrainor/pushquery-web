import React from "react";
import Link from "next/link";
import {
  MessageOutlined,
  FlagOutlined,
  ForwardOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

//  CONFIG IMPORTS
import { useUser } from "../../../context/userContext";
// STYLE IMPORTS
import SlideShowCSS from "../../../styles/slideShow.module.css";

export default function TalkIconBox({ id, send, state, NextTalk }) {
  const { loadingUser, user } = useUser();
  const router = useRouter();

  const userNotLoggedIn = () => {
    // event.preventDefault();
    router.push("/login");
    alert(
      "We are sorry, you will have to log in before you can join the conversation"
    );
  };

  const handleReport = async () => {
    if (!user) {
      alert(
        "We are sorry, you will have to log in before you can report a Talk"
      );
      navigation.navigate("Me", { screen: "Log In" });
    } else {
      await Firebase.firestore()
        .collection("talks")
        .doc(talk.id)
        .update({
          flag: {
            flagged: true,
            reportedAt: new Date().getTime(),
            userWhoFiledComplaint: {
              _id: currentUser.uid,
            },
          },
        })
        .then(NextTalk());
      alert("We have reported this Talk for you");
    }
  };
  console.log(user);
  return (
    <div className={SlideShowCSS.iconBox}>
      <ForwardOutlined
        style={{ fontSize: "4rem", color: "#fff" }}
        onClick={() => NextTalk()}
      />
      {Object.keys(state.value)[0] == "pause" ? (
        <PlayCircleOutlined
          style={{ fontSize: "4rem", color: "#fff" }}
          onClick={() => send("PLAY")}
        />
      ) : (
        <PauseCircleOutlined
          style={{ fontSize: "4rem", color: "#fff" }}
          onClick={() => send("PAUSE")}
        />
      )}
      <FlagOutlined
        style={{ fontSize: "4rem", color: "#fff" }}
        onClick={() => {
          handleReport();
        }}
      />
      {user ? (
        <Link href="/talk/[id]" as={`/talk/${id}`}>
          <a>
            <MessageOutlined style={{ fontSize: "4rem", color: "#fff" }} />
          </a>
        </Link>
      ) : (
        <a onClick={() => userNotLoggedIn()}>
          <MessageOutlined style={{ fontSize: "4rem", color: "#fff" }} />
        </a>
      )}
    </div>
  );
}
