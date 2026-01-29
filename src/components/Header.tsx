import type { ReactNode } from 'react'

interface HeaderProps {
  title: string
  /** Optional right-side action (e.g. logout button) */
  rightAction?: ReactNode
}

/**
 * Chat header bar — WhatsApp-style top bar with title and optional action.
 */
export function Header({ title, rightAction }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-emerald-700 text-white shadow-md shrink-0">
      <h1 className="text-lg font-semibold truncate">{title}</h1>
      {rightAction != null ? (
        <div className="shrink-0 ml-2">{rightAction}</div>
      ) : null}
    </header>
  )
}
