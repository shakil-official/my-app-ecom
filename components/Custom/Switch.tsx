// components/Custom/Switch.tsx

"use client"; // Mark this component as a client component

import React from "react";
import { Switch as SCHCNSwitch } from "@/components/ui/switch"; // Import the original Switch component
import { cn } from "@/lib/utils";

// Define props, ref should be HTMLButtonElement
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SCHCNSwitch> {
    label?: string; // Optional label prop
}

// Correct type for ref: HTMLButtonElement
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <div className={cn("flex items-center")}> {/* Container for switch and label */}
                {label && <span className="mr-2">{label}</span>} {/* Display label if provided */}
                <SCHCNSwitch ref={ref} className={className} {...props} /> {/* Forward ref correctly */}
            </div>
        );
    }
);

Switch.displayName = "Switch"; // Set display name for easier debugging

export { Switch };
