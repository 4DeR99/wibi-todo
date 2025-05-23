import { apiRoutes } from '@/config/apiRoutes'
import { useAuth } from './useAuth'
import { Status, Task } from '@/types'
import { api } from '@/config/api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useTasksStore } from '@/lib/zustand/tasks-store'
import { setRouteIds } from '@/utils/setRouteIds'

export const useCompleteTask = () => {
  const { token } = useAuth()
  const updateTask = useTasksStore((state) => state.updateTask)

  const { mutate: completeTask, isPending } = useMutation<Task, any, Task>({
    mutationFn: async (task: Task) => {
      const res = await api.put<Task>(
        setRouteIds(apiRoutes.tasks.updateTask, [task.id.toString()]),
        {
          ...task,
          status: 'completed',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return res.data
    },
    onSuccess: (data) => {
      toast.success('Task completed successfully')
      updateTask(data.id, { ...data, status: Status.COMPLETED })
    },
    onError: () => {
      toast.error('Failed to complete task')
    },
  })

  return { completeTask, isPending }
}
