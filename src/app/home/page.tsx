'use client'

import { Container } from '@/components/System/Container'
import { useAuth } from '@/hooks/useAuth'
import { Role, Status } from '@/types'
import React, { useMemo } from 'react'
import { Task } from '@/components/Shared/Task'
import { CreateOrEditTaskDialog } from '@/components/Shared/CreateOrEditTaskDialog'
import { useTasksStore } from '@/lib/zustand/tasks-store'

export default () => {
  const { role, username } = useAuth()
  const { tasks: taskState } = useTasksStore()

  const isAdmin = role === Role.ADMIN

  const tasks = useMemo(() => {
    const sortedTasks = taskState?.sort((a, b) => {
      if (a.status === Status.COMPLETED && b.status !== Status.COMPLETED)
        return 1
      if (a.status !== Status.COMPLETED && b.status === Status.COMPLETED)
        return -1
      return 0
    })

    if (isAdmin) return sortedTasks
    return sortedTasks?.filter((task) => task.assignedTo === username)
  }, [taskState, isAdmin, username])

  return (
    <Container className="space-y-[50px]">
      <div className="space-y-2.5">
        <h1 className="font-bold text-3xl">
          Welcome <span className="text-accent">{username}</span>.
        </h1>
        {isAdmin && (
          <h2 className="text-stale-blue text-lg font-medium">
            your team has {tasks?.length} tasks to do.
          </h2>
        )}
        {!isAdmin && (
          <h2 className="text-stale-blue text-lg font-medium">
            you've got {tasks?.length} tasks to do.
          </h2>
        )}
      </div>
      <div className="space-y-5">
        {tasks?.map((task) => (
          <Task
            key={task.id}
            task={task}
          />
        ))}
        {isAdmin && <CreateOrEditTaskDialog />}
      </div>
    </Container>
  )
}
