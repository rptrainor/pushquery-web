import React from "react";
import Loader from "react-loader-spinner";
import ContainersCSS from "../../../styles/containers.module.css";

export default function SpinLoader() {
  return (
    <div
      className={ContainersCSS.FlexColStartOnTopContainer}
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Loader type="TailSpin" color="#fff" height={100} width={100} />
    </div>
  );
}
