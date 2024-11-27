import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();

  const PAGE_CLASSNAME =
    location.pathname === "/"
      ? "bg-gradient-to-t from-blue-300 to-purple-300"
      : location.pathname === "/profile"
      ? "bg-gradient-to-r from-green-300 to-yellow-300"
      : "bg-gray-100";

  return (
    <div className={PAGE_CLASSNAME}>
      <div className="pt-5 mx-auto max-w-5xl w-full min-h-custom-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
