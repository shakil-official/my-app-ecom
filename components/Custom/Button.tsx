import React from "react";
import { Button as SCDCNButton, ButtonProps as SCDCNButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps extends SCDCNButtonProps {
    loading?: boolean; // Optional loading state
    errorMessage?: string; // Optional error message to display
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ loading, errorMessage, className, children, ...props }, ref) => {
        return (
            <div className={cn("flex flex-col", className)}>
                <SCDCNButton ref={ref} {...props} disabled={loading || props.disabled}>
                    {loading ? 'Loading...' : children} {/* Show loading text if in loading state */}
                </SCDCNButton>
                {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>} {/* Display error message if present */}
            </div>
        );
    }
);

Button.displayName = "Button";

export { Button };