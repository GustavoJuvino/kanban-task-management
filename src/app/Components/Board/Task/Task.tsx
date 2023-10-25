import React, { useEffect, useMemo, useRef, useState } from 'react'
import Subtasks from './Subtasks'
import Button from '../../Button'
import EditMenu from '../../Header/EditMenu'
import StatusMenu from '../../Modals/TaskModal/StatusMenu'
import ModalBackground from '../../ModalBackground'
import { EditMenuIcon } from '../../../../../public/svgs'

import useClickOutside from '@/app/hooks/useClickOutside'
import { useGlobalContext } from '@/app/context/store'
import useOpenDeleteModal from '@/app/hooks/ModalHooks/useOpenDeleteModal'

import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

// interface TaskProps {
//   title: string
//   description: string
// }

const Task = () => {
  const [loading, setLoading] = useState(false)

  const editMenuRef = useRef(null)
  const { openDeleteTask } = useOpenDeleteModal()

  const router = useRouter()

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
    tasks.map((task) => {
      if (task.id === currentTask.id) {
        setValue('task.id', task.id)
        setValue('task.title', task.title)
        setValue('task.fromColumn', task.fromColumn)
      }
      return task
    })
  }, [setValue, tasks])

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    console.log(data)
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
      <>
        <div className="flex items-center justify-between">
          <h2 className="w-full text-heading-l text-white">
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
      </>
    )
}

export default Task
