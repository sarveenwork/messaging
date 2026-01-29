import { useEffect, useRef } from 'react'
import { Header } from '@/components/Header'
import { ChatBubble } from '@/components/ChatBubble'
import { ChatInput } from '@/components/ChatInput'
import { TypingIndicator } from '@/components/TypingIndicator'
import { useChat } from '@/hooks/useChat'
import type { User } from '@/types'

interface ChatPageProps {
  user: User
  onLogout: () => void
}

/**
 * Main chat screen: message list, input, bot typing indicator.
 * Auto-scrolls to latest message when messages or typing state change.
 */
export function ChatPage({ user, onLogout }: ChatPageProps) {
  const {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isBotTyping,
    resetChat,
  } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new message or typing indicator appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, isBotTyping])

  function handleLogout() {
    resetChat()
    onLogout()
  }

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50">
      <Header
        title={`Chat · ${user.email}`}
        rightAction={
          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-sm font-medium transition-colors"
          >
            Log out
          </button>
        }
      />

      {/* Message list — scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !isBotTyping && (
          <p className="text-center text-gray-400 text-sm py-8">
            No messages yet. Say hello!
          </p>
        )}
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isBotTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={sendMessage}
        disabled={isBotTyping}
        placeholder="Type a message..."
      />
    </div>
  )
}
