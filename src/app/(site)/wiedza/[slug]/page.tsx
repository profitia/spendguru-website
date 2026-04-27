import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, allPostSlugsQuery } from '@/sanity/lib/queries'
import type { Post } from '@/sanity/types/sanity.types'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'
import { CtaSection } from '@/components/sections/CtaSection'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Zwraca pusty array gdy Sanity nie jest skonfigurowany
  try {
    const posts = await client.fetch<Array<{ slug: { current: string } }>>(allPostSlugsQuery)
    return posts.map((p) => ({ slug: p.slug.current }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await client.fetch<Post>(postBySlugQuery, { slug })
    return buildMetadata(post?.seo, `/wiedza/${slug}`)
  } catch {
    return {}
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params

  let post: Post | null = null
  try {
    post = await client.fetch<Post>(postBySlugQuery, { slug })
  } catch {
    // Sanity nie skonfigurowany — pokaż placeholder
  }

  if (!post) {
    // W produkcji: notFound()
    // Na etapie dev z placeholder: pokaż informację
    return (
      <Container className="py-20">
        <p className="text-[var(--color-neutral-400)] italic">
          Artykuł &ldquo;{slug}&rdquo; nie został jeszcze opublikowany lub Sanity nie jest skonfigurowany.
        </p>
      </Container>
    )
  }

  return (
    <>
      <article>
        <header className="py-16 bg-[var(--color-neutral-50)] border-b border-[var(--color-neutral-200)]">
          <Container className="max-w-3xl">
            {post.category && <Badge className="mb-4">{post.category}</Badge>}
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-neutral-900)]">
              {post.title}
            </h1>
            {post.publishedAt && (
              <p className="mt-4 text-sm text-[var(--color-neutral-400)]">
                {formatDate(post.publishedAt)}
                {post.author && ` · ${post.author}`}
              </p>
            )}
          </Container>
        </header>
        <Container as="section" className="py-12 max-w-3xl">
          {/* TODO: Render PortableText body */}
          <p className="text-[var(--color-neutral-400)] italic">Treść artykułu z Sanity CMS (PortableText).</p>
        </Container>
      </article>
      <CtaSection />
    </>
  )
}
