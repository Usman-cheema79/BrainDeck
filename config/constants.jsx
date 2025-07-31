
import { Users, UserX, FileText ,BlocksIcon } from "lucide-react";

export const SIDEBAR_TABS = [
  {
    icon: <Users size={20} />,
    text: "Users",
    // subTabs: ["Overview", "Analytics", "Statistics"]
  },
  {
    icon: <UserX size={20} />,
    text: "Blocked Users"
    // No subTabs = no sub-menu
  },
  {
    icon: <FileText size={20} />,
    text: "Results",
    // subTabs: ["Monthly", "Weekly", "Custom"]
  }
];