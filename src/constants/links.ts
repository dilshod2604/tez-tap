import { IconType } from "react-icons";
import { GoHomeFill } from "react-icons/go";
import { IoMdListBox } from "react-icons/io";
import { RiMapPinUserFill } from "react-icons/ri";

interface InavLinks {
  name: string;
  icon: IconType;
  link: string;
}
export const navLinks: InavLinks[] = [
  {
    name: "Главная",
    icon: GoHomeFill,
    link: "/",
  },
  {
    name: "Заявки",
    icon: IoMdListBox,
    link: "/request",
  },
  {
    name: "О нас",
    icon: RiMapPinUserFill,
    link: "/about",
  },
];
