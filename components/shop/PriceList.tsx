import React from "react";
import { Title } from "../ui/Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const PriceData = [
  { title: "Under $100", value: "0-100" },
  { title: "$100-$200", value: "100-200" },
  { title: "$200-$300", value: "200-300" },
  { title: "$300-$400", value: "300-400" },
  { title: "$400-$500", value: "400-500" },
];

interface Props {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div>
      <Title className="text-base! font-semibold">Price List</Title>
      <div className="py-2 pl-5">
        <RadioGroup
          className="RadioGroupRoot"
          aria-label="View density"
          value={selectedPrice || ""}
          onValueChange={(value) => setSelectedPrice(value)}
        >
          {PriceData?.map((price) => (
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value={price?.value || ""}
                id={price?.value}
              ></RadioGroupItem>
              <Label
                className={`Label cursor-pointer ${selectedPrice === price?.value && "text-shop_light_green"}`}
                htmlFor={price?.value}
              >
                {price?.title}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {selectedPrice && (
        <button onClick={() => setSelectedPrice("")}>Reset selection</button>
      )}
    </div>
  );
};

export default PriceList;
