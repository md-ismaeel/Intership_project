import React from "react";
import ReactLoading from "react-loading";

export const Loader = ({ color = "white" }) => {
  return <ReactLoading type={"spin"} color={color} height={23} width={23} />;
};
