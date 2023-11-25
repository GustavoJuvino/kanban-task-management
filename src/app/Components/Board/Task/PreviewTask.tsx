/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconDrag } from '../../../../../public/svgs'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import useOpenTask from '@/app/helper/ModalHooks/useOpenTask'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'

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

  const { URL } = useGetCurrentURL()
  const { subtasks } = useGlobalContext()
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
