import React from "react";
import { useMachine } from "@xstate/react";

import { slideMachine } from "../organisms/TalkCover2";
import TalkStyles from "../../../styles/talk.module.css";

export default function TalkSlideShow({ slides, id }) {
  const [state, send] = useMachine(slideMachine);
  console.log(state);
  return (
    <div className={TalkStyles.previewBox}>
      {slides && slides[state.value.view].isImg ? (
        <img
          src={slides[state.value.view].slideImg}
          className={TalkStyles.img}
        />
      ) : (
        <p className={TalkStyles.textFont}>
          {slides[state.value.view].slideText}
        </p>
      )}
    </div>
  );
}
