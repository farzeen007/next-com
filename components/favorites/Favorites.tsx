"use client";
import { Heart, X } from "lucide-react";
import Container from "../Container";
import { useCartStore } from "./../../store/store";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AddtoCartButton from "../AddtoCartButton";
import PriceFormatter from "../PriceFormatter";

const Favorites = () => {
  const { favoriteProducts } = useCartStore();

  const visibleProducts = 5;

  return (
    <Container className="mt-10">
      {favoriteProducts?.length > 0 ? (
        <table className="w-full border-collapse">
          <tr className="border-b">
            <th className="py-2 text-start text-base lg:text-lg">Image</th>
            <th className="hidden text-start lg:table-cell py-2 pl-6 text-base lg:text-lg">
              Category
            </th>
            <th className="hidden text-start lg:table-cell py-2 pl-6 text-base lg:text-lg">
              Type
            </th>
            <th className="hidden text-start lg:table-cell py-2 pl-6 text-base lg:text-lg">
              Status
            </th>
            <th className="py-2 pl-6 text-start text-base lg:text-lg">Price</th>
            <th className="py-2 pl-6 text-start text-base lg:text-lg">Action</th>
          </tr>
          <tbody className="border-b flex-col gap-5">
            {favoriteProducts.map((item) => {
              return (
                <tr className="border-b">
                  <td className="py-4 px-2 flex items-center gap-2">
                    <X size={20}/>
                    <div className="border rounded-lg p-1 hidden lg:table-cell">
                      <Image
                        src={urlFor(item?.images[0])?.url()}
                        width={50}
                        height={50}
                        alt={item?.name}
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                    <span className="line-clamp-1 max-w-30 sm:max-w-none">{item?.name}</span>
                  </td>
                  <td className="pl-6 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      {item?.categories?.map((item) => (
                        <div className="uppercase text-xs">{item}</div>
                      ))}
                    </div>
                  </td>
                  <td className="pl-6 text-base capitalize font-medium hidden lg:table-cell">
                    {item?.variant}
                  </td>
                  <td
                    className={`pl-6 text-sm font-medium hidden lg:table-cell ${
                      item.stock ? "text-shop_light_green" : "text-red-600"
                    }`}
                  >
                    {item.stock > 0 ? "In Stock" : "Out of Stock"}
                  </td>
                  <td className="pl-6">
                    <PriceFormatter amount={item?.price} />
                  </td>
                  <td className="pl-6 ">
                    <AddtoCartButton product={item} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <EmptyWishList />
      )}
    </Container>
  );
};

export default Favorites;

const EmptyWishList = () => {
  return (
    <Container className="h-[50vh] flex flex-col justify-center items-center gap-3">
      <Heart size={50} strokeWidth={1.5} className="text-black/40" />
      <h5 className="text-3xl font-semibold">Your wishlist is empty</h5>
      <p className="text-black/50">
        Items added to your wishlist will appear here
      </p>
      <Link
        href="/shop"
        className="hover:bg-shop_btn_dark_green bg-shop_dark_green/80 text-white py-2 px-4 rounded-lg text-sm font-semibold"
      >
        Continue Shopping
      </Link>
    </Container>
  );
};