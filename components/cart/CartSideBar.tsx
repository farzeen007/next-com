import { useCartStore } from "@/store/store";
import { Title } from "../ui/Title";
import { Product } from "@/sanity.types";
import PriceFormatter from "../PriceFormatter";
import { Button } from "../ui/button";
import CartAddress from "./CartAddress";

type ProductTypes = Product & {
  quantity: number;
};

const CartSideBar = ({ product }: { product?: ProductTypes }) => {
  const { getDiscountedSubTotal, getSubTotal } = useCartStore();

  const discountedSubTotal = getDiscountedSubTotal();
  const subTotal = getSubTotal();
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
          <Button className="w-full hover:bg-shop_btn_dark_green bg-shop_light_green p-5 lg:p-6 rounded-full text-base font-semibold">
            Proceed to Checkout
          </Button>
        </div>
      </div>
      <CartAddress/>
    </section>
  );
};

export default CartSideBar;
