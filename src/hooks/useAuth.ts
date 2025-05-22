import { Role } from '@/types'
import { useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export function useAuth() {
  const [token, setToken, clearToken] = useLocalStorage('authToken', '')
  const [role, setRole, clearRole] = useLocalStorage('role', '')
  const [username, setUsername, clearUsername] = useLocalStorage('username', '')

  const isAuthenticated = !!token && !!role && !!username

  const login = useCallback(
    (token: string, role: Role, username: string) => {
      setToken(token)
      setRole(role)
      setUsername(username)
    },
    [setToken, setRole, setUsername],
  )

  const logout = useCallback(() => {
    clearToken()
    clearRole()
    clearUsername()
  }, [clearToken, clearRole, clearUsername])

  return {
    isAuthenticated,
    login,
    logout,
    token,
    role,
    username,
  }
}
