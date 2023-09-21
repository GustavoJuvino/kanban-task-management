import React from 'react'
import BoardModal from '../Modals/BoardModal/BoardModal'
import useOpenBoardModal from '@/app/hooks/useOpenBoardModal'
import DeleteModal from '../Modals/DeleteModal'
import useOpenDeleteModal from '@/app/hooks/useOpenDeleteModal'

type EditMenuOpen = { open: boolean }

const EditMenu = ({ open }: EditMenuOpen) => {
  const { openEditBoard, onOpenEditBoard } = useOpenBoardModal()
  const { openDeleteBoard, onOpenDeleteBoard } = useOpenDeleteModal()

  if (open)
    return (
      <section>
        <ul
          className={`
            absolute 
            right-6
            mt-[22px] 
            h-[94px] 
            w-32
            rounded-lg 
            bg-very-dark-gray 
            p-4
            text-body-l
            sm:w-48
          `}
        >
          <li className="w-fit cursor-pointer text-medium-gray duration-300 hover:text-main-purple">
            <span onClick={() => onOpenEditBoard(true)}>Edit Board</span>
          </li>
          <li className="mt-4 w-fit cursor-pointer text-red duration-300 hover:text-light-red">
            <span onClick={() => onOpenDeleteBoard(true)}>Delete Board</span>
          </li>
        </ul>

        {openEditBoard && <BoardModal modalType="edit" />}
        {openDeleteBoard && <DeleteModal deleteType="board" />}
      </section>
    )
}

export default EditMenu
