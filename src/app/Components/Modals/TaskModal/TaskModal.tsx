import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../Button'
import StatusMenu from '../StatusMenu'
import ModalBackground from '../../ModalBackground'
import { Close } from '../../../../../public/modal'

import useSaveStatus from '@/app/hooks/useSaveStatus'
import { useGlobalContext } from '@/app/context/store'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import useOpenTaskModal from '@/app/hooks/ModalHooks/useOpenTaskModal'

import axios from 'axios'
import { Form } from '../../form'
import { toast } from 'react-toastify'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import SubtasksModal from './SubtasksModal'

interface TaskModalProps {
  modalType: ModalTypeProps
}

const TaskModal = ({ modalType }: TaskModalProps) => {
  const { currentTask } = useSaveCurrentTask()
  const { status, setStatus } = useSaveStatus()
  const [loading, setLoading] = useState(false)
  const { columns, tasks } = useGlobalContext()
  const { onOpenNewTask, onOpenEditTask } = useOpenTaskModal()

  const createTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      columns: [{ itemID: '', columnName: '' }],
      task: { title: '', description: '', status: '' },
      subtasks: [{ subtaskID: 0, name: '', completed: false }],
    },
  })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = createTaskForm

  useMemo(() => {
    setStatus(columns[0].columnName)
  }, [])

  // Add New Task
  useEffect(() => {
    if (modalType === 'add') {
      setValue('task.status', status)

      columns.map((col, index) => {
        setValue(`columns.${index}.itemID`, col.itemID)
        setValue(`columns.${index}.columnName`, col.columnName)

        return col
      })
    }
  }, [modalType, status, setValue, columns])

  // Edit Task
  useMemo(() => {
    if (modalType === 'edit') {
      tasks.map((task) => {
        if (task.title === currentTask) {
          setValue(`task.title`, task.title)
          setValue(`task.description`, task.description)
        }
        return task
      })
    }
  }, [modalType, tasks, currentTask, setValue])

  // Clean this axios methods
  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    console.log(data)
    setLoading(true)
    if (modalType === 'add') {
      axios
        .post('/api/tasks', data)
        .then(() => {
          toast.success('Task created successfully!')
        })
        .catch((error) => {
          if (error.request.status === 409)
            toast.error(error.response.data.message)
          else toast.error('Something went wrong')
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (modalType === 'edit') {
      axios
        .post('/api/tasks', data)
        .then(() => {
          toast.success('Task created successfully!')
        })
        .catch((error) => {
          if (error.request.status === 409)
            toast.error(error.response.data.message)
          else toast.error('Something went wrong')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <section
      className="
        absolute
        left-0
        top-0
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
      "
    >
      <ModalBackground />
      <div
        id="task_container"
        className="
          absolute 
          z-50 
          h-auto
          w-auto 
          rounded-md
          bg-dark-gray
          p-6
          mobile:w-[343px]
          sm:w-[480px]
          sm:p-8
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-heading-m text-white sm:text-heading-l">
            {modalType === 'add' ? 'Add New Task' : 'Edit Task'}
          </h2>
          <Close
            onClick={() =>
              modalType === 'add' ? onOpenNewTask(false) : onOpenEditTask(false)
            }
            className="
              cursor-pointer 
              fill-[#828FA3] 
              duration-300 
              hover:fill-red
            "
          />
        </div>

        <FormProvider {...createTaskForm}>
          <form
            id="task_form"
            className="mt-2 flex flex-col gap-y-6 sm:mt-6"
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <Form.Field className="block">
              <Form.Label className="text-body-m text-white">
                Title
                <Form.Input
                  type="text"
                  name="task.title"
                  id="task_input"
                  className="mt-2"
                  placeholder="e.g Take coffee break"
                />
              </Form.Label>
            </Form.Field>

            <Form.Field className="flex flex-col">
              <Form.Label className="text-body-m text-white">
                Description
                <textarea
                  id="task_input"
                  {...register('task.description', {
                    required: "Can't be empty",
                  })}
                  placeholder="e.g. It’s always good to take a break. This 15 minute
                    break will recharge the batteries a little."
                  className="                
                    mt-2
                    h-[112px]
                    w-full
                    resize-none
                    rounded-[4px]
                    border-[1px]
                    border-[#828FA3]
                    border-opacity-25
                    bg-transparent
                    py-2
                    pl-4
                    text-body-l
                    text-white
                    outline-none
                    duration-300
                    focus:border-main-purple
                  "
                />
              </Form.Label>
            </Form.Field>

            <SubtasksModal modalType={modalType === 'add' ? 'add' : 'edit'} />
            <StatusMenu menuType="add" />

            <Button className={`${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
              {modalType === 'add' ? 'Create Task' : 'Save Changes'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

export default TaskModal
