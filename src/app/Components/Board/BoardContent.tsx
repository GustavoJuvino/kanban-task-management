'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../Button'
import PreviewTask from './Task/PreviewTask'

import { NoSsr } from '@mui/material'
import { useGlobalContext } from '@/app/context/store'
import { useHideSidebar } from '@/app/helper/useHideSidebar'
import useOpenBoardModal from '@/app/helper/ModalHooks/useOpenBoardModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const BoardContent = () => {
  const { tasks, columns, subtasks } = useGlobalContext()
  const { URL } = useGetCurrentURL()

  const router = useRouter()
  const [update, setUpdate] = useState(false)

  const [firstColumn, setFirstColumn] = useState<string>()

  const [updateTasks, setUpdateTasks] = useState<TaskProps[]>([])

  const [seconds, setSeconds] = useState(1400)

  const [checkSubs, setCheckSubs] = useState<SubtaskProps[]>([])
  const [formatedArr, setFormatedArr] = useState<ColumnsProps[]>([])
  const [reorderTasks, setReorderTasks] = useState<TaskProps[]>([])

  const { hidden } = useHideSidebar()
  const { onOpenEditBoard } = useOpenBoardModal()

  useEffect(() => {
    if (columns.length > 0) {
      setFormatedArr(
        columns.sort((a, b) => Number(a.itemID) - Number(b.itemID)),
      )
      setFirstColumn(columns[0].columnName)
    }
  }, [columns])

  useEffect(() => {
    if (reorderTasks.length === 0) {
      setReorderTasks(tasks.sort((a, b) => Number(a.itemID) - Number(b.itemID)))
    }
  }, [])

  useMemo(() => {
    const newArr: SubtaskProps[] = []

    subtasks !== undefined &&
      subtasks.map(
        (sub) => sub.fromBoard.replace(/\s/g, '') === URL && newArr.push(sub),
      )

    setCheckSubs(newArr)
  }, [URL, subtasks])

  const handleDragDrop = (results: any) => {
    if (!results.destination) return null

    const reorderedTasks = [...reorderTasks]

    const [reorderItem] = reorderedTasks.splice(results.source.index, 1)
    // reorderedTasks.splice(results.destination.index, 0, reorderItem)

    // console.log(results)
    if (reorderItem.updateColumn === results.destination.droppableId) {
      reorderedTasks.splice(results.destination.index, 0, {
        ...reorderItem,
        updateColumn: results.destination.droppableId,
      })
    }

    if (reorderItem.updateColumn !== results.destination.droppableId) {
      reorderedTasks.splice(
        results.source.index < results.destination.index
          ? results.destination.index - 1
          : results.destination.index,
        0,
        {
          ...reorderItem,
          updateColumn: results.destination.droppableId,
        },
      )
    }

    setUpdate(true)
    setSeconds(seconds + 500)
    setReorderTasks(reorderedTasks)
  }

  useEffect(() => {
    if (reorderTasks.length > 0) {
      const newArr: TaskProps[] = []

      reorderTasks.map((task, index) =>
        newArr.push({ ...task, itemID: index.toString() }),
      )

      setUpdateTasks(newArr)
    }
  }, [reorderTasks])

  useEffect(() => {
    if (
      update &&
      seconds > 0 &&
      updateTasks !== undefined &&
      updateTasks.length > 0
    ) {
      console.log(seconds)
      const debounceId = setTimeout(() => {
        axios
          .post('/api/tasks/updateItemID', updateTasks)
          .then(() => {
            toast.success('update')
          })
          .catch((error) => {
            if (error.request.status === 409)
              toast.error(error.response.data.message)
          })
          .finally(() => {
            setUpdate(false)
            console.log('finished')
          })
        setUpdate(false)
        setSeconds(1500)
      }, seconds)

      return () => {
        clearTimeout(debounceId)
      }
    }
  }, [update, updateTasks, seconds])

  if (columns.length > 0) {
    return (
      <NoSsr>
        {/* <ScrollContainer
          className=""
          hideScrollbars={false}
          vertical={false}
        > */}
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
                        {reorderTasks !== undefined &&
                          reorderTasks.length > 0 &&
                          reorderTasks.map(
                            (task, index) =>
                              task.fromBoard.replace(/\s/g, '') === URL &&
                              task.updateColumn === col.columnName && (
                                <Draggable
                                  key={task.id}
                                  index={index}
                                  draggableId={task.itemID}
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

              // <section key={col.itemID}>
              //   <DragDropContext onDragEnd={handleDragDrop}>
              //     <Droppable droppableId={col.columnName} type="group">
              //       {(provided) => (
              //         <section
              //           ref={provided.innerRef}
              //           {...provided.droppableProps}
              //         >
              //           <ul className="flex flex-col gap-y-6">
              //             <div className="flex w-40 gap-x-3">
              //               <i
              //                 style={{ backgroundColor: col.color }}
              //                 className="h-[15px] w-[15px] rounded-full"
              //               />

              //               <h4 className="text-heading-s uppercase text-medium-gray">
              //                 {`${col.columnName}`}
              //               </h4>
              //             </div>

              //             <section className="flex flex-col gap-y-6">
              //               {reorderTasks !== undefined &&
              //                 reorderTasks.length > 0 &&
              //                 reorderTasks.map(
              //                   (task, index) =>
              //                     task.fromBoard.replace(/\s/g, '') === URL &&
              //                     task.fromColumn === col.columnName && (
              //                       <Draggable
              //                         key={task.id}
              //                         index={index}
              //                         draggableId={task.itemID}
              //                       >
              //                         {(provided) => (
              //                           <div
              //                             {...provided.draggableProps}
              //                             {...provided.dragHandleProps}
              //                             ref={provided.innerRef}
              //                           >
              //                             <PreviewTask
              //                               key={task.id}
              //                               taskID={task.id}
              //                               title={task.title}
              //                               taskBoard={task.fromBoard}
              //                               taskColumn={task.fromColumn}
              //                               description={task.description}
              //                               currentColumnName={col.columnName}
              //                             />
              //                           </div>
              //                         )}
              //                       </Draggable>
              //                     ),
              //                 )}
              //             </section>
              //           </ul>
              //           {provided.placeholder}
              //         </section>
              //       )}
              //     </Droppable>
              //     {/* <section className="h-auto w-auto">
              //       <Droppable droppableId={col.columnName} type="group">
              //         {(provided) => (
              //           <ul
              //             ref={provided.innerRef}
              //             {...provided.droppableProps}
              //             className="flex flex-col gap-y-6"
              //           >
              //             <div className="flex w-40 gap-x-3">
              //               <i
              //                 style={{ backgroundColor: col.color }}
              //                 className="h-[15px] w-[15px] rounded-full"
              //               />

              //               <h4 className="text-heading-s uppercase text-medium-gray">
              //                 {`${col.columnName}`}
              //               </h4>
              //             </div>

              //             <section className="flex flex-col gap-y-6">
              //               {reorderTasks !== undefined &&
              //                 reorderTasks.length > 0 &&
              //                 reorderTasks.map(
              //                   (task, index) =>
              //                     task.fromBoard.replace(/\s/g, '') === URL &&
              //                     task.fromColumn === col.columnName && (
              //                       <Draggable
              //                         key={task.id}
              //                         index={index}
              //                         draggableId={task.itemID}
              //                       >
              //                         {(provided) => (
              //                           <div
              //                             {...provided.draggableProps}
              //                             {...provided.dragHandleProps}
              //                             ref={provided.innerRef}
              //                           >
              //                             <PreviewTask
              //                               key={task.id}
              //                               taskID={task.id}
              //                               title={task.title}
              //                               taskBoard={task.fromBoard}
              //                               taskColumn={task.fromColumn}
              //                               description={task.description}
              //                               currentColumnName={col.columnName}
              //                             />
              //                           </div>
              //                         )}
              //                       </Draggable>
              //                     ),
              //                 )}
              //               {provided.placeholder}
              //             </section>
              //           </ul>
              //         )}
              //       </Droppable>
              //     </section> */}
              //   </DragDropContext>
              // </section>
            ))}

            <section className="relative mt-10 h-auto w-[280px]">
              <div
                className="
                h-full
                w-[280px]
                rounded-md
                bg-gradient-to-b
                from-dark-gray
                to-[#2b2c3750]
                opacity-25
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
