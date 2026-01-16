import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import { Title } from "@/components/ui/Title";
import { getCategories } from "@/sanity/queries";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const categories = await getCategories();
  return (
    <Container className="py-10">
      <div className="mb-4">
        <Title className="font-semibold text-xl! normal-case">
          Products by Category:
          <span className="text-shop_light_green capitalize"> {slug}</span>
        </Title>
      </div>
      <CategoryProducts slug={slug} category={categories} />
    </Container>
  );
};

export default page;
