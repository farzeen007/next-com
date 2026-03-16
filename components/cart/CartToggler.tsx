import { Product } from "@/sanity.types";
import { useCartStore } from "@/store/store";
import { MinusCircle, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

type ProductTypes = Product & {
  quantity: number;
};

const CartToggler = ({product}:{product:ProductTypes}) => {
  const { addToCart, removeFromCart, getTotalPrice, getTotalCount } =
    useCartStore();
  const itemQuantity = getTotalCount(product);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    if (itemQuantity === 1) {
      toast.success(
        `Removed ${product.name?.substring(0, 8)}... from cart successfully`,
        {
          position: "bottom-right",
        },
      );
    } else {
      toast.success(`decreased the item quantity`, {
        position: "bottom-right",
      });
    }
  };

    const handleAddToCart = (product: ProductTypes) => {
    if (itemQuantity >= (product?.stock as number)) {
      toast.error(`Cannot add more than available stock `, {
        duration: 1000,
        style: { background: "black", color: "white" },
      });
      return;
    }
    addToCart(product);
    if (itemQuantity === 0) {
      toast.success(
        `Added ${product.name?.substring(0, 8)}... to cart successfully`,
        {
          position: "bottom-right",
        },
      );
    } else {
      toast.success(`increased the item quantity`, {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="flex items-center">
      <div
        className="cursor-pointer hoverEffect"
        onClick={() => handleRemoveFromCart(product?._id)}
      >
        <MinusCircle size={20} color="green" />
      </div>
      <div className="font-semibold text-[16px] py-1 px-3 text-center">
        {itemQuantity}
      </div>
      <div
        onClick={() => handleAddToCart(product)}
        className="cursor-pointer hoverEffect"
      >
        <PlusCircle size={20} color="green" />
      </div>
    </div>
  );
};

export default CartToggler;
