import React, { useEffect, useState } from 'react'
import { NoSsr } from '@mui/material'
import HeaderOptions from './HeaderOptions'
import useOpenTaskModal from '@/app/helper/ModalHooks/useOpenTaskModal'
import { useHideSidebar } from '@/app/helper/useHideSidebar'
import { Arrow } from '../../../../public/modal'
import { LogoDark, LogoLight, LogoMobile } from '../../../../public/svgs'
import TaskModal from '../Modals/TaskModal/TaskModal'
import { useTheme } from 'next-themes'

const Header = () => {
  const { theme } = useTheme()
  const { hidden, setHidden } = useHideSidebar()
  const { openNewTask } = useOpenTaskModal()

  const [HTML, setHTML] = useState<string>()

  useEffect(() => {
    setHTML(document.getElementById('HTML')?.className)
  }, [])

  return (
    <>
      <header
        className="
          flex 
          h-auto 
          w-full 
          bg-white
          dark:bg-dark-gray 
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
                border-lines-white
                px-6 
                dark:border-lines-dark
                max-sm:hidden
              "
            >
              {(theme === 'system' && HTML === 'dark') || theme === 'dark' ? (
                <LogoLight />
              ) : (
                <LogoDark />
              )}
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
            border-lines-white
            px-4
            dark:border-lines-dark 
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
                text-black 
                dark:text-white 
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

        {openNewTask && <TaskModal modalType="add" />}
      </header>
    </>
  )
}

export default Header
