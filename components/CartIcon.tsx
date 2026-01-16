import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  return (
    <Link href="/cart" className="relative group">
      <ShoppingBag className="text-lightColor w-5 h-5 group-hover:text-shop_light_green hoverEffect" />
      <span className="absolute -top-1 -right-1.5 text-white bg-shop_dark_green rounded-full text-center W-3.5 h-3.5 p-1 leading-none text-xs flex justify-center items-center font-semibold">
        0
      </span>
    </Link>
  );
};

export default CartIcon;
