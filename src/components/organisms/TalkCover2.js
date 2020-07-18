import React from "react";
import Link from "next/link";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import firebase from "../../../firebase/clientApp";

import TalkCoverStyles from "../../../styles/talkCover.module.css";

const slideMachine = Machine({
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
          after: {
            3000: "1",
          },
        },
        "1": {
          after: {
            3000: "2",
          },
        },
        "2": {
          after: {
            3000: "3",
          },
        },
        "3": {
          after: {
            3000: "4",
          },
        },
        "4": {
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
    <div className={TalkCoverStyles.background}>
      {talk && talk.slides && talk.slides[state.value.view].isImg ? (
        <img src={talk.slides[state.value.view].slideImg} />
      ) : (
        <p className={TalkCoverStyles.textFont}>
          {talk.slides[state.value.view].slideText}
        </p>
      )}
    </div>
  );
}
