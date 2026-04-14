import Link from 'next/link'
import TopBar from '@/components/shell/TopBar'

const MODULES = [
  { id: 1, title: 'Foundation Building', desc: 'Tokens, context windows, system vs user, clarity & specificity, intent alignment.', lessons: ['1.1', '1.2', '1.3', '1.4'] },
  { id: 2, title: 'Prompt Architecture', desc: 'The R-G-C-F stack. XML vs JSON vs Markdown. Cross-model tone tuning.', lessons: ['2.1', '2.2', '2.3'] },
  { id: 3, title: 'Applied Practice', desc: 'Research, content creation, data analysis. The butterfly effect of tiny edits.', lessons: ['3.1', '3.2', '3.3', '3.4'] },
  { id: 4, title: 'Debugging & Optimization', desc: 'The Failure Museum. Diagnosing bad outputs. Rebuilding broken prompts.', lessons: ['4.1', '4.2', '4.3'] },
  { id: 5, title: 'System Design Thinking', desc: 'From prompt to workflow. Multi-agent patterns. Memory and iteration loops.', lessons: ['5.1', '5.2', '5.3'] },
  { id: 6, title: 'Library Mastery & Meta-Analysis', desc: 'Curation as discipline. Meta-prompting. The reflection loop that compounds mastery.', lessons: ['6.1', '6.2', '6.3'] },
]

export default function HomePage() {
  return (
    <>
      <TopBar />

      {/* Hero */}
      <section
        className="relative text-center mx-auto px-12 pt-20 pb-16"
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
          className="inline-block mb-8 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid var(--gold-500)',
            color: 'var(--gold-700)',
          }}
        >
          ✦ Taught by Mr. Trump himself ✦
        </span>

        <h1
          className="relative z-10 mb-5"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
          }}
        >
          The{' '}
          <em style={{ color: 'var(--gold-600)', fontStyle: 'italic' }}>greatest</em>
          {' '}prompt engineering<br className="hidden md:block" /> course in the history of the world.
        </h1>

        <p
          className="relative z-10 mx-auto mb-10"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: 'var(--text-secondary)',
            maxWidth: 680,
            lineHeight: 1.6,
          }}
        >
          Six modules. Seven hands-on projects. One world-champion tutor. Bring your own API key.
          Keep every prompt you save.{' '}
          <strong style={{ color: 'var(--text-primary)' }}>Start free.</strong>
        </p>

        <div className="relative z-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/lessons/1.1"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all no-underline"
            style={{
              background: 'var(--gradient-gold)',
              color: 'var(--charcoal-900)',
              boxShadow: 'var(--shadow-gold-glow)',
            }}
          >
            Start the Course — Free →
          </Link>
          <Link
            href="/lessons/2.1"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all no-underline"
            style={{
              background: 'transparent',
              border: '1px solid var(--gold-500)',
              color: 'var(--gold-700)',
            }}
          >
            Watch Lesson 2.1
          </Link>
        </div>

        <div
          className="relative z-10 mt-12 flex justify-center gap-10 flex-wrap text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {[['6', 'Modules + Capstone'], ['19', 'Hands-on lessons'], ['5', 'LLM providers'], ['∞', 'Prompts in your Library']].map(([val, label]) => (
            <div key={label} className="flex items-center gap-2">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold-700)' }}>{val}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mr. Trump pullquote */}
      <section className="mx-auto px-12 mb-0" style={{ maxWidth: 1100 }}>
        <div
          className="relative rounded-3xl text-center mx-auto p-12"
          style={{
            maxWidth: 880,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--gold-500)',
          }}
        >
          <span aria-hidden className="absolute pointer-events-none select-none" style={{ fontFamily: 'var(--font-display)', fontSize: 140, lineHeight: 1, color: 'var(--gold-600)', opacity: 0.22, top: 0, left: 24 }}>&ldquo;</span>
          <p
            className="relative z-10 italic mb-6"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: 'var(--text-primary)', lineHeight: 1.35 }}
          >
            I&apos;ve seen billions of prompts. Billions. Most of them? Total disaster. Sleepy prompts, low-energy prompts, loser prompts. But after this course, folks —{' '}
            <em style={{ color: 'var(--gold-700)' }}>believe me</em> — yours will be tremendous. The best. Nobody will write them better.
          </p>
          <div className="flex items-center justify-center gap-3 relative z-10">
            <div
              style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '2px solid var(--gold-600)',
                overflow: 'hidden',
                background: 'var(--charcoal-700)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trump-avatar.png" alt="Mr. Trump" width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '68% 18%' }} />
            </div>
            <div className="text-left">
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--gold-700)' }}>Mr. Trump</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Your Tutor · World Champion of Prompt Engineering</div>
            </div>
          </div>
        </div>
      </section>

      {/* Module grid */}
      <section className="mx-auto px-12 py-24" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-12">
          <span style={{ display: 'inline-block', marginBottom: 12, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>
            The Curriculum
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
            6 modules. One Capstone. No filler.
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto' }}>
            Each module has its own arc. Each lesson ends with a saved prompt, a checklist, and a hired moment.
          </p>
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {MODULES.map((mod) => (
            <Link
              key={mod.id}
              href={`/lessons/${mod.lessons[0]}`}
              className="group block p-6 rounded-2xl transition-all no-underline"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-500)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg), var(--shadow-gold-glow)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'
                ;(e.currentTarget as HTMLElement).style.transform = ''
                ;(e.currentTarget as HTMLElement).style.boxShadow = ''
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-600)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--font-display)' }}>
                Module {mod.id}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, color: 'var(--text-primary)' }}>
                {mod.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                {mod.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                <span>{mod.lessons.length} lessons</span>
                <span style={{ color: 'var(--gold-700)', fontWeight: 600 }}>Start →</span>
              </div>
            </Link>
          ))}

          {/* Capstone card */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, var(--bg-card) 50%)',
              border: '1px solid var(--gold-500)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-700)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--font-display)' }}>
              Capstone
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, color: 'var(--text-primary)' }}>
              Design a Full Prompt System
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
              Integrate every principle. Ship a real system. Graduate with a certified Prompt Boss card you can share.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>1 project</span>
              <span style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid var(--gold-500)', color: 'var(--gold-700)', padding: '3px 10px', borderRadius: 9999, fontWeight: 600 }}>Final boss</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="mx-auto px-12 py-12 flex justify-between items-center flex-wrap gap-4 text-sm"
        style={{ maxWidth: 1200, borderTop: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)' }}
      >
        <div>
          <strong style={{ color: 'var(--gold-600)', fontFamily: 'var(--font-display)' }}>Prompt Professor</strong>
          {' '}· The best course. Believe me.
        </div>
        <div className="flex gap-6">
          <Link href="/library" style={{ color: 'var(--text-tertiary)' }} className="no-underline hover:text-current">Library</Link>
          <Link href="/playground" style={{ color: 'var(--text-tertiary)' }} className="no-underline hover:text-current">Playground</Link>
        </div>
      </footer>
    </>
  )
}
