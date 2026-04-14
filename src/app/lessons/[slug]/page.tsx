import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLessonMeta, getAllSlugs } from '@/lib/lessons'
import TopBar from '@/components/shell/TopBar'
import LessonBody from './LessonBody'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = getLessonMeta(slug)
  if (!meta) return {}
  return {
    title: `Lesson ${slug} — ${meta.title} · Prompt Professor`,
    description: meta.subtitle,
  }
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = getLessonMeta(slug)
  if (!meta) notFound()

  return (
    <>
      <TopBar
        breadcrumbs={[
          { label: 'Course', href: '/' },
          { label: `Module ${meta.moduleId} · ${meta.moduleTitle}` },
          { label: `Lesson ${slug}` },
        ]}
      />

      {/* Hero */}
      <section
        className="relative text-center mx-auto px-12 py-16"
        style={{ maxWidth: 1100 }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 50% 10%, rgba(212,175,55,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 70%, rgba(212,175,55,0.04) 0%, transparent 60%)
            `,
          }}
        />
        <span
          className="relative z-10 inline-block mb-6 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid var(--gold-500)',
            color: 'var(--gold-700)',
          }}
        >
          ✦ Module {meta.moduleId} · Lesson {slug} ✦
        </span>
        <h1
          className="relative z-10 mb-5"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          {meta.title}
        </h1>
        <p
          className="relative z-10 mx-auto mb-8 italic"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: 'var(--text-secondary)',
            maxWidth: 680,
            lineHeight: 1.35,
          }}
        >
          {meta.subtitle}
        </p>
        <div
          className="relative z-10 flex justify-center gap-6 flex-wrap text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <span><strong style={{ color: 'var(--gold-700)' }}>⏱ {meta.readTime}</strong> min read</span>
          <span>·</span>
          <span><strong style={{ color: 'var(--gold-700)' }}>✦ {meta.xp}</strong> XP on completion</span>
        </div>
      </section>

      {/* Interactive lesson body (client component) */}
      <LessonBody meta={meta} />

      {/* Prev / Next footer */}
      <nav
        className="mx-auto px-12 pb-20"
        style={{ maxWidth: 1100 }}
        aria-label="Lesson navigation"
      >
        <div
          className="grid gap-6 pt-10"
          style={{ gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--border-subtle)' }}
        >
          {meta.prevSlug ? (
            <Link
              href={`/lessons/${meta.prevSlug}`}
              className="group flex flex-col gap-2 p-6 rounded-2xl transition-all no-underline"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--gold-500)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-subtle)'; el.style.transform = '' }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-700)' }}>← Previous</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{meta.prevTitle}</span>
            </Link>
          ) : <div />}

          {meta.nextSlug ? (
            <Link
              href={`/lessons/${meta.nextSlug}`}
              className="group flex flex-col gap-2 p-6 rounded-2xl transition-all no-underline text-right"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--gold-500)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-subtle)'; el.style.transform = '' }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-700)' }}>Next →</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{meta.nextTitle}</span>
            </Link>
          ) : <div />}
        </div>
      </nav>
    </>
  )
}
