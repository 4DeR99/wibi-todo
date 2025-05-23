import { Status, Task } from './types'

export const tasks: Task[] = [
  {
    id: 1,
    title: 'task 1',
    description:
      'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ',
    status: Status.IN_PROGRESS,
    assignedTo: 'hamid',
  },
  {
    id: 2,
    title: 'task 2',
    description: 'desc',
    status: Status.IN_PROGRESS,
    assignedTo: 'hamid',
  },
  {
    id: 3,
    title: 'task 3',
    description: 'desc',
    status: Status.IN_PROGRESS,
    assignedTo: 'adam',
  },
  {
    id: 4,
    title: 'task 4',
    description: 'desc',
    status: Status.COMPLETED,
    assignedTo: 'hamid',
  },
]
