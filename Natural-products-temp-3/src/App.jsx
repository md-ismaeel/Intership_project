import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "../../Natural-products-temp-2/src/Page/Home/Home";
import About from "../../Natural-products-temp-2/src/Page/About/About";

function App() {
  const [count, setCount] = useState(0);

  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/", element: <About /> }
        // {path:"/",element:<Home/>}
      ]
    },
  ])

  return (
    <>
      <main>
        <RouterProvider router={routes} />
      </main>
    </>
  );
}

export default App;
