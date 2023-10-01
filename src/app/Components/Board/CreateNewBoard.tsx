import React from 'react'
import { IconBoard } from '../../../../public/sidebar'
import useOpenBoardModal from '@/app/hooks/ModalHooks/useOpenBoardModal'

const CreateNewBoard = () => {
  const { onOpenNewBoard } = useOpenBoardModal()
  return (
    <div
      onClick={() => onOpenNewBoard(true)}
      className="
        ml-8 
        flex 
        w-fit 
        cursor-pointer 
        items-center 
        gap-x-4 
        rounded-r-full 
        fill-main-purple 
        py-[15px] 
        text-heading-m
        text-main-purple
        duration-300
        hover:fill-indigo-400 
        hover:text-indigo-400
      "
    >
      <IconBoard />
      <h3>+ Create New Board</h3>
    </div>
  )
}

export default CreateNewBoard
