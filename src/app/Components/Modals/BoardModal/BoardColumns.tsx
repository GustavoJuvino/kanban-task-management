import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../Button'
import { Cross } from '../../../../../public/modal'
import { Form } from '../../form'
import { ColumnsErrorsProps } from '@/app/types/errors'

import { useRouter } from 'next/navigation'
import { useFieldArray } from 'react-hook-form'
import { useGlobalContext } from '@/app/context/store'
import { useGetRandomColor } from '@/app/hooks/useGetRandomColor'

import axios from 'axios'
import ObjectID from 'bson-objectid'
import { toast } from 'react-toastify'

interface BoardColumnsProps {
  isSubmitting: boolean
  modalType: ModalTypeProps
  inputErrors: ColumnsErrorsProps
}

const BoardColumns = ({
  isSubmitting,
  inputErrors,
  modalType,
}: BoardColumnsProps) => {
  const router = useRouter()
  const [itemID, setItemID] = useState(1)
  const { randomColor } = useGetRandomColor()

  const { columns, tasks, subtasks } = useGlobalContext()
  const [excludeCols, setExcludeCols] = useState<Record<'key', string>[]>([])
  const [formatedArr, setFormatedArr] = useState<ColumnsProps[]>([])

  let objectID = ''
  const generateObjectID = () => (objectID = ObjectID().toHexString())

  const { fields, update, insert, append, remove } = useFieldArray({
    name: 'boardColumns',
    keyName: 'key',
  })

  useMemo(() => {
    if (modalType === 'add') {
      append({
        columnName: '',
        itemID,
        color: randomColor,
      })
    }
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
            color: col.color,
            itemID: col.itemID,
            boardID: col.boardID,
            columnName: col.columnName,
          })),
        )
      } else {
        generateObjectID()
        update(0, {
          id: objectID,
          columnName: 'e.g Todo',
          itemID,
          color: randomColor,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insert, formatedArr])

  useEffect(() => {
    if (isSubmitting && excludeCols.length > 0) {
      axios
        .delete(`/api/columns`, {
          data: { columns: excludeCols, tasks, subtasks },
        })
        .then(() => {
          router.refresh()
          setTimeout(() => {
            toast.success('Column deleted successfully!')
          }, 1400)
        })
        .catch(() => {
          toast.error('Something went wrong')
        })
    }
  }, [isSubmitting, router, excludeCols, columns, tasks, subtasks])

  if (modalType === 'add') {
    return (
      <section className="flex flex-col gap-y-3">
        <h6 className="text-body-m text-white">Board Columns</h6>

        <div className="flex max-h-[92px] scroll-m-1 flex-col gap-y-2 overflow-auto">
          {fields.map((field, index) => (
            <Form.Field
              key={field.key}
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
                className={`${
                  inputErrors !== undefined &&
                  inputErrors[index]?.columnName?.message &&
                  'border-opacity-100'
                }`}
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
              key={field.key}
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
                className={`${
                  inputErrors !== undefined &&
                  inputErrors[index]?.columnName?.message &&
                  'border-opacity-100'
                }`}
              />
              <Cross
                onClick={() => {
                  remove(index)
                  const newArr = [...excludeCols]
                  newArr.push(field)
                  setExcludeCols(newArr)
                }}
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
