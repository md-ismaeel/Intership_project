import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Page/Home/Home"
import CustomLayout from "./Page/customize/CustomLayout";
import BackGround from "./Page/customize/page"
import HeadersAndFav from "./Page/customize/header/page";
import Advanced from "./Page/customize/advanced/page";
import Banners from "./Page/customize/banners/page";
import FontSelector from "./Page/customize/fonts/page";
import Sections from "./Page/customize/sections/page";


const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/customize", element: <CustomLayout />, children: [
      { path: "/customize", element: <BackGround /> },
      { path: "/customize/header", element: <HeadersAndFav /> },
      { path: "/customize/advanced", element: <Advanced /> },
      { path: "/customize/banners", element: <Banners /> },
      { path: "/customize/sections", element: <Sections /> },
      { path: "/customize/fonts", element: <FontSelector /> },
    ]
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
