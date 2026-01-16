import React from "react";
import PriceFormatter from "./PriceFormatter";
import { cn } from "@/lib/utils";

interface PriceViewProps {
  price: number | undefined;
  discount?: number | undefined;
  className?: string;
  priceClass?: string;
  discountClass?: string;
}

const PriceView = ({
  price,
  discount,
  className,
  priceClass,
  discountClass,
}: PriceViewProps) => {
  return (
    <div className={cn("flex gap-2 ", className)}>
      <div>
        <PriceFormatter
          amount={price}
          className={(cn("text-shop_btn_dark_green text-[15px]"), priceClass)}
        />
      </div>
      {price && discount && (
        <div>
          <PriceFormatter
            amount={price + (price * discount) / 100}
            className={cn(
              "text-darkColor/60 text-[15px] font-medium line-through",
              discountClass
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PriceView;
