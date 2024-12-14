import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import Contact from "./Page/Contact/Contact";
import ProductDetails from "./Page/ProductDetails/ProductDetails";
import NotFound from "./Page/NotFound/NotFound";
import Layout from "./Layout/Layout";
import SignIn from "./Page/Sign-in/SignIn";
import SignUp from "./Page/Sign-up/SignUp";
import { useSelector } from "react-redux";
import AuthLayout from "./Components/Auth/AuthLayout";
import Cart from "./Page/Cart/Cart";
import WishList from "./Page/WishList/WishList";
import Search from "./Components/Search/Search";
import ForgetPassword from "./Page/ForgetPassword/ForgetPassword";
import Products from "./Page/Products/Products";
import { useEffect } from "react";
import CheckOut from "./Page/CheckOut/CheckOut";

function App() {

  const isAuthenticated = useSelector((state) => state?.Ecommers?.isAuthenticated);
  useEffect(() => {
    document.title = isAuthenticated ? "Naisha Naturals - Home" : "Naisha Naturals - Sign In";
  }, [isAuthenticated]);

  const routes = isAuthenticated ? [
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/search", element: <Search /> },
        { path: "/products", element: <Products /> },
        { path: "/products/:category", element: <Products /> },
        { path: "/products-details/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishList", element: <WishList /> },
        { path: "checkout", element: <CheckOut /> }
      ],
    },
  ] : [
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <SignIn /> },
        { path: "sign-in", element: <SignIn /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "/forget-password", element: <ForgetPassword /> }
      ],
    },
  ];

  const protectedRoutes = createBrowserRouter(routes);

  return <RouterProvider router={protectedRoutes} />;
}

export default App;
