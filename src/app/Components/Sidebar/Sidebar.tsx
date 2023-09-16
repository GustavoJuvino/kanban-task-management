import React from 'react'
import { LogoLight, VisibilityOff } from '../../../../public/svgs'
import { DarkTheme, IconBoard, LightTheme } from '../../../../public/sidebar'

const Sidebar = () => {
  return (
    <section className="flex h-full w-[260px] flex-col justify-between bg-dark-gray lg:w-[300px]">
      <section>
        <LogoLight className="ml-[26px] mt-8 lg:ml-[34px]" />

        <div className="mt-[54px]">
          <span className="ml-6 text-heading-s uppercase text-medium-gray lg:ml-8">
            {' '}
            all boards {'(8)'}{' '}
          </span>
          <ul className="mt-5">
            <li className="flex w-[240px] items-center gap-x-3 rounded-r-full bg-main-purple py-[15px] pl-6 lg:w-[276px] lg:gap-x-4 lg:pl-8">
              <IconBoard className="fill-white" />
              <h3 className="text-heading-m text-white"> Plataform Launch</h3>
            </li>

            <li className="flex w-[276px] items-center gap-x-4 rounded-r-full py-[15px] pl-8">
              <IconBoard className="fill-medium-gray" />
              <h3 className="text-heading-m text-medium-gray">
                {' '}
                Marketing Plan
              </h3>
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
            <h3 className="text-heading-m text-main-purple">
              + Create New Board
            </h3>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex h-auto w-full justify-center">
          <div className="flex h-12 w-[235px] items-center justify-center gap-x-[23px] rounded-md bg-very-dark-gray lg:w-[251px]">
            <LightTheme />
            <div className="flex h-5 w-10 items-center justify-end rounded-full bg-main-purple px-[3px]">
              <div className="h-[14px] w-[14px] rounded-full bg-white"></div>
            </div>
            <DarkTheme />
          </div>
        </div>

        <div className="ml-6 mt-[22px] flex items-center gap-x-[15px] lg:ml-8">
          <VisibilityOff />
          <span className="text-heading-m text-medium-gray">Hide Sidebar</span>
        </div>
      </section>
    </section>
  )
}

export default Sidebar
