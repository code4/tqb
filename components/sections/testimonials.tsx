import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"

interface Testimonial {
    quote: string
    author: string
    role?: string
}

interface TestimonialsProps {
    heading?: string
    items: Testimonial[]
}

export function Testimonials({ heading = "Kind Words", items }: TestimonialsProps) {
    return (
        <Section spacing="lg" className="bg-stone-900 text-stone-50">
            <Container>
                <FadeIn className="text-center mb-16">
                    <span className="text-stone-400 uppercase tracking-widest text-xs font-medium">Community Love</span>
                    <h2 className="mt-3 font-serif text-3xl font-light text-stone-50 md:text-4xl">
                        {heading}
                    </h2>
                </FadeIn>

                <FadeInStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {items?.map((item, idx) => (
                        <FadeIn key={idx} className="flex flex-col p-8 rounded-sm bg-stone-800/30 border border-stone-800 backdrop-blur-sm relative group hover:bg-stone-800/50 transition-colors duration-300">
                            <div className="flex gap-1 mb-4 text-amber-200/80">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <blockquote className="mb-6 flex-1 text-lg leading-relaxed text-stone-300 font-light italic">
                                "{item.quote}"
                            </blockquote>
                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <div className="font-medium text-stone-50">{item.author}</div>
                                    {item.role && <div className="text-sm text-stone-500">{item.role}</div>}
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-[10px] font-medium text-stone-400 uppercase tracking-wide">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Verified
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </FadeInStagger>
            </Container>
        </Section>
    )
}
