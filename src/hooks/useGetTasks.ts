'use client'

import { api } from '@/config/api'
import { useQuery } from '@tanstack/react-query'
import { Task } from '@/types'
import { useLocalStorage } from 'usehooks-ts'
import { apiRoutes } from '@/config/apiRoutes'

export function useGetTasks() {
  const [token] = useLocalStorage('authToken', '')
  const { data, isLoading, isError } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get(apiRoutes.tasks.getAll, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
  })

  return { data, isLoading, isError }
}
