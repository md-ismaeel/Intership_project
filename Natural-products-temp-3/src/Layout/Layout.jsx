import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveNav from "../Components/Navbar/ResponsiveNav";
import Footer from "../Components/Footer/Footer";
import ScrollOnTop from "../Components/ScrollOnTop/ScrollOnTop";
import Cart from "../Components/Cart/Cart";

export default function Layout() {
    return (
        <>
            <ResponsiveNav />
            <Outlet />
            <Footer />
            <ScrollOnTop />
            <Cart />
        </>
    );
}
