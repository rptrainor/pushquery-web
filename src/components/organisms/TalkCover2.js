import React from "react";
import Link from "next/link";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import firebase from "../../../firebase/clientApp";

import TalkCoverStyles from "../../../styles/talkCover.module.css";

export const slideMachine = Machine({
  id: "slide",
  initial: "view",
  states: {
    idle: {
      on: { VIEW: "view" },
    },
    create: {},
    review: {},
    publish: {},
    view: {
      initial: "0",
      states: {
        "0": {
          on: {
            PAUSE: "0",
            PLAY: "1",
          },
          after: {
            3000: "1",
          },
        },
        "1": {
          on: {
            PAUSE: "1",
            PLAY: "2",
          },
          after: {
            3000: "2",
          },
        },
        "2": {
          on: {
            PAUSE: "2",
            PLAY: "3",
          },
          after: {
            3000: "3",
          },
        },
        "3": {
          on: {
            PAUSE: "3",
            PLAY: "4",
          },
          after: {
            3000: "4",
          },
        },
        "4": {
          on: {
            PAUSE: "4",
            PLAY: "0",
          },
          after: {
            3000: "0",
          },
        },
      },
    },
  },
});

export default function TalkCover2({ talk }) {
  const [state, send] = useMachine(slideMachine);
  // console.log(talk.slides);
  console.log(state.value.view);
  return (
    <Link href="/talk/[id]" as={`/talk/${talk._id}`}>
      <a>
        <div className={TalkCoverStyles.background}>
          {talk && talk.slides && talk.slides[state.value.view].isImg ? (
            <img
              src={talk.slides[state.value.view].slideImg}
              className={TalkCoverStyles.img}
            />
          ) : (
            <p className={TalkCoverStyles.textFont}>
              {talk.slides[state.value.view].slideText}
            </p>
          )}
        </div>
      </a>
    </Link>
  );
}
