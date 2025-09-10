import { AppNavLink } from "@/_app/models/AppNavLink.model";
import { IconVideo } from "@tabler/icons-react";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdDashboardCustomize, MdSave, MdSettings } from "react-icons/md";

export const dashboardLinks: AppNavLink[] = [
  {
    label: "Dashboard",
    icon: <MdDashboardCustomize />,
    href: "",
  },
  {
    label: "Applications",
    icon: <FaRegNewspaper />,
    href: "applications",
  },
  {
    label: "Saved",
    icon: <MdSave />,
    href: "saved",
  },
  {
    label: "Profile Videos",
    icon: <IconVideo />,
    href: "profile-videos",
  },
  {
    label: "Profile Setting",
    icon: <MdSettings />,
    href: "profile-settings",
  },
];
