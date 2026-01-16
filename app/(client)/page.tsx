import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlogs from "@/components/LatestBlogs";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrand from "@/components/ShopByBrand";
import { getCategories } from "@/sanity/queries";

export const metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Your Next E Commerce App",
};

const Home = async () => {
  const categories = await getCategories(6);
  return (
    <Container>
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <ShopByBrand />
      <LatestBlogs />
    </Container>
  );
};

export default Home;
