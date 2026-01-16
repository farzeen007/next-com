import Image from "next/image";
import { Title } from "./ui/Title";
import { banner_1 } from "@/images";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <div className="bg-shop_light_pink rounded-lg py-16 md:py-0 px-10 md:px-24 items-center flex justify-between">
      <div className="space-y-5">
        <Title className="tracking-wide font-bold text-shop_dark_green leading-9 text-3xl! font-sans">
          Grab Upto 50% Off on <br />
          Selected headphone
        </Title>
        <Link
          href="/"
          className="bg-shop_btn_dark_green opacity-90 hover:opacity-100 transition-opacity px-4.5 py-2.5 rounded-sm font-bold text-white text-sm"
        >
          Buy Now
        </Link>
      </div>
      <Image
        src={banner_1}
        alt="Home Banner"
        className="w-96 hidden md:inline-flex"
      />
    </div>
  );
};

export default HomeBanner;
