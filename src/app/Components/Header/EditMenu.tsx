import React, { ComponentProps } from 'react'
import useOpenBoardModal from '@/app/hooks/useOpenBoardModal'
import useOpenDeleteModal from '@/app/hooks/useOpenDeleteModal'
import { VariantProps, tv } from 'tailwind-variants'
import useOpenTaskModal from '@/app/hooks/useOpenTaskModal'

const menu = tv({
  base: `
    z-30
    absolute 
    right-4
    mt-[22px] 
    h-[94px] 
    w-32
    rounded-lg 
    bg-very-dark-gray
    p-4
    text-body-l
    sm:w-48
  `,
})

type EditMenuOpen = 'task' | 'board'

interface EditMenuProps
  extends ComponentProps<'ul'>,
    VariantProps<typeof menu> {
  open: boolean
  menuType: EditMenuOpen
}

const EditMenu = ({ open, menuType, className }: EditMenuProps) => {
  const { onOpenEditBoard } = useOpenBoardModal()
  const { onOpenEditTask } = useOpenTaskModal()
  const { onOpenDeleteBoard, onOpenDeleteTask } = useOpenDeleteModal()

  if (open)
    return (
      <section>
        <ul className={menu({ className })}>
          <li className="w-fit cursor-pointer text-medium-gray duration-300 hover:text-main-purple">
            <span
              onClick={() => {
                menuType === 'board'
                  ? onOpenEditBoard(true)
                  : onOpenEditTask(true)
              }}
            >
              {menuType === 'board' ? 'Edit Board' : 'Edit Task'}
            </span>
          </li>
          <li className="mt-4 w-fit cursor-pointer text-red duration-300 hover:text-light-red">
            <span
              onClick={() => {
                menuType === 'board'
                  ? onOpenDeleteBoard(true)
                  : onOpenDeleteTask(true)
              }}
            >
              {menuType === 'board' ? 'Delete Board' : 'Delete Task'}
            </span>
          </li>
        </ul>
      </section>
    )
}

export default EditMenu
