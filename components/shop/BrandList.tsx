import React from "react";
import { Title } from "../ui/Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Brand } from "@/sanity.types";

const BrandList =  ({ brands }: { brands: Brand }) => {
  return (
    <div className="p-5">
      <Title className="text-base! font-semibold">Brands</Title>
      <div className="my-2 flex flex-col gap-2">
        <RadioGroup defaultValue="comfortable">
          {brands?.map((brand) => (
            <div className="flex items-center gap-3">
              <RadioGroupItem value={brand?.slug?.current} id={brand?._id} />
              <Label className="text-sm" htmlFor={brand?.slug?.current}>
                {brand?.title}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default BrandList;
