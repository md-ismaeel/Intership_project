import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "../Footer/Footer"

export default function AuthLayout() {
    return (
        <>
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}

