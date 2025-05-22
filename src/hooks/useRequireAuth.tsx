'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { useGetTasks } from './useGetTasks'
import { useAuth } from './useAuth'

// should have a hasAccess function that checks if the user has access to the component but not needed here
export function useRequireAuth(
  Component: () => React.JSX.Element,
  redirectTo = '/',
) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  // since there is no /me endpoint I'm using the get tasks endpoint to check if the user is authenticated
  const { isLoading, isError } = useGetTasks()

  useEffect(() => {
    if (!isAuthenticated || isError) router?.push(redirectTo)
  }, [isAuthenticated, router, redirectTo, isError])

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    )

  return Component()
}
