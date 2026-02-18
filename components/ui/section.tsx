import React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType
    spacing?: "none" | "sm" | "md" | "lg" | "xl"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, as: Component = "section", spacing = "lg", children, ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={cn(
                    "w-full",
                    {
                        "py-0": spacing === "none",
                        "py-8 md:py-12": spacing === "sm",
                        "py-12 md:py-16": spacing === "md",
                        "py-16 md:py-24": spacing === "lg",
                        "py-24 md:py-32": spacing === "xl",
                    },
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        )
    }
)
Section.displayName = "Section"

export { Section }
