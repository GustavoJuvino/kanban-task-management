import React, { useCallback, useState } from 'react'
import Button from '../../Button'
import { Cross } from '../../../../../public/modal'
import { useRemoveItems } from '@/app/hooks/useRemoveItems'

const BoardColumns = () => {
  const [columns, setColumns] = useState([{ id: 1 }, { id: 2 }])
  const { removeItem } = useRemoveItems(columns)

  const createNewColumns = useCallback(() => {
    const updateColumns = [...columns]
    const lastID =
      columns.length > 0 ? updateColumns[updateColumns.length - 1].id : 0

    updateColumns.push({ id: lastID + 1 })

    setColumns(updateColumns)
  }, [columns])

  const removeColumns = useCallback(
    (index: number) => {
      setColumns(removeItem(index, columns))
    },
    [removeItem, columns],
  )

  return (
    <section className="flex flex-col gap-y-3">
      {columns.length > 0 && (
        <h6 className="text-body-m text-white">Board Columns</h6>
      )}

      <div
        className={`
            flex 
            max-h-[92px]
            scroll-m-1 
            flex-col 
            gap-y-2
            overflow-auto
        `}
      >
        {columns.map((column, index) => (
          <fieldset
            key={column.id}
            className="flex items-center gap-x-2 pr-4 sm:gap-x-4"
          >
            <input
              id="task_input"
              name="titles"
              type="text"
              placeholder="e.g. Todo"
              className="
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
            <Cross
              onClick={() => removeColumns(index)}
              className="
                  cursor-pointer 
                  fill-[#828FA3] 
                  duration-300 
                  hover:fill-red
                "
            />
          </fieldset>
        ))}
      </div>

      <Button type="button" style={'light'} onClick={() => createNewColumns()}>
        + Add New Subtask
      </Button>
    </section>
  )
}

export default BoardColumns
