"use client";
import { useCartStore } from "@/store/store";
import Container from "../Container";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import LoginPrompt from "../features/LoginPrompt";
import { Loader2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import EmptyCart from "./EmptyCart";
import { Title } from "../ui/Title";
import CartItemCard from "./CartItemCard";
import { TooltipProvider } from "../ui/tooltip";
import CartSideBar from "./CartSideBar";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const Cart = () => {
  const { items, resetCart } = useCartStore();
  const { isSignedIn, isLoaded } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    setShowConfirm(false);
    resetCart();
    toast.success("Cart reset Successfully", {
      position: "top-center",
    });
  };

  if (!isLoaded) {
    return (
      <motion.div
        className="w-full flex flex-col gap-5 justify-center items-center h-[calc(100vh-75px)]"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <Loader2 size={40} className="animate-spin" />
        <h2 className="text-lg">Loading Cart...</h2>
      </motion.div>
    );
  }
  if (!isSignedIn) return <LoginPrompt />;

  return (
    <>
      <Toaster />
      <section className="bg-gray-50 py-7">
        {showConfirm && (
          <div className="fixed inset-0 flex justify-center bg-black/10 backdrop-blur-xs z-1000">
            <div className="bg-white absolute top-30 rounded-lg p-5 min-h-60 min-w-110 flex flex-col justify-center items-center gap-10">
              <h4 className="text-2xl font-medium">
                Are you sure you want to reset cart?
              </h4>
              <div className="flex justify-evenly w-full">
                <button
                  className="bg-shop_light_green hover:bg-shop_btn_dark_green hoverEffect py-2 px-10 text-white rounded-xl text-lg"
                  onClick={() => setShowConfirm(false)}
                >
                  No
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 hoverEffect py-2 px-10 text-white rounded-xl text-lg"
                  onClick={handleReset}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
        {items.length > 0 ? (
          <Container>
            <div className="flex items-center gap-2 mb-7">
              <ShoppingBag />
              <Title className="font-bold">Shopping Cart</Title>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 relative">
              <div className="w-full lg:w-2/3 h-full bg-white border rounded-lg h-">
                <>
                  <TooltipProvider>
                    {items?.map((item) => (
                      <CartItemCard key={item?._id} item={item} />
                    ))}
                  </TooltipProvider>
                  <Button
                    className="flex m-5 font-semibold bg-red-500 hover:bg-red-600 hoverEffect"
                    onClick={() => setShowConfirm(true)}
                  >
                    Reset Cart
                  </Button>
                </>
              </div>
              <CartSideBar />
            </div>
          </Container>
        ) : (
          <Container className="max-w-2xl">
            <EmptyCart />
          </Container>
        )}
        <div></div>
      </section>
    </>
  );
};

export default Cart;
