import { Category } from "@/sanity.types";
import { Title } from "./ui/Title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const HomeCategories = async ({ categories }: { categories: Category[] }) => {
  return (
    <div className="p-5 lg:p-7 border rounded-sm my-10 md:my-20 ">
      <Title className="font-semibold border-b pb-3 mb-5">
        Popular Categories
      </Title>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="flex space-x-4 bg-black/4 p-5 items-center"
          >
            <div className="w-20 h-20 border border-orange-300 rounded-[2px] overflow-hidden p-1">
              <Link href={`/category/${category?.slug?.current}`}>
                {category?.image && (
                  <Image
                    width={500}
                    height={500}
                    alt="Category Image"
                    src={urlFor(category?.image)?.url()}
                    className="w-full h-full object-contain"
                  />
                )}
              </Link>
            </div>
            <div className="flex flex-col gap-1.5">
              <h1 className="font-semibold">
                <Link
                  href={{
                    pathname: "shop",
                    query: { category: category?.slug?.current },
                  }}
                >
                  {category?.title}
                </Link>
              </h1>
              <div className="flex space-x-1 items-center">
                <span className="text-base text-shop_dark_green font-semibold">{`(${category?.range})`}</span>
                <span className="text-sm text-black/90">items Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
