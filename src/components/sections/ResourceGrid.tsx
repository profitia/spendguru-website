import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Post } from '@/sanity/types/sanity.types'
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

interface ResourceGridProps {
  posts?: Post[]
  heading?: string
}

export function ResourceGrid({ posts = [], heading = 'Wiedza i zasoby' }: ResourceGridProps) {
  return (
    <section className="py-[var(--spacing-section)] bg-white">
      <Container>
        <SectionHeader heading={heading} className="mb-10" />
        {posts.length === 0 ? (
          <p className="text-[var(--color-neutral-400)] italic">Brak opublikowanych artykułów.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={ROUTES.knowledgePost(post.slug.current)} className="block group">
                <Card variant="bordered" className="h-full flex flex-col gap-3 group-hover:border-[var(--color-primary)] transition-colors">
                  {post.category && <Badge>{post.category}</Badge>}
                  <h3 className="font-semibold text-[var(--color-neutral-900)] group-hover:text-[var(--color-primary)] transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <p className="text-xs text-[var(--color-neutral-400)]">
                      {formatDate(post.publishedAt)}
                    </p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
