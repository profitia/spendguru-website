import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { placeholderFiveQuestions } from '@/data/placeholder-content'

interface Question {
  number: number
  question: string
  context: string
}

interface FiveQuestionsSectionProps {
  heading?: string
  subheading?: string
  questions?: Question[]
}

export function FiveQuestionsSection({
  heading = placeholderFiveQuestions.heading,
  subheading = placeholderFiveQuestions.subheading,
  questions = placeholderFiveQuestions.questions,
}: FiveQuestionsSectionProps) {
  return (
    <section className="py-[var(--spacing-section)] bg-white">
      <Container>
        <SectionHeader
          label="Przygotowanie"
          heading={heading}
          subheading={subheading}
          className="mb-12"
        />
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {questions.map((item) => (
            <div
              key={item.number}
              className="flex gap-5 items-start p-6 rounded-[var(--radius-lg)] border border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)]"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                {item.number}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-neutral-900)] leading-snug mb-1">
                  {item.question}
                </p>
                <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed">
                  {item.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
