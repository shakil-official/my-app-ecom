"use client"; // Marking this component as a client component

import {useContext, useState} from "react";
import {useRouter} from "next/navigation"; // Import useRouter
import {SidebarContext} from "./Sidebar";

export default function SidebarItem({
                                        icon,
                                        text,
                                        active = false,
                                        alert = false,
                                        subItems = [], // Add a subItems prop, default to an empty array
                                        path, // Add a path prop for main item
                                    }) {
    const {expanded} = useContext(SidebarContext);
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const router = useRouter(); // Initialize the router


    const handleSubMenuToggle = () => {
        if (path) {
            router.push(path); // Redirect to the main path if provided
        } else {
            setSubMenuOpen((prevState) => !prevState); // Toggle submenu if no path
        }
    };

    const handleSubItemClick = (subItemPath) => {
        if (subItemPath) {
            router.push(subItemPath); // Redirect to the sub-item path
        }
    };

    return (
        <>
            <li
                className={`
                    relative flex items-center py-2 px-3 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    ${
                    active
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                        : "hover:bg-indigo-50 text-gray-600"
                }
                `}
                onClick={handleSubMenuToggle}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${
                        expanded ? "w-52 ml-3" : "w-0"
                    }`}
                >
                    {text}
                </span>

                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                            expanded ? "" : "top-2"
                        }`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
                            absolute left-full rounded-md px-2 py-1 ml-6
                            bg-indigo-100 text-indigo-800 text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        `}
                    >
                        {text}
                    </div>
                )}
            </li>

            {isSubMenuOpen && subItems.length > 0 && (
                <ul className={`mt-1 space-y-1 ${expanded ? "pl-6" : "pl-3"}`}>
                    {subItems.map((subItem, index) => (
                        <li
                            key={index}
                            className="relative group flex items-center py-2 pr-3 bg-gray-50 hover:bg-indigo-100 rounded-md cursor-pointer transition-colors"
                            onClick={() => handleSubItemClick(subItem.path)} // Handle click for sub-item
                        >
                            {subItem.icon}
                            {expanded ? (
                                <span className="ml-3 text-gray-700 group-hover:text-indigo-800">
                                    {subItem.text}
                                </span>
                            ) : (
                                <div
                                    className={`
                                        absolute left-full rounded-md px-2 py-1 ml-6
                                        bg-indigo-100 text-indigo-800 text-sm
                                        invisible opacity-0 -translate-x-3 transition-all
                                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                                    `}
                                >
                                    {subItem.text}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}