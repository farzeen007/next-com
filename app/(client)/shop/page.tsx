import Shop from "@/components/Shop";
import { getBrands, getCategories } from "@/sanity/queries";

const page = async () => {
  const categories = await getCategories();
  const brands = await getBrands();
  return <Shop categories={categories} brands={brands} />;
};

export default page;
