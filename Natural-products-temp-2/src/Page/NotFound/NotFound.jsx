import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigator = useNavigate();
  return (
    <>
      <div>404 | Page Not Found!!</div>
      <button onClick={() => navigator("/")}>Back to Home</button>
    </>
  );
}
