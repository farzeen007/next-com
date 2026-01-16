import { cn } from "@/lib/utils";

const PriceFormatter = ({
  amount,
  className,
}: {
  amount: number | undefined;
  className?: string;
}) => {
  const FormattedPrice = new Number(amount).toLocaleString("en", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });

  return (
    <div className={cn("text-sm font-semibold text-darkColor", className)}>
      {FormattedPrice}
    </div>
  );
};

export default PriceFormatter;
