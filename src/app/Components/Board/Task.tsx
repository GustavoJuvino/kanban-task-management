import React from 'react'

const Task = () => {
  return (
    <div className="h-[88px] w-[280px] cursor-pointer rounded-lg bg-dark-gray px-4 py-[23px]">
      <h3 className="text-heading-m text-white duration-300 hover:text-main-purple">
        Build UI for onboarding flow
      </h3>
      <span className="text-body-m text-medium-gray">0 of 3 substasks</span>
    </div>
  )
}

export default Task
