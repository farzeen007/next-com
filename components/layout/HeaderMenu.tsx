"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathName = usePathname();
  return (
    <div className="hidden md:inline-flex gap-7 w-1/3 items-center justify-center text-lightColor text-sm">
      {headerData?.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.href}
            className={`capitalize  relative font-bold  hover:text-shop_light_green group ${
              pathName === item.href && "text-shop_light_green hoverEffect"
            }`}
          >
            {item.title}
            <span
              className={`absolute left-0 w-0 group-hover:w-1/2 hoverEffect -bottom-0.5 h-0.5 bg-shop_light_green ${
                pathName === item.href && "w-1/2"
              }`}
            ></span>
            <span
              className={`absolute right-0 w-0 group-hover:w-1/2 hoverEffect -bottom-0.5 h-0.5 bg-shop_light_green  ${
                pathName === item.href && "w-1/2"
              }`}
            ></span>
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenu;
