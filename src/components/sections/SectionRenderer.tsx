/**
 * SectionRenderer — mapuje bloki Sanity na komponenty React.
 *
 * Każdy komponent sekcji zachowuje własny fallback do placeholder-content.ts,
 * więc jeśli dane z bloku są niekompletne, komponent wyrenderuje placeholder.
 *
 * Nieznane typy bloków są pomijane (null) — strona nie wywali się.
 */

import { HeroSection } from '@/components/sections/HeroSection'
import { ProofBar } from '@/components/sections/ProofBar'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { FiveQuestionsSection } from '@/components/sections/FiveQuestionsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { BusinessOutcomesSection } from '@/components/sections/BusinessOutcomesSection'
import { PersonaSection } from '@/components/sections/PersonaSection'
import { UseCaseSection } from '@/components/sections/UseCaseSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'

import type {
  HomeSectionBlock,
  HeroBlockData,
  ProofBarBlockData,
  ProblemBlockData,
  FiveQuestionsBlockData,
  ProcessBlockData,
  BusinessOutcomesBlockData,
  PersonaBlockData,
  UseCaseStoryBlockData,
  FaqBlockData,
  CtaBlockData,
} from '@/sanity/lib/home'

// ─── TYPE GUARDS ─────────────────────────────────────────────────────────────

function is<T extends { _type: string; _key: string }>(block: HomeSectionBlock, type: T['_type']): block is T {
  return block._type === type
}

// ─── RENDERER ────────────────────────────────────────────────────────────────

interface SectionRendererProps {
  block: HomeSectionBlock
}

export function SectionRenderer({ block }: SectionRendererProps) {
  if (is<HeroBlockData>(block, 'heroBlock')) {
    return (
      <HeroSection
        data={{
          _type: 'heroBlock',
          heading: block.heading ?? undefined,
          subheading: block.subheading ?? undefined,
          ctaPrimary: block.ctaPrimary ?? undefined,
          ctaPrimaryUrl: block.ctaPrimaryUrl ?? undefined,
          ctaSecondary: block.ctaSecondary ?? undefined,
          ctaSecondaryUrl: block.ctaSecondaryUrl ?? undefined,
        }}
      />
    )
  }

  if (is<ProofBarBlockData>(block, 'proofBarBlock')) {
    const items = block.items?.map((i) => ({ value: i.value, label: i.label }))
    return <ProofBar items={items ?? undefined} />
  }

  if (is<ProblemBlockData>(block, 'problemBlock')) {
    return (
      <ProblemSection
        heading={block.heading ?? undefined}
        subheading={block.subheading ?? undefined}
        cards={block.cards?.map((c) => ({ title: c.title, description: c.description })) ?? undefined}
      />
    )
  }

  if (is<FiveQuestionsBlockData>(block, 'fiveQuestionsBlock')) {
    return (
      <FiveQuestionsSection
        heading={block.heading ?? undefined}
        subheading={block.subheading ?? undefined}
        questions={block.questions?.map((q) => ({
          number: q.number,
          question: q.question,
          context: q.context,
        })) ?? undefined}
      />
    )
  }

  if (is<ProcessBlockData>(block, 'processBlock')) {
    return (
      <ProcessSection
        data={{
          _type: 'processBlock',
          heading: block.heading ?? undefined,
          steps: block.steps?.map((s) => ({
            number: s.number,
            title: s.title,
            description: s.description,
          })) ?? undefined,
        }}
      />
    )
  }

  if (is<BusinessOutcomesBlockData>(block, 'businessOutcomesBlock')) {
    return (
      <BusinessOutcomesSection
        heading={block.heading ?? undefined}
        outcomes={block.outcomes?.map((o) => ({
          title: o.title,
          description: o.description,
          metric: o.metric ?? null,
        })) ?? undefined}
      />
    )
  }

  if (is<PersonaBlockData>(block, 'personaBlock')) {
    return (
      <PersonaSection
        heading={block.heading ?? undefined}
        personas={block.personas?.map((p) => ({
          title: p.title,
          role: p.role ?? '',
          description: p.description ?? '',
          painPoints: p.painPoints ?? [],
        })) ?? undefined}
      />
    )
  }

  if (is<UseCaseStoryBlockData>(block, 'useCaseStoryBlock')) {
    return (
      <UseCaseSection
        label={block.label ?? undefined}
        heading={block.heading ?? undefined}
        context={block.context ?? undefined}
        steps={block.steps ?? undefined}
        result={block.result ?? undefined}
        cta={block.ctaLabel ?? undefined}
        ctaUrl={block.ctaUrl ?? undefined}
      />
    )
  }

  if (is<FaqBlockData>(block, 'faqBlock')) {
    const items = block.items
      ?.filter((i) => i.question)
      .map((i) => ({ question: i.question, answer: i.answer ?? '' }))
    return (
      <FaqSection
        heading={block.heading ?? undefined}
        items={items && items.length > 0 ? items : undefined}
      />
    )
  }

  if (is<CtaBlockData>(block, 'ctaBlock')) {
    return (
      <CtaSection
        heading={block.heading ?? undefined}
        subheading={block.subheading ?? undefined}
        ctaLabel={block.ctaLabel ?? undefined}
        ctaUrl={block.ctaUrl ?? undefined}
        variant={block.variant ?? undefined}
      />
    )
  }

  // Nieznany typ bloku — ignorujemy bezpiecznie
  return null
}
