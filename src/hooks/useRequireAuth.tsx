'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from 'usehooks-ts'
import { LoaderCircle } from 'lucide-react'
import { useGetTasks } from './useGetTasks'

// should have a hasAccess function that checks if the user has access to the component but not needed here
export function useRequireAuth(
  Component: () => React.JSX.Element,
  redirectTo?: string,
) {
  const router = useRouter()
  const [token] = useLocalStorage('authToken', '')
  const [username] = useLocalStorage('username', '')
  const [role] = useLocalStorage('role', '')

  // since there is no /me endpoint I'm using the get tasks endpoint to check if the user is authenticated
  const { isLoading, isError } = useGetTasks()

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    )
  if (!token || !username || !role || isError) router.push(redirectTo || '/')

  return Component()
}
