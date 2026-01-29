/**
 * Message shown in the chat.
 * sender: 'user' | 'bot' — who sent it (controls bubble alignment & style)
 */
export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

/**
 * Logged-in user (fake auth — no real validation).
 */
export interface User {
  email: string
}
