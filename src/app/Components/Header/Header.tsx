import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import EditMenu from './EditMenu'
import useOpenTaskModal from '@/app/hooks/useOpenTaskModal'
import useClickOutside from '@/app/hooks/useClickOutside'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import { NoSsr } from '@mui/material'
import { useWindowSize } from '@uidotdev/usehooks'
import { Arrow } from '../../../../public/modal'
import { EditMenuIcon, IconAdd, LogoMobile } from '../../../../public/svgs'
import NewTaskModal from '../Modals/TaskModal/NewTaskModal'

const Header = () => {
  const size = useWindowSize()
  const { hidden, setHidden } = useHideSidebar()
  const [openMenu, setOpenMenu] = useState(false)
  const { openNewTask, onOpenNewTask } = useOpenTaskModal()

  const { clickOutside } = useClickOutside()
  const editMenuRef = useRef(null)

  useEffect(() => {
    if (editMenuRef) clickOutside(editMenuRef, setOpenMenu)
  }, [clickOutside])

  return (
    <header
      className="
        flex 
        h-20
        w-full
        items-center
        justify-between 
        border-b-[1px] 
        border-lines-dark 
        bg-dark-gray 
        max-mobile:p-4
        mobile:pl-6
        mobile:pr-8
        lg:h-24 
      "
    >
      <div className="flex items-center gap-x-2 small-mobile:gap-x-4">
        <LogoMobile className="sm:hidden" />
        <h1 className="text-[14px] font-bold text-white mobile:text-heading-l sm:text-xl lg:text-heading-xl">
          Plataform Launch
        </h1>
        <NoSsr>
          <Arrow
            onClick={() => setHidden(false)}
            className={`
              cursor-pointer 
              stroke-main-purple 
              duration-300 
              mobile:mt-2
              sm:hidden
              ${!hidden ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </NoSsr>
      </div>

      <section className="flex items-center gap-x-4 sm:gap-x-6">
        <Button
          onClick={() => onOpenNewTask(true)}
          className="
            flex w-12 
            items-center 
            justify-center 
            max-sm:h-8 
            sm:w-[164px]
          "
        >
          {size.width && size.width <= 640 ? <IconAdd /> : '+ Add new task'}
        </Button>
        <div ref={editMenuRef}>
          <EditMenuIcon
            onClick={() => setOpenMenu(!openMenu)}
            className="
              cursor-pointer 
              fill-medium-gray 
              hover:fill-main-purple
            "
          />
          <EditMenu open={openMenu} menuType="board" />
        </div>
      </section>

      {openNewTask && <NewTaskModal modalType="add" />}
    </header>
  )
}

export default Header
