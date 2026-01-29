import { useState, useCallback, useRef } from 'react'
import type { Message } from '@/types'
import { generateId } from '@/utils/id'
import { getRandomBotReply } from '@/utils/botReplies'
import { randomDelay } from '@/utils/delay'

/**
 * Chat state and actions: messages, input, send, bot typing.
 * Bot replies after 500–1500ms with a random predefined message.
 */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isBotTyping, setIsBotTyping] = useState(false)
  const abortRef = useRef(false)

  const sendMessage = useCallback(() => {
    const text = inputValue.trim()
    if (!text || isBotTyping) return

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      text,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsBotTyping(true)
    abortRef.current = false

    // Bot replies after random delay (500–1500ms)
    randomDelay(500, 1500).then(() => {
      if (abortRef.current) return
      const botMessage: Message = {
        id: generateId(),
        text: getRandomBotReply(),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsBotTyping(false)
    })
  }, [inputValue, isBotTyping])

  const resetChat = useCallback(() => {
    abortRef.current = true
    setMessages([])
    setInputValue('')
    setIsBotTyping(false)
  }, [])

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isBotTyping,
    resetChat,
  }
}
