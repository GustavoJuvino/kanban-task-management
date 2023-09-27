import React, { useCallback, useState } from 'react'
import Button from '../../Button'
import { Cross } from '../../../../../public/modal'
import { useRemoveItems } from '@/app/hooks/useRemoveItems'
import { Form } from '../../form'
import { FieldError, UseFormUnregister } from 'react-hook-form'

interface BoardColumnsProps {
  inputError?: FieldError
  unregister?: UseFormUnregister<BoardFormInputs>
}

const BoardColumns = ({ inputError, unregister }: BoardColumnsProps) => {
  const [columns, setColumns] = useState([
    { id: 1, placeholder: 'Doing' },
    { id: 2, placeholder: 'Done' },
  ])
  const { removeItem } = useRemoveItems(columns)

  const createNewColumns = useCallback(() => {
    const updateColumns = [...columns]
    const lastID =
      columns.length > 0 ? updateColumns[updateColumns.length - 1].id : 0

    updateColumns.push({ id: lastID + 1, placeholder: 'Todo' })

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

      <div className="flex max-h-[92px] scroll-m-1 flex-col gap-y-2 overflow-auto">
        {columns.map((column, index) => (
          <Form.Field
            key={column.id}
            className="flex items-center gap-x-2 pr-4 sm:gap-x-4"
          >
            <Form.Input
              id="task_input"
              name="boardColumn"
              error={inputError}
              defaultValue={''}
              type="text"
              placeholder={`e.g ${column.placeholder}`}
            />

            <Cross
              onClick={() => {
                removeColumns(index)
                if (unregister && index < 1) {
                  unregister('boardColumn')
                }
              }}
              className={`
                cursor-pointer
                fill-[#828FA3]
                duration-300
                hover:fill-red
                ${inputError && 'fill-red'}
              `}
            />
          </Form.Field>
        ))}
      </div>

      <Button type="button" style={'light'} onClick={() => createNewColumns()}>
        + Add New Column
      </Button>
    </section>
  )
}

export default BoardColumns
