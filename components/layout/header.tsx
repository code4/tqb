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
        <header className="sticky top-0 z-[100] w-full border-b border-stone-100/50 bg-white/80 backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
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
                    <span className="font-serif text-xl font-medium tracking-tight text-stone-900">
                        {title}
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/blog" className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900">
                        Blog
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900">
                        About
                    </Link>
                    <Button asChild variant="primary" size="sm">
                        <Link href="/subscribe">Subscribe</Link>
                    </Button>
                </nav>
                <MobileMenu title={title} logo={logo} />
            </Container>
        </header>
    )
}
