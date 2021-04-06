import React from "react";
import NavBar from "./NavBar";

export default function UserNavBar() {
  const links = [
    {
      link: "/",
      
    },
    {
      link: "/profile",
      
    },
  ];
  return <NavBar links={links} logout={true} />;
}
