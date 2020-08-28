import React from "react";
import Loader from "react-loader-spinner";
import ContainersCSS from "../../../styles/containers.module.css";

export default function SpinLoader() {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        top: "50%",
        padding: "3rem"
      }}
    >
      <Loader type="TailSpin" color="#2B698E" height={100} width={100} />
    </div>
  );
}
