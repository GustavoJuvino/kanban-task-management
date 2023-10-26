'use client'

import React, { useEffect, useState } from 'react'
import Button from '../Button'
import PreviewTask from './Task/PreviewTask'

import { NoSsr } from '@mui/material'
import { useGlobalContext } from '@/app/context/store'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import useOpenBoardModal from '@/app/hooks/ModalHooks/useOpenBoardModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const BoardContent = () => {
  const { tasks, columns } = useGlobalContext()
  const [formatedArr, setFormatedArr] = useState<ColumnsProps[]>()
  const [reorderTasks, setReorderTasks] = useState<TaskProps[]>(tasks)

  const { hidden } = useHideSidebar()
  const { onOpenEditBoard } = useOpenBoardModal()

  useEffect(() => {
    setFormatedArr(columns.sort((a, b) => Number(a.itemID) - Number(b.itemID)))
  }, [columns])

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results

    // eslint-disable-next-line prettier/prettier
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      // eslint-disable-next-line prettier/prettier
      return;
    }

    if (type === 'group') {
      const reorderedTasks = [...tasks]
      const sourceIndex = source.index
      const destinationIndex = destination.index

      console.log(sourceIndex, destinationIndex)

      const [removedTask] = reorderedTasks.splice(sourceIndex, 0)
      reorderedTasks.splice(destinationIndex, 0, removedTask)

      return setReorderTasks(reorderedTasks)
    }
  }

  if (columns.length > 0) {
    return (
      <NoSsr>
        {/* <ScrollContainer
          className=""
          hideScrollbars={false}
          vertical={false}
        > */}
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
              <DragDropContext onDragEnd={handleDragDrop}>
                <ul className="flex flex-col gap-y-6">
                  <div className="flex w-40 gap-x-3">
                    <i
                      style={{ backgroundColor: col.color }}
                      className="h-[15px] w-[15px] rounded-full"
                    />

                    <h4 className="text-heading-s uppercase text-medium-gray">
                      {`${col.columnName}`}
                    </h4>
                  </div>

                  <Droppable droppableId={col.itemID} type="group">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col gap-y-6"
                      >
                        {reorderTasks.map(
                          (task, index) =>
                            task.fromColumn === col.columnName && (
                              <Draggable
                                key={task.id}
                                index={index}
                                draggableId={task.id}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                  >
                                    <PreviewTask
                                      key={task.id}
                                      taskID={task.id}
                                      title={task.title}
                                      taskColumn={task.fromColumn}
                                      description={task.description}
                                      currentColumnName={col.columnName}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ),
                        )}
                      </div>
                    )}
                  </Droppable>
                </ul>
              </DragDropContext>
            </section>
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
