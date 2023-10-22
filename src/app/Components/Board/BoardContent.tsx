'use client'

import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { NoSsr } from '@mui/material'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useGlobalContext } from '@/app/context/store'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import useOpenBoardModal from '@/app/hooks/ModalHooks/useOpenBoardModal'
import PreviewTask from './Task/PreviewTask'

const BoardContent = () => {
  const { hidden } = useHideSidebar()
  const { onOpenEditBoard } = useOpenBoardModal()
  const [formatedArr, setFormatedArr] = useState<ColumnsProps[]>()
  const { tasks, columns } = useGlobalContext()

  useEffect(() => {
    setFormatedArr(columns.sort((a, b) => Number(a.itemID) - Number(b.itemID)))
  }, [columns])

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
            <ul key={col.itemID} className="flex flex-col gap-y-6">
              <div className="flex w-28 gap-x-3">
                <i
                  style={{ backgroundColor: col.color }}
                  className="h-[15px] w-[15px] rounded-full"
                />

                <h4 className="text-heading-s uppercase text-medium-gray">
                  {`${col.columnName}`}
                </h4>
              </div>

              {tasks.map(
                (task) =>
                  task.fromColumn === col.columnName && (
                    <PreviewTask
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      currentColumnName={col.columnName}
                    />
                  ),
              )}
            </ul>
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
