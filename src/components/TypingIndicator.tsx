/**
 * "Bot is typing..." indicator shown while waiting for bot reply.
 */
export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full animate-fade-in">
      <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-2xl rounded-bl-md">
        <span className="flex items-center gap-1 text-sm">
          <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse-typing" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse-typing" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse-typing" style={{ animationDelay: '0.4s' }} />
        </span>
      </div>
    </div>
  )
}
