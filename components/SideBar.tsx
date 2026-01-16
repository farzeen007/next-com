"use client";
import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedias from "./SocialMedias";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface SideBarProps {
  isMobile: boolean;
  toggleSideBar: () => void;
}

const SideBar: FC<SideBarProps> = ({ isMobile, toggleSideBar }) => {
  const pathname = usePathname();
  const ref = useOutsideClick(toggleSideBar, isMobile);

  return (
    <div
      className={`fixed inset-y-0 left-0 shadow-xl w-full bg-black/50 z-50 hoverEffect overflow-hidden ${
        isMobile ? "translate-x-0" : "-translate-x-full"
      } md:hidden`}
    >
      <div
        ref={ref}
        className="min-w-76 max-w-96 flex gap-6 flex-col bg-black h-full p-10 z-50 text-white border-r border-r-shop_light_green"
      >
        <div className="flex justify-between">
          <Logo className="text-white" spanClass="group-hover:text-white" />
          <button onClick={toggleSideBar}>
            <X className="text-white" />
          </button>
        </div>
        <div className="flex flex-col text-start space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-300 text-base whitespace-nowrap hover:text-shop_dark_green ${
                  pathname === item.href && "text-shop_light_green"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
        <SocialMedias />
      </div>
    </div>
  );
};

export default SideBar;
