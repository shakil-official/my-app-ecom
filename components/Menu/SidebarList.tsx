import React from "react";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import { LayoutDashboard, Settings } from "lucide-react";

const SidebarList = () => {
    const subItems = [
        { text: "Profile", icon: <LayoutDashboard size={16} /> },
        { text: "Security", icon: <LayoutDashboard size={16} /> },
    ];

    return (
        <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert={true} />
            <SidebarItem icon={<Settings size={20} />} text="Settings" subItems={subItems} />
        </Sidebar>
    );
};

export default SidebarList;
