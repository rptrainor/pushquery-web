import React from "react";
import Link from "next/link";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import {
  PlayCircleOutlined,
  MessageOutlined,
  UserAddOutlined,
  ShareAltOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import firebase from "../../../firebase/clientApp";

import TalkStyles from "../../../styles/talk.module.css";

export const slideMachine = Machine({
  id: "slide",
  initial: "view",
  states: {
    pause: {
      id: "pause",
      states: {
        0: {
          on: {
            PAUSE: "#slide.view.1",
          },
        },
        1: {
          on: {
            PAUSE: "#slide.view.2",
          },
        },
        2: {
          on: {
            PAUSE: "#slide.view.3",
          },
        },
        3: {
          on: {
            PAUSE: "#slide.view.4",
          },
        },
        4: {
          on: {
            PAUSE: "#slide.view.0",
          },
        },
      },
    },
    view: {
      id: "view",
      initial: "0",
      states: {
        0: {
          on: {
            PAUSE: "#slide.pause.0",
          },
          after: {
            3000: "1",
          },
        },
        1: {
          on: {
            PAUSE: "#slide.pause.1",
          },
          after: {
            3000: "2",
          },
        },
        2: {
          on: {
            PAUSE: "#slide.pause.2",
          },
          after: {
            3000: "3",
          },
        },
        3: {
          on: {
            PAUSE: "#slide.pause.3",
          },
          after: {
            3000: "4",
          },
        },
        4: {
          on: {
            PAUSE: "#slide.pause.4",
          },
          after: {
            3000: "0",
          },
        },
      },
    },
  },
});

export default function TalkCover2({ id, slides }) {
  const [state, send] = useMachine(slideMachine);
  const [displayingNextBtn, setDisplayingNextBtn] = React.useState(false);

  console.log(state.value);
  console.log(Object.keys(state.value)[0]);
  return (
    <>
      <div className={TalkStyles.previewBox}>
        <button
          className={TalkStyles.touchableOpacity}
          onClick={() => send("PAUSE")}
        >
          {Object.keys(state.value)[0] == "pause" ? (
            <PlayCircleOutlined
              style={{ fontSize: "10rem", color: "rgba(51, 51, 51, 0.4)" }}
              className={TalkStyles.pauseIcon}
            />
          ) : (
            <div />
          )}
          {slides && slides[state.value.view || state.value.pause].isImg ? (
            <div className={TalkStyles.imgBox}>
              <img
                src={slides[state.value.view || state.value.pause].slideImg}
                className={TalkStyles.img}
              />
            </div>
          ) : (
            <p className={TalkStyles.textFont}>
              {slides[state.value.view || state.value.pause].slideText}
            </p>
          )}
          <div className={TalkStyles.iconBox}>
            <UserAddOutlined
              style={{ fontSize: "4rem", color: "#fff" }}
              className={TalkStyles.icon}
              onClick={() => console.log("UserAddOutlined")}
            />
            <ShareAltOutlined
              style={{ fontSize: "4rem", color: "#fff" }}
              className={TalkStyles.icon}
              onClick={() => console.log("ShareAltOutlined")}
            />
            <Link href="/talk/[id]" as={`/talk/${id}`}>
              <a>
                <MessageOutlined
                  style={{ fontSize: "4rem", color: "#fff" }}
                  className={TalkStyles.icon}
                  onClick={() => console.log("MessageOutlined")}
                />
              </a>
            </Link>
          </div>
          {displayingNextBtn ? <UpCircleOutlined /> : <div />}
        </button>
      </div>
    </>
  );
}
