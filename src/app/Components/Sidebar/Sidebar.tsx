import React from 'react'
import { LogoLight } from '../../../../public/svgs'
import { IconBoard } from '../../../../public/sidebar'
import HideMenu from './HideMenu'
import Theme from './Theme'
import { useHideSidebar } from '@/app/store/useHideSidebar'
import ShowMenu from './ShowMenu'

const Sidebar = () => {
  const { hidden } = useHideSidebar()

  if (!hidden)
    return (
      <section
        className="
        flex 
        h-auto
        w-[264px]
        flex-col 
        justify-between 
        bg-dark-gray 
        max-sm:absolute 
        max-sm:top-20 
        max-sm:rounded-lg 
        max-sm:drop-shadow-custom 
        sm:h-full
        sm:w-[260px]
        lg:w-[300px]
      "
      >
        <section>
          <LogoLight className="ml-6 mt-8 max-sm:hidden sm:ml-[26px] lg:ml-[34px]" />

          <div className="mt-4 sm:mt-[54px]">
            <span className="ml-6 text-heading-s uppercase text-medium-gray lg:ml-8">
              {' '}
              all boards {'(8)'}{' '}
            </span>
            <ul className="mt-5">
              <li className="flex w-[240px] items-center gap-x-3 rounded-r-full bg-main-purple py-[15px] pl-6 lg:w-[276px] lg:gap-x-4 lg:pl-8">
                <IconBoard className="fill-white" />
                <h3 className="text-heading-m text-white"> Plataform Launch</h3>
              </li>

              <li
                className="
                flex
                w-[240px]
                cursor-pointer 
                items-center 
                gap-x-4 
                rounded-r-full 
                py-[15px] 
                pl-8 
                text-heading-m 
                text-medium-gray
                duration-300
                hover:bg-white
                hover:text-main-purple
                lg:w-[276px]
              "
              >
                <IconBoard className="fill-medium-gray" />
                <h3> Marketing Plan</h3>
              </li>

              <li className="flex w-[276px] items-center gap-x-4 rounded-r-full py-[15px] pl-8">
                <IconBoard className="fill-medium-gray" />
                <h3 className="text-heading-m text-medium-gray">
                  {' '}
                  Marketing Plan
                </h3>
              </li>
            </ul>

            <div className="ml-8 flex w-[276px] items-center gap-x-4 rounded-r-full py-[15px]">
              <IconBoard className="fill-main-purple" />
              <h3 className="cursor-pointer text-heading-m text-main-purple">
                + Create New Board
              </h3>
            </div>
          </div>
        </section>

        <section className="mb-4 max-sm:mt-8 sm:mb-8">
          <Theme />
          <HideMenu />
        </section>
      </section>
    )
  else return <ShowMenu />
}

export default Sidebar
