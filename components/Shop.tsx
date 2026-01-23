"use client";
import React, { useState } from "react";
import Container from "./Container";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import { Brand, Category } from "@/sanity.types";
import PriceList from "./shop/PriceList";

const Shop = ({
  categories,
  brands,
}: {
  categories: Category[];
  brands: Brand[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const resetFilters = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedPrice("");
  };
  return (
    <Container>
      <div className="flex justify-between border-t py-6 sticky top-20 bg-white z-10">
        <p className="uppercase font-semibold tracking-wide">
          Get the products as your needs
        </p>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      <div className="md:flex border-t border-t-shop_dark_green">
        <div className="border-r md:min-w-64 border-r-shop_dark_green p-5 pl-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto scrollbar-hide flex flex-col space-y-10">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <BrandList
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
          <PriceList
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </div>
        <div className="flex-1">
          <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
            heyy
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Shop;
