"use client";
import { useEffect, useRef, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { HomeProductsTabData } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    HomeProductsTabData[0]?.value || ""
  );
  const cacheRef = useRef<Record<string, Product[]>>({});

  const query = `*[_type == "product" && variant == $variant] | order(name asc){
  ...,"categories": categories[]->title
}`;

  const params = { variant: selectedCategory.toLowerCase() };

  useEffect(() => {
    if (cacheRef.current[selectedCategory]) {
      setProducts(cacheRef.current[selectedCategory]);
      return;
    }
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
        cacheRef.current[selectedCategory] = response;
      } catch (error) {
        throw new Error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [selectedCategory]);

  return (
    <div>
      <div className="py-8">
        <HomeTabBar
          activeTab={selectedCategory}
          onTabSelect={setSelectedCategory}
        />
      </div>
      {loading ? (
        <div className="min-h-80 mb-10 bg-gray-400/60 text-white flex flex-col gap-4 justify-center items-center rounded-md">
          <Loader2 className="animate-spin w-8 h-8 opacity-90" />
          <span className="text-lg tracking-wide">Loading product…</span>
        </div>
      ) : products.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product) => (
            <AnimatePresence key={product?._id} mode="wait">
              <motion.div
                layout
                initial={{ y: -10, opacity: 0.2 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductsAvailable />
      )}
    </div>
  );
};

export default ProductGrid;
