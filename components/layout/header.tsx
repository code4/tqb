import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./mobile-menu"

export async function Header() {
    let settings = null
    try {
        settings = await client.fetch(siteSettingsQuery)
    } catch (error) {
        console.error("Error fetching site settings:", error)
    }

    const title = settings?.title || "The Quiet Bloom"
    const logo = settings?.logo

    return (
        <header className="sticky top-0 z-[100] w-full border-b border-stone-100/30 bg-white/60 backdrop-blur-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all duration-300">
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    {logo ? (
                        <div className="relative h-8 w-8 overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105">
                            <Image
                                src={urlFor(logo).url()}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="32px"
                            />
                        </div>
                    ) : (
                        <div className="h-8 w-8 bg-stone-900 rounded-full transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <span className="font-serif text-xl font-medium tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-stone-600">
                        {title}
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/blog" className="relative text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 group">
                        Blog
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/about" className="relative text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 group">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <a href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL || "https://billing.stripe.com"} className="relative text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 group">
                        Sign In
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <Button asChild variant="primary" size="sm" className="transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-900/20 active:translate-y-0">
                        <Link href="/subscribe">Subscribe</Link>
                    </Button>
                </nav>
                <MobileMenu title={title} logo={logo} />
            </Container>
        </header>
    )
}
