import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Page/Home/Home";
import Search from "./Components/Search/Search";
import Error from "./Page/Error/Error";
import Products from "./Page/Products/Products";
import WishList from "./Page/WishList/WishList";
import SignIn from "./Page/Auth/SignIn/SignIn";
import SignUp from "./Page/Auth/SignUp/SignUp";
import ProductDetails from "./Page/ProductDetails/ProductDetails";
import About from "./Page/About/About";
import Contact from "./Page/Contact/Contact";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/products", element: <Products /> },
        { path: "/product/:title", element: <ProductDetails /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact/> },
        { path: "/search", element: <Search /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ]);

  return (
    <>
      <main>
        <RouterProvider router={routes} />
      </main>
    </>
  );
}

export default App;
