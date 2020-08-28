import React from "react";
import Link from "next/link";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import { PlayCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import firebase from "../../../firebase/clientApp";

//  COMPONENT IMPORTS
import SpinLoader from "../atoms/SpinLoader";
import TertiaryButton from "../atoms/TertiaryButton";

// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";
import SlideShowCSS from "../../../styles/slideShow.module.css";
import ButtonsCSS from "../../../styles/buttons.module.css";
import TalkIconBox from "../molecules/TalkIconBox";

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

export default function TalkCover({ id, slides, user, NextTalk }) {
  const [state, send] = useMachine(slideMachine);
  const [displayingNextBtn, setDisplayingNextBtn] = React.useState(false);

  React.useEffect(() => {
    setTimeout(ShowNextButton, 15000);
    function ShowNextButton() {
      setDisplayingNextBtn(true);
      console.log("DISPLAYED");
    }
  }, [slides]);

  const navToTalk = () => {
    navigation.navigate("Talk", { talk });
  };

  console.log(state.value);
  console.log(Object.keys(state.value)[0]);
  if (!slides || !id) return <SpinLoader />;
  return (
    <div className={ContainersCSS.FlexColStartOnTopContainer}>
      {/* BELOW IS THE BUTTON WHAT WILL RENDER OVER THE FULL SCREEN WHEN "PAUSE" IS SENT TO THE MACHINE */}
      <div className={SlideShowCSS.container}>
        {/* CHECKING IF WE NEED TO REDENDER THE PAUSE BUTTON */}
        <TalkIconBox id={id} send={send} user={user} />
        {displayingNextBtn ? (
          <TertiaryButton onClickFunction={NextTalk} buttonText={"NEXT"} />
        ) : (
          <div />
        )}
        <button className={SlideShowCSS.button} onClick={() => send("PAUSE")}>
          {Object.keys(state.value)[0] == "pause" ? (
            <PlayCircleOutlined
              style={{ fontSize: "10rem", color: "rgba(251, 251, 251, 0.4)" }}
              className={SlideShowCSS.pauseIcon}
            />
          ) : (
            <div />
          )}
          {/* TERNARY STATMENT TO CHECK IF THE SLIDE IS IMG OR TEXT */}
          <div style={{ height: "100%", width: "100%" }}>
            {slides && slides[state.value.view || state.value.pause].isImg ? (
              <img
                src={slides[state.value.view || state.value.pause].slideImg}
                className={SlideShowCSS.img}
              />
            ) : (
              <p>{slides[state.value.view || state.value.pause].slideText}</p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
