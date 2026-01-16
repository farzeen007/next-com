import React from "react";
import Logo from "./Logo";
import { SubText, SubTitle } from "./ui/Title";
import SocialMedias from "./SocialMedias";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FooterMid = () => {
  return (
    <div className="py-5 md:py-10  grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div>
          <Logo />
          <SubText className="leading-5 pr-5 md:pr-0">
            Discover curated furniture collections at Shopcart, blending style
            and comfort to elevate your living spaces.
          </SubText>
        </div>
        <SocialMedias iconClassName="border border-gray-400 hover:border-shop_dark_green hover:text-shop_dark_green" />
      </div>
      <div>
        <SubTitle className="mb-4">Quick Links</SubTitle>
        <ul className="flex flex-col gap-4">
          {quickLinksData?.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.title}
                className="text-[15px] text-gray-600"
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
      </div>
      <div>
        <SubTitle className="mb-4">Categories</SubTitle>
        <ul className="flex flex-col gap-4">
          {categoriesData?.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.title}
                className="text-[15px] text-gray-600"
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        <SubTitle>Newsletter</SubTitle>
        <SubText>
          Subscribe to our newsletter to receive updates and exclusive offers.
        </SubText>
        <form className="space-y-3 ">
          <Input
            placeholder="Enter your email"
            type="email"
            className="inline-flex md:w-full"
            required
          />
          <Button className="inline-flex md:w-full bg-gray-900 text-lg py-5">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FooterMid;
