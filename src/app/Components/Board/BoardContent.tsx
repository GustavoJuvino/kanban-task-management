'use client'

import React, { useEffect, useState } from 'react'
import Button from '../Button'
import PreviewTask from './Task/PreviewTask'

import { NoSsr } from '@mui/material'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import { useHideSidebar } from '@/app/helper/useHideSidebar'
import useOpenBoardModal from '@/app/helper/ModalHooks/useOpenBoardModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import useOpenTaskModal from '@/app/helper/ModalHooks/useOpenTaskModal'
import useOpenDeleteModal from '@/app/helper/ModalHooks/useOpenDeleteModal'
import useOpenTask from '@/app/helper/ModalHooks/useOpenTask'

const BoardContent = () => {
  const [update, setUpdate] = useState(false)
  const [seconds, setSeconds] = useState(1800)

  const [updateTasks, setUpdateTasks] = useState<TaskProps[]>([])
  const [formatedArr, setFormatedArr] = useState<ColumnsProps[]>([])

  const { hidden } = useHideSidebar()
  const { onOpenEditBoard, openNewBoard, openEditBoard } = useOpenBoardModal()

  const router = useRouter()
  const { URL } = useGetCurrentURL()
  const { theme } = useTheme()

  const { openTask } = useOpenTask()

  const { tasks, columns, subtasks, setTasks, setSubTasks } = useGlobalContext()

  // Just hiding the default props error, not fix
  const error = console.error
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return
    error(...args)
  }

  useEffect(() => {
    if (columns.length > 0) {
      setFormatedArr(
        columns.sort((a, b) => Number(a.itemID) - Number(b.itemID)),
      )
    }
  }, [columns])

  function updateSubtasks(task: TaskProps, destination: string) {
    const uptadeSubs: SubtaskProps[] = [...subtasks]

    uptadeSubs.map((sub, index) => {
      if (
        (sub.fromColumn === task.fromColumn && sub.fromTask === task.title) ||
        (sub.fromColumn === task.updateColumn && sub.fromTask === task.title)
      ) {
        uptadeSubs.splice(index, 1, { ...sub, fromColumn: destination })
      }

      return sub
    })

    setSubTasks(uptadeSubs)
  }

  const handleDragDrop = (results: any) => {
    if (!results.destination) return null

    const reorderedTasks = [...tasks]
    const [reorderItem] = reorderedTasks.splice(results.source.index, 1)

    const destinationColumn = columns.filter(
      (col) => col.columnName === results.destination.droppableId && col.itemID,
    )

    const currentSubtasksIDS: string[] = []

    subtasks.map(
      (sub) =>
        sub.fromTask === reorderItem.title &&
        sub.fromColumn === reorderItem.fromColumn &&
        currentSubtasksIDS.push(sub.id),
    )

    const currentTasks: TaskProps[] = []
    reorderedTasks.map((task) => {
      task.updateColumn === results.destination.droppableId &&
        currentTasks.push(task)
      return task
    })

    const checkTaskExistence = currentTasks.map((task) => {
      if (reorderItem.title === task.title) {
        return true
      } else return false
    })

    if (reorderItem.updateColumn === results.destination.droppableId) {
      reorderedTasks.splice(results.destination.index, 0, {
        ...reorderItem,
        subtasksIDS: currentSubtasksIDS,
        updateColumn: results.destination.droppableId,
      })
    }

    if (reorderItem.updateColumn !== results.destination.droppableId) {
      if (checkTaskExistence.some((x) => x)) {
        toast.error('Task already exists in this column')
        reorderedTasks.splice(results.source.index, 0, reorderItem)
      } else {
        updateSubtasks(reorderItem, results.destination.droppableId)

        reorderedTasks.splice(
          results.source.index < results.destination.index
            ? results.destination.index - 1
            : results.destination.index,
          0,
          {
            ...reorderItem,
            subtasksIDS: currentSubtasksIDS,
            itemID: destinationColumn[0].itemID,
            updateColumn: results.destination.droppableId,
          },
        )
      }
    }

    setUpdate(true)
    setSeconds(seconds + 150)
    setTasks(reorderedTasks)
  }

  useEffect(() => {
    const newArr: TaskProps[] = []

    tasks.map((task, index) =>
      newArr.push({ ...task, taskItemID: index.toString() }),
    )

    setUpdateTasks(newArr)
  }, [tasks])

  useEffect(() => {
    if (update && seconds > 0 && updateTasks.length > 0) {
      const debounceId = setTimeout(() => {
        axios
          .post('/api/tasks/updateItemID', {
            tasks: updateTasks,
            subtasks,
          })
          .then(() => {
            router.refresh()
          })
          .catch((error) => {
            if (error.request.status === 409)
              toast.error(error.response.data.message)
          })
          .finally(() => {
            setUpdate(false)
          })
        setUpdate(false)
        setSeconds(1800)
      }, seconds)

      return () => {
        clearTimeout(debounceId)
      }
    }
  }, [update, updateTasks, subtasks, seconds, router])

  const [HTML, setHTML] = useState<string>()

  useEffect(() => {
    setHTML(document.getElementById('HTML')?.className)
  }, [])

  if (columns.length > 0) {
    return (
      <NoSsr>
        <DragDropContext onDragEnd={handleDragDrop}>
          <section
            className="
            ml-6
            mt-6
            flex 
            h-full
            w-full 
            select-none 
            snap-x 
            gap-x-6
            overflow-auto
            scroll-smooth
            pb-[50px]
          "
          >
            {formatedArr?.map((col) => (
              <section key={col.itemID}>
                <Droppable droppableId={col.columnName} type="group">
                  {(provided) => (
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex h-full flex-col gap-y-6 "
                    >
                      <div className="flex w-40 gap-x-3">
                        <i
                          style={{ backgroundColor: col.color }}
                          className="h-[15px] w-[15px] rounded-full"
                        />

                        <h4 className="text-heading-s uppercase text-medium-gray">
                          {`${col.columnName}`}
                        </h4>
                      </div>

                      <section className="flex flex-col gap-y-6">
                        {tasks.map(
                          (task, index) =>
                            task.fromBoard.replace(/\s/g, '') === URL &&
                            task.updateColumn === col.columnName && (
                              <Draggable
                                key={task.id}
                                index={index}
                                draggableId={task.id}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <PreviewTask
                                      key={task.id}
                                      taskID={task.id}
                                      title={task.title}
                                      taskBoard={task.fromBoard}
                                      taskColumn={task.fromColumn}
                                      description={task.description}
                                      currentColumnName={col.columnName}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ),
                        )}
                      </section>
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </section>
            ))}

            <section className="relative mt-10 h-auto w-[280px]">
              <div
                id={`${
                  (theme === 'system' && HTML === 'light') || theme === 'light'
                    ? 'new_column_light'
                    : 'new_column_dark'
                }`}
                className="
                  h-full
                  w-[280px]
                  rounded-md
                "
              />
              <div
                onClick={() => onOpenEditBoard(true)}
                className="
                  absolute 
                  top-0 
                  flex 
                  h-full 
                  w-full
                  flex-col 
                  items-center 
                  justify-center
                "
              >
                <h1
                  className="
                  cursor-pointer 
                  text-heading-xl 
                  text-medium-gray 
                  duration-300 
                  hover:text-main-purple
                "
                >
                  + New Column
                </h1>
              </div>
            </section>
          </section>
        </DragDropContext>
      </NoSsr>
    )
  } else
    return (
      <section
        className={`
          z-10 
          flex 
          items-center 
          justify-center
          ${hidden ? 'absolute left-0 h-full w-full' : 'h-full w-auto'}
        `}
      >
        <div className="flex flex-col items-center gap-y-8 px-4">
          <h2 className="text-center text-heading-m text-medium-gray sm:text-heading-l">
            This board is empty. Create a new column to get started.
          </h2>
          <Button
            onClick={() => onOpenEditBoard(true)}
            className="
              flex 
              h-12 
              w-[174px] 
              items-center 
              justify-center
            "
          >
            + Add new Column
          </Button>
        </div>
      </section>
    )
}

export default BoardContent
