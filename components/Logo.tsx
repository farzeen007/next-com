import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({
  className,
  spanClass,
}: {
  className?: string;
  spanClass?: string;
}) => {
  return (
    <Link href="/" className="inline-flex">
      <h3
        className={cn(
          "uppercase text-shop_dark_green font-extrabold text-2xl tracking-widest font-sans group hover:text-shop_light_green hoverEffect",
          className
        )}
      >
        Next
        <span
          className={cn(
            "text-shop_light_green group-hover:text-shop_dark_green hoverEffect",
            spanClass
          )}
        >
          Com
        </span>
      </h3>
    </Link>
  );
};

export default Logo;
