// src/components/Sidebar/SidePanel.jsx
"use client"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";  
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";  
import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLast } from "lucide-react";
// import { SIDEBAR_TABS } from "@/config/constants";  
import {SIDEBAR_TABS} from "@/config/constants.jsx";
import { SidebarItem } from "./SidebarItem";

export default function SidePanel({ panelName, setPanelName }) {
  const [expanded, setExpanded] = useState(true);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleItemClick = (mainTab, subTab) => {
    if (subTab) {
      // Sub-tab clicked
      setPanelName(subTab);
      setActiveSubTab(subTab);
    } else {
      // Main tab clicked
      setPanelName(mainTab);
      const tabIndex = SIDEBAR_TABS.findIndex((item) => item.text === mainTab);
      setActiveTabIndex(tabIndex);
      setActiveSubTab(null);
    }
  };

  // Update active states when panelName changes
  useEffect(() => {
    // Check if panelName is a main tab
    const mainTabIndex = SIDEBAR_TABS.findIndex(
      (tab) => tab.text === panelName
    );

    if (mainTabIndex !== -1) {
      // It's a main tab
      setActiveTabIndex(mainTabIndex);
      setActiveSubTab(null);
    } else {
      // Check if it's a sub-tab
      SIDEBAR_TABS.forEach((tab, index) => {
        if (tab.subTabs?.includes(panelName)) {
          setActiveTabIndex(index);
          setActiveSubTab(panelName);
        }
      });
    }
  }, [panelName]);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm relative">
        {/* Header */}
           
        <div className="flex gap-x-4 justify-center items-center self-start p-4 pb-0">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="cropsight" />
            <AvatarFallback>BD</AvatarFallback>
          </Avatar>
          <Label
            className={`font-bold text-gray-600 text-base ${!expanded ? "hidden" : ""
              }`}
          >
            BrainDeck
          </Label>
          <Button
            onClick={() => setExpanded((curr) => !curr)}
            className="absolute p-1.5 rounded-full bg-blue-50 hover:bg-blue-100 z-10
                         text-[#4318FF] -right-5 border-2 px-2"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        </div>

        <hr className="my-3" />

        {/* Navigation Items */}
        <ul className="flex-1 px-3">
          {SIDEBAR_TABS.map((data, index) => (
            <SidebarItem
              key={index}
              icon={data.icon}
              text={data.text}
              isActive={index === activeTabIndex}
              onClick={handleItemClick}
              expanded={expanded}
              subTabs={data.subTabs}
              activeSubTab={activeSubTab}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}