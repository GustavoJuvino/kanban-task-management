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

interface TaskProps {
  title: string
  description: string
}

const Task = ({ title, description }: TaskProps) => {
  const [loading, setLoading] = useState(false)
  const [columnName, setColumnName] = useState([''])

  const editMenuRef = useRef(null)
  const { openDeleteTask } = useOpenDeleteModal()

  const { clickOutside } = useClickOutside()
  const { columns, tasks, subtasks } = useGlobalContext()
  const [openEditMenu, setOpenEditMenu] = useState(false)

  const createEditTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      task: { fromColumn: 'Todo' },
      subtasks: [{ name: '', completed: false }],
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createEditTaskForm

  useEffect(() => {
    if (editMenuRef) clickOutside(editMenuRef, setOpenEditMenu)
  }, [clickOutside])

  useMemo(() => {
    const newArr = columns.map((col) => col.columnName)
    setColumnName(newArr)
  }, [columns])

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    console.log(data)
    // setLoading(true)
  }

  if (!openDeleteTask)
    return (
      <>
        <div className="flex items-center justify-between">
          <h2 className="w-full text-heading-l text-white">{title}</h2>
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

        <p className="text-body-l text-medium-gray">{description}</p>

        <FormProvider {...createEditTaskForm}>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Subtasks currentTaskTitle={title} />
            <StatusMenu menuType="edit" />
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
