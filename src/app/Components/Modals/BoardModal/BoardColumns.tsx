import React, { useMemo } from 'react'
import Button from '../../Button'
import { Cross } from '../../../../../public/modal'
import { Form } from '../../form'
import { useFieldArray } from 'react-hook-form'

interface BoardColumnsProps {
  inputError?: string | 0 | undefined
}

const BoardColumns = ({ inputError }: BoardColumnsProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'boardColumns',
  })

  useMemo(() => {
    append({
      columnName: '',
    })
  }, [append])

  return (
    <section className="flex flex-col gap-y-3">
      <h6 className="text-body-m text-white">Board Columns</h6>

      <div className="flex max-h-[92px] scroll-m-1 flex-col gap-y-2 overflow-auto">
        {fields.map((field, index) => (
          <Form.Field
            key={field.id}
            className="flex items-center gap-x-2 pr-4 sm:gap-x-4"
          >
            <Form.Input
              id="task_input"
              name={`boardColumns.${index}.columnName`}
              defaultValue={''}
              error={inputError}
              type="text"
              placeholder="e.g Todo"
            />

            <Cross
              onClick={() => remove(index)}
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
      <Button
        type="button"
        style={'light'}
        onClick={() =>
          append({
            columnName: '',
          })
        }
      >
        + Add New Column
      </Button>
    </section>
  )
}

export default BoardColumns
