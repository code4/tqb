import { PortableText as PortableTextReact, PortableTextComponents } from "@portabletext/react"

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="mb-4 text-4xl font-serif font-light">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-4 mt-8 text-3xl font-serif font-light">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-3 mt-6 text-2xl font-serif font-light">{children}</h3>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed text-stone-700">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-2 border-stone-300 pl-6 italic text-stone-600">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="mb-4 ml-6 list-disc text-stone-700">{children}</ul>,
        number: ({ children }) => <ol className="mb-4 ml-6 list-decimal text-stone-700">{children}</ol>,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
            return (
                <a href={value.href} rel={rel} className="underline decoration-stone-400 underline-offset-4 hover:text-stone-900">
                    {children}
                </a>
            )
        },
    },
}

export function PortableText({ value }: { value: any }) {
    return <PortableTextReact value={value} components={components} />
}
