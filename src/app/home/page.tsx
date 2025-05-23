'use client'

import { Container } from '@/components/System/Container'
import { useAuth } from '@/hooks/useAuth'
import { Role } from '@/types'
import React, { useMemo } from 'react'
import { Task } from '@/components/Shared/Task'
import { CreateOrEditTaskDialog } from '@/components/Shared/CreateTaskDialog'
import { useTasksStore } from '@/lib/zustand/tasks-store'

export default () => {
  const { role, username } = useAuth()
  const taskState = useTasksStore((state) => state.tasks)

  const isAdmin = role === Role.ADMIN

  const tasks = useMemo(() => {
    if (isAdmin) return taskState
    return taskState?.filter((task) => task.assignedTo === username)
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
            isAdmin={isAdmin}
          />
        ))}
        {isAdmin && <CreateOrEditTaskDialog />}
      </div>
    </Container>
  )
}
