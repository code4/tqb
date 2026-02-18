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
        <Section spacing="lg" id="faq">
            <Container className="max-w-3xl">
                <h2 className="mb-12 text-center font-serif text-3xl font-light text-stone-900 md:text-4xl">
                    {title}
                </h2>
                <div className="space-y-4">
                    {items?.map((item, idx) => (
                        <details key={idx} className="group border-b border-stone-200 pb-4">
                            <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-stone-900">
                                {item.question}
                                <span className="ml-4 flex-shrink-0 text-stone-400 group-open:hidden">
                                    <Plus size={20} />
                                </span>
                                <span className="ml-4 flex-shrink-0 text-stone-400 hidden group-open:block">
                                    <Minus size={20} />
                                </span>
                            </summary>
                            <p className="mt-4 text-stone-600 leading-relaxed max-w-2xl px-1">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
