import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import EditMenu from './EditMenu'
import useOpenTaskModal from '@/app/hooks/useOpenTaskModal'
import useClickOutside from '@/app/hooks/useClickOutside'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import { NoSsr } from '@mui/material'
import { useWindowSize } from '@uidotdev/usehooks'
import { Arrow } from '../../../../public/modal'
import {
  EditMenuIcon,
  IconAdd,
  LogoLight,
  LogoMobile,
} from '../../../../public/svgs'
import NewTaskModal from '../Modals/TaskModal/NewTaskModal'
import HeaderOptions from './HeaderOptions'

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
        h-auto 
        w-full 
        bg-dark-gray 
        max-sm:py-5 
        sm:h-20 
        lg:h-24
      "
    >
      {hidden && (
        <NoSsr>
          <div
            className="
            flex 
            h-full 
            w-auto
            items-center
            justify-center 
            border-b-[1px] 
            border-r-[1px] 
            border-lines-dark 
            px-6
            max-sm:hidden
          "
          >
            <LogoLight />
          </div>
        </NoSsr>
      )}

      <section
        className="
          flex 
          h-full 
          w-full 
          items-center 
          justify-between 
          border-lines-dark 
          px-4 
          sm:border-b-[1px]
          sm:px-6
          lg:px-8
        "
      >
        <section className="flex items-center gap-x-2 small-mobile:gap-x-4">
          <LogoMobile className="sm:hidden" />
          <h1
            className="
              text-[14px] 
              font-bold 
              text-white 
              mobile:text-heading-l 
              sm:text-xl 
              lg:text-heading-xl
            "
          >
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
        </section>

        {/* {pathname !== '/' && (
          <section className="flex items-center gap-x-4 sm:gap-x-6">
            <Button
              onClick={() => onOpenNewTask(true)}
              className="
                flex
                w-12
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
        )} */}
        <HeaderOptions />
      </section>

      {openNewTask && <NewTaskModal modalType="add" />}
    </header>
  )
}

export default Header
