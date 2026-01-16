import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  product?: Product;
  className?: string;
}

const AddtoCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;
  return (
    <Button
      disabled={isOutOfStock}
      className={cn(
        `w-full flex gap-2 justify-center cursor-pointer bg-shop_dark_green/80 hover:bg-shop_dark_green text-white p-2 font-semibold border border-shop_dark_green/80 tracking-wide hover:border-shop_dark_green hoverEffect text-[15px]`,
        className
      )}
    >
      <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add To Cart"}
    </Button>
  );
};

export default AddtoCartButton;
