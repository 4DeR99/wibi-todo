import { api } from '@/config/api'
import { apiRoutes } from '@/config/apiRoutes'
import { setRouteIds } from '@/utils/setRouteIds'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from './useAuth'
import { useTasksStore } from '@/lib/zustand/tasks-store'

export const useDeleteTask = () => {
  const { token } = useAuth()
  const removeTask = useTasksStore((state) => state.removeTask)

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: (taskId: number) => {
      return api.delete(
        setRouteIds(apiRoutes.tasks.deleteTask, [taskId.toString()]),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    },
    onSuccess: (_, taskId) => {
      removeTask(taskId)
      toast.success('Task deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete task')
    },
  })

  return { deleteTask, isPending }
}
