import React, { useState } from 'react'
import { VisibilityOn } from '../../../../public/svgs'
import { useHideSidebar } from '@/app/helper/useHideSidebar'

const ShowMenu = () => {
  const [hover, setHover] = useState(false)
  const { hidden, setHidden } = useHideSidebar()

  return (
    <div
      onClick={() => setHidden(!hidden)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="
      absolute 
      bottom-8 
      flex h-12 
      w-14 
      cursor-pointer
      items-center
      justify-center
      rounded-r-full
      bg-main-purple
      duration-300
      hover:bg-white
      "
    >
      <VisibilityOn
        className={`${hover ? 'fill-main-purple' : 'fill-white'}`}
      />
    </div>
  )
}

export default ShowMenu
