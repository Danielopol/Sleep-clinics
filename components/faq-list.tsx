import { JsonLd } from "@/components/json-ld"

export interface FaqItem {
  question: string
  answer: string
}

/**
 * A visible question-and-answer list plus matching FAQPage structured data.
 * Answers are plain text so the markup and the JSON-LD always say the same
 * thing.
 */
export function FaqList({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null

  return (
    <div className="mt-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-[var(--border-subtle)] p-5"
          >
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.question}</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
