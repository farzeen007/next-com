"use client";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";

const MobileMenu = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleSideBar = () => {
    setIsMobile(!isMobile);
  };

  return (
    <>
      <AlignLeft
        className="text-lightColor hover:text-darkColor hoverEffect cursor-pointer md:hidden"
        onClick={toggleSideBar}
      />
      <SideBar isMobile={isMobile} toggleSideBar={toggleSideBar} />
    </>
  );
};

export default MobileMenu;
