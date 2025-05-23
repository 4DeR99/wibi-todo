import { api } from '@/config/api'
import { apiRoutes } from '@/config/apiRoutes'
import { User } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useLocalStorage } from 'usehooks-ts'

export const useGetUsers = () => {
  const [token] = useLocalStorage('authToken', '')
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get<User[]>(apiRoutes.users.getAll, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
  })

  return { data, isLoading, isError }
}
