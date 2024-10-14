import {HomeIcon, SettingsIcon, ChevronRightIcon} from "lucide-react";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";

export default function SidebarMenu() {
    return (
        <Sidebar>
            <SidebarItem
                icon={<HomeIcon/>}
                text="Dashboard"
                active={true}
                path='/'
            />
            <SidebarItem
                icon={<SettingsIcon/>}
                text="Pro Settings"
                subItems={[
                    {icon: <ChevronRightIcon/>, text: "Profile Pro Settings"},
                    {icon: <ChevronRightIcon/>, text: "Account Pro Settings"},
                ]}
            />

            <SidebarItem
                icon={<SettingsIcon/>}
                text="Settings"
                subItems={[
                    {icon: <ChevronRightIcon/>, text: "Category", path: '/category'},
                    {icon: <ChevronRightIcon/>, text: "Sun Category", path: 'sub/category'},
                ]}
            />
        </Sidebar>
    );
}
