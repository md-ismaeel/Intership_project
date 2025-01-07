import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import ResponsiveNav from "../Components/Navbar/ResponsiveNav";
import Cart from "../Page/Cart/Cart";
import ScrollOnTop from "../Components/ScrollOnTop/ScrollOnTop";

export default function Layout() {
    return (
        <>
            <ResponsiveNav />
            <Outlet />
            <Footer />
            <Cart />
            <ScrollOnTop />
        </>
    );
}
