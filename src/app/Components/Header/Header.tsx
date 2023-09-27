import React from 'react'
import { NoSsr } from '@mui/material'
import HeaderOptions from './HeaderOptions'
import NewTaskModal from '../Modals/TaskModal/NewTaskModal'
import useOpenTaskModal from '@/app/hooks/useOpenTaskModal'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import { Arrow } from '../../../../public/modal'
import { LogoLight, LogoMobile } from '../../../../public/svgs'

const Header = () => {
  const { hidden, setHidden } = useHideSidebar()
  const { openNewTask } = useOpenTaskModal()

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
        <HeaderOptions />
      </section>

      {openNewTask && <NewTaskModal modalType="add" />}
    </header>
  )
}

export default Header
