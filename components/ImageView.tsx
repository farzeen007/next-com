"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images && images[0]);
  return (
    <div className="space-y-5 md:w-1/2">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          className="border min-h-[500px] max-h-[550px] rounded-lg overflow-hidden cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            alt="Active Image"
            width={700}
            height={700}
            src={urlFor(active?.asset).url()}
            className={`${isStock === 0 && "opacity-60"} h-96 max-h-[550px] min-h-[500px] w-full object-contain hover:scale-110 hoverEffect`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-4 gap-5 md:gap-0 md:grid-cols-6">
        {images?.map((image) => (
          <button
            className={`border rounded-md w-25 h-27 ${active?._key === image?._key && "border-black"}`}
            onClick={() => setActive(image)}
          >
            <Image
              alt="Active Image"
              width={100}
              height={100}
              className="w-full h-full object-contain"
              src={urlFor(image?.asset).url()}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
