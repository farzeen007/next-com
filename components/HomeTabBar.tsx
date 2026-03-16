import { HomeProductsTabData } from "@/constants/data";
import Link from "next/link";

interface HomeTabBarProps {
  activeTab: string;
  onTabSelect: (item: string) => void;
}

const HomeTabBar = ({ activeTab, onTabSelect }: HomeTabBarProps) => {
  return (
    <div className="overflow-x-scroll md:overflow-x-hidden flex items-center justify-between">
      <div className="flex gap-3 items-center">
        {HomeProductsTabData?.map((item) => (
          <div
            key={item.title}
            onClick={() => onTabSelect(item?.value)}
            className={`text-sm font-semibold ${activeTab === item.value ? "text-white" : "text-black"} ${activeTab === item.value ? "bg-shop_light_green" : "bg-shop_light_green/10"} border border-shop_dark_green/20 px-6 py-2 lg:py-2 rounded-4xl text-black/90 cursor-pointer hover:bg-shop_light_green v hover:text-white hover:border-shop_light_green hoverEffect`}
          >
            {item.title}
          </div>
        ))}
        <Link
          href="/shop"
          className="lg:hidden text-sm font-medium border border-black px-6 py-2 rounded-4xl text-black/90 hover:bg-shop_light_green hover:text-white hover:border-shop_light_green hoverEffect w-max"
        >
          See all
        </Link>
      </div>
      <div>
        <Link
          href="/shop"
          className="hidden lg:block text-sm font-medium border border-black px-6 py-2 rounded-4xl text-black/90 hover:bg-shop_light_green hover:text-white hover:border-shop_light_green hoverEffect"
        >
          See all
        </Link>
      </div>
    </div>
  );
};

export default HomeTabBar;
