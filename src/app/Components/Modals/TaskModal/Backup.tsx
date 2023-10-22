import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../Button'
import StatusMenu from './StatusMenu'
import ModalBackground from '../../ModalBackground'
import { Close } from '../../../../../public/modal'

import { useGlobalContext } from '@/app/context/store'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'
import useOpenTaskModal from '@/app/hooks/ModalHooks/useOpenTaskModal'

import axios from 'axios'
import { Form } from '../../form'
import { toast } from 'react-toastify'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import SubtasksModal from './SubtasksModal'
import { useRouter } from 'next/navigation'
import { title } from 'process'

interface TaskModalProps {
  modalType: ModalTypeProps
}

const TaskModal = ({ modalType }: TaskModalProps) => {
  const [loading, setLoading] = useState(false)
  const { columns, tasks } = useGlobalContext()

  const router = useRouter()
  const { currentTask } = useSaveCurrentTask()
  const { currentColumn, setCurrentColumn } = useSaveCurrentColumn()
  const { onOpenNewTask, onOpenEditTask } = useOpenTaskModal()

  const createTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      columns: [{ itemID: '', columnName: '' }],
      task: { title: '', description: '', fromColumn: '' },
      subtasks: [{ subtaskID: 0, name: '', completed: false }],
    },
  })

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = createTaskForm

  useEffect(() => {
    if (modalType === 'add') {
      setValue(`task.fromColumn`, columns[0].columnName)
      columns.map((col, index) => {
        setValue(`columns.${index}.itemID`, col.itemID)
        setValue(`columns.${index}.columnName`, col.columnName)

        return col
      })
    }
  }, [setValue, columns, modalType, setCurrentColumn])

  // Edit Task
  useEffect(() => {
    if (modalType === 'edit') {
      tasks.map((task: TaskProps) => {
        if (task.title === currentTask && task.fromColumn === currentColumn) {
          setValue(`task.title`, task.title)
          setValue('task.fromColumn', task.fromColumn)
          setValue(`task.description`, task.description)
        }
        return task
      })
    }
  }, [modalType, tasks, currentTask, currentColumn, setValue, columns])

  const axiosRequest = (data: TaskFormInputs) => {
    axios
      .post('/api/tasks', data)
      .then(() => {
        router.refresh()
        reset({
          task: { title: '', description: 'teste', fromColumn: currentColumn },
        })
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

  useEffect(() => {
    console.log(currentColumn)
  }, [currentColumn])

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    console.log(data)
    setLoading(true)
    if (modalType === 'add') axiosRequest(data)

    if (modalType === 'edit') {
      // axios
      //   .post('/api/tasks', data)
      //   .then(() => {
      //     toast.success('Task created successfully!')
      //   })
      //   .catch((error) => {
      //     if (error.request.status === 409)
      //       toast.error(error.response.data.message)
      //     else toast.error('Something went wrong')
      //   })
      //   .finally(() => {
      //     setLoading(false)
      //   })
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
        px-4
      "
    >
      <ModalBackground />
      <section
        id="task_container"
        className=" 
          z-50 
          h-auto
          w-full
          rounded-md
          bg-dark-gray
          p-6
          sm:w-[480px]
          sm:p-8
        "
      >
        <div className="flex w-full items-center justify-between">
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
            className="mt-6 flex flex-col gap-y-6"
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <Form.Field className="flex flex-col gap-y-2">
              <Form.Label
                htmlFor="task_input"
                className="text-body-m text-white"
              >
                Title
              </Form.Label>
              <Form.Input
                type="text"
                name="task.title"
                id="task_input"
                error={errors.task?.title?.message}
                placeholder="e.g Take coffee break"
                className={`${errors.task && 'border-opacity-100'}`}
              />
            </Form.Field>

            <Form.Field className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <Form.Label className="text-body-m text-white">
                  Description
                </Form.Label>
                {errors.task?.description?.message && (
                  <span className="text-[12px] text-red sm:text-body-l">
                    {errors.task?.description?.message}
                  </span>
                )}
              </div>
              <Form.TextArea
                id="task_input"
                name="task.description"
                error={errors.task?.description?.message}
              />
            </Form.Field>

            <SubtasksModal
              subtasksErrors={errors.subtasks}
              modalType={modalType === 'add' ? 'add' : 'edit'}
            />
            <StatusMenu menuType="add" />

            <Button className={`${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
              {modalType === 'add' ? 'Create Task' : 'Save Changes'}
            </Button>
          </form>
        </FormProvider>
      </section>
    </section>
  )
}

export default TaskModal
