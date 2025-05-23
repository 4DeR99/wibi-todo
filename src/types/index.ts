export interface LayoutBase {
  children: React.ReactNode
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum Status {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Task {
  id: number
  title: string
  description: string
  status: Status
  assignedTo: string
}
