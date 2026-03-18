"use client";
import { ArrowDown, ArrowUp, Heart, X } from "lucide-react";
import Container from "../Container";
import { useCartStore } from "./../../store/store";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AddtoCartButton from "../AddtoCartButton";
import PriceFormatter from "../PriceFormatter";
import { Button } from "../ui/button";
import { useState } from "react";
import ConfirmPrompt from "@/components/features/ConfirmPrompt";
import Loader from "@/components/features/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const Favorites = () => {
  const { favoriteProducts, resetFavorites, removeFromFavorite } =
    useCartStore();
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoaded } = useUser();

  const loadHandler = (sign: any) => {
    setIsLoadingProducts(true);
    setTimeout(() => {
      setVisibleProducts((prevSize) => prevSize + sign * 5);
      setIsLoadingProducts(false);
    }, 1000);
  };

  const resetHandler = () => {
    resetFavorites();
    setShowConfirm(false);
    toast.success("Favorites reset Successfully", {
      position: "top-center",
      duration: 1000,
    });
  };

  if (!isLoaded) return <Loader title="Loading favorites..." />;

  return (
    <>
      <Toaster />
      <Container className="mt-10">
        {showConfirm && (
          <ConfirmPrompt
            title=" Are you sure you want to reset favorites?"
            saveBtn={resetHandler}
            cancelBtn={() => setShowConfirm(false)}
          />
        )}
        {favoriteProducts?.length > 0 ? (
          <div className="mb-10">
            <table className="w-full border-collapse">
              <thead className="border-b">
                <tr>
                  <th className="py-2 text-start text-base lg:text-lg">
                    Image
                  </th>
                  <th className="hidden text-start lg:table-cell py-2 pl-6 text-base lg:text-lg">
                    Category
                  </th>
                  <th className="hidden text-start lg:table-cell py-2 pl-6 text-base lg:text-lg">
                    Type
                  </th>
                  <th className="hidden text-start lg:table-cell py-2 pl-6 text-base lg:text-lg">
                    Status
                  </th>
                  <th className="py-2 pl-6 text-start text-base lg:text-lg">
                    Price
                  </th>
                  <th className="py-2 pl-6 text-start text-base lg:text-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="border-b flex-col gap-5 relative">
                {isLoadingProducts && (
                  <div className="absolute inset-0 bg-black/10 flex justify-center items-center backdrop-blur-md rounded-lg">
                    <div className="flex flex-col items-center gap-4 rounded-xl">
                      <div className="w-10 h-10 border-4 border-shop_light_green border-t-transparent rounded-full animate-spin"></div>

                      <p className="text-gray-700 text-xl font-semibold">
                        Please wait
                      </p>
                    </div>
                  </div>
                )}
                {favoriteProducts.slice(0, visibleProducts).map((item) => {
                  return (
                    <tr className="border-b" key={item._id}>
                      <td className="py-4 px-2 flex items-center gap-2">
                        <X
                          size={20}
                          className="cursor-pointer"
                          onClick={() => removeFromFavorite(item._id)}
                        />
                        <div className="border rounded-lg p-1 hidden lg:table-cell">
                          <Image
                            src={urlFor(item?.images[0])?.url()}
                            width={50}
                            height={50}
                            alt={item?.name}
                            className="w-20 h-20 object-cover"
                          />
                        </div>
                        <span className="line-clamp-1 max-w-30 sm:max-w-none">
                          {item?.name}
                        </span>
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
            <div className="py-4 lg:px-5 ">
              {visibleProducts < favoriteProducts?.length && (
                <div className="flex flex-col items-center justify-center gap-5">
                  <Button
                    className="bg-white hover:bg-wite px-4 text-black py-4 rounded-base text-sm border border-shop_dark_green/50 font-medium hoverEffect group"
                    onClick={() => loadHandler(+1)}
                    disabled={isLoadingProducts}
                  >
                    <span className="group-hover:-translate-y-0.5 hoverEffect">
                      view more
                    </span>
                    <ArrowDown className="group-hover:-translate-y-0.5 hoverEffect" />
                  </Button>
                </div>
              )}
              {visibleProducts > 5 &&
                visibleProducts >= favoriteProducts?.length && (
                  <div className="flex flex-col items-center justify-center gap-5">
                    <Button
                      className="bg-white hover:bg-wite px-4 text-black py-4 rounded-base text-sm border border-shop_dark_green/50 font-medium hoverEffect group"
                      onClick={() => loadHandler(-1)}
                      disabled={isLoadingProducts}
                    >
                      <span className="group-hover:-translate-y-0.5 hoverEffect">
                        view less
                      </span>
                      <ArrowUp className="group-hover:-translate-y-0.5 hoverEffect" />
                    </Button>
                  </div>
                )}
              <Button
                disabled={isLoadingProducts}
                onClick={() => setShowConfirm(true)}
                className="self-start bg-white p-2 lg:px-5 lg:py-6 text-black rounded-base text-sm lg:text-base border border-shop_dark_green/50 font-semibold hover:bg-shop_btn_dark_green/10 hoverEffect hover:text-shop_btn_dark_green"
              >
                Reset Favorites
              </Button>
            </div>
          </div>
        ) : (
          <EmptyWishList />
        )}
      </Container>
    </>
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
