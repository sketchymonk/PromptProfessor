'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ---- Types ----

export type LessonId = string // e.g. "1.1", "2.1"
export type ModuleId = number // 1–6

export type XpLevel = 'Apprentice' | 'Architect' | 'Artisan' | 'Master'

const XP_LEVELS: { min: number; level: XpLevel }[] = [
  { min: 0,    level: 'Apprentice' },
  { min: 500,  level: 'Architect'  },
  { min: 1500, level: 'Artisan'    },
  { min: 3000, level: 'Master'     },
]

export function xpLevel(xp: number): XpLevel {
  return [...XP_LEVELS].reverse().find(l => xp >= l.min)!.level
}

export interface LibraryPrompt {
  id: string
  title: string
  body: string
  tags: string[]
  source: string // lesson slug or "playground"
  savedAt: number
  usedCount: number
  favorite: boolean
}

// ---- State ----

interface StoreState {
  // Progress
  completedLessons: Set<LessonId>
  xp: number
  streak: number
  lastActivityDate: string | null // ISO date string YYYY-MM-DD

  // Library
  library: LibraryPrompt[]

  // API keys (client-side only, never sent anywhere)
  apiKeys: {
    anthropic?: string
    openai?: string
    google?: string
    xai?: string
    perplexity?: string
  }

  // Actions — progress
  completeLesson: (id: LessonId, xpEarned?: number) => void
  isLessonComplete: (id: LessonId) => boolean
  getModuleProgress: (moduleId: ModuleId, lessonIds: LessonId[]) => number

  // Actions — streak
  recordActivity: () => void

  // Actions — library
  savePrompt: (prompt: Omit<LibraryPrompt, 'id' | 'savedAt' | 'usedCount' | 'favorite'>) => LibraryPrompt
  deletePrompt: (id: string) => void
  toggleFavorite: (id: string) => void
  incrementUsed: (id: string) => void

  // Actions — API keys
  setApiKey: (provider: keyof StoreState['apiKeys'], key: string) => void
  getApiKey: (provider: keyof StoreState['apiKeys']) => string | undefined
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      completedLessons: new Set<LessonId>(),
      xp: 0,
      streak: 0,
      lastActivityDate: null,
      library: [],
      apiKeys: {},

      completeLesson: (id, xpEarned = 100) => {
        const { completedLessons } = get()
        if (completedLessons.has(id)) return
        const next = new Set(completedLessons)
        next.add(id)
        set({ completedLessons: next, xp: get().xp + xpEarned })
        get().recordActivity()
      },

      isLessonComplete: (id) => get().completedLessons.has(id),

      getModuleProgress: (_, lessonIds) => {
        const { completedLessons } = get()
        if (!lessonIds.length) return 0
        const done = lessonIds.filter(id => completedLessons.has(id)).length
        return Math.round((done / lessonIds.length) * 100)
      },

      recordActivity: () => {
        const today = new Date().toISOString().slice(0, 10)
        const { lastActivityDate, streak } = get()
        if (lastActivityDate === today) return
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
        const newStreak = lastActivityDate === yesterday ? streak + 1 : 1
        set({ streak: newStreak, lastActivityDate: today })
      },

      savePrompt: (prompt) => {
        const entry: LibraryPrompt = {
          ...prompt,
          id: crypto.randomUUID(),
          savedAt: Date.now(),
          usedCount: 0,
          favorite: false,
        }
        set(s => ({ library: [entry, ...s.library] }))
        return entry
      },

      deletePrompt: (id) => set(s => ({ library: s.library.filter(p => p.id !== id) })),

      toggleFavorite: (id) => set(s => ({
        library: s.library.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p),
      })),

      incrementUsed: (id) => set(s => ({
        library: s.library.map(p => p.id === id ? { ...p, usedCount: p.usedCount + 1 } : p),
      })),

      setApiKey: (provider, key) => set(s => ({ apiKeys: { ...s.apiKeys, [provider]: key } })),
      getApiKey: (provider) => get().apiKeys[provider],
    }),
    {
      name: 'prompt-professor-v1',
      storage: createJSONStorage(() => localStorage),
      // Sets aren't JSON-serialisable; convert on persist
      partialize: (s) => ({
        ...s,
        completedLessons: Array.from(s.completedLessons),
      }),
      merge: (persisted: unknown, current) => {
        const p = persisted as Partial<StoreState> & { completedLessons?: LessonId[] }
        return {
          ...current,
          ...p,
          completedLessons: new Set<LessonId>(p.completedLessons ?? []),
        }
      },
    }
  )
)
