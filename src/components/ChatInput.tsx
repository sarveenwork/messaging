import { useRef, useEffect } from 'react'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  placeholder?: string
}

/**
 * Message input with send button.
 * Enter sends; Shift+Enter could be used for newline if we wanted.
 */
export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Keep focus on input when send is disabled (e.g. while bot is typing)
    if (!disabled && inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus()
    }
  }, [disabled])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !disabled) {
        onSend()
      }
    }
  }

  const canSend = value.trim().length > 0 && !disabled

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-100 border-t border-gray-200 shrink-0">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Message input"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        className="shrink-0 px-4 py-2 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  )
}
