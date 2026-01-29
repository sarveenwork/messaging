/**
 * Returns a promise that resolves after ms milliseconds.
 * Used to simulate bot "thinking" delay (500–1500ms).
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Random delay between min and max ms (inclusive).
 */
export function randomDelay(minMs: number, maxMs: number): Promise<void> {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return delay(ms)
}
