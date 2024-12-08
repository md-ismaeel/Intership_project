import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import Contact from "./Page/Contact/Contact";
import ProductCategory from "./Page/Products/Products";
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

function App() {
  const isAuthenticated = useSelector((state) => state?.Ecommers?.isAuthenticated)

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
        { path: "/product", element: <ProductCategory /> },
        { path: "/product-details/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishList", element: <WishList /> },
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
