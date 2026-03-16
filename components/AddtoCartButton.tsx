"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import {ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/store";
import toast, { Toaster } from "react-hot-toast";
import CartToggler from "./cart/CartToggler";

type ProductTypes = Product & { quantity: number };

interface Props {
  product?: ProductTypes;
  className?: string;
}

const AddtoCartButton = ({ product, className }: Props) => {
  const { addToCart, removeFromCart, getTotalPrice, getTotalCount } =
    useCartStore();
  if (!product) return null;

  const itemQuantity = getTotalCount(product);
  const totalPrice = getTotalPrice(product);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = (product: ProductTypes) => {
    if (itemQuantity >= (product?.stock as number)) {
      toast.error(`Cannot add more than available stock `, {
        duration: 1000,
        style: { background: "black", color: "white" },
      });
      return;
    }
    addToCart(product);
    if (itemQuantity === 0) {
      toast.success(
        `Added ${product.name?.substring(0, 8)}... to cart successfully`,
        {
          position: "bottom-right",
        },
      );
    } else {
      toast.success(`increased the item quantity`, {
        position: "bottom-right",
      });
    }
  };


  return (
    <>
      <Toaster />
      {itemQuantity ? (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between border-b">
            <span className="text-gray-500">Quantity</span>
            <CartToggler product={product}/>
          </div>
          <div className="flex justify-between items-center mt-2">
            <h4 className="text-xs font-semibold">SubTotal</h4>
            <p className="text-sm">${totalPrice}</p>
          </div>
        </div>
      ) : (
        <Button
          disabled={isOutOfStock}
          className={cn(
            `w-full flex gap-2 justify-center cursor-pointer bg-shop_dark_green/80 hover:bg-shop_dark_green text-white p-2 font-semibold border border-shop_dark_green/80 tracking-wide hover:border-shop_dark_green hoverEffect text-[15px]`,
            className,
          )}
          onClick={() => handleAddToCart(product)}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add To Cart"}
        </Button>
      )}
    </>
  );
};

export default AddtoCartButton;
