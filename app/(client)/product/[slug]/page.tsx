import AddtoCartButton from "@/components/AddtoCartButton";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceFormatter from "@/components/PriceFormatter";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics ";
import ProductTabs from "@/components/ProductTabs";
import { Title } from "@/components/ui/Title";
import { getSingleProduct } from "@/sanity/queries";
import { Heart, StarIcon, CornerDownLeft, Truck } from "lucide-react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

interface Props {
  slug: string;
}

const page = async ({ params }: { params: Props }) => {
  const { slug } = await params;
  const data = await getSingleProduct(slug);
  console.log(data, "dataas");
  return (
    <Container className="my-10 ">
      <div className="flex flex-col md:flex-row space-x-8">
        {data?.images && (
          <ImageView isStock={data?.stock} images={data?.images} />
        )}
        <div className="flex-1">
          <div className="flex flex-col ">
            <Title className="font-semibold">{data?.name}</Title>
            <p className="text-base text-gray-500 tracking-wide">
              {data?.description}
            </p>
            <div className="flex gap-0.5 items-center">
              {[...Array(5)].map(() => (
                <StarIcon className="w-3.5" fill="#3b9c3c" stroke="0" />
              ))}
              <span className="text-sm font-semibold">(120)</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-y my-5 py-5">
            <PriceView
              price={data?.price}
              discount={data?.discount}
              className="gap-3"
              priceClass="text-lg font-semibold text-shop_dark_green"
              discountClass="text-lg font-semibold text-darkColor/60"
            />
            {(data?.stock as number) > 0 ? (
              <div className="bg-green-600/20 font-semibold text-shop_light_green py-1 px-4 text-[12px] rounded-lg w-fit">
                In Stock
              </div>
            ) : (
              <div className="bg-darkColor/50 text-white font-semibold  py-1 px-4 text-[12px] rounded-lg w-fit  p-5">
                Out of Stock
              </div>
            )}
          </div>
          <div className="flex gap-5 items-center">
            <AddtoCartButton className="flex-1" />
            <div className="w-auto border p-1.5 border-shop_light_green/80 rounded-[5px] group cursor-pointer">
              <Heart className="text-shop_light_green/80 w-5 h-5 group-hover:text-shop_light_green hoverEffect " />
            </div>
          </div>
          <ProductCharacteristics product={data} />
          <div className="flex justify-between py-5 border-b">
            <div className="flex gap-2 items-center hover:text-red-500 cursor-pointer hoverEffect">
              <RxBorderSplit className="text-lg" />
              <div className="text-sm tracking-wider">Compare color</div>
            </div>
            <div className="flex gap-2 items-center hover:text-red-500 cursor-pointer hoverEffect">
              <FaRegQuestionCircle className="text-lg" />
              <div className="text-sm tracking-wider">Ask a question</div>
            </div>
            <div className="flex gap-2 items-center hover:text-red-500 cursor-pointer hoverEffect">
              <TbTruckDelivery className="text-lg" />
              <div className="text-sm tracking-wider">Delivery & Return</div>
            </div>
            <div className="flex gap-2 items-center hover:text-red-500 cursor-pointer hoverEffect">
              <FiShare2 className="text-lg" />
              <div className="text-sm tracking-wider">Share</div>
            </div>
          </div>
          <div className="border border-gray-300 mt-5">
            <div className="py-3 px-3 border-b border-b-gray-300 flex gap-3 items-center">
              <Truck className="text-orange-500 w-7 h-7" />
              <div>
                <h4 className="font-semibold text-base">Free Delivery</h4>
                <p className="underline text-sm text-gray-600">
                  Enter your Postal code for Delivey Availability.
                </p>
              </div>
            </div>
            <div className="py-5 px-3 flex gap-3 items-center">
              <CornerDownLeft className="text-orange-500 w-7 h-7" />
              <div>
                <h4 className="font-semibold text-base">Return Delivery</h4>
                <p className="text-sm text-gray-600">
                  Free 30days Delivery Returns.{" "}
                  <span className="underline">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductTabs data={data}/>
    </Container>
  );
};

export default page;
