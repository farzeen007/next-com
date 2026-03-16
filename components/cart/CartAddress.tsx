"use client";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

const CartAddress = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddressData = async () => {
      setLoading(true);
      try {
        const query = `*[_type=="address"] | order(publishedAt desc)`;
        const response = await client.fetch(query);
        if (response.length > 0) {
          const defaultItem = response?.find((item: Address) => item?.default);
          setSelectedAddress(defaultItem?._id ?? response[0]?._id);
        }
        setAddress(response);
      } catch (error) {
        console.log(error, "error while fetching addresses");
      } finally {
        setLoading(false);
      }
    };
    fetchAddressData();
  }, []);

  return (
    <div className="bg-white w-full px-5 py-5 border rounded-lg h-full">
      <h4 className="font-bold">Delivery Address</h4>

      {loading ? (
        <div className="flex flex-1 w-full h-full items-center justify-center [--radius:1rem]">
          <Item variant="muted" className="w-full text-center mb-5">
            <ItemMedia>
              <Spinner />
            </ItemMedia>

            <ItemContent className="w-full! text-center!">
              <ItemTitle className="mx-auto! text-center!">
                Loading Address
              </ItemTitle>
            </ItemContent>
          </Item>
        </div>
      ) : (
        <RadioGroup
          value={selectedAddress}
          className="py-6 flex flex-col gap-7 max-h-50 w-full overflow-y-scroll lg:max-h-full lg:overflow-y-visible"
          onValueChange={setSelectedAddress}
        >
          {address.map((item) => {
            console.log(item, "item");
            return (
              <div className="flex items-center gap-3 " key={item?._id}>
                <RadioGroupItem value={item?._id} id={item?._id} />
                <div className="flex flex-col  justify-center ">
                  <Label
                    className="text-base! mb-1 text-shop_btn_dark_green font-semibold"
                    htmlFor={item?._id}
                  >
                    {item?.name}
                  </Label>
                  <span className="text-sm text-black/60">{item?.address}</span>
                  <span className="text-sm text-black/60">{item?.city}</span>
                </div>
              </div>
            );
          })}
        </RadioGroup>
      )}
    </div>
  );
};

export default CartAddress;
