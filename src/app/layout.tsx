import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prompt Professor — The Greatest Prompt Engineering Course Ever.',
  description: 'Six modules. Seven hands-on projects. One world-champion tutor. Learn to write prompts that win.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
