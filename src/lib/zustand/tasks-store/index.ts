import { Task } from '@/types'
import { create } from 'zustand'

export interface TasksStore {
  tasks: Task[]
  addTask: (task: Task) => void
  removeTask: (taskId: number) => void
  updateTask: (taskId: number, task: Task) => void
  setTasks: (tasks: Task[]) => void
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  addTask: (task: Task) => {
    set((state) => ({ tasks: [...state.tasks, task] }))
  },
  removeTask: (taskId: number) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }))
  },
  updateTask: (taskId: number, updatedTask: Task) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task,
      ),
    }))
  },
  setTasks: (tasks: Task[]) => {
    set({ tasks })
  },
}))
