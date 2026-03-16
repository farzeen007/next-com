import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddtoWishlist from "./AddtoWishlist";
import PriceView from "./PriceView";
import AddtoCartButton from "./AddtoCartButton";

type ProductTypes = Product & { quantity: number };

const ProductCard = ({ product }: { product: ProductTypes }) => {
  const STATUS_MAP: Record<string, React.ReactNode> = {
    hot: (
      <Link
        href="/deal"
        className="border border-shop_orange/50 absolute left-2 top-2 rounded-full p-1 group-hover:border-shop_orange hoverEffect"
      >
        <Flame
          fill="#fb6c08"
          className="group-hover:scale-115 hoverEffect"
          strokeWidth={0}
          size={18}
        />
      </Link>
    ),
    new: (
      <p className="border absolute left-2 top-2 rounded-xl border-shop_light_green text-shop_light_green hoverEffect px-2 text-xs">
        New
      </p>
    ),
    sale: (
      <p className="border border-darkColor/50 absolute left-2 top-2 rounded-xl group-hover:border-shop_light_green hoverEffect px-2 text-xs">
        Sale!
      </p>
    ),
  };
  const renderProductStatus = (status?: string) => {
    return STATUS_MAP[status ?? ""] ?? null;
  };
  return (
    <div className="text-sm group rounded-md border border-darkColor/10">
      <div className="bg-gray-50 cursor-pointer">
        <div className="relative group z-50">
          <AddtoWishlist product={product} />
        </div>
        <div className="relative">
          <div className="pb-2">{renderProductStatus(product?.status)}</div>
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0])?.url()}
              width={700}
              height={700}
              alt={"Product Image"}
              loading="lazy"
              className="group-hover:scale-105 duration-400 hoverEffect"
            />
          </Link>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-3">
        <div className="text-xs line-clamp-1 font-medium uppercase text-black/40">
          {product?.categories?.join(", ")}
        </div>
        <div className="line-clamp-1 text-black/90 font-semibold">
          {product?.name}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                strokeWidth={0}
                fill={index < 4 ? "#3b9c3c" : "grey"}
              />
            ))}
          </div>
          <p className="text-black/40 text-xs m-0 p-0">5 Reviews</p>
        </div>
        <div className="flex text-black/90 gap-2.5 text-[15px]">
          <p>In Stock</p>
          <p
            className={`${(product?.stock as number) > 0 ? "text-shop_dark_green/80" : "text-red-600"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>
        <PriceView price={product?.price} discount={product?.discount} />
        <AddtoCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
