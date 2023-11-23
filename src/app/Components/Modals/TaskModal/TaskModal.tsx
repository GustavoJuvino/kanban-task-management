/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Button from '../../Button'
import StatusMenu from './StatusMenu'
import { motion } from 'framer-motion'
import SubtasksModal from './SubtasksModal'
import ModalBackground from '../../ModalBackground'
import { Close } from '../../../../../public/modal'
import HashLoader from 'react-spinners/HashLoader'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'
import useOpenTaskModal from '@/app/helper/ModalHooks/useOpenTaskModal'

import axios from 'axios'
import { Form } from '../../form'
import ObjectID from 'bson-objectid'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

interface TaskModalProps {
  modalType: ModalTypeProps
}

const TaskModal = ({ modalType }: TaskModalProps) => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { URL } = useGetCurrentURL()
  const { currentTask } = useSaveCurrentTask()
  const { currentColumn } = useSaveCurrentColumn()
  const { onOpenNewTask, onOpenEditTask } = useOpenTaskModal()
  const { boards, columns, tasks, subtasks } = useGlobalContext()

  let objectID = ''
  const generateObjectID = () => (objectID = ObjectID().toHexString())

  const createTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      columns: [{ itemID: '', columnName: '' }],
      task: {
        id: '',
        title: '',
        itemID: '',
        columnID: '',
        fromBoard: '',
        fromColumn: '',
        description: '',
        updateTitle: '',
        updateColumn: '',
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
      const itemID = tasks.map((task) => Number(task.taskItemID))

      setValue(
        'task.taskItemID',
        itemID.length > 0 ? String(Math.max(...itemID) + 1) : '0',
      )
      setValue('task.updateColumn', currentColumn)

      boards.map(
        (board) =>
          board.boardName.replace(/\s/g, '') === URL &&
          setValue('task.fromBoard', board.boardName.replace(/\s/g, '')),
      )

      columns.map((col, index) => {
        setValue(`columns.${index}.itemID`, col.itemID)
        setValue(`columns.${index}.columnName`, col.columnName)

        return col
      })
    }
  }, [modalType, currentColumn, setValue, columns, boards, URL])

  // Edit Task
  useEffect(() => {
    if (modalType === 'edit') {
      tasks.map((task) => {
        if (
          task.id === currentTask.id &&
          task.title === currentTask.taskTitle
        ) {
          setValue(`task.id`, task.id)
          setValue(`task.title`, task.title)
          setValue('task.fromBoard', task.fromBoard)
          setValue('task.fromColumn', task.fromColumn)
          setValue('task.updateColumn', currentColumn)
          setValue(`task.updateTitle`, task.updateTitle)
          setValue(`task.description`, task.description)
        }

        return task
      })

      const newArr: SubtaskProps[] = []
      subtasks.sort((a, b) => Number(a.subtaskID) - Number(b.subtaskID))

      subtasks.map((sub) => {
        if (
          sub.fromTask === currentTask.taskTitle &&
          sub.fromColumn === currentTask.taskColumn &&
          sub.fromBoard === currentTask.taskBoard
        ) {
          newArr.push(sub)
        } else {
          generateObjectID()
          setValue(`subtasks.${0}.id`, objectID)
        }
        return sub
      })

      newArr.map((item, index) => {
        if (index < 1) {
          setValue(`subtasks.${0}.id`, item.id)
          setValue(`subtasks.${0}.name`, item.name)
          setValue(`subtasks.${0}.fromTask`, item.fromTask)
          setValue(`subtasks.${0}.fromColumn`, item.fromColumn)
        }
        return item
      })
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
          toast.success('Task edited successfully!')
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
    setLoading(true)
    if (modalType === 'add') axiosRequest('/api/tasks', data)
    if (modalType === 'edit') axiosRequest('/api/tasks/edit', data)
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
      <motion.section
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        id="task_container"
        className="
          z-50
          h-auto
          w-full
          rounded-md
          bg-white
          p-6
          dark:bg-dark-gray
          sm:w-[480px]
          sm:p-8
        "
      >
        <div className="flex w-full items-center justify-between">
          <h2 className="text-heading-m text-black dark:text-white sm:text-heading-l">
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
            className="mt-6 flex flex-col gap-y-6 text-medium-gray dark:text-white"
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <Form.Field className="flex flex-col gap-y-2">
              <Form.Label htmlFor="task_input" className="text-body-m ">
                Title
              </Form.Label>
              <Form.Input
                type="text"
                name="task.updateTitle"
                id="task_input"
                error={errors.task?.updateTitle?.message}
                placeholder="e.g Take coffee break"
                className={`${errors.task && 'border-opacity-100'}`}
              />
            </Form.Field>

            <Form.Field className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <Form.Label className="text-body-m ">Description</Form.Label>
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

            {loading ? (
              <span className="flex w-full justify-center">
                <HashLoader color="#635FC7" />
              </span>
            ) : (
              <Button
                className={`${loading ? 'cursor-wait' : 'cursor-pointer'}`}
              >
                {modalType === 'add' ? 'Create Task' : 'Save Changes'}
              </Button>
            )}
          </form>
        </FormProvider>
      </motion.section>
    </section>
  )
}

export default TaskModal
