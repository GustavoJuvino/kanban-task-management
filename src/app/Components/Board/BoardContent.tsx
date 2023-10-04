'use client'

import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { NoSsr } from '@mui/material'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import useOpenBoardModal from '@/app/hooks/ModalHooks/useOpenBoardModal'
import { useGlobalContext } from '@/app/context/store'

const BoardContent = () => {
  const [formatedArr, setFormatedArr] = useState<ColumnsProps[]>()
  const { hidden } = useHideSidebar()
  const { onOpenEditBoard } = useOpenBoardModal()
  const { columns } = useGlobalContext()

  useEffect(() => {
    setFormatedArr(columns.sort((a, b) => Number(a.itemID) - Number(b.itemID)))
  }, [columns])

  return (
    <NoSsr>
      {/* <section
        className={`
        z-10 
        flex 
        items-center 
        justify-center
        ${hidden ? 'absolute left-0 h-full w-full' : 'h-full w-auto'}
    `}
      >
        <div className="flex flex-col items-center gap-y-8">
          <h2 className="text-center text-heading-l text-medium-gray">
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
      </section> */}

      <ScrollContainer
        className="
          ml-6
          mt-6
          flex
          h-full
          w-full 
          cursor-move 
          select-none 
          snap-x 
          gap-x-6
          scroll-smooth
          pb-[50px]
        "
        hideScrollbars={false}
        vertical={false}
      >
        {formatedArr?.map((col) => (
          <ul key={col.itemID} className="flex flex-col gap-y-6">
            <div className="flex gap-x-3">
              <i
                style={{ backgroundColor: col.color }}
                className="h-[15px] w-[15px] rounded-full"
              />
              <h4 className="text-heading-s uppercase text-medium-gray">
                {`${col.columnName}`}
              </h4>
            </div>

            <li className="h-[88px] w-[280px] cursor-pointer rounded-lg bg-dark-gray px-4 py-[23px]">
              <h3 className="text-heading-m text-white duration-300 hover:text-main-purple">
                Build UI for onboarding flow
              </h3>
              <span className="text-body-m text-medium-gray">
                0 of 3 substasks
              </span>
            </li>
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
      </ScrollContainer>
    </NoSsr>
  )
}

export default BoardContent
