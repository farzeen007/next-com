import React from "react";
import { Title } from "../ui/Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Category } from "@/sanity.types";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="p-5">
      <Title className="text-base! font-semibold">Product Categories</Title>
      <div className="my-2 flex flex-col gap-2">
        <RadioGroup defaultValue="comfortable">
          {categories?.map((category: Category) => {
            return (
              category?.title && (
                <div className="flex items-center gap-3" key={category?._id}>
                  <RadioGroupItem
                    value={category?.slug?.current}
                    id={category?._id}
                    onClick={() => setSelectedCategory(category)}
                  />
                  <Label
                    className={`text-sm ${selectedCategory?.slug?.current === category?.slug?.current && "text-shop_light_green"}`}
                    htmlFor={category?.slug?.current}
                  >
                    {category?.title}
                  </Label>
                </div>
              )
            );
          })}
        </RadioGroup>
      </div>
      {selectedCategory && (
        <button onClick={() => setSelectedCategory()}>Reset selection</button>
      )}
    </div>
  );
};

export default CategoryList;
