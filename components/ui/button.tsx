import React from "react"
import { cn } from "@/lib/utils"
// import { Slot } from "@radix-ui/react-slot" // If using slot, but maybe not needed for basic button

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
        // const Comp = asChild ? Slot : "button"
        const Comp = "button"
        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-stone-900 text-stone-50 hover:bg-stone-900/90 shadow-sm": variant === "primary",
                        "bg-stone-100 text-stone-900 hover:bg-stone-100/80": variant === "secondary",
                        "border border-stone-200 bg-transparent shadow-sm hover:bg-stone-100/50 hover:text-stone-900": variant === "outline",
                        "hover:bg-stone-100 hover:text-stone-900": variant === "ghost",
                        "h-9 px-4 py-2": size === "sm",
                        "h-10 px-8": size === "md", // Default size matching standard
                        "h-12 px-8 text-base": size === "lg",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
