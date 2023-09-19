import React, { useState } from 'react'
import { Arrow } from '../../../../public/modal'

interface StatusMenuProps {
  title: string
  name: string
}

const statusItem = ['Todo', 'Doing', 'Done']

const StatusMenu = ({ title, name }: StatusMenuProps) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [value, setValue] = useState('Doing')

  return (
    <fieldset className="block">
      <label className="flex flex-col text-body-m text-white"> {title}</label>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="relative flex select-none"
      >
        <input
          name={name}
          type="text"
          value={value}
          readOnly
          className="
                mt-2
                h-10
                w-full
                cursor-pointer
                select-none
                rounded-[4px]
                border-[1px]
                border-[#828FA3]
                border-opacity-25
                bg-transparent
                py-2
                pl-4
                text-body-l
                text-white
                outline-none
                duration-300
                focus:border-main-purple
            "
        />
        <Arrow
          className="
              absolute 
              right-4 
              top-6 
              stroke-[#828FA3] 
              duration-300 
              hover:stroke-main-purple
            "
        />
      </div>
      {openMenu && (
        <ul
          className="
          mt-[5px] 
          flex 
          h-auto 
          w-full 
          flex-col 
          gap-y-2 
          rounded-lg 
          bg-very-dark-gray 
          px-4 
          py-4 
          text-body-l 
          text-medium-gray
        "
        >
          {statusItem.map((item) => (
            <li
              key={item}
              onClick={() => setValue(item)}
              className="w-fit cursor-pointer duration-300 hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  )
}

export default StatusMenu
