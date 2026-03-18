import { useCartStore } from "@/store/store";
import { Title } from "../ui/Title";
import { Product } from "@/sanity.types";
import PriceFormatter from "../PriceFormatter";
import { Button } from "../ui/button";
import CartAddress from "./CartAddress";
import { useUser } from "@clerk/nextjs";
import { createStripeSession } from "@/actions/createStripeSession";
import { useState } from "react";

type ProductTypes = Product & {
  quantity: number;
};

const CartSideBar = ({ product }: { product?: ProductTypes }) => {
  const { getDiscountedSubTotal, getSubTotal, items } = useCartStore();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const discountedSubTotal = getDiscountedSubTotal();
  const subTotal = getSubTotal();


  const handleCheckout = async () => {
    try {
      const metadata = {
        orderId: crypto.randomUUID(),
        customerName: user?.fullName || "",
        customerEmail: user?.emailAddresses?.[0]?.emailAddress || "",
        clerkUserId: user?.id || "",
        clerkStripeId: user?.publicMetadata?.stripeCustomerId
      }
      const checkoutUrl = await createStripeSession(metadata, items)
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (error) {
      throw new Error("Error while creating stripe")
    }
  };


  return (
    <section className="flex flex-col gap-5 fixed bottom-0 left-1/2 -translate-x-1/2 w-[95%] lg:sticky lg:top-23 lg:translate-x-0 lg:left-auto lg:flex-1 lg:self-start">
      <div className="bg-white w-full px-5 py-5 border rounded-lg">
        <Title className="font-semibold text-lg lg:text-xl">
          Order Summary
        </Title>
        <div className="flex flex-col py-2 lg;py-5 gap-2 lg:gap-5 border-b">
          <p className="flex justify-between text-base lg:text-lg font-medium">
            Sub Total
            <span>
              <PriceFormatter className="text-base" amount={subTotal} />
            </span>
          </p>
          <p className="flex justify-between items-center text-base lg:text-lg font-medium">
            Dsicount
            <span>
              <PriceFormatter
                className="text-base"
                amount={subTotal - discountedSubTotal}
              />
            </span>
          </p>
        </div>
        <div>
          <p className="flex justify-between items-center text-base lg:text-lg py-2 lg:py-5 font-semibold">
            Total
            <span>
              <PriceFormatter
                className="text-base"
                amount={discountedSubTotal}
              />
            </span>
          </p>
          <Button
            className="w-full hover:bg-shop_btn_dark_green bg-shop_light_green p-5 lg:p-6 rounded-full text-base font-semibold"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </Button>
        </div>
      </div>
      <CartAddress />
    </section>
  );
};

export default CartSideBar;
