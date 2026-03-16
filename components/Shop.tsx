"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import { Brand, Category } from "@/sanity.types";
import PriceList from "./shop/PriceList";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductCard from "./ProductCard";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

const Shop = ({
  categories,
  brands,
}: {
  categories: Category[];
  brands: Brand[];
}) => {
  const searchParams = useSearchParams();
  const selectedBrandParam = searchParams.get("brand");
  const selectedCategoryParm = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    selectedCategoryParm || null,
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    selectedBrandParam || null,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedPrice(null);
  };

  const fetchProduct = async () => {
    const query = `
*[_type == 'product'
  && (!defined($selectedCategory) || categories[]->slug.current == $selectedCategory)
  && (!defined($selectedBrand) || brand->slug.current == $selectedBrand)
  && price >= $minPrice && price <= $maxPrice
]
| order(name asc) {
  ...,
  "categories": categories[]->title
}
`;
    let minPrice = 0;
    let maxPrice = 10000;

    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      minPrice = min;
      maxPrice = max;
    }

    try {
      setLoading(true);
      const res = await client.fetch(
        query,
        {
          selectedCategory,
          selectedBrand,
          minPrice,
          maxPrice,
        },
        { next: { revalidate: 0 } },
      );
      setProducts(res);
    } catch (error) {
      console.error("error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [selectedPrice, selectedBrand, selectedCategory]);

  return (
    <Container>
      <div className="flex justify-between border-t py-6 sticky top-[72px] bg-white z-5">
        <p className="uppercase font-semibold tracking-wide">
          Get the products as your needs
        </p>
        {(selectedBrand != null ||
          selectedCategory != null ||
          selectedPrice != null) && (
          <button onClick={resetFilters}>Reset Filters</button>
        )}
      </div>
      <div className="md:flex border-t border-t-shop_dark_green">
        <div className="md:border-y-0 md:border-l-0 md:border-r border border-shop_dark_green md:min-w-64 md:border-r-shop_dark_green p-5 pl-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto scrollbar-hide flex flex-col space-y-8">
          <BrandList
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <PriceList
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </div>
        <div className="flex-1">
          {loading && (
            <div className="h-[calc(100vh-160px)] flex-1 flex flex-col gap-2 items-center justify-center overflow-y-auto p-5 scrollbar-hide">
              <Loader2
                size={30}
                className="animate-spin text-shop_light_green"
              />
              <h1 className="text-shop_dark_green">Product is Loading...</h1>
            </div>
          )}
          {!loading &&
            (products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                {products?.map((product) => (
                  <motion.div
                    layout
                    initial={{ y: -10, opacity: 0.2 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <NoProductsAvailable />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default Shop;
