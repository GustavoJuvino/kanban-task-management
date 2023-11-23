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
import { IconDrag } from '../../../../../public/svgs'
import { useTheme } from 'next-themes'
import useOpenTask from '@/app/helper/ModalHooks/useOpenTask'
import { motion } from 'framer-motion'

interface PreviewTaskProps {
  title: string
  taskID: string
  description: string
  taskColumn: string
  taskBoard: string
  currentColumnName: string
}

const PreviewTask = ({ ...props }: PreviewTaskProps) => {
  const [taskHover, setTaskHover] = useState<string>()
  const [subArr, setSubArr] = useState<SubtaskProps[]>([])
  const [completedSubs, setCompletedSubs] = useState<SubtaskProps[]>([])

  const { theme } = useTheme()
  const { URL } = useGetCurrentURL()
  const { subtasks } = useGlobalContext()
  const { openEditTask } = useOpenTaskModal()
  const { openDeleteTask } = useOpenDeleteModal()
  const { setCurrentTask } = useSaveCurrentTask()
  const { setCurrentColumn } = useSaveCurrentColumn()

  const { onOpenTask } = useOpenTask()

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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onMouseEnter={() => setTaskHover(props.taskID)}
        onMouseLeave={() => setTaskHover('-1')}
        onClick={() => {
          onOpenTask(true)
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
          flex 
          h-auto
          w-[280px] 
          cursor-pointer
          gap-x-2 
          rounded-lg
          bg-white 
          px-4 
          py-[23px]
          shadow-md
          dark:bg-dark-gray
        "
      >
        <IconDrag
          className={`            
            duration-300
            ${
              taskHover === props.taskID
                ? 'fill-main-purple'
                : 'fill-medium-gray'
            }
          `}
        />
        <article>
          <h3
            className={`
            w-fit
            text-heading-m 
            duration-300
            ${taskHover === props.taskID && 'text-main-purple'}
          `}
          >
            {props.title}
          </h3>
          {subArr.length > 0 && (
            <span className="text-body-m text-medium-gray">
              {` ${completedSubs.length} of ${subArr.length} subtasks`}
            </span>
          )}
        </article>
      </motion.div>
    </>
  )
}

export default PreviewTask
