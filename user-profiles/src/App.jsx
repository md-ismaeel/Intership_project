import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home/Home";
import UserDetails from "./page/UserDetails/UserDetails";

function App() {
  const [count, setCount] = useState(0);

  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user-details/:id",
        element: <UserDetails />,
      },
    ],
    {
      future: {
        v7_startTransition: true,
      },
    }
  );

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
