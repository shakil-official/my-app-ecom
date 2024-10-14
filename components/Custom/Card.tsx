import * as React from "react";
import {
    Card as SCDCNCard,
    CardHeader as SCDCNCardHeader,
    CardFooter as SCDCNCardFooter,
    CardTitle as SCDCNCardTitle,
    CardDescription as SCDCNCardDescription,
    CardContent as SCDCNCardContent,
} from "@/components/ui/card";
import {cn} from "@/lib/utils";

// Custom Card wrapper
const CustomCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <SCDCNCard ref={ref} className={cn("custom-card-styles", className)} {...props} />
));
CustomCard.displayName = "CustomCard";

// Custom CardHeader wrapper
const CustomCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <SCDCNCardHeader ref={ref} className={cn("custom-card-header-styles", className)} {...props} />
));
CustomCardHeader.displayName = "CustomCardHeader";

// Custom CardTitle wrapper
const CustomCardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({className, ...props}, ref) => (
    <SCDCNCardTitle ref={ref} className={cn("custom-card-title-styles", className)} {...props} />
));
CustomCardTitle.displayName = "CustomCardTitle";

// Custom CardDescription wrapper
const CustomCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
    <SCDCNCardDescription
        ref={ref}
        className={cn("custom-card-description-styles", className)}
        {...props}
    />
));
CustomCardDescription.displayName = "CustomCardDescription";

// Custom CardContent wrapper
const CustomCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <SCDCNCardContent ref={ref} className={cn("custom-card-content-styles", className)} {...props} />
));
CustomCardContent.displayName = "CustomCardContent";

// Custom CardFooter wrapper
const CustomCardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <SCDCNCardFooter ref={ref} className={cn("custom-card-footer-styles", className)} {...props} />
));
CustomCardFooter.displayName = "CustomCardFooter";

// Exporting all the custom components
export {
    CustomCard as Card,
    CustomCardHeader as CardHeader,
    CustomCardFooter as CardFooter,
    CustomCardTitle as CardTitle,
    CustomCardDescription as CardDescription,
    CustomCardContent as CardContent,
};
