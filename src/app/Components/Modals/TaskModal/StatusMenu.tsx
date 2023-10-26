import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Arrow } from '../../../../../public/modal'
import { Form } from '../../form'

import { UseFormSetValue } from 'react-hook-form'
import { useGlobalContext } from '@/app/context/store'
import useClickOutside from '@/app/hooks/useClickOutside'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'

interface StatusMenuProps {
  menuType: ModalTypeProps
  setFirstValue?: UseFormSetValue<TaskFormInputs>
}

const stats = ['Todo', 'Doing', 'Done']

const StatusMenu = ({ menuType, setFirstValue }: StatusMenuProps) => {
  const [status, setStatus] = useState<string | undefined>()

  const { tasks, columns } = useGlobalContext()
  const [openMenu, setOpenMenu] = useState(false)
  const { currentTask } = useSaveCurrentTask()
  const { currentColumn, setCurrentColumn } = useSaveCurrentColumn()

  const statusRef = useRef(null)
  const { clickOutside } = useClickOutside()

  useEffect(() => {
    if (statusRef) clickOutside(statusRef, setOpenMenu)
  }, [clickOutside])

  useEffect(() => {
    tasks.map((task) => {
      if (task.id === currentTask.id) {
        task.status ? setStatus(task.status) : setStatus('Todo')
      }
      return task
    })
  }, [])

  useMemo(() => {
    setFirstValue !== undefined && setFirstValue('task.status', status)
  }, [setFirstValue, status])

  return (
    <Form.Field className="block">
      <Form.Label className="flex flex-col text-body-m text-white">
        {menuType === 'add' ? 'Current Column' : 'Current Status'}
      </Form.Label>
      <div
        ref={statusRef}
        onClick={() => setOpenMenu(!openMenu)}
        className="relative flex select-none flex-col"
      >
        <Form.Input
          readOnly
          type="text"
          value={menuType === 'add' ? currentColumn : status}
          name={menuType === 'add' ? 'task.updateColumn' : 'task.status'}
          className="
            mt-2
            cursor-pointer
            select-none
            duration-300
          focus:border-main-purple
          "
        />
        <Arrow
          className={`
            absolute 
            right-4 
            top-6 
            stroke-[#828FA3] 
            duration-300 
            hover:stroke-main-purple
            ${openMenu ? 'rotate-180' : 'rotate-0'}
          `}
        />

        {openMenu && (
          <ul
            className="
              mt-[5px] 
              flex 
              h-auto 
              w-full 
              flex-col 
              rounded-lg 
              bg-very-dark-gray 
              p-2 
              text-body-l 
              text-medium-gray
              mobile:gap-y-2
              mobile:p-4
            "
          >
            {menuType === 'add'
              ? columns.map((col) => (
                  <li
                    key={col.id}
                    onClick={() => setCurrentColumn(col.columnName)}
                    className="w-fit cursor-pointer duration-300 hover:text-white"
                  >
                    {col.columnName}
                  </li>
                ))
              : stats.map((stat) => (
                  <li
                    key={stat}
                    onClick={() => setStatus(stat)}
                    className="w-fit cursor-pointer duration-300 hover:text-white"
                  >
                    {stat}
                  </li>
                ))}
          </ul>
        )}
      </div>
    </Form.Field>
  )
}

export default StatusMenu