import React from 'react'
import { Close } from '../../../../../public/modal'
import Button from '../../Button'
import Subtasks from './Subtasks'
import StatusMenu from '../StatusMenu'
import ModalBackground from '../../ModalBackground'
import useOpenTaskModal from '@/app/hooks/useOpenTaskModal'

interface TaskModalProps {
  modalType: ModalTypeProps
}

const TaskModal = ({ modalType }: TaskModalProps) => {
  const { onOpenNewTask, onOpenEditTask } = useOpenTaskModal()

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
        className="
          absolute 
          z-50 
          h-auto
          w-[480px] 
          rounded-md
          bg-dark-gray
          p-8 
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-heading-l text-white">
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

        <form className="mt-6 flex flex-col gap-y-6">
          <fieldset className="block">
            <label className="text-body-m text-white">
              {' '}
              Title
              <input
                id="task_input"
                name="titles"
                type="text"
                placeholder="e.g. Take coffee break"
                className="
                  mt-2
                  h-10
                  w-full
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
            </label>
          </fieldset>

          <fieldset className="flex flex-col">
            <label className="text-body-m text-white">
              Description
              <textarea
                id="task_input"
                name="description"
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
            </label>
          </fieldset>

          <Subtasks />
          <StatusMenu title="Current Statuts" name="current_status" />

          <Button>
            {modalType === 'add' ? 'Create Task' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default TaskModal
