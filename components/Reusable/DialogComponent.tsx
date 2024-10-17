import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from '@ui/dialog'; // Importing dialog components
import {Button} from '@ui/button'; // Importing the button component
import React, {ReactNode} from 'react'; // Importing ReactNode for children type

// Define an interface for the props
interface DialogComponentProps {
    buttonLabel: string;
    dialogTitle: string;
    icon: ReactNode; // Type for the icon prop
    size?: 'default' | 'icon' | 'sm' | 'lg'; // Allowed sizes
    buttonClass?: string; // Optional button class
    dialogClass?: string; // Optional dialog class
    children?: ReactNode; // Children prop for additional content
    open: boolean; // Open state controlled by the parent
    onToggle: (open: boolean) => void; // Callback to toggle dialog open state
    closeBtn?: boolean;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
                                                             buttonLabel,
                                                             dialogTitle,
                                                             icon,
                                                             size = "lg",
                                                             buttonClass = "h-7 gap-1",
                                                             dialogClass = "sm:max-w-[425px]", //md:max-w-screen-lg
                                                             children,
                                                             open,
                                                             onToggle,
                                                             closeBtn = false,
                                                         }) => {
    return (
        <Dialog open={open} onOpenChange={onToggle}>
            <DialogTrigger asChild>
                <Button size={size} className={buttonClass} onClick={() => onToggle(true)}>
                    {icon} {/* Render the passed icon here */}
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {buttonLabel}
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className={dialogClass}>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        {children} {/* Render children here */}
                    </div>
                </div>

                <DialogFooter className="sm:justify-end">
                    {closeBtn && <DialogClose asChild onClick={() => onToggle(false)}>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogComponent;
