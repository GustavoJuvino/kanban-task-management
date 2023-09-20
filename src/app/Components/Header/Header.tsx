import React, { useState } from 'react'
import Button from '../Button'
import { EditMenuIcon, IconAdd, LogoMobile } from '../../../../public/svgs'
import EditMenu from './EditMenu'
import { Arrow } from '../../../../public/modal'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import { NoSsr } from '@mui/material'
import { useWindowSize } from '@uidotdev/usehooks'
import TaskModal from '../Modals/TaskModal/TaskModal'
import useOpenTaskModal from '@/app/hooks/useOpenTaskModal'

const Header = () => {
  const size = useWindowSize()
  const { hidden, setHidden } = useHideSidebar()
  const [openMenu, setOpenMenu] = useState(false)
  const { openNewTask, onOpenNewTask } = useOpenTaskModal()

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
        pl-6 
        pr-8
        lg:h-24 
      "
    >
      <div className="flex items-center gap-x-4">
        <LogoMobile className="sm:hidden" />
        <h1 className="text-xl font-bold text-white lg:text-heading-xl">
          Plataform Launch
        </h1>
        <NoSsr>
          <Arrow
            onClick={() => setHidden(false)}
            className={`
              mt-2 
              cursor-pointer 
              stroke-main-purple 
              duration-300
              sm:hidden
              ${!hidden ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </NoSsr>
      </div>

      <section className="flex items-center gap-x-6">
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
        <div>
          <EditMenuIcon
            onClick={() => setOpenMenu(!openMenu)}
            className="
              cursor-pointer 
              fill-medium-gray 
              hover:fill-main-purple
            "
          />
          <EditMenu open={openMenu} />
        </div>
      </section>

      {openNewTask && <TaskModal modalType="add" />}
    </header>
  )
}

export default Header
