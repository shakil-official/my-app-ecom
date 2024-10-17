import React, {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@ui/dropdown-menu";
import {Button} from "@ui/button";
import {MoreHorizontal} from "lucide-react";
import ActionDialog from "@/components/Reusable/ActionDialog";


interface ActionListProps {
    component?: React.ReactNode;
}

const ActionList: React.FC<ActionListProps> = ({component: Component}) => {

    const [toggle, setToggle] = useState(false)
    const toggleDialog = () => setToggle(() => !toggle)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={toggleDialog}>
                        Edit
                    </DropdownMenuItem>
                 </DropdownMenuContent>
            </DropdownMenu>

            {
                Component &&
                <ActionDialog title="Category update"
                              open={toggle}
                              onClose={toggleDialog}>
                    {Component}
                </ActionDialog>

            }


        </>
    )
}


export default ActionList;


