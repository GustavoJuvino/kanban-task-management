import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../Button'
import { Cross } from '../../../../../public/modal'
import { Form } from '../../form'
import { InputErrorProps } from '@/app/types/errors'

import ObjectID from 'bson-objectid'
import { useGlobalContext } from '@/app/context/store'
import { useFieldArray } from 'react-hook-form'
import { useGetRandomColor } from '@/app/hooks/useGetRandomColor'

interface BoardColumnsProps {
  inputErrors: InputErrorProps
  modalType: ModalTypeProps
}

const BoardColumns = ({ inputErrors, modalType }: BoardColumnsProps) => {
  const [itemID, setItemID] = useState(1)
  const { randomColor } = useGetRandomColor()

  const { columns } = useGlobalContext()
  const [formatedArr, setFormatedArr] = useState<ColumnsProps[]>([])

  let objectID = ''
  const generateObjectID = () => (objectID = ObjectID().toHexString())

  const { fields, insert, append, remove } = useFieldArray({
    name: 'boardColumns',
  })

  useMemo(() => {
    if (modalType === 'add') {
      append({
        columnName: '',
        id: itemID,
        color: randomColor,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [append])

  useEffect(() => {
    if (modalType === 'edit') {
      setFormatedArr(
        columns.sort((a, b) => Number(a.itemID) - Number(b.itemID)),
      )

      remove(0)

      if (formatedArr.length > 0) {
        setItemID(Number(formatedArr[formatedArr.length - 1].itemID))
        insert(
          1,
          formatedArr.map((col) => ({
            id: col.id,
            boardID: col.boardID,
            columnName: col.columnName,
            itemID: col.itemID,
            color: col.color,
          })),
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remove, insert, formatedArr])

  if (modalType === 'add') {
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
                id="form_input"
                name={`boardColumns.${index}.columnName` as const}
                error={
                  inputErrors !== undefined &&
                  inputErrors[index]?.columnName?.message
                }
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
                    ${
                      inputErrors !== undefined &&
                      inputErrors[index]?.columnName?.message &&
                      'fill-red'
                    }
                `}
              />
            </Form.Field>
          ))}
        </div>
        <Button
          type="button"
          style={'light'}
          onClick={() => {
            setItemID(itemID + 1)
            append({
              columnName: '',
              itemID: itemID + 1,
              color: randomColor,
            })
          }}
        >
          + Add New Column
        </Button>
      </section>
    )
  } else if (modalType === 'edit')
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
                id="form_input"
                error={
                  inputErrors !== undefined &&
                  inputErrors[index]?.columnName?.message
                }
                type="text"
                name={`boardColumns.${index}.columnName` as const}
                placeholder="e.g New Column"
              />

              <Cross
                onClick={() => remove(index)}
                className={`
                  cursor-pointer
                  fill-[#828FA3]
                  duration-300
                  hover:fill-red
                  ${
                    inputErrors !== undefined &&
                    inputErrors[index]?.columnName?.message &&
                    'fill-red'
                  }
                  `}
              />
            </Form.Field>
          ))}
        </div>
        <Button
          type="button"
          style={'light'}
          onClick={() => {
            generateObjectID()
            setItemID(itemID + 1)
            append({
              id: objectID,
              columnName: '',
              itemID: itemID + 1,
              color: randomColor,
            })
          }}
        >
          + Add New Column
        </Button>
      </section>
    )
}

export default BoardColumns
