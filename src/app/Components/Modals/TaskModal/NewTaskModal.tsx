import React, { useState } from 'react'
import Button from '../../Button'
import Subtasks from './Subtasks'
import StatusMenu from '../StatusMenu'
import ModalBackground from '../../ModalBackground'
import { Close } from '../../../../../public/modal'

import { useGlobalContext } from '@/app/context/store'
import useOpenTaskModal from '@/app/hooks/ModalHooks/useOpenTaskModal'

import { Form } from '../../form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'

interface NewTaskModalProps {
  modalType: ModalTypeProps
}

const NewTaskModal = ({ modalType }: NewTaskModalProps) => {
  const { columns } = useGlobalContext()
  const [loading, setLoading] = useState(false)
  const { onOpenNewTask, onOpenEditTask } = useOpenTaskModal()

  const createTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      task: { title: '', description: '', status: columns[0].columnName },
      subtasks: [{ subtaskID: 0, name: '' }],
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = createTaskForm

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    setLoading(true)
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
          p-8
          sm:w-[480px]
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

            <Subtasks />
            <StatusMenu />

            <Button className={`${loading ? 'cursor-wait' : 'cursor-default'}`}>
              {modalType === 'add' ? 'Create Task' : 'Save Changes'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

export default NewTaskModal
