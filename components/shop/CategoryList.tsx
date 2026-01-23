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
    <div>
      <Title className="text-base! font-semibold">Product Categories</Title>
      <div className="my-2 flex flex-col gap-2 pl-5">
        <RadioGroup
          className="RadioGroupRoot"
          aria-label="View density"
          value={selectedCategory ?? ""}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          {categories?.map((category: Category) => {
            if (!category?.title) return null;
            const value = category?.slug?.current;
            return (
              <div className="flex items-center gap-3" key={category?._id}>
                <RadioGroupItem value={value ?? ""} id={value} />
                <Label
                  className={`text-sm ${selectedCategory === value && "text-shop_light_green"}`}
                  htmlFor={value}
                >
                  {category?.title}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
      {selectedCategory && (
        <button onClick={() => setSelectedCategory(null)}>
          Reset selection
        </button>
      )}
    </div>
  );
};

export default CategoryList;
