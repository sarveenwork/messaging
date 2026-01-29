import { useState } from 'react'
import { LoginPage } from '@/pages/LoginPage'
import { ChatPage } from '@/pages/ChatPage'
import type { User } from '@/types'

/**
 * Root app: fake auth state in memory.
 * - Not logged in → show LoginPage
 * - Logged in → show ChatPage with user
 */
function App() {
  const [user, setUser] = useState<User | null>(null)

  function handleLogin(email: string, _password: string) {
    setUser({ email })
  }

  function handleLogout() {
    setUser(null)
  }

  if (user == null) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <ChatPage user={user} onLogout={handleLogout} />
}

export default App
