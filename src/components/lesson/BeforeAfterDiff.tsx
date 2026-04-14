'use client'

import { useState } from 'react'

export interface DiffLine {
  text: string
  annotation?: string
  type?: 'added' | 'neutral'
}

interface BeforeAfterDiffProps {
  before: string
  after: DiffLine[]
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterDiff({
  before,
  after,
  beforeLabel = '✗ Loser Prompt',
  afterLabel = '✓ Trump Version',
}: BeforeAfterDiffProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  return (
    <div
      className="grid gap-5 mt-8"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
      role="region"
      aria-label="Before and after prompt comparison"
    >
      {/* Before */}
      <div
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
      >
        <div
          className="px-5 py-4 text-sm font-bold tracking-wide"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#b05555',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {beforeLabel}
        </div>
        <pre
          className="px-5 py-5 flex-1 text-sm whitespace-pre-wrap leading-relaxed m-0"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        >
          {before}
        </pre>
      </div>

      {/* After */}
      <div
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--gold-500)',
          boxShadow: 'var(--shadow-gold-glow)',
        }}
      >
        <div
          className="px-5 py-4 text-sm font-bold tracking-wide"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'var(--gradient-gold)',
            color: 'var(--charcoal-900)',
            borderBottom: '1px solid var(--gold-600)',
          }}
        >
          {afterLabel}
        </div>
        <pre
          className="px-5 py-5 flex-1 text-sm whitespace-pre-wrap leading-relaxed m-0 relative"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        >
          {after.map((line, i) => (
            line.annotation ? (
              <span
                key={i}
                className="cursor-help transition-colors rounded-sm"
                style={{
                  background: 'rgba(212,175,55,0.12)',
                  borderBottom: '1px dashed var(--gold-600)',
                  padding: '1px 3px',
                }}
                onMouseEnter={(e) => {
                  const r = (e.target as HTMLElement).getBoundingClientRect()
                  setTooltip({ text: line.annotation!, x: r.left, y: r.bottom + 8 })
                }}
                onMouseLeave={() => setTooltip(null)}
                onFocus={(e) => {
                  const r = (e.target as HTMLElement).getBoundingClientRect()
                  setTooltip({ text: line.annotation!, x: r.left, y: r.bottom + 8 })
                }}
                onBlur={() => setTooltip(null)}
                tabIndex={0}
                role="button"
                aria-label={`Annotation: ${line.annotation}`}
              >
                {line.text}
              </span>
            ) : (
              <span key={i}>{line.text}</span>
            )
          ))}
        </pre>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 rounded-lg px-4 py-3 text-sm shadow-xl pointer-events-none"
          style={{
            left: Math.min(tooltip.x, window.innerWidth - 320),
            top: tooltip.y,
            maxWidth: 300,
            background: 'var(--charcoal-800)',
            border: '1px solid var(--gold-500)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            whiteSpace: 'normal',
          }}
          role="tooltip"
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}
