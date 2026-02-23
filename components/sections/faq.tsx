import React from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Plus, Minus } from "lucide-react"

interface FAQItem {
    question: string
    answer: string
}

interface FAQProps {
    title?: string
    items: FAQItem[]
}

export function FAQ({ title = "Frequently Asked Questions", items }: FAQProps) {
    return (
        <Section className="py-24 md:py-32 lg:py-40 bg-white" id="faq">
            <Container className="max-w-6xl">
                <h2 className="mb-16 text-center font-serif text-4xl font-light text-stone-900 md:text-5xl lg:text-6xl tracking-tight">
                    {title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
                    {/* Left column */}
                    <div className="space-y-6">
                        {items?.slice(0, Math.ceil(items.length / 2)).map((item, idx) => (
                            <details key={idx} className="group border-b border-stone-200 pb-6 transition-all duration-300">
                                <summary className="flex cursor-pointer list-none items-center justify-between text-lg md:text-xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors">
                                    {item.question}
                                    <span className="ml-4 flex-shrink-0 text-stone-400 group-open:hidden group-hover:text-stone-600 transition-colors">
                                        <Plus size={20} strokeWidth={1} />
                                    </span>
                                    <span className="ml-4 flex-shrink-0 text-stone-400 hidden group-open:block group-hover:text-stone-600 transition-colors">
                                        <Minus size={20} strokeWidth={1} />
                                    </span>
                                </summary>
                                <p className="mt-6 text-stone-500 font-light leading-relaxed text-base">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                    {/* Right column */}
                    <div className="space-y-6">
                        {items?.slice(Math.ceil(items.length / 2)).map((item, idx) => (
                            <details key={idx} className="group border-b border-stone-200 pb-6 transition-all duration-300">
                                <summary className="flex cursor-pointer list-none items-center justify-between text-lg md:text-xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors">
                                    {item.question}
                                    <span className="ml-4 flex-shrink-0 text-stone-400 group-open:hidden group-hover:text-stone-600 transition-colors">
                                        <Plus size={20} strokeWidth={1} />
                                    </span>
                                    <span className="ml-4 flex-shrink-0 text-stone-400 hidden group-open:block group-hover:text-stone-600 transition-colors">
                                        <Minus size={20} strokeWidth={1} />
                                    </span>
                                </summary>
                                <p className="mt-6 text-stone-500 font-light leading-relaxed text-base">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    )
}
