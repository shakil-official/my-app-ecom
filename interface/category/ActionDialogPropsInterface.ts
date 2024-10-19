import React from "react";

export interface ActionDialogPropsInterface {
    title?: string;
    description?: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
