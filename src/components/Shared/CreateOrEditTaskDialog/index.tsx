import { Plus } from '@/components/Icons/Plus'
import { Button } from '@/components/System/Button'
import { Input } from '@/components/System/Input'
import { Label } from '@/components/System/Label'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'
import { useGetUsers } from '@/hooks/useGetUsers'
import { TextArea } from '@/components/System/TextArea'
import { CreateTaskType, schema } from './validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useApiForm } from '@/hooks/useApiForm'
import { apiRoutes } from '@/config/apiRoutes'
import { Role, Task } from '@/types'
import { toast } from 'sonner'
import { useTasksStore } from '@/lib/zustand/tasks-store'
import { setRouteIds } from '@/utils/setRouteIds'
import { cn } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface CreateOrEditTaskDialogProps {
  task?: Task
}

export const CreateOrEditTaskDialog = ({
  task,
}: CreateOrEditTaskDialogProps) => {
  const [open, setOpen] = useState(false)
  const { data: users } = useGetUsers()
  const { addTask, updateTask } = useTasksStore()
  const { role } = useAuth()

  const isAdmin = role === Role.ADMIN

  const form = useForm<CreateTaskType>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
      assignedTo: task?.assignedTo ?? '',
      status: task?.status ?? 'in_progress',
    },
  })

  const { onSubmit, isPending } = useApiForm<
    CreateTaskType,
    Task,
    CreateTaskType
  >({
    method: task ? 'put' : 'post',
    url: task
      ? setRouteIds(apiRoutes.tasks.updateTask, [task.id.toString()])
      : apiRoutes.tasks.createTask,
    form,
    afterApiCall: (response) => {
      task ? updateTask(task.id, response) : addTask(response)
      toast.success(
        task ? 'Task updated successfully' : 'Task created successfully',
      )
      setOpen(false)
    },
    onError: (error) => {
      toast.error(task ? 'Failed to update task' : 'Failed to create task')
    },
  })

  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = form

  const selectValue = watch('assignedTo')

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant={task ? 'icon' : 'ghost'}
          size={task ? 'icon' : 'md'}
          className={cn(
            'text-pale-white',
            { 'w-fit': task },
            { 'w-full p-[15px] gap-[15px] flex justify-start': !task },
          )}
        >
          {!task && (
            <>
              <Plus />
              <span>add task</span>
            </>
          )}
          {task && <Pencil />}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="sr-only">Create Task</DialogTitle>
        <form
          className="flex flex-col gap-5"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col sm:flex-row gap-[15px] w-full">
            <div
              className={cn('flex flex-col gap-2.5 w-full', {
                'sm:w-2/3': isAdmin,
              })}
            >
              <Label className="text-lg">Task title</Label>
              <Input
                placeholder="What's in your mind?"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            {isAdmin && (
              <div className="flex flex-col gap-2.5 grow">
                <Label className="text-lg">Assign to</Label>
                <Select
                  value={selectValue}
                  onValueChange={(value) => {
                    setValue('assignedTo', value)
                    clearErrors('assignedTo')
                  }}
                >
                  <SelectTrigger className="!font-inter">
                    <SelectValue placeholder="Assign to" />
                  </SelectTrigger>
                  <SelectContent className="!font-inter">
                    {users?.length === 0 && (
                      <label className="text-sm text-muted-foreground p-2">
                        No users found
                      </label>
                    )}
                    {users?.map((user) => (
                      <SelectItem
                        key={user.username}
                        value={user.username}
                      >
                        {user.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assignedTo && (
                  <p className="text-sm text-red-500">
                    {errors.assignedTo.message}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <Label className="text-lg">Description</Label>
            <TextArea
              placeholder="Description"
              rows={5}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-[15px]">
            <DialogClose asChild>
              <Button
                variant="attentive"
                disabled={isPending}
                onClick={() => {
                  clearErrors()
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              isLoading={isPending}
              disabled={isPending}
            >
              {task ? 'Save' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
