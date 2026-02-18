import { client } from "@/sanity/lib/client"
import { postQuery } from "@/sanity/lib/queries"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const revalidate = 60

interface Props {
    params: Promise<{
        slug: string
    }>
}

export default async function BlogPostPage(props: Props) {
    const params = await props.params
    const post = await client.fetch(postQuery, { slug: params.slug })

    if (!post) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <h1 className="text-2xl font-serif text-stone-400">Post not found</h1>
            </div>
        )
    }

    return (
        <article className="min-h-screen bg-stone-50/30">
            <Section spacing="lg">
                <Container className="max-w-3xl">
                    <Link href="/blog" className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reflections
                    </Link>

                    <header className="mb-12 text-center">
                        <div className="mb-6 text-sm font-medium uppercase tracking-wider text-stone-500">
                            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-tight mb-8">
                            {post.title}
                        </h1>
                    </header>

                    {post.mainImage && (
                        <div className="mb-12 relative aspect-[16/9] w-full overflow-hidden rounded-sm shadow-sm">
                            <Image
                                src={urlFor(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 800px"
                            />
                        </div>
                    )}

                    <div className="prose prose-stone prose-lg mx-auto prose-headings:font-serif prose-headings:font-light prose-a:text-stone-900 prose-img:rounded-sm">
                        <PortableText value={post.body} />
                    </div>

                    {/* Navigation */}
                    {(post.prev || post.next) && (
                        <nav className="mt-20 pt-12 border-t border-stone-200 flex flex-col sm:flex-row justify-between gap-12">
                            {post.prev ? (
                                <Link
                                    href={`/blog/${post.prev.slug}`}
                                    className="group flex flex-col items-start flex-1 max-w-[300px]"
                                >
                                    <span className="text-xs uppercase tracking-widest text-stone-400 mb-2 flex items-center">
                                        <ArrowLeft className="mr-2 h-3 w-3" /> Previous
                                    </span>
                                    <span className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                                        {post.prev.title}
                                    </span>
                                </Link>
                            ) : <div className="flex-1" />}

                            {post.next ? (
                                <Link
                                    href={`/blog/${post.next.slug}`}
                                    className="group flex flex-col items-end text-right flex-1 max-w-[300px]"
                                >
                                    <span className="text-xs uppercase tracking-widest text-stone-400 mb-2 flex items-center">
                                        Next <ArrowRight className="ml-2 h-3 w-3" />
                                    </span>
                                    <span className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                                        {post.next.title}
                                    </span>
                                </Link>
                            ) : <div className="flex-1" />}
                        </nav>
                    )}
                </Container>
            </Section>
        </article>
    )
}
