import React, { useEffect, useRef, useState } from 'react'
import { EditMenuIcon } from '../../../../../public/svgs'
import CheckIcon from '@mui/icons-material/Check'
import StatusMenu from '../StatusMenu'
import EditMenu from '../../Header/EditMenu'
import useClickOutside from '@/app/hooks/useClickOutside'
import ModalBackground from '../../ModalBackground'

const TaskModal = () => {
  const [check, setCheck] = useState(false)
  const [openEditMenu, setOpenEditMenu] = useState(false)
  const editMenuRef = useRef(null)
  const { clickOutside } = useClickOutside()

  useEffect(() => {
    if (editMenuRef) clickOutside(editMenuRef, setOpenEditMenu)
  }, [clickOutside])

  return (
    <section
      className="
            absolute
            z-50
            flex 
            h-full 
            w-full 
            flex-col
            items-center
            justify-center
        "
    >
      <ModalBackground />
      <section
        className="
          z-50
          flex 
          h-[523px] 
          w-[480px] 
          flex-col 
          gap-y-6 
          rounded-md 
          bg-dark-gray 
          p-8
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="w-[345px] text-heading-l text-white">
            Research pricing points of various competitors and trial different
            business models
          </h2>
          <div ref={editMenuRef} className="relative">
            <EditMenuIcon
              onClick={() => setOpenEditMenu(!openEditMenu)}
              className="
                cursor-pointer 
                fill-medium-gray 
                duration-300 
                hover:fill-main-purple
              "
            />
            <EditMenu
              className="right-[-6.2rem]"
              open={openEditMenu}
              menuType="task"
            />
          </div>
        </div>

        <p className="text-body-l text-medium-gray">
          We know what we&apos;re planning to build for version one. Now we need
          to finalise the first pricing model we&apos;ll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>

        <section>
          <h6 className="text-body-m text-white">Subtasks {`(2 of 3)`}</h6>
          <fieldset className="mt-4 flex flex-col gap-y-2">
            <label
              className={`
                flex 
                h-auto 
                w-full 
                cursor-pointer 
                gap-x-4 
                rounded-[4px] 
                bg-very-dark-gray
                py-3
                pl-4
                text-body-m 
                text-white 
                text-opacity-50 
                duration-300 
                hover:bg-main-purple
                hover:bg-opacity-25
                ${check && 'line-through'}
              `}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  onClick={() => setCheck(!check)}
                  className={`
                    h-4 
                    w-4 
                    appearance-none 
                    rounded-sm 
                    border-[1px] 
                    border-[#828FA3] 
                    border-opacity-25 
                    bg-dark-gray
                    ${check && `bg-main-purple`}
                  `}
                />
                {check && (
                  <CheckIcon
                    className="absolute left-0"
                    sx={{ fontSize: 16, color: 'white' }}
                  />
                )}
              </div>
              Research competitor pricing and business models
            </label>

            <label className="flex h-auto w-full gap-x-4 rounded-[4px] bg-very-dark-gray py-3 pl-4 text-body-m text-white text-opacity-50">
              <input
                type="checkbox"
                placeholder="Outline a business model that works for our solution"
              />
              Research competitor pricing and business models
            </label>

            <label className="flex h-auto w-full gap-x-4 rounded-[4px] bg-very-dark-gray py-3 pl-4 text-body-m text-white">
              <input type="checkbox" />
              Talk to potential customers about our proposed solution and ask
              for fair price expectancy
            </label>
          </fieldset>
        </section>

        <StatusMenu title="Current Status" name="status_task" />
      </section>
    </section>
  )
}

export default TaskModal
