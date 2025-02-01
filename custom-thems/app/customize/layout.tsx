import React from "react";
import Header from "@/app/Components/Header/Header";
import Sidebar from "@/app/Components/SideBar/Sidebar";

export default function CustomLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div className="w-full h-auto flex justify-between items-start px-5 pt-5 bg-gray-100">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
