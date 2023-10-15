import React, { useEffect, useRef, useState } from 'react'
import Task from '../Task'
import useClickOutside from '@/app/hooks/useClickOutside'
import ModalBackground from '../ModalBackground'

const PreviewTask = ({ title, description }: TaskProps) => {
  const { clickOutside } = useClickOutside()

  const taskRef = useRef(null)
  const [openTask, setOpenTask] = useState(false)

  useEffect(() => {
    if (taskRef) clickOutside(taskRef, setOpenTask)
  }, [clickOutside, setOpenTask])

  return (
    <section>
      <div
        onClick={() => setOpenTask(true)}
        className="
          h-[88px] 
          w-[280px] 
          cursor-pointer 
          rounded-lg 
          bg-dark-gray 
          px-4 
          py-[23px]
        "
      >
        <h3 className="text-heading-m text-white duration-300 hover:text-main-purple">
          {title}
        </h3>
        <span className="text-body-m text-medium-gray">0 of 3 substasks</span>
      </div>

      {openTask && (
        <section
          className="
            absolute
            left-0
            top-0
            flex
            h-full
            w-full 
            cursor-default
            flex-col
            items-center
            justify-center
          "
        >
          <div
            ref={taskRef}
            className="
              z-[500]
              flex 
              h-[523px] 
              w-[480px] 
              flex-col
              gap-y-6 
              rounded-md 
            bg-dark-gray 
              p-8
            "
          >
            <Task title={title} description={description} />
          </div>
          <ModalBackground />
        </section>
      )}
    </section>
  )
}

export default PreviewTask
