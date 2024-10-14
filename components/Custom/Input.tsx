import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string; // Add error prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input ref={ref} className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-primary focus:ring-primary`} {...props} />
            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message */}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
