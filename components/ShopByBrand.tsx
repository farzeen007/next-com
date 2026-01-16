import { getBrands } from "@/sanity/queries";
import { Title } from "./ui/Title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrand = async () => {
  const brands = await getBrands();

  return (
    <div className="bg-shop_light_bg p-5 lg:p-7 rounded-md mb-10 lg:mb-20">
      <div className="flex justify-between items-center">
        <Title className="font-semibold text-2xl text-darkColor">
          Shop By Brands
        </Title>
        <Link className="text-sm font-semibold" href={"/shop"}>
          View all
        </Link>
      </div>
      <div className="mb-10 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 place-items-center gap-2.5">
        {brands?.map((brand) => {
          return (
            <Link
              key={brand?._id}
              href={brand?._id}
              className="bg-white p-2 rounded-md hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
            >
              {brand?.image && (
                <Image
                  width={250}
                  height={250}
                  src={urlFor(brand?.image).url()}
                  className="w-32 h-20 object-contain"
                  alt="Brand Image"
                />
              )}
            </Link>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-2 place-items-start place-content-center shadow-sm hover:shadow-shop_light_green/20 px-2 py-5 rounded-sm">
        {extraData?.map((item) => (
          <div className="flex justify-center items-center gap-3 group text-lightColor">
            <span className="group-hover:text-shop_light_green scale-100 group-hover:scale-90 hoverEffect inline-flex">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="font-semibold capitalizce text-darkColor/80">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrand;
