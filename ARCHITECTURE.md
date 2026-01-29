# Messaging App — Architecture & Learning Notes

A frontend-only, WhatsApp-style 1-to-1 chat UI for learning React, TypeScript, and Tailwind. No backend; all state lives in React.

---

## Folder Structure

```
src/
├── components/       # Reusable UI pieces
│   ├── Header.tsx         # Chat bar (title + optional action)
│   ├── ChatBubble.tsx    # Single message (left=bot, right=user)
│   ├── ChatInput.tsx     # Text input + Send button
│   └── TypingIndicator.tsx  # "Bot is typing..." dots
├── pages/
│   ├── LoginPage.tsx     # Fake login (email + password)
│   └── ChatPage.tsx      # Main chat screen
├── hooks/
│   └── useChat.ts        # Chat state + send + bot reply logic
├── utils/
│   ├── botReplies.ts     # Predefined bot messages + random pick
│   ├── delay.ts          # randomDelay(500, 1500) for bot delay
│   └── id.ts             # generateId() for message IDs
├── types/
│   └── index.ts          # Message, User
├── App.tsx               # Root: auth state → Login or Chat
├── main.tsx              # Entry
└── index.css             # Tailwind directives
```

- **components/** — Presentational, reusable across pages.
- **pages/** — Full screens; compose components and hooks.
- **hooks/** — State and side effects (messages, input, bot typing).
- **utils/** — Pure helpers (IDs, delays, bot reply list).
- **types/** — Shared TypeScript types.

---

## State Flow

1. **Auth (in-memory)**
   - `App` holds `user: User | null`.
   - `user === null` → render `LoginPage`.
   - On submit, `LoginPage` calls `onLogin(email, password)` → `App` sets `user = { email }` → render `ChatPage`.

2. **Chat**
   - `ChatPage` uses `useChat()`:
     - `messages: Message[]` — list of messages.
     - `inputValue` / `setInputValue` — controlled input.
     - `sendMessage()` — adds user message, clears input, sets `isBotTyping = true`, then after `randomDelay(500, 1500)` adds a bot message and sets `isBotTyping = false`.
   - `ChatInput` is disabled when `isBotTyping` or when input is empty; Enter key calls `sendMessage()` when allowed.

3. **Auto-scroll**
   - `ChatPage` has a ref at the bottom of the message list.
   - `useEffect` runs when `messages.length` or `isBotTyping` changes and scrolls that ref into view (smooth).

4. **Logout**
   - `ChatPage` calls `resetChat()` (clears messages, input, typing) and then `onLogout()` → `App` sets `user = null` → back to `LoginPage`.

---

## Bot Reply Logic

- **Location:** `utils/botReplies.ts` (list of strings) and `hooks/useChat.ts` (when to add a bot message).
- **Flow:**
  1. User sends message → add it to `messages`, clear input, set `isBotTyping = true`.
  2. Wait `randomDelay(500, 1500)` (see `utils/delay.ts`).
  3. Pick one reply with `getRandomBotReply()` from `botReplies.ts`.
  4. Append bot message to `messages`, set `isBotTyping = false`.
- **Typing indicator:** While `isBotTyping` is true, `ChatPage` renders `TypingIndicator` and disables the send input.

---

## Connecting a Real Backend Later

- **Auth:** Replace in-memory `user` with a real auth provider (e.g. Firebase Auth, Supabase, or your own API). Store token in memory or httpOnly cookie; pass token in API requests.
- **Messages:** Replace `useState<Message[]>` with:
  - Fetch initial list from `GET /messages` (or paginated).
  - On send: `POST /messages` with body `{ text }`, then append the server-returned message (with server id and timestamp) to local state.
  - Optionally: WebSocket or polling for new messages from the other user.
- **Bot:** Either keep a client-side “demo bot” that posts via the same `POST /messages` API, or implement bot logic on the server and have the server send messages like any other participant.
- **IDs:** Use server-generated IDs (e.g. UUID) instead of `utils/id.ts` for messages and users.

---

## Running the App

```bash
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173). Use any email and password on the login screen to enter the chat.
