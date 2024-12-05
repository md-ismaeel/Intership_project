import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./page/Sign-in/SignIn";
import SignUp from "./page/Sign-up/SignUp";
import Footer from "./Components/Footer";
import Dashboard from "./page/Dashboard/Dashboard";
import ForgetPassword from "./page/ForgetPassword/ForgetPassword";
import NotFound from "./page/NotFound/NotFound";

function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <SignIn />, errorElement: <NotFound /> },
    { path: "/sign-up", element: <SignUp />, errorElement: <NotFound /> },
    { path: "/dashboard", element: <Dashboard />, errorElement: <NotFound /> },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
      errorElement: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <Footer />
    </>
  );
}

export default App;
