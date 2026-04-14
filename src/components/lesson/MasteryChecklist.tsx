'use client'

import { useState, useEffect } from 'react'

export interface ChecklistItem {
  id: string
  label: string
}

interface MasteryChecklistProps {
  lessonId: string
  items: ChecklistItem[]
  onAllChecked?: () => void
}

const storageKey = (lessonId: string) => `pp-checklist-${lessonId}`

export default function MasteryChecklist({ lessonId, items, onAllChecked }: MasteryChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [fired, setFired] = useState(false)

  // Rehydrate from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey(lessonId)) ?? '[]') as string[]
      setChecked(new Set(saved))
    } catch {}
  }, [lessonId])

  // Persist + notify completion
  useEffect(() => {
    localStorage.setItem(storageKey(lessonId), JSON.stringify(Array.from(checked)))
    if (checked.size === items.length && !fired) {
      setFired(true)
      onAllChecked?.()
    }
  }, [checked, items.length, lessonId, onAllChecked, fired])

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const allDone = checked.size === items.length

  return (
    <div role="group" aria-label="Mastery checklist">
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const isChecked = checked.has(item.id)
          return (
            <button
              key={item.id}
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => toggle(item.id)}
              className="flex items-start gap-4 px-5 py-4 rounded-xl text-left transition-all"
              style={{
                background: isChecked ? 'rgba(212,175,55,0.05)' : 'var(--bg-card)',
                border: `1px solid ${isChecked ? 'var(--gold-500)' : 'var(--border-subtle)'}`,
                color: 'var(--text-primary)',
              }}
            >
              <div
                className="flex-shrink-0 grid place-items-center rounded-md mt-0.5"
                style={{
                  width: 24, height: 24,
                  border: '1.5px solid var(--gold-600)',
                  background: isChecked ? 'var(--gradient-gold)' : 'transparent',
                  color: 'var(--charcoal-900)',
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {isChecked && '✓'}
              </div>
              <span style={{ fontSize: '1rem', lineHeight: 1.6 }}>{item.label}</span>
            </button>
          )
        })}
      </div>

      {allDone && (
        <div
          className="mt-5 p-5 rounded-xl text-center"
          style={{
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid var(--gold-500)',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '1.125rem',
            color: 'var(--gold-700)',
          }}
          role="status"
          aria-live="polite"
        >
          "Beautiful. Checklist complete. <strong style={{ fontStyle: 'normal' }}>You&apos;re hired.</strong> Now hit Next and keep winning."
        </div>
      )}
    </div>
  )
}
