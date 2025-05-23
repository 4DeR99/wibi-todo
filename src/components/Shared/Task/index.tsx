import { Checked } from '@/components/Icons/Checked'
import { CilcleChecked } from '@/components/Icons/CilcleChecked'
import { Trash } from '@/components/Icons/Trash'
import { Button } from '@/components/System/Button'
import { cn } from '@/lib/utils'
import { Status, type Task as TaskType } from '@/types'
import React from 'react'
import { CreateOrEditTaskDialog } from '../CreateOrEditTaskDialog'
import { useDeleteTask } from '@/hooks/useDeleteTask'
import { useCompleteTask } from '@/hooks/useCompleteTask'

interface TaskProps {
  task: TaskType
  isAdmin?: boolean
  className?: string
}

export const Task = ({ task, isAdmin = false, className }: TaskProps) => {
  const isTaskCompleted = task.status === Status.COMPLETED

  const { deleteTask, isPending: isDeletePending } = useDeleteTask()
  const { completeTask, isPending: isCompletePending } = useCompleteTask()
  return (
    <div
      className={cn(
        'w-full rounded-[15px] px-5 py-[15px] flex gap-2.5 items-center group bg-light-grey',
        className,
      )}
    >
      {isTaskCompleted && <Checked className="text-accent" />}
      <div className="space-y-2 grow truncate">
        {isAdmin && <p className="text-accent text-sm">@{task.assignedTo}</p>}
        <h3
          className={cn('font-semibold text-lg', {
            'line-through': isTaskCompleted,
          })}
        >
          {task.title}
        </h3>
        <p
          className={cn('text-stale-blue text-sm', {
            'line-through': isTaskCompleted,
          })}
        >
          {task.description.length > 70
            ? `${task.description.slice(0, 70)}...`
            : task.description}
        </p>
      </div>
      <div className="items-center ~gap-1/2.5 hidden group-hover:flex">
        {!isTaskCompleted && <CreateOrEditTaskDialog task={task} />}
        {isAdmin && (
          <Button
            variant="icon"
            size="icon"
            onClick={() => deleteTask(task.id)}
            disabled={isDeletePending}
          >
            <Trash className="text-main-red" />
          </Button>
        )}
        {!isTaskCompleted && (
          <Button
            className="flex gap-2"
            size="sm"
            onClick={() => completeTask(task)}
            disabled={isCompletePending}
          >
            <CilcleChecked className="text-white" />
            <span className="text-white hidden sm:block">done</span>
          </Button>
        )}
      </div>
    </div>
  )
}
