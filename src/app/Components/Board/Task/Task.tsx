import React, { useEffect, useMemo, useRef, useState } from 'react'
import { EditMenuIcon } from '../../../../../public/svgs'
import StatusMenu from '../../Modals/StatusMenu'
import EditMenu from '../../Header/EditMenu'
import ModalBackground from '../../ModalBackground'
import useClickOutside from '@/app/hooks/useClickOutside'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { Form } from '../../form'
import { useGlobalContext } from '@/app/context/store'
import Subtasks from './Subtasks'

interface TaskProps {
  title: string
  description: string
}

const Task = ({ title, description }: TaskProps) => {
  const [columnName, setColumnName] = useState([''])

  const editMenuRef = useRef(null)

  const { clickOutside } = useClickOutside()
  const { columns, tasks, subtasks } = useGlobalContext()
  const [openEditMenu, setOpenEditMenu] = useState(false)

  const createEditTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      task: { status: 'Todo' },
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
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="w-[345px] text-heading-l text-white">{title}</h2>
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
            className="right-[-6.2rem]"
            open={openEditMenu}
            menuType="task"
          />
        </div>
      </div>

      <p className="text-body-l text-medium-gray">{description}</p>

      <FormProvider {...createEditTaskForm}>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <h6 className="text-body-m text-white">{`Subtasks ( 0 of 3)`}</h6>
          <Subtasks currentTask={title} />

          {/* <Form.Field className="mt-4 flex flex-col gap-y-2">
             {formatedArr !== undefined &&
              formatedArr.map((sub) => (
                <Form.LabelCheck
                  key={sub.id}
                  className={` ${check && 'line-through'}`}
                >
                  <div className="relative">
                    <Form.InputCheck
                      type="checkbox"
                      name="subtasks"
                      onClick={() => setCheck(!check)}
                      className={`${check && `bg-main-purple`}`}
                    />
                    {check && (
                      <CheckIcon
                        className="absolute left-0 top-0"
                        sx={{ fontSize: 16, color: 'white' }}
                      />
                    )}
                  </div>
                  {sub.name}
                </Form.LabelCheck>
              ))} 
          </Form.Field> */}
          <StatusMenu menuType="edit" />
          <button type="submit"> submit </button>
        </form>
      </FormProvider>
    </>
  )
}

export default Task
