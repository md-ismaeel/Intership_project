import React from 'react'
import Navbar from "../Components/Navbar/ResponsiveNav";
import Footer from "../Components/Footer/Footer"
import { Outlet } from 'react-router-dom';
import ResponsiveNav from '../Components/Navbar/ResponsiveNav';

export default function Layout() {
  return (
    <>
      <ResponsiveNav />
      <Outlet />
      <Footer />
    </>
  )
}
