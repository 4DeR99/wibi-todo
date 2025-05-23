'use client'

import { api } from '@/config/api'
import { useQuery } from '@tanstack/react-query'
import { Task } from '@/types'
import { useLocalStorage } from 'usehooks-ts'

export function useGetTasks() {
  const [token] = useLocalStorage('authToken', '')
  const { data, isLoading, isError } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
  })

  return { data, isLoading, isError }
}
