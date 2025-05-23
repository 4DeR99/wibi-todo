import { useGetTasks } from '@/hooks/useGetTasks'
import { useTasksStore } from '../index'
import { useEffect } from 'react'

export const useSetTasks = () => {
  const { data: tasks, isLoading } = useGetTasks()
  const setTasks = useTasksStore((state) => state.setTasks)

  useEffect(() => {
    setTasks(tasks ?? [])
  }, [tasks, setTasks])

  return { tasks, isLoading }
}
