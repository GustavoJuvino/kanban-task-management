import React from 'react'
import { Close } from '../../../../../public/modal'
import Button from '../../Button'
import BoardColumns from './BoardColumns'

const BoardModal = () => {
  return (
    <section
      className="
        absolute
        left-0
        top-0
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
      "
    >
      <div className="h-[429px] w-[480px] rounded-md bg-dark-gray p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-l text-white">Add New Board</h2>
          <Close
            className="
              cursor-pointer 
              fill-[#828FA3] 
              duration-300 
              hover:fill-red
            "
          />
        </div>

        <form className="mt-6 flex flex-col gap-y-6">
          <fieldset className="block">
            <label className="text-body-m text-white">
              Board Name
              <input
                id="task_input"
                name="titles"
                type="text"
                placeholder="e.g. Web Design"
                className="
                mt-2
                h-10
                w-full
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
            </label>
          </fieldset>
          <BoardColumns />
          <Button>Create New Board</Button>
        </form>
      </div>
    </section>
  )
}

export default BoardModal
