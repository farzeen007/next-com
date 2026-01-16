"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const TABS = {
  DESCRIPTION: 1,
  INFO: 2,
  REVIEWS: 3,
};

const ProductTabs = ({ data }: { data: Product }) => {
  console.log(data);

  const [active, setActive] = useState(TABS.DESCRIPTION);
  const contentTab = () => {
    switch (active) {
      case TABS.DESCRIPTION:
        return <div>{data?.description}</div>;
      case TABS.INFO:
        return (
          <div className="text-base">
            {data?.stock && (
              <div className="flex gap-5 border-b px-10 py-2 text-black">
                Stock : <span className="text-gray-500">{data?.stock}</span>
              </div>
            )}
            {data?.variant && (
              <div className="flex gap-5 px-10 py-2 text-black">
                Variant : <span className="text-gray-500">{data?.variant}</span>
              </div>
            )}
          </div>
        );
      case TABS.REVIEWS:
        return (
          <div>
            I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the
            chest and shoulders. My only complaint is that it is so long! I like
            to wear polo shirts untucked. This shirt goes completely past my
            rear end. If I wore it with ordinary shorts, you probably wouldnt be
            able to see the shorts at all – completely hidden by the shirt. It
            needs to be 4 to 5 inches shorter in terms of length to suit me. I
            have many RL polo shirts, and this one is by far the longest. I dont
            understand why.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-10 max-w-3xl">
      <div className="flex justify-between rounded-xl bg-gray-200 text-darkColor">
        {[
          { id: 1, title: "Description" },
          { id: 2, title: "Additional Information" },
          { id: 3, title: "Reviews" },
        ]?.map((item) => (
          <TabButton
            key={item?.id}
            text={item?.title}
            className={`${active === item?.id ? "border-shop_light_green border-2 rounded-xl text-shop_btn_dark_green bg-white" : "border-2 border-transparent"}`}
            onClick={() => setActive(item?.id)}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="mt-5 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {contentTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductTabs;

const TabButton = ({
  className,
  text,
  onClick,
}: {
  className: string;
  text: string;
  onClick: () => void;
}) => (
  <button
    className={cn(
      "py-2.5 w-full text-[14px] tracking-wide font-semibold",
      className
    )}
    onClick={onClick}
  >
    {text}
  </button>
);
