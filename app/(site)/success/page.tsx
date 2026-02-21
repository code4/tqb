import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { SuccessConfetti } from "@/components/ui/confetti"

export const revalidate = 60 // Revalidate every minute

export default async function SuccessPage() {
    // Fetch content from Sanity, or fallback if the document doesn't exist yet
    const query = `*[_type == "successPage"][0]`
    const content = await client.fetch(query) || {
        title: "Welcome to the Bloom",
        message: "Your subscription has been confirmed. We are honored to have you join our quiet corner of the internet.\n\nWe have just dispatched a welcome letter to your inbox containing everything you need to know about your upcoming monthly deliveries.",
        buttonText: "Return to the Garden"
    }

    return (
        <Section className="relative overflow-hidden min-h-[80vh] flex items-center justify-center bg-stone-50 py-24">
            {/* Subtle background grain/gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-100 via-stone-50 to-stone-100 opacity-80" />
            <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-multiply" />

            <SuccessConfetti />
            <Container className="relative z-10 text-center max-w-3xl px-4 flex flex-col items-center">
                <FadeIn className="mx-auto w-full">
                    <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm px-6 py-16 sm:px-16 sm:py-24 text-center shadow-xl shadow-stone-200/50 ring-1 ring-stone-900/5 transition-transform duration-700 hover:scale-[1.01]">

                        {/* Decorative circle */}
                        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-stone-50 ring-1 ring-stone-900/10">
                            <Mail className="h-8 w-8 text-stone-600" strokeWidth={1.5} />
                        </div>

                        <h1 className="mb-6 font-serif text-3xl font-light tracking-tight text-stone-900 sm:text-5xl">
                            {content.title}
                        </h1>

                        <div className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-stone-600 space-y-4">
                            {content.message.split('\n').map((paragraph: string, idx: number) => (
                                paragraph.trim() !== '' ? <p key={idx}>{paragraph}</p> : <br key={idx} />
                            ))}
                        </div>

                        <div className="flex items-center justify-center">
                            <Button asChild variant="primary" className="group rounded-full px-8">
                                <Link href="/" className="inline-flex items-center">
                                    {content.buttonText}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                    </div>
                </FadeIn>
            </Container>
        </Section>
    )
}
