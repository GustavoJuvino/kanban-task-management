import React, { useEffect, useRef, useState } from 'react'
import Subtasks from './Subtasks'
import Button from '../../Button'
import EditMenu from '../../Header/EditMenu'
import StatusMenu from '../../Modals/TaskModal/StatusMenu'
import { EditMenuIcon } from '../../../../../public/svgs'

import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import useClickOutside from '@/app/hooks/useClickOutside'
import useOpenTask from '@/app/helper/ModalHooks/useOpenTask'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import useOpenDeleteModal from '@/app/helper/ModalHooks/useOpenDeleteModal'

import axios from 'axios'
import { toast } from 'react-toastify'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

const Task = () => {
  const taskRef = useRef(null)

  const [loading, setLoading] = useState(false)

  const editMenuRef = useRef(null)
  const { openDeleteTask } = useOpenDeleteModal()

  const router = useRouter()

  const { openTask, onOpenTask } = useOpenTask()
  const { clickOutside } = useClickOutside()
  const { currentTask } = useSaveCurrentTask()
  const { tasks } = useGlobalContext()
  const [openEditMenu, setOpenEditMenu] = useState(false)

  const createEditTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      task: {
        id: '',
        title: '',
        status: '',
        fromColumn: '',
      },
      subtasks: [
        {
          id: '',
          name: '',
          subtaskID: 0,
          fromTask: '',
          fromColumn: '',
          completed: false,
        },
      ],
    },
  })

  const { setValue, handleSubmit } = createEditTaskForm

  useEffect(() => {
    if (editMenuRef) clickOutside(editMenuRef, setOpenEditMenu)
  }, [clickOutside])

  useEffect(() => {
    tasks.map((task: TaskProps) => {
      if (currentTask.id === task.id) {
        setValue('task.id', currentTask.id)
        setValue('task.title', task.title)
        setValue('task.status', task.status ? task.status : undefined)
        setValue('task.fromColumn', task.fromColumn)
      }
      return task
    })
  }, [setValue, tasks, currentTask])

  const [clickOutsideTask, setClickOutsideTask] = useState(true)

  useEffect(() => {
    if (taskRef) clickOutside(taskRef, setClickOutsideTask)
  }, [clickOutside])

  useEffect(() => {
    if (openTask) setClickOutsideTask(true)
    if (!clickOutsideTask) onOpenTask(false)
  }, [openTask, onOpenTask, clickOutsideTask])

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    setLoading(true)

    axios
      .post('/api/tasks/update', data)
      .then(() => {
        router.refresh()
        toast.success('Task updated successfully!')
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (!openDeleteTask)
    return (
      <div
        ref={taskRef}
        className="
          z-[500]
          flex 
          h-auto
          w-full 
          flex-col
          gap-y-6
          rounded-md 
          bg-white 
          p-6
          dark:bg-dark-gray
          sm:w-[480px] 
          sm:p-8
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-heading-l text-black dark:text-white max-sm:px-2 sm:w-[387px]">
            {currentTask.taskTitle}
          </h2>
          <div ref={editMenuRef} className="relative">
            <EditMenuIcon
              onClick={() => setOpenEditMenu(!openEditMenu)}
              className="
              cursor-pointer 
              fill-medium-gray 
              duration-300 
              hover:fill-main-purple
            "
            />
            <EditMenu
              menuType="task"
              open={openEditMenu}
              className="right-[-0.5rem] md:right-[-6.2rem]"
            />
          </div>
        </div>

        <p className="text-body-l text-medium-gray">
          {currentTask.taskDescription}
        </p>

        <FormProvider {...createEditTaskForm}>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Subtasks />
            <StatusMenu menuType="edit" setFirstValue={setValue} />
            <Button
              type="submit"
              className={`mt-6 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}
            >
              Save Task Changes
            </Button>
          </form>
        </FormProvider>
      </div>
    )
}

export default Task
