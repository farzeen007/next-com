"use client";
import React, { useState } from "react";
import Container from "./Container";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import { Brand, Category } from "@/sanity.types";

const Shop = ({
  categories,
  brands,
}: {
  categories: Category;
  brands: Brand;
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);
  return (
    <Container>
      <div className="flex justify-between border-t py-6">
        <p className="uppercase font-semibold tracking-wide">
          Get the products as your needs
        </p>
        <button>Reset Filters</button>
      </div>
      <div className="md:flex border-t border-t-shop_dark_green">
        <div className="border-r border-r-shop_dark_green">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <BrandList brands={brands} selectedBrand={selectedBrand} />
        </div>
        <div></div>
      </div>
    </Container>
  );
};

export default Shop;
