'use client'

import { useCallback } from 'react'
import TutorCard from '@/components/tutor/TutorCard'
import BeforeAfterDiff, { type DiffLine } from '@/components/lesson/BeforeAfterDiff'
import QuizCheckpoint from '@/components/lesson/QuizCheckpoint'
import MasteryChecklist from '@/components/lesson/MasteryChecklist'
import { useStore } from '@/lib/store'
import type { LessonMeta } from '@/lib/lessons'

// ---- Lesson content data (inline for MVP; moves to MDX in Phase 2) ----

interface LessonContent {
  focus: string
  focusBody: string[]
  diffBefore?: string
  diffAfter?: DiffLine[]
  quizPrompt: React.ReactNode
  quizOptions: { id: string; label: string; correct?: boolean; explanation?: string }[]
  takeaways: string[]
  debugNotes: { title: string; body: string }[]
  checklistItems: { id: string; label: string }[]
  tryIt?: string
}

const LESSON_CONTENT: Record<string, LessonContent> = {
  '2.1': {
    focus: 'What you\'ll master',
    focusBody: [
      'Every high-performing prompt has four layers, stacked in a specific order: Role, Goal, Constraints, and Format. Miss any one of them and the AI guesses. When the AI guesses, you lose.',
      'By the end of this lesson you\'ll be able to inspect any prompt in the wild and call out exactly which layer is weak — and fix it in under sixty seconds.',
    ],
    diffBefore: 'write me a marketing email for our new product launch',
    diffAfter: [
      { text: 'You are a senior B2B SaaS marketing copywriter with 10 years of experience writing for technical buyers.', annotation: 'ROLE — tells the AI who to be. Specialist role beats generic "you are a helpful assistant" every time.', type: 'added' },
      { text: '\n\n' },
      { text: 'Write a product launch email that drives demo bookings from engineering leads at companies with 50+ engineers.', annotation: 'GOAL — exactly what outcome. Not just "an email" — a specific outcome.', type: 'added' },
      { text: '\n\n' },
      { text: 'Constraints: 120 words max. One specific customer-quantified outcome (e.g. "saved 4 hrs/week"). No buzzwords. Skeptical-reader tone.', annotation: 'CONSTRAINTS — guardrails that prevent generic slop. Length, tone, what to avoid.', type: 'added' },
      { text: '\n\n' },
      { text: 'Format:\n- Subject line (under 8 words)\n- Opening hook (one sentence)\n- Body (2 short paragraphs)\n- CTA (one line, no exclamation)', annotation: 'FORMAT — the skeleton the AI fills in. Removes ambiguity and makes comparison easy across runs.', type: 'added' },
    ],
    tryIt: 'Write me a prompt that turns a meandering Slack conversation into a crisp executive summary. Use all four layers. Show your work.',
    quizPrompt: (
      <>
        Which layer is this line?{' '}
        <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--charcoal-950)', padding: '4px 10px', borderRadius: 6, color: 'var(--gold-600)', fontSize: '0.85em' }}>
          &quot;Respond in JSON with keys: summary, sentiment, action_items.&quot;
        </code>
      </>
    ),
    quizOptions: [
      { id: 'a', label: 'Role — it tells the AI who to be.', explanation: 'Role describes the persona or expertise the AI should adopt — not the output shape.' },
      { id: 'b', label: 'Goal — it states the outcome.', explanation: 'Goal describes what you want to achieve, not how the result should be structured.' },
      { id: 'c', label: 'Constraints — it limits what\'s allowed.', explanation: 'Close — but constraints prevent bad outputs. "Only respond in JSON" would be a constraint. Defining keys is Format.' },
      { id: 'd', label: 'Format — it defines the output shape.', correct: true, explanation: 'Correct. JSON keys define the shape the AI fills in — that\'s Format. If the line said "only respond in JSON, never plain text," it\'d be a Constraint. Subtle. Important.' },
    ],
    takeaways: [
      'Every strong prompt has four layers: Role, Goal, Constraints, Format — in that order.',
      'Role sets perspective. Goal sets outcome. Constraints prevent slop. Format defines output shape.',
      'When a prompt underperforms, diagnose which layer is missing before rewriting — 80% of the time it\'s Constraints or Format.',
      'Order matters: swapping the layers degrades results measurably across Claude, GPT, and Gemini.',
    ],
    debugNotes: [
      { title: 'Fused Role + Goal', body: '"You are a marketing expert and write an email about X" — the AI treats this as one instruction and loses the specificity that comes from separating who from what.' },
      { title: 'Implicit Format', body: 'Asking "summarize this" without specifying shape. The model will guess — bullets, paragraphs, numbered list — and you\'ll get a different shape every run.' },
      { title: 'Constraint inflation', body: 'Stacking more than five constraints starts to fight the Goal. If a constraint conflicts with the outcome, the model picks one and silently drops the other.' },
    ],
    checklistItems: [
      { id: 'c1', label: 'I can name the four layers of R-G-C-F without looking them up.' },
      { id: 'c2', label: 'I can label each layer in an existing prompt.' },
      { id: 'c3', label: 'I wrote one R-G-C-F prompt in the Try It section.' },
      { id: 'c4', label: 'I saved one strong R-G-C-F example to my Prompt Library.' },
    ],
  },
}

// Generic placeholder content for lessons without authored content
function getContent(slug: string): LessonContent {
  return LESSON_CONTENT[slug] ?? {
    focus: 'What you\'ll master',
    focusBody: ['This lesson is coming soon. Full content is authored in Phase 2.'],
    quizPrompt: 'Sample question for this lesson — content coming in Phase 2.',
    quizOptions: [{ id: 'a', label: 'Placeholder answer A' }, { id: 'b', label: 'Placeholder answer B (correct)', correct: true, explanation: 'Content coming soon.' }],
    takeaways: ['Content coming in Phase 2.'],
    debugNotes: [],
    checklistItems: [{ id: 'c1', label: 'I completed this lesson.' }],
  }
}

// ---- Shared section wrapper ----

function Section({ eyebrow, title, gold, children, wide }: { eyebrow: string; title: string; gold?: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <section className="mx-auto px-12 mb-20" style={{ maxWidth: wide ? 1100 : 900 }}>
      <div className="text-center mb-10">
        <span style={{ display: 'inline-block', marginBottom: 12, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>{eyebrow}</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          {title}{gold && <> <em style={{ color: 'var(--gold-600)', fontStyle: 'italic' }}>{gold}</em></>}
        </h2>
      </div>
      {children}
    </section>
  )
}

export default function LessonBody({ meta }: { meta: LessonMeta }) {
  const content = getContent(meta.slug)
  const { completeLesson, savePrompt } = useStore()

  const handleAllChecked = useCallback(() => {
    completeLesson(meta.slug, meta.xp)
  }, [completeLesson, meta.slug, meta.xp])

  function handleSaveToLibrary() {
    savePrompt({
      title: `${meta.title} — Template`,
      body: content.diffAfter?.map(d => d.text).join('') ?? '',
      tags: ['template', `module-${meta.moduleId}`],
      source: meta.slug,
    })
  }

  return (
    <>
      {/* Tutor intro */}
      <section className="mx-auto px-12 mb-20" style={{ maxWidth: 1100 }}>
        <TutorCard variant="intro" quote={meta.tutorIntro} />
      </section>

      {/* Lesson Focus */}
      <Section eyebrow="Lesson Focus" title="What you'll" gold="master">
        {content.focusBody.map((p, i) => (
          <p key={i} style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--text-primary)', marginBottom: i < content.focusBody.length - 1 ? 20 : 0 }}>{p}</p>
        ))}
      </Section>

      {/* Before / After diff */}
      {content.diffBefore && content.diffAfter && (
        <Section eyebrow="The Teach" title="See it" gold="in action" wide>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: 720, margin: '0 auto 0' }}>
            Same request, two very different outcomes. Hover the highlighted lines on the right to see <em>why</em> each addition matters.
          </p>
          <BeforeAfterDiff before={content.diffBefore} after={content.diffAfter} />
        </Section>
      )}

      {/* Try it */}
      {content.tryIt && (
        <Section eyebrow="Try it · Boardroom Challenge" title="You're in the" gold="boardroom.">
          <div
            className="p-10 rounded-3xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, var(--bg-elevated) 50%)',
              border: '1px solid var(--gold-500)',
            }}
          >
            <div aria-hidden className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-gold)' }} />
            <p
              className="italic mb-6 pl-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--text-primary)',
                lineHeight: 1.35,
                borderLeft: '3px solid var(--gold-600)',
              }}
            >
              {content.tryIt}
            </p>
            <textarea
              className="w-full rounded-xl p-5 text-sm leading-relaxed resize-y"
              style={{
                minHeight: 180,
                background: 'var(--charcoal-950)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
              }}
              placeholder="Role: You are..."
            />
            <div className="flex justify-between items-center mt-5 flex-wrap gap-4">
              <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Mr. Trump will grade this. Make it tremendous.</span>
              <button
                className="px-6 py-3 rounded-full text-sm font-semibold"
                style={{ background: 'var(--gradient-gold)', color: 'var(--charcoal-900)' }}
              >
                Submit for Review →
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* Quiz */}
      <Section eyebrow="Checkpoint" title="Do you" gold="know the stack?">
        <QuizCheckpoint
          question={{ id: `${meta.slug}-q1`, prompt: content.quizPrompt, options: content.quizOptions }}
        />
      </Section>

      {/* Key Takeaways */}
      <Section eyebrow="Key Takeaways" title="The things to" gold="remember">
        <div
          className="p-10 rounded-3xl"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--gold-500)' }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {content.takeaways.map((t, i) => (
              <li key={i} style={{ paddingLeft: 32, position: 'relative', fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--text-primary)' }}>
                <span aria-hidden style={{ position: 'absolute', left: 0, top: 2, color: 'var(--gold-600)', fontSize: '1.125rem' }}>✦</span>
                <span dangerouslySetInnerHTML={{ __html: t }} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Debugging Notes */}
      {content.debugNotes.length > 0 && (
        <Section eyebrow="Debugging Notes" title="Watch out for" gold="these">
          <div className="flex flex-col gap-4">
            {content.debugNotes.map((note, i) => (
              <div
                key={i}
                className="p-6 rounded-xl"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '3px solid var(--burgundy-500)',
                }}
              >
                <div style={{ display: 'inline-block', padding: '2px 10px', background: 'rgba(122,46,46,0.15)', color: '#c88a8a', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Common Mistake</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', marginBottom: 8, color: 'var(--text-primary)' }}>{note.title}</div>
                <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{note.body}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Mastery Checklist */}
      <Section eyebrow="Mastery Checklist" title="Tick these when they're" gold="true">
        <MasteryChecklist lessonId={meta.slug} items={content.checklistItems} onAllChecked={handleAllChecked} />
      </Section>

      {/* Tutor outro */}
      <section className="mx-auto px-12 mb-20" style={{ maxWidth: 1100 }}>
        <TutorCard variant="outro" quote={meta.tutorOutro}>
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={handleSaveToLibrary}
              className="px-6 py-3 rounded-full text-sm font-semibold"
              style={{ background: 'var(--gradient-gold)', color: 'var(--charcoal-900)' }}
            >
              Save template to Library
            </button>
            <button
              className="px-6 py-3 rounded-full text-sm font-semibold"
              style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
            >
              Share this lesson
            </button>
          </div>
        </TutorCard>
      </section>
    </>
  )
}
