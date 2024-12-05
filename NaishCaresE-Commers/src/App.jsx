import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import Contact from "./Page/Contact/Contact";
import ProductCategory from "./Page/ProductCategory/ProductCategory";
import ProductDetails from "./Page/ProductDetails/ProductDetails";
import NotFound from "./Page/NotFound/NotFound";
import Layout from "./Layout/Layout";
import SignIn from "./Page/Sign-in/SignIn";
import SignUp from "./Page/Sign-up/SignUp";
import { useSelector } from "react-redux";
import AuthLayout from "./Components/Auth/AuthLayout";

function App() {
  const isAuthenticated = useSelector((state) => state?.DataSlice?.isAuthenticated);

  const routes = isAuthenticated
    ? [
      {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/about", element: <About /> },
          { path: "/contact", element: <Contact /> },
          { path: "/product", element: <ProductCategory /> },
          {
            path: "/product-details/:productId",
            element: <ProductDetails />,
          },
        ],
      },
    ]
    : [
      {
        path: "/",
        element: <AuthLayout />,
        errorElement: <NotFound />,
        children: [
          { path: "/", element: <SignIn /> },
          { path: "sign-in", element: <SignIn /> },
          { path: "sign-up", element: <SignUp /> },
        ],
      },
    ];

  const protectedRoutes = createBrowserRouter(routes);

  return <RouterProvider router={protectedRoutes} />;
}

export default App;
