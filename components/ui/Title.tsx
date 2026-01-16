import { cn } from "@/lib/utils";
import React from "react";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-xl lg:text-2xl capitalize hoverEffect", className)}>
      {children}
    </h2>
  );
};

const SubTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-sm lg:text-base font-semibold hoverEffect", className)}>
      {children}
    </h2>
  );
};

const SubText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-gray-500 font-sans hoverEffect text-sm lg:text-base",
        className
      )}
    >
      {children}
    </p>
  );
};

export { Title, SubTitle, SubText };
