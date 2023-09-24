import React from 'react'
import Button from '../Button'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import useOpenBoardModal from '@/app/hooks/useOpenBoardModal'

const BoardContent = () => {
  const { hidden } = useHideSidebar()
  const { onOpenEditBoard } = useOpenBoardModal()

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
  )
}

export default BoardContent
