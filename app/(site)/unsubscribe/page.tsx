import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UnsubscribePage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-stone-50/30">
            <Section spacing="lg">
                <Container className="max-w-md">
                    <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-stone-100 text-center">
                        <h1 className="font-serif text-3xl text-stone-900 mb-4">Manage Subscription</h1>

                        <p className="text-stone-600 mb-8 leading-relaxed">
                            To cancel your Print Club subscription or update your billing details, please visit the Customer Portal. <br /><br />If you cancel, you won't be billed again but will still receive any boxes you've already paid for.
                        </p>

                        <div className="space-y-4">
                            <Button asChild className="w-full h-12 text-base group">
                                <a href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL || "https://billing.stripe.com"} className="flex items-center justify-center gap-2">
                                    Go to Customer Portal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </Button>

                            <Button asChild variant="outline" className="w-full h-12">
                                <Link href="/" className="flex items-center justify-center gap-2">
                                    <ArrowLeft className="h-4 w-4" /> Back to Home
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    )
}
