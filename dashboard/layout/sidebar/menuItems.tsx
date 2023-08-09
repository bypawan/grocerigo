import { v4 as uuidv4 } from "uuid";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uuidv4(),
    title: "Dashboard",
    // icon: IconLayoutDashboard,
    href: "/",
    // visibility: "superuser,driver,fleetmanager",
  },
  {
    id: uuidv4(),
    title: "Inbox",
    // icon: LocationOnIcon,
    href: "/",
    // visibility: "superuser,driver,fleetmanager",
  },
  {
    id: uuidv4(),
    title: "Messages",
    // icon: AddIcCallIcon,
    href: "/",
    // visibility: "agent",
  },
  {
    id: uuidv4(),
    title: "Notifications",
    // icon: GpsFixedIcon,
    href: "/",
    // visibility: "owner",
  },
  {
    navlabel: true,
    subheader: "Tasks",
  },
  {
    id: uuidv4(),
    title: "Available Tasks",
    // icon: LocalShippingIcon,
    href: "/",
    // visibility: "owner",
  },
  {
    id: uuidv4(),
    title: "Clients",
    // icon: LocalShippingIcon,
    href: "/",
    // visibility: "owner",
  },
  {
    navlabel: true,
    subheader: "Settings",
  },
  {
    id: uuidv4(),
    title: "Profile",
    // icon: BusinessIcon,
    href: "/",
    // visibility: "superuser",
  },
  {
    id: uuidv4(),
    title: "Settings",
    // icon: BusinessIcon,
    href: "/",
    // visibility: "superuser",
  },  {
    id: uuidv4(),
    title: "Logout",
    // icon: BusinessIcon,
    href: "/",
    // visibility: "superuser",
  },
];

export default Menuitems;
