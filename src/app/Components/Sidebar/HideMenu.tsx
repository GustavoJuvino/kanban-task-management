import React, { useState } from 'react'
import { VisibilityOff } from '../../../../public/svgs'
import { useHideSidebar } from '@/app/hooks/useHideSidebar'

const HideMenu = () => {
  const [hover, setHover] = useState(false)
  const { hidden, setHidden } = useHideSidebar()

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setHidden(!hidden)}
      className="
            mt-[22px] 
            flex 
            h-12 
            w-[240px] 
            cursor-pointer 
            items-center 
            gap-x-[15px] 
            rounded-r-full 
            pl-6 
            text-heading-m 
            text-medium-gray 
            duration-300 
            hover:bg-white 
            hover:text-main-purple 
            max-sm:hidden 
            lg:w-[276px] 
            lg:pl-8
        "
    >
      <VisibilityOff
        className={`${hover ? 'fill-main-purple' : 'fill-[#828FA3]'}`}
      />
      <span>Hide Sidebar</span>
    </div>
  )
}

export default HideMenu
