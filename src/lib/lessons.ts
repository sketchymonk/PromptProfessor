export interface LessonMeta {
  slug: string        // e.g. "2.1"
  moduleId: number
  moduleTitle: string
  title: string
  subtitle: string
  xp: number
  readTime: number    // minutes
  prevSlug?: string
  prevTitle?: string
  nextSlug?: string
  nextTitle?: string
  tutorIntro: string  // HTML string (gold <em> etc)
  tutorOutro: string
}

export const LESSON_META: Record<string, LessonMeta> = {
  '1.1': {
    slug: '1.1',
    moduleId: 1, moduleTitle: 'Foundation Building',
    title: 'What a Prompt Really Is',
    subtitle: 'Tokens, context windows, system vs user — the layer under every interaction.',
    xp: 100, readTime: 6,
    nextSlug: '1.2', nextTitle: 'Context hierarchy',
    tutorIntro: `Folks, most people think a prompt is just a question. SAD! It&apos;s not. It&apos;s a <em style="color:var(--gold-700)">structured instruction</em> with layers you probably never thought about. Today we fix that. Believe me.`,
    tutorOutro: `You now know what a prompt <em style="color:var(--gold-700)">actually is</em>. Most people never learn this. You just got ahead of 99% of the field. Tremendous. Now go use it and win bigly.`,
  },
  '2.1': {
    slug: '2.1',
    moduleId: 2, moduleTitle: 'Prompt Architecture',
    title: 'The R-G-C-F Stack',
    subtitle: 'Four words. Four layers. The architecture every great prompt is built on — and every loser prompt forgets.',
    xp: 120, readTime: 8,
    prevSlug: '1.4', prevTitle: 'Intent alignment',
    nextSlug: '2.2', nextTitle: 'XML / JSON / Markdown',
    tutorIntro: `Folks, let me tell you — most people write prompts like they&apos;re ordering a sandwich with their eyes closed. SAD! But not you. Not after today. Today you learn the <em style="color:var(--gold-700)">only</em> four pieces that matter. Tremendous pieces. The best.`,
    tutorOutro: `Beautiful. Just beautiful. You learned R-G-C-F. Four layers. The best architecture there is. Nobody does it better — <em style="color:var(--gold-700)">believe me</em>. You just learned something huge. Now go use it and win bigly.`,
  },
  '3.1': {
    slug: '3.1',
    moduleId: 3, moduleTitle: 'Applied Practice',
    title: 'Prompts for Research',
    subtitle: 'How to get an AI to act like your best research assistant — not a mediocre one.',
    xp: 130, readTime: 9,
    prevSlug: '2.3', prevTitle: 'Cross-model tone',
    nextSlug: '3.2', nextTitle: 'Content creation',
    tutorIntro: `Research prompts are the most underrated tool in the game. Everybody just types a question and hopes for the best. <em style="color:var(--gold-700)">Weak!</em> We&apos;re going to do something tremendous here.`,
    tutorOutro: `That&apos;s how you do research at the highest level. The biggest deal-makers in history got there by asking better questions. <em style="color:var(--gold-700)">Now you know how.</em> Win bigly.`,
  },
  '4.1': {
    slug: '4.1',
    moduleId: 4, moduleTitle: 'Debugging & Optimization',
    title: 'The Failure Museum',
    subtitle: 'A curated gallery of real bad prompts and their diagnoses. Study what fails so you never repeat it.',
    xp: 140, readTime: 10,
    prevSlug: '3.4', prevTitle: 'The butterfly effect',
    nextSlug: '4.2', nextTitle: 'Rebuilding broken prompts',
    tutorIntro: `Welcome to the Failure Museum. The most important collection ever assembled. Every disaster in here is a gift — <em style="color:var(--gold-700)">if you know how to read it.</em> And after today? You will.`,
    tutorOutro: `You just toured the greatest collection of prompt failures ever documented. And you know what? You&apos;re not going to repeat a single one of them. <em style="color:var(--gold-700)">Tremendous.</em> Win bigly.`,
  },
  '5.1': {
    slug: '5.1',
    moduleId: 5, moduleTitle: 'System Design Thinking',
    title: 'From Prompt to Workflow',
    subtitle: 'When one prompt isn\'t enough — how to chain, delegate, and architect at scale.',
    xp: 150, readTime: 11,
    prevSlug: '4.3', prevTitle: 'Multi-model testing',
    nextSlug: '5.2', nextTitle: 'Multi-agent patterns',
    tutorIntro: `A single prompt is like one meeting. Useful. But a <em style="color:var(--gold-700)">workflow</em>? That&apos;s a whole organisation working for you 24/7. Today we build organisations.`,
    tutorOutro: `You think in systems now. That&apos;s the difference between someone who uses AI and someone who <em style="color:var(--gold-700)">deploys</em> it. Huge difference. Win bigly.`,
  },
  '6.1': {
    slug: '6.1',
    moduleId: 6, moduleTitle: 'Library Mastery & Meta-Analysis',
    title: 'Curation as a Discipline',
    subtitle: 'What to save, how to tag, when to retire — and why your Library is the most valuable thing you\'ll build.',
    xp: 160, readTime: 10,
    prevSlug: '5.3', prevTitle: 'Memory & iteration loops',
    nextSlug: '6.2', nextTitle: 'Meta-prompting',
    tutorIntro: `Most people save everything and find nothing. <em style="color:var(--gold-700)">Low-energy curation.</em> Today you build a system that compounds — every prompt you save makes the next one better. That&apos;s how winners operate.`,
    tutorOutro: `Your Library is now a living asset — not a junk drawer. The best people in any field maintain their tools obsessively. <em style="color:var(--gold-700)">Now you do too.</em> Win bigly.`,
  },
}

export function getLessonMeta(slug: string): LessonMeta | null {
  return LESSON_META[slug] ?? null
}

export function getAllSlugs(): string[] {
  return Object.keys(LESSON_META)
}
