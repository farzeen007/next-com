"use client";
import { Category, Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import NoProductsAvailable from "./NoProductsAvailable";

interface Props {
  slug: string;
  category: Category[];
}

const CategoryProducts = ({ slug, category }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleActiveCategory = (newSlug: string) => {
    if (newSlug === currentSlug) {
      return;
    }
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
    return;
  };

  const fetchProducts = async () => {
    try {
      const query = `
      *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
      ...,"categories": categories[]->title}
    `;
      const data = await client.fetch(query, { categorySlug: currentSlug });
      setProducts(data);
      return;
    } catch (error) {
      setProducts([]);
      console.log("error fetching products for the selected category");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [router]);
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex w-full md:flex-col md:w-40 h-auto">
        {category?.map((item) => {
          const isActiveCategory = item.slug.current === currentSlug;
          return (
            item?.title && (
              <Button
                key={item?._id}
                onClick={() =>
                  handleActiveCategory(item.slug.current as string)
                }
                className={`${isActiveCategory ? "bg-pink-800 text-white" : "bg-white text-black"} rounded-none border font-semibold hover:bg-pink-800 hover:text-white hoverEffect`}
              >
                <p className="w-full text-left">{item?.title}</p>
              </Button>
            )
          );
        })}
      </div>

      {isLoading ? (
        <div className="min-h-80 w-full! mb-10 bg-gray-400/60 text-white flex flex-col gap-4 justify-center items-center rounded-md">
          <Loader2 className="animate-spin w-8 h-8 opacity-90" />
          <span className="text-lg tracking-wide">Loading product…</span>
        </div>
      ) : products?.length > 0 ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <AnimatePresence mode="wait">
            {products?.map((product: Product) => (
              <motion.div
                initial={{ y: -10, opacity: 0.2 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                key={product?._id}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 h-56">
          <NoProductsAvailable currentSlug={currentSlug} />
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
