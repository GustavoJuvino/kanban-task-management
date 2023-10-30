import React, { useEffect, useRef, useState } from 'react'
import Task from './Task'
import useClickOutside from '@/app/hooks/useClickOutside'
import ModalBackground from '../../ModalBackground'
import useOpenTaskModal from '@/app/helper/ModalHooks/useOpenTaskModal'
import useOpenDeleteModal from '@/app/helper/ModalHooks/useOpenDeleteModal'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import { useGlobalContext } from '@/app/context/store'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'

interface PreviewTaskProps {
  title: string
  taskID: string
  description: string
  taskColumn: string
  taskBoard: string
  currentColumnName: string
}

const PreviewTask = ({ ...props }: PreviewTaskProps) => {
  const taskRef = useRef(null)
  const [openTask, setOpenTask] = useState(false)
  const [subArr, setSubArr] = useState<SubtaskProps[]>([])
  const [completedSubs, setCompletedSubs] = useState<SubtaskProps[]>([])

  const { URL } = useGetCurrentURL()
  const { subtasks } = useGlobalContext()
  const { clickOutside } = useClickOutside()
  const { openEditTask } = useOpenTaskModal()
  const { openDeleteTask } = useOpenDeleteModal()
  const { setCurrentTask } = useSaveCurrentTask()
  const { setCurrentColumn } = useSaveCurrentColumn()

  useEffect(() => {
    if (taskRef) clickOutside(taskRef, setOpenTask)
  }, [clickOutside, setOpenTask])

  useEffect(() => {
    const formatSubs = [...subtasks]
    const checkSubs: SubtaskProps[] = []
    const newArr: SubtaskProps[] = []

    formatSubs.map((sub) => {
      if (
        sub.fromTask === props.title &&
        sub.fromColumn === props.currentColumnName &&
        sub.fromBoard.replace(/\s/g, '') === URL
      ) {
        checkSubs.push(sub)
      }

      if (
        sub.completed &&
        sub.fromTask === props.title &&
        sub.fromColumn === props.currentColumnName &&
        sub.fromBoard.replace(/\s/g, '') === URL
      ) {
        newArr.push(sub)
      }
      return sub
    })

    setSubArr(checkSubs)
    setCompletedSubs(newArr)
  }, [subtasks])

  return (
    <section>
      <div
        onClick={() => {
          setOpenTask(true)
          setCurrentTask({
            id: props.taskID,
            taskColumn: props.taskColumn,
            taskBoard: props.taskBoard,
            taskTitle: props.title,
            taskDescription: props.description,
          })
          setCurrentColumn(props.currentColumnName)
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
          {props.title}
        </h3>
        {subArr.length > 0 && (
          <span className="text-body-m text-medium-gray">
            {` ${completedSubs.length} of ${subArr.length} subtasks`}
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
            <Task />
          </div>

          <ModalBackground />
        </section>
      )}
    </section>
  )
}

export default PreviewTask
