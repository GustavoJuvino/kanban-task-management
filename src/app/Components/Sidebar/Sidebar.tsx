import React, { useEffect } from 'react'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'
import { useWindowSize } from '@uidotdev/usehooks'
import HideMenu from './HideMenu'
import Theme from './Theme'
import ShowMenu from './ShowMenu'
import ModalBackground from '../ModalBackground'
import { LogoLight } from '../../../../public/svgs'
import { IconBoard } from '../../../../public/sidebar'
import { Cross } from '../../../../public/modal'
import { NoSsr } from '@mui/material'

const Sidebar = () => {
  const size = useWindowSize()
  const { hidden, setHidden } = useHideSidebar()

  useEffect(() => {
    if (size.width && size.width <= 640) setHidden(true)
  }, [size, setHidden])

  if (hidden === false)
    return (
      <NoSsr>
        {size.width && size.width <= 640 && <ModalBackground />}
        <section
          className="
            z-40
            flex
            h-auto
            w-[264px] 
            flex-col 
            justify-between 
            border-lines-dark 
            bg-dark-gray 
            max-sm:absolute 
            max-sm:top-40 
            max-sm:rounded-lg
            max-sm:drop-shadow-custom
            sm:h-full
            sm:w-[260px]
            sm:border-r-[1px]
            lg:w-[300px]
          "
        >
          <section>
            <LogoLight className="ml-6 mt-8 max-sm:hidden sm:ml-[26px] lg:ml-[34px]" />

            <div className="mt-4 sm:mt-[54px]">
              <div className="flex items-center justify-between max-sm:pr-6">
                <span className="ml-6 text-heading-s uppercase text-medium-gray lg:ml-8">
                  {' '}
                  all boards {'(8)'}
                </span>

                <Cross
                  onClick={() => setHidden(true)}
                  className="
                  cursor-pointer 
                  fill-medium-gray 
                  duration-300 
                  hover:fill-red
                  sm:hidden
                "
                />
              </div>
              <ul className="mt-5">
                <li className="flex w-[240px] items-center gap-x-3 rounded-r-full bg-main-purple py-[15px] pl-6 lg:w-[276px] lg:gap-x-4 lg:pl-8">
                  <IconBoard className="fill-white" />
                  <h3 className="text-heading-m text-white">
                    {' '}
                    Plataform Launch
                  </h3>
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
      </NoSsr>
    )
  else
    return (
      <NoSsr>
        <section className="max-sm:hidden">
          <div className="flex h-20 w-[210px] items-center justify-center border-b-[1px] border-r-[1px] border-lines-dark bg-dark-gray lg:h-24">
            <LogoLight className="max-sm:hidden" />
          </div>

          <ShowMenu />
        </section>
      </NoSsr>
    )
}

export default Sidebar
