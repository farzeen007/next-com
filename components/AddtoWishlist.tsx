import { Heart } from "lucide-react";
import { Product } from "@/sanity.types";
import React from "react";
import { cn } from "@/lib/utils";

const AddtoWishlist = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div className={cn("absolute right-2 top-2 group", className)}>
      <div className="rounded-full p-2 group-hover:bg-shop_light_green/60 transition">
        <Heart
          size={15}
          className="text-black group-hover:text-white transition"
        />
      </div>
    </div>
  );
};

export default AddtoWishlist;
