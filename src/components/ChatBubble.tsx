import type { Message } from '@/types'

interface ChatBubbleProps {
  message: Message
}

/**
 * Single message bubble. Left = bot, right = user.
 * Rounded corners and subtle animation on appear.
 */
export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user'
  const time = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className={`flex w-full animate-fade-in ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-emerald-600 text-white rounded-br-md'
            : 'bg-gray-200 text-gray-900 rounded-bl-md'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.text}
        </p>
        <p
          className={`text-xs mt-1 ${
            isUser ? 'text-emerald-100' : 'text-gray-500'
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  )
}
