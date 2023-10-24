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

interface TaskModalProps {
  modalType: ModalTypeProps
}

const TaskModal = ({ modalType }: TaskModalProps) => {
  const [loading, setLoading] = useState(false)
  const { columns, tasks, subtasks } = useGlobalContext()

  const router = useRouter()
  const { currentTask } = useSaveCurrentTask()
  const { currentColumn } = useSaveCurrentColumn()
  const { onOpenNewTask, onOpenEditTask } = useOpenTaskModal()

  const createTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      columns: [{ itemID: '', columnName: '' }],
      task: {
        id: '',
        title: '',
        columnID: '',
        fromColumn: '',
        updateColumn: '',
        description: '',
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

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = createTaskForm

  // Add Task
  useEffect(() => {
    if (modalType === 'add') {
      setValue('task.updateColumn', currentColumn)
      columns.map((col, index) => {
        setValue(`columns.${index}.itemID`, col.itemID)
        setValue(`columns.${index}.columnName`, col.columnName)

        return col
      })
    }
  }, [modalType, currentColumn, setValue, columns])

  // Edit Task
  useEffect(() => {
    if (modalType === 'edit') {
      tasks.map((task: TaskProps) => {
        if (
          task.id === currentTask.id &&
          task.title === currentTask.taskTitle
        ) {
          setValue(`task.id`, task.id)
          setValue(`task.title`, task.title)
          setValue(`task.columnID`, task.columnID)
          setValue('task.fromColumn', task.fromColumn)
          setValue('task.updateColumn', currentColumn)
          setValue(`task.description`, task.description)
        }

        return task
      })

      if (subtasks[0].fromColumn === currentTask.taskColumn) {
        setValue(`subtasks.${0}.id`, subtasks[0].id)
        setValue(`subtasks.${0}.name`, subtasks[0].name)
        setValue(`subtasks.${0}.fromTask`, subtasks[0].fromTask)
        setValue(`subtasks.${0}.fromColumn`, subtasks[0].fromColumn)
      }
    }
  }, [modalType, tasks, subtasks, currentTask, currentColumn, setValue])

  const axiosRequest = (url: string, data: TaskFormInputs) => {
    axios
      .post(url, data)
      .then(() => {
        router.refresh()
        if (modalType === 'add') {
          onOpenNewTask(false)
          toast.success('Task created successfully!')
        } else {
          onOpenEditTask(false)
          toast.success('Task updated successfully!')
        }
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

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    console.log(data)

    setLoading(true)
    if (modalType === 'add') axiosRequest('/api/tasks', data)
    if (modalType === 'edit') axiosRequest('/api/tasks/update', data)
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
              modalType={modalType}
              isSubmitting={isSubmitting}
              subtasksErrors={errors.subtasks}
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
