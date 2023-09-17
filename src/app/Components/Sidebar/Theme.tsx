import React from 'react'
import { DarkTheme, LightTheme } from '../../../../public/sidebar'

const Theme = () => {
  return (
    <section className="flex h-auto w-full justify-center">
      <div className="flex h-12 w-[235px] items-center justify-center gap-x-[23px] rounded-md bg-very-dark-gray lg:w-[251px]">
        <LightTheme />

        <div className="flex h-5 w-10 items-center justify-end rounded-full bg-main-purple px-[3px]">
          <span className="h-[14px] w-[14px] cursor-pointer rounded-full bg-white" />
        </div>

        <DarkTheme />
      </div>
    </section>
  )
}

export default Theme
