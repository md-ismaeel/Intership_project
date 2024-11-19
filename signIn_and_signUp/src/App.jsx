import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./page/Sign-in/SignIn";
import SignUp from "./page/Sign-up/SignUp";
import Footer from "./Components/Footer";

function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <SignIn /> },
    { path: "sign-up", element: <SignUp /> },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <Footer />
    </>
  );
}

export default App;
