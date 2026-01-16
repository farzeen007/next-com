import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Title } from "@/components/ui/Title";
import { getHotDeals } from "@/sanity/queries";

const page = async () => {
  const products = await getHotDeals();
  return (
    <div className="bg-deal-bg py-10">
      <Container>
        <Title className="text-base! uppercase font-semibold border-b border-b-black inline-block mb-5 p-0!">
          Hot Deals Of The Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
