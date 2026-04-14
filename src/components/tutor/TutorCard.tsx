'use client'

interface TutorCardProps {
  variant?: 'intro' | 'outro'
  quote: string
  children?: React.ReactNode
}

export default function TutorCard({ variant = 'intro', quote, children }: TutorCardProps) {
  return (
    <div
      className="relative rounded-3xl p-12 text-center mx-auto"
      style={{
        maxWidth: 880,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--gold-500)',
      }}
    >
      {/* Decorative quote marks */}
      <span
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 140,
          lineHeight: 1,
          color: 'var(--gold-600)',
          opacity: 0.22,
          top: 0,
          left: 24,
        }}
      >
        &ldquo;
      </span>
      <span
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 140,
          lineHeight: 1,
          color: 'var(--gold-600)',
          opacity: 0.22,
          bottom: -50,
          right: 24,
        }}
      >
        &rdquo;
      </span>

      {/* Quote */}
      <p
        className="relative z-10 italic leading-snug mb-6"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          color: 'var(--text-primary)',
        }}
        dangerouslySetInnerHTML={{ __html: quote }}
      />

      {/* Attribution */}
      <div className="flex items-center justify-center gap-3 relative z-10">
        <div
          className="overflow-hidden flex-shrink-0"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '2px solid var(--gold-600)',
            background: 'var(--charcoal-700)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/trump-avatar.png"
            alt="Mr. Trump, your tutor"
            width={48}
            height={48}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '68% 18%' }}
          />
        </div>
        <div className="text-left">
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--gold-700)' }}>
            Mr. Trump
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Your Tutor · {variant === 'intro' ? 'Lesson Intro' : 'Lesson Outro'}
          </div>
        </div>
      </div>

      {/* Optional extra content (e.g. buttons in outro) */}
      {children && <div className="mt-6 relative z-10">{children}</div>}
    </div>
  )
}
