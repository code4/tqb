import Link from "next/link"
import { NewsletterForm } from "@/components/sections/newsletter-form"
import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"
import { Container } from "@/components/ui/container"
// import { Icon } from "@/components/ui/icon" // If storing icon names. Or just text links.

export async function Footer() {
    let settings = null
    try {
        settings = await client.fetch(siteSettingsQuery)
    } catch (error) {
        console.error("Error fetching site settings:", error)
    }

    const title = settings?.title || "The Quiet Bloom"

    return (
        <footer className="border-t border-stone-200 bg-stone-50 py-16 md:py-24">
            <Container>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <span className="font-serif text-2xl font-medium tracking-tight text-stone-900 mb-4">
                            {title}
                        </span>
                        <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
                            A digital sanctuary for those seeking a more intentional and thoughtful way of living.
                        </p>
                    </div>

                    {/* Navigation Section */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:gap-8">
                        <div className="flex flex-col items-center lg:items-start gap-4">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Explore</h4>
                            <nav className="flex flex-col items-center lg:items-start gap-3">
                                <Link href="/blog" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Blog</Link>
                                <Link href="/about" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Manifesto</Link>
                                <Link href="/subscribe" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Membership</Link>
                            </nav>
                        </div>
                        <div className="flex flex-col items-center lg:items-start gap-4">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Support</h4>
                            <nav className="flex flex-col items-center lg:items-start gap-3">
                                <a href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL || "https://billing.stripe.com"} className="text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors">Member Sign In</a>
                                <Link href="/legal/privacy" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Privacy</Link>
                                <Link href="/legal/terms" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Terms</Link>
                            </nav>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900 mb-4">Join the list</h4>
                        <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                            Receive quiet reflections and updates on our collections directly to your inbox.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col items-center justify-between gap-6 md:flex-row">
                    <p className="text-xs text-stone-400">
                        © {new Date().getFullYear()} {title}. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {settings?.socialLinks?.map((social: any) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest"
                            >
                                {social.platform}
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    )
}
