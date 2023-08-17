import * as Icon from "@/components/ui/icons";
import { v4 as uuidv4 } from "uuid";

const Menuitems = [
  {
    id: uuidv4(),
    navLabel: true,
    title: "Main Menu",
  },
  {
    id: uuidv4(),
    navItem: true,
    title: "Dashboard",
    icon: <Icon.HomeIcon />,
    href: "/store/dashboard",
  },
  {
    id: uuidv4(),
    navItem: true,
    title: "Orders",
    icon: <Icon.OrderIcon />,
    href: "/store/orders",
  },
  {
    id: uuidv4(),
    navItem: true,
    title: "Products",
    icon: <Icon.ProductIcon />,
    href: "/store/products",
  },
  {
    id: uuidv4(),
    navItem: true,
    title: "Users",
    icon: <Icon.UserIcon />,
    href: "/store/users",
  },
];

export default Menuitems;
