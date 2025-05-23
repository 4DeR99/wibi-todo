'use client'

import { useRequireAuth } from '@/hooks/useRequireAuth'
import { LayoutBase } from '@/types'
import { Header } from '@/components/Shared/Header'
import { useSetTasks } from '@/lib/zustand/tasks-store/hooks/useSetTasks'
import { LoaderCircle } from 'lucide-react'

const HomeLayout = ({ children }: LayoutBase) => {
  const { isLoading } = useSetTasks()

  return useRequireAuth(() => (
    <main className="flex flex-col w-full min-h-screen">
      <Header />
      {isLoading && (
        <div className="grow flex items-center justify-center">
          <LoaderCircle className="animate-spin" />
        </div>
      )}
      {!isLoading && children}
    </main>
  ))
}

export default HomeLayout
