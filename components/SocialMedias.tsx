import React from "react";
import { Facebook, Github, Linkedin, Slack, Youtube } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socialLink = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Slack className="w-5 h-5" />,
  },
];

interface SocialMediasProps {
  iconClassName?: string;
  className?: string;
}

const SocialMedias = ({ iconClassName, className }: SocialMediasProps) => {
  return (
    <div>
      <TooltipProvider>
        <div className={cn("flex gap-3.5", className)}>
          {socialLink?.map((item) => {
            return (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    key={item?.title}
                    className={cn(
                      "border rounded-full border-white p-2 text-gray-400 hover:border-shop_light_green hover:text-white hoverEffect cursor-pointer",
                      iconClassName
                    )}
                    href={item.href}
                  >
                    {item.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default SocialMedias;
