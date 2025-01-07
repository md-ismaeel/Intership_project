import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import Layout from "./Layout/Layout";
import NotFound from "./Page/NotFound/NotFound";
import SignIn from "./Page/Auth/Sign-in/SignIn";
import SignUp from "./Page/Auth/Sign-up/SignUp";
import Products from "./Page/Products/Products";
import ProductDetails from "./Page/ProductDetails/ProductDetails";
import Collection from "./Page/Collections/Collection";
import { useEffect } from "react";
import DiscoverIngredients from "./Components/DiscoverIngredients/DiscoverIngredients";
import WishList from "./Page/WishList/WishList";
import Profile from "./Components/Profile/Profile"
import Checkout from "./Page/CheckOut/CheckOut";

export default function App() {
  const userAuthenticated = useSelector((state) => state?.N4N?.userAuthenticated);

  useEffect(() => {
    document.title = "N4N Natural Products"
  }, [])

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/profile", element: <Profile /> },
        { path: "/", element: <Home /> },
        { path: "/collections", element: <Collection /> },
        { path: "/about", element: <About /> },
        { path: "/products", element: <Products /> },
        { path: "/product/:title", element: <ProductDetails /> },
        { path: "/discoverIngredients", element: <DiscoverIngredients /> },
        { path: "/wishList", element: <WishList /> },
        { path: "/checkout", element: <Checkout /> },

      ],
    },
  ]);

  const logoutRoutes = createBrowserRouter([
    { path: "/", element: <SignIn />, errorElement: <NotFound /> },
    { path: "/signup", element: <SignUp />, errorElement: <NotFound /> },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
