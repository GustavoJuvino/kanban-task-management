import React, { useRef } from 'react'
import Button from '../Button'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import useOpenBoardModal from '@/app/hooks/useOpenBoardModal'
import { NoSsr } from '@mui/material'

const BoardContent = () => {
  const { hidden } = useHideSidebar()
  const { onOpenEditBoard } = useOpenBoardModal()

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
      </section>
      */}

      <section
        id="snaps-inline"
        className="
          ml-6
          mt-6 
          flex 
          h-full 
          w-full 
          gap-x-6 
          overflow-x-auto
          overscroll-x-contain
          pb-[50px]
        "
      >
        <ul className="flex flex-col gap-y-6">
          <div className="flex gap-x-3">
            <i className="h-[15px] w-[15px] rounded-full bg-[#49C4E5]" />
            <h4 className="text-heading-s uppercase text-medium-gray">
              todo (4)
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

        <ul className="flex flex-col gap-y-6">
          <div className="flex gap-x-3">
            <i className="h-[15px] w-[15px] rounded-full bg-[#49C4E5]" />
            <h4 className="text-heading-s uppercase text-medium-gray">
              todo (4)
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

        <ul className="flex flex-col gap-y-6">
          <div className="flex gap-x-3">
            <i className="h-[15px] w-[15px] rounded-full bg-[#49C4E5]" />
            <h4 className="text-heading-s uppercase text-medium-gray">
              todo (4)
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
      </section>
    </NoSsr>
  )
}

export default BoardContent