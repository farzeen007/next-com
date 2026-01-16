import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const NoProductsAvailable = ({
  className,
  currentSlug,
}: {
  className?: string;
  currentSlug?: string;
}) => {
  return (
    <div
      className={cn(
        "min-h-60 h-full flex flex-col gap-5 justify-center items-center bg-shop_light_green/40",
        className
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        No Products Available
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        We're sorry, but there is no products matching on {currentSlug} at the
        moment.
      </motion.div>
      <motion.div className="flex gap-2 items-center">
        <Loader2 className="animate-spin w-5 h-5 opacity-90" />
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          We're <span className="font-bold">restocking shortly</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NoProductsAvailable;
