/**
 * Predefined bot replies. The bot picks one at random when responding.
 */
export const BOT_REPLIES: readonly string[] = [
  "That's interesting! Tell me more.",
  "I understand. How can I help?",
  "Got it! Anything else on your mind?",
  "Thanks for sharing that.",
  "I'm here to chat. What would you like to talk about?",
  "Sure thing!",
  "Interesting point of view.",
  "Let me think about that... Okay, noted!",
  "Sounds good to me.",
  "I'm just a demo bot, but I'm listening!",
]

/**
 * Picks a random reply from the predefined list.
 */
export function getRandomBotReply(): string {
  const index = Math.floor(Math.random() * BOT_REPLIES.length)
  return BOT_REPLIES[index] ?? BOT_REPLIES[0]
}
