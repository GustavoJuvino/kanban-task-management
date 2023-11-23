import React, { ComponentProps } from 'react'
import { signOut } from 'next-auth/react'
import { VariantProps, tv } from 'tailwind-variants'
import { usePathname } from 'next/navigation'
import useOpenTask from '@/app/helper/ModalHooks/useOpenTask'
import useOpenBoardModal from '@/app/helper/ModalHooks/useOpenBoardModal'
import useOpenDeleteModal from '@/app/helper/ModalHooks/useOpenDeleteModal'
import useOpenTaskModal from '@/app/helper/ModalHooks/useOpenTaskModal'

const menu = tv({
  base: `
    z-30
    absolute 
    right-4
    mt-[22px] 
    h-auto 
    w-32
    flex
    flex-col
    gap-y-4
    rounded-lg 
    bg-white
    dark:bg-dark-gray
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
  const pathname = usePathname()
  const { openTask } = useOpenTask()
  const { onOpenEditTask } = useOpenTaskModal()
  const { onOpenEditBoard } = useOpenBoardModal()
  const { onOpenDeleteBoard, onOpenDeleteTask } = useOpenDeleteModal()

  if (open)
    return (
      <section>
        <ul className={menu({ className })}>
          {pathname !== '/' && (
            <>
              <li
                className="
                  w-fit 
                  cursor-pointer 
                  text-medium-gray 
                  duration-300 
                  hover:text-main-purple  
                "
              >
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
              <li className="w-fit cursor-pointer text-red duration-300 hover:text-light-red">
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
            </>
          )}

          {!openTask && (
            <li
              onClick={() => signOut()}
              className="
                w-fit 
                cursor-pointer 
                text-medium-gray 
                duration-300 
                hover:text-main-purple  
              "
            >
              Sign Out
            </li>
          )}
        </ul>
      </section>
    )
}

export default EditMenu
