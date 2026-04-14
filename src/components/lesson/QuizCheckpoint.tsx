'use client'

import { useState } from 'react'

export interface QuizOption {
  id: string
  label: string
  correct?: boolean
  explanation?: string
}

export interface QuizQuestion {
  id: string
  prompt: React.ReactNode
  options: QuizOption[]
}

interface QuizCheckpointProps {
  question: QuizQuestion
  onCorrect?: () => void
}

export default function QuizCheckpoint({ question, onCorrect }: QuizCheckpointProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const answered = selected !== null
  const selectedOpt = question.options.find(o => o.id === selected)
  const isCorrect = selectedOpt?.correct ?? false

  function handleSelect(id: string) {
    if (answered) return
    setSelected(id)
    if (question.options.find(o => o.id === id)?.correct) {
      onCorrect?.()
    }
  }

  return (
    <div
      className="rounded-2xl p-8"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
      role="group"
      aria-label="Quiz checkpoint"
    >
      <div
        className="mb-6 leading-snug"
        style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)' }}
      >
        {question.prompt}
      </div>

      <div className="flex flex-col gap-3" role="radiogroup">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id
          const showCorrect = answered && opt.correct
          const showWrong = answered && isSelected && !opt.correct

          return (
            <button
              key={opt.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(opt.id)}
              disabled={answered}
              className="flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all text-base disabled:cursor-default"
              style={{
                background: 'transparent',
                border: `1px solid ${
                  showCorrect ? 'var(--gold-500)' :
                  showWrong   ? 'var(--burgundy-500)' :
                  isSelected  ? 'var(--gold-500)' :
                  'var(--border-subtle)'
                }`,
                boxShadow: showCorrect ? 'var(--shadow-gold-glow)' : 'none',
                color: 'var(--text-primary)',
              }}
            >
              <span
                className="flex-shrink-0 grid place-items-center rounded-full text-sm font-bold"
                style={{
                  width: 32, height: 32,
                  border: `1px solid ${showCorrect ? 'var(--gold-600)' : 'var(--gold-600)'}`,
                  background: showCorrect ? 'var(--gradient-gold)' : 'transparent',
                  color: showCorrect ? 'var(--charcoal-900)' : 'var(--gold-700)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {opt.id.toUpperCase()}
              </span>
              <span>{opt.label}</span>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className="mt-5 p-5 rounded-xl"
          style={{
            background: isCorrect ? 'rgba(212,175,55,0.06)' : 'rgba(122,46,46,0.06)',
            border: `1px solid ${isCorrect ? 'var(--gold-500)' : 'var(--burgundy-500)'}`,
            borderLeftWidth: 4,
          }}
          role="alert"
          aria-live="polite"
        >
          <div
            className="font-bold mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              color: isCorrect ? 'var(--gold-700)' : '#e08585',
            }}
          >
            {isCorrect ? '"That\'s right! You\'re hired!"' : '"Wow. Total disaster. You\'re fired! …But here\'s the fix."'}
          </div>
          {selectedOpt?.explanation && (
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', margin: 0 }}>
              {selectedOpt.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
