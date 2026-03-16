import { Product } from "@/sanity.types";
import { getProductCharecteristics } from "@/sanity/queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristics = async ({ product }: { product: Product }) => {
  const details = await getProductCharecteristics(product?.slug.current);
  return (
    <Accordion type="single" collapsible className="mt-5 pb-2 border-b">
      <AccordionItem value="details">
        <AccordionTrigger className="flex justify-between items-center w-full">
          <div className="text-sm font-semibold hover:underline">
            {product?.name}: Characteristics
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1 text-balance py-2 text-sm hoverEffect">
          {details && (
            <p className="flex justify-between">
              Brand:
              <span className="font-semibold tracking-wide">
                {details[0]?.brandName}
              </span>
            </p>
          )}
          <p className="flex items-center justify-between">
            Collection:
            <span className="font-semibold tracking-wide">2025</span>
          </p>
          <p className="flex items-center justify-between">
            Type:
            <span className="font-semibold tracking-wide">
              {product?.variant}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Stock:
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
