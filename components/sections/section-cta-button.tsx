import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SectionCTAButtonProps {
    ctaText?: string
    ctaLink?: string
    className?: string
}

export function SectionCTAButton({ ctaText, ctaLink, className }: SectionCTAButtonProps) {
    if (!ctaText || !ctaLink) return null

    return (
        <div className={`mt-16 flex justify-center ${className}`}>
            <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-14 text-base font-light tracking-wide border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
                <Link href={ctaLink}>{ctaText}</Link>
            </Button>
        </div>
    )
}
