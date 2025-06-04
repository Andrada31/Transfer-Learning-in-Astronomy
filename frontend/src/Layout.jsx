import React from "react";
import Sidenavbar from "@/components/custom/Sidenavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidenavbar />
      <div className="flex-grow px-4 md:px-8 pt-5 fade-in">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
