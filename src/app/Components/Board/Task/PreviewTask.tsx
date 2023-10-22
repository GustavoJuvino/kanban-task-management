import React, { useEffect, useMemo, useRef, useState } from 'react'
import Task from './Task'
import useClickOutside from '@/app/hooks/useClickOutside'
import ModalBackground from '../../ModalBackground'
import useOpenTaskModal from '@/app/hooks/ModalHooks/useOpenTaskModal'
import useOpenDeleteModal from '@/app/hooks/ModalHooks/useOpenDeleteModal'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import { useGlobalContext } from '@/app/context/store'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'

interface PreviewTaskProps {
  title: string
  description: string
  currentColumnName: string
}

const PreviewTask = ({
  title,
  description,
  currentColumnName,
}: PreviewTaskProps) => {
  const taskRef = useRef(null)
  const [openTask, setOpenTask] = useState(false)
  const [subArr, setSubArr] = useState<SubtaskProps[]>([])

  const { tasks, subtasks } = useGlobalContext()
  const { clickOutside } = useClickOutside()
  const { openEditTask } = useOpenTaskModal()
  const { openDeleteTask } = useOpenDeleteModal()
  const { setCurrentTask } = useSaveCurrentTask()
  const { setCurrentColumn } = useSaveCurrentColumn()

  useEffect(() => {
    if (taskRef) clickOutside(taskRef, setOpenTask)
  }, [clickOutside, setOpenTask])

  useMemo(() => {
    const newArr = [...subArr]
    subtasks.map(
      (sub) =>
        sub.fromTask === title &&
        sub.fromColumn === currentColumnName &&
        newArr.push(sub),
    )
    setSubArr(newArr)
  }, [])

  return (
    <section>
      <div
        onClick={() => {
          setOpenTask(true)
          setCurrentTask(title)
          setCurrentColumn(currentColumnName)
        }}
        className="
          h-auto
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
        {subArr.length > 0 && (
          <span className="text-body-m text-medium-gray">
            {` 0 of ${subArr.length} subtasks`}
          </span>
        )}
      </div>

      {openTask && !openDeleteTask && !openEditTask && (
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
            max-sm:px-4
          "
        >
          <div
            ref={taskRef}
            className="
              z-[500]
              flex 
              h-auto
              w-full 
              flex-col
              gap-y-6
              rounded-md 
              bg-dark-gray 
              p-6
              sm:w-[480px] 
              sm:p-8
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
