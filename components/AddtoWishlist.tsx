"use client";
import { Heart } from "lucide-react";
import { Product } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/store";
import toast from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const AddtoWishlist = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProducts, addToFavorite, removeFromFavorite } =
    useCartStore();
  const isExisting = favoriteProducts?.find(
    (item) => item._id === product?._id,
  );

  const submitFavorites = (product: Product) => {
    if (isExisting) {
      removeFromFavorite(product?._id);
      toast.success(
        `${product.name?.substring(0, 10)}... removed from Favorites`,
        { position: "top-center" },
      );
    } else {
      addToFavorite(product);
      toast.success(`${product.name?.substring(0, 10)}... Added To Favorites`, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div
        className={cn("absolute right-2 top-2 group cursor-pointer", className)}
        onClick={() => submitFavorites(product)}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`rounded-full p-2  transition ${isExisting ? "hover: bg-shop_btn_dark_green text-white" : "bg-gray-300 group-hover:bg-shop_light_green/60 group-hover:text-white"}`}
            >
              <Heart size={16} className="hoverEffect" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to Wislist</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};

export default AddtoWishlist;
