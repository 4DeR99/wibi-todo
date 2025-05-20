export const apiRoutes = {
  auth: {
    login: '/api/login',
    register: '/api/register',
  },
  tasks: {
    getAll: '/api/tasks',
    createTask: '/api/tasks',
    getTask: '/api/tasks/:id',
    updateTask: '/api/tasks/:id',
    deleteTask: '/api/tasks/:id',
  },
  users: {
    getAll: '/api/users',
  },
}
