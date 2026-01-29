/**
 * Simple unique ID for messages (no external lib).
 * Good enough for in-memory state; use UUID/crypto in production.
 */
let counter = 0
export function generateId(): string {
  counter += 1
  return `msg-${Date.now()}-${counter}`
}
