"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/lib/image"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"

interface MobileMenuProps {
    title: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logo?: any
}

export function MobileMenu({ title, logo }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button
                    className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </DialogTrigger>

            <DialogContent
                className="fixed inset-0 z-[9999] grid w-full max-w-none h-full gap-0 border-none bg-[#fdfcfb] p-0 shadow-none duration-300 data-[state=open]:slide-in-from-top-10 sm:rounded-none [&>button]:hidden text-stone-900 left-0 top-0 translate-x-0 translate-y-0"
            >
                <DialogTitle className="sr-only">Mobile Menu</DialogTitle>

                <div className="flex flex-col h-full w-full">
                    <div className="flex h-16 items-center justify-between px-4 border-b border-stone-100 flex-shrink-0">
                        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                            {logo ? (
                                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                    <Image
                                        src={urlFor(logo).url()}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        sizes="32px"
                                    />
                                </div>
                            ) : (
                                <div className="h-8 w-8 bg-stone-900 rounded-full" />
                            )}
                            <span className="font-serif text-xl font-medium tracking-tight">
                                {title}
                            </span>
                        </Link>
                        <DialogClose asChild>
                            <button
                                className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </DialogClose>
                    </div>

                    <nav className="flex flex-col items-start gap-8 p-8 sm:p-12 text-2xl font-serif font-light overflow-y-auto flex-1 bg-[#fdfcfb]">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-stone-500 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-stone-500 transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-stone-500 transition-colors"
                        >
                            About
                        </Link>
                        <a
                            href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL || "https://billing.stripe.com"}
                            className="hover:text-stone-500 transition-colors"
                        >
                            Member Sign In
                        </a>
                        <div className="pt-8 w-full mt-auto mb-8">
                            <Button asChild variant="primary" size="lg" className="w-full">
                                <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                                    Subscribe Now
                                </Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            </DialogContent>
        </Dialog>
    )
}
