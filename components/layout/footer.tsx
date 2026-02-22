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
    const footer = settings?.footer || {}

    // Fallbacks (Empty by Default so they can be hidden)
    const brandDescription = footer.brandDescription || ""
    const exploreLinks = footer.exploreLinks || []
    const supportLinks = footer.supportLinks || []
    const newsletterHeading = footer.newsletterHeading || ""
    const newsletterDescription = footer.newsletterDescription || ""
    const contactEmail = footer.contactEmail || ""
    const contactText = footer.contactText || ""

    return (
        <footer className="border-t border-stone-200 bg-stone-50 py-16 md:py-24">
            <Container>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <span className="font-serif text-2xl font-medium tracking-tight text-stone-900 mb-4">
                            {title}
                        </span>
                        {brandDescription && (
                            <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
                                {brandDescription}
                            </p>
                        )}
                    </div>

                    {/* Navigation Section */}
                    {((exploreLinks.length > 0) || (supportLinks.length > 0)) && (
                        <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:gap-8">
                            {exploreLinks.length > 0 && (
                                <div className="flex flex-col items-center lg:items-start gap-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Explore</h4>
                                    <nav className="flex flex-col items-center lg:items-start gap-3">
                                        {exploreLinks.map((link: any, idx: number) => (
                                            <Link key={idx} href={link.url} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
                                                {link.label}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {supportLinks.length > 0 && (
                                <div className="flex flex-col items-center lg:items-start gap-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Support</h4>
                                    <nav className="flex flex-col items-center lg:items-start gap-3">
                                        {supportLinks.map((link: any, idx: number) => {
                                            if (link.url.startsWith('http')) {
                                                return (
                                                    <a key={idx} href={link.url} className="text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors">
                                                        {link.label}
                                                    </a>
                                                )
                                            }
                                            return (
                                                <Link key={idx} href={link.url} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
                                                    {link.label}
                                                </Link>
                                            )
                                        })}
                                    </nav>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Newsletter and Contact Section */}
                    {(newsletterHeading || newsletterDescription || contactEmail) && (
                        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                            {(newsletterHeading || newsletterDescription) && (
                                <div className="mb-10 w-full">
                                    {newsletterHeading && <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900 mb-4">{newsletterHeading}</h4>}
                                    {newsletterDescription && (
                                        <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                                            {newsletterDescription}
                                        </p>
                                    )}
                                    <NewsletterForm />
                                </div>
                            )}

                            {contactEmail && (
                                <div className="w-full flex flex-col items-center lg:items-start">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900 mb-4">Contact</h4>
                                    {contactText && (
                                        <p className="text-stone-500 text-sm mb-2 max-w-xs leading-relaxed">
                                            {contactText}
                                        </p>
                                    )}
                                    <a
                                        href={`mailto:${contactEmail}`}
                                        className="text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors underline decoration-stone-300 underline-offset-4"
                                    >
                                        {contactEmail}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
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
