import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { SubText, Title } from "./ui/Title";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface FinalContactItemProps {
  item: ContactItemData;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "New Orlean, USA",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+12 958 648 597",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "Shopcart@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];
const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b justify-items-center">
      {data.map((item) => (
        <ContactItem item={item} key={item.title} />
      ))}
    </div>
  );
};

export default FooterTop;

const ContactItem = ({ item }: FinalContactItemProps) => {
  return (
    <div className="flex items-center gap-4 group hoverEffect p-2 lg:p-4">
      {item.icon}
      <div>
        <Title
          key={item.title}
          className="text-base! font-semibold!"
        >
          {item.title}
        </Title>
        <SubText className="group-hover:text-black">{item.subtitle}</SubText>
      </div>
    </div>
  );
};
