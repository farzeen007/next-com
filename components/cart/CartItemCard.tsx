import { Product } from "@/sanity.types";
import { useCartStore } from "@/store/store";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Title } from "../ui/Title";
import AddtoWishlist from "../AddtoWishlist";
import PriceFormatter from "../PriceFormatter";
import { Trash } from "lucide-react";
import CartToggler from "./CartToggler";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ProductTypes = Product & {
  quantity: number;
};

const CartItemCard = ({ item }: { item: ProductTypes }) => {
  const { getTotalPrice, deleteCartProduct } = useCartStore();

  const totalPrice = item ? getTotalPrice(item) : 0;
  return (
    <div
      className="flex items-center justify-between gap-5 p-3 border-b last:border-b-0"
    >
      <div className="flex gap-5">
        <div className="border rounded-lg p-0 sm:p-2 shrink-0">
          <Image
            src={urlFor(item?.images?.[0]).url()}
            width={500}
            height={500}
            className="w-auto max-h-31 sm:w-32 sm:h-32  object-cover"
            alt="product image"
          />
        </div>
        <div className="flex flex-col gap-2 justify-between p-2">
          <div>
            <Title className="line-clamp-1 text-[16px]! font-semibold mb-2">
              {item?.name}
            </Title>
            <div className="text-[15px]">
              Variant: <span className="font-semibold">{item?.variant}</span>
            </div>
            <div className="text-[15px]">
              Status: <span className="font-semibold">{item?.status}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <AddtoWishlist
              product={item}
              className="relative top-0 inline-flex"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash
                  size={20}
                  className="cursor-pointer text-gray-500 hover:text-red-500 hoverEffect"
                  onClick={() => deleteCartProduct(item?._id)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove Item</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center h-[-webkit-fill-available] p-2">
        <PriceFormatter className="text-lg" amount={totalPrice} />
        <CartToggler product={item} />
      </div>
    </div>
  );
};

export default CartItemCard;
