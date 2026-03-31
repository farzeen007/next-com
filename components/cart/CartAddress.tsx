"use client";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import CartAddAddress from "./CartAddAddress";
import { Trash } from "lucide-react";
import ConfirmPrompt from "@/components/features/ConfirmPrompt";
import toast from "react-hot-toast";

const CartAddress = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const fetchAddressData = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const response = await client.fetch(query, {}, { cache: 'no-cache' });
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

  useEffect(() => {
    fetchAddressData();
  }, []);

  const removeAddress = async () => {
    if (!selectedAddressId) return;

    try {
      setIsRemoving(true);

      const res = await fetch("/api/address/remove", {
        method: "DELETE",
        body: JSON.stringify({ addressId: selectedAddressId }),
      });

      if (!res.ok) throw new Error("Failed");

      setShowConfirm(false);
      toast.success("Address removed", {
        position: "bottom-right",
      });

      fetchAddressData();
    } catch (err) {
      toast.error("Failed to remove address");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmPrompt
          title="Are you sure you want to Remove this address?"
          saveBtn={removeAddress}
          cancelBtn={() => setShowConfirm(false)}
          isSubmitting={isRemoving}
        />
      )}
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
              return (
                <div className="flex justify-between items-center"><div className="flex items-center gap-3 " key={item?._id}>
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
                  {address.length > 1 && <Trash size={20} className="text-red-500 hover:text-red-700 cursor-pointer transition" onClick={() => {
                    setSelectedAddressId(item?._id);
                    setShowConfirm(true);
                  }} />}
                </div>
              );
            })}
            <CartAddAddress fetchAddress={fetchAddressData} />
          </RadioGroup>
        )}
      </div>
    </>
  );
};

export default CartAddress;
