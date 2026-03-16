import { Title } from "../ui/Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Brand } from "@/sanity.types";

interface Props {
  brands: Brand[];
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div>
      <Title className="text-base! font-semibold text-center md:text-start">Brands</Title>
      <div className="my-2 flex flex-col gap-2 pl-5">
        <RadioGroup
          value={selectedBrand ?? ""}
          onValueChange={(value) => setSelectedBrand(value)}
        >
          {brands?.map((brand) => {
            if (!brand?.title) return null;
            const value = brand?.slug?.current;
            return (
              <div className="flex items-center gap-3">
                <RadioGroupItem value={value ?? ""} id={value} />
                <Label
                  className={`text-sm ${selectedBrand === value && "text-shop_light_green"}`}
                  htmlFor={value}
                >
                  {brand?.title}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
      {selectedBrand && (
        <button onClick={() => setSelectedBrand("")}>Reset selection</button>
      )}
    </div>
  );
};

export default BrandList;
