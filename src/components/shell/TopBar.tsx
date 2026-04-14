'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'

interface TopBarProps {
  breadcrumbs?: { label: string; href?: string }[]
}

export default function TopBar({ breadcrumbs = [] }: TopBarProps) {
  const { streak, xp } = useStore()

  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between px-12 py-5 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'color-mix(in oklab, var(--bg-base) 90%, transparent)',
      }}
    >
      {/* Brand + breadcrumbs */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
            style={{
              background: 'var(--gradient-gold)',
              color: 'var(--charcoal-900)',
              fontFamily: 'var(--font-display)',
            }}
          >
            P
          </div>
          <span
            className="hidden sm:block text-sm font-semibold tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Prompt Professor
          </span>
        </Link>

        {breadcrumbs.length > 0 && (
          <nav className="hidden md:flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-40">›</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gold-600 transition-colors no-underline" style={{ color: 'var(--text-tertiary)' }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: 'var(--gold-700)', fontWeight: 600 }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      {/* Streak + XP */}
      <div className="flex items-center gap-5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
        {streak > 0 && (
          <div className="flex items-center gap-1.5" style={{ color: 'var(--gold-700)', fontWeight: 600 }}>
            <span>🔥</span>
            <span>{streak}-day streak</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <span style={{ color: 'var(--gold-600)' }}>✦</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{xp.toLocaleString()}</span>
          <span>XP</span>
        </div>
      </div>
    </header>
  )
}
