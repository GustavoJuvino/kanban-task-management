import React from 'react'

type EditMenuOpen = { open: boolean }

const EditMenu = ({ open }: EditMenuOpen) => {
  if (open)
    return (
      <ul
        className="
          absolute 
          right-6
          mt-[22px] 
          h-[94px] 
          w-32
          rounded-lg 
          bg-very-dark-gray 
          p-4
          text-body-l
          sm:w-48
        "
      >
        <li className="w-fit cursor-pointer text-medium-gray duration-300 hover:text-main-purple">
          Edit Board
        </li>
        <li className="mt-4 w-fit cursor-pointer text-red duration-300 hover:text-light-red">
          Delete Board
        </li>
      </ul>
    )
}

export default EditMenu
