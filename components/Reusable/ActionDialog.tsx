import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle
} from "@ui/dialog";
import {ActionDialogPropsInterface} from "@/interface/category/ActionDialogPropsInterface";

const ActionDialog: React.FC<ActionDialogPropsInterface> = ({title, description, open, onClose, children}) => {

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}
                    <DialogFooter> </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ActionDialog;


