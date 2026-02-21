import { client } from "@/sanity/lib/client"
import { postsQuery } from "@/sanity/lib/queries"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export const revalidate = 60

export default async function BlogIndexPage() {
    const posts = await client.fetch(postsQuery)

    return (
        <main className="flex-1">
            <Section spacing="xl" className="bg-stone-50/50 min-h-[50vh]">
                <Container>
                    <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-20">
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 mb-8 tracking-tight">
                            Reflections
                        </h1>
                        <div className="h-[1px] w-16 bg-stone-300 mb-8"></div>
                        <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-xl">
                            Essays on slowing down, finding quiet, and the creative process.
                        </p>
                    </div>

                    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post: any) => (
                            <Link
                                key={post._id}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col items-start"
                            >
                                <div className="mb-6 aspect-[3/2] w-full overflow-hidden rounded-sm bg-stone-200 shadow-sm transition-all duration-500 group-hover:shadow-md">
                                    {post.mainImage ? (
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={urlFor(post.mainImage).url()}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-300">
                                            <BookOpen size={48} strokeWidth={1} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-stone-500 mb-3">
                                    <time>
                                        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </time>
                                </div>

                                <h2 className="mb-3 font-serif text-2xl font-normal text-stone-900 leading-tight group-hover:text-stone-600 transition-colors">
                                    {post.title}
                                </h2>

                                {post.excerpt && (
                                    <p className="line-clamp-3 text-stone-600 leading-relaxed mb-4">
                                        {post.excerpt}
                                    </p>
                                )}

                                <div className="mt-auto flex items-center text-sm font-medium text-stone-900 group-hover:text-stone-600">
                                    Read Reflection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-stone-500 italic">No posts found yet.</p>
                        </div>
                    )}

                    <div className="mt-24 text-center border-t border-stone-200 pt-16">
                        <h3 className="font-serif text-2xl text-stone-900 mb-4">Subscribe to the Print Club</h3>
                        <p className="text-stone-600 mb-8 max-w-md mx-auto">Get these essays delivered to your door, along with exclusive art prints and reflection prompts.</p>
                        <Button asChild>
                            <Link href="/subscribe">Join the Club</Link>
                        </Button>
                    </div>
                </Container>
            </Section>
        </main>
    )
}
