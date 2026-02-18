import * as LucideIcons from "lucide-react"
import { LucideProps } from "lucide-react"

interface IconProps extends Omit<LucideProps, "ref"> {
    name: string
}

export function Icon({ name, size = 24, strokeWidth = 1.5, className, ...props }: IconProps) {
    // Convert name to PascalCase if it's not (e.g., 'coffee' -> 'Coffee') - though our seed data uses PascalCase
    const iconName = name as keyof typeof LucideIcons
    const LucideIcon = LucideIcons[iconName] as React.ElementType | undefined

    const Fallback = LucideIcons.CircleHelp as React.ElementType || LucideIcons.HelpCircle as React.ElementType

    if (!LucideIcon) {
        return <Fallback size={size} strokeWidth={strokeWidth} className={className} {...props} />
    }

    return <LucideIcon size={size} strokeWidth={strokeWidth} className={className} {...props} />
}
