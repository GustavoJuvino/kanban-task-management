import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../Button'
import { Cross } from '../../../../../public/modal'
import { Form } from '../../form'
import { InputErrorProps } from '@/app/types/errors'

import { useRouter } from 'next/navigation'
import { useFieldArray } from 'react-hook-form'
import { useGlobalContext } from '@/app/context/store'
import { useGetRandomColor } from '@/app/hooks/useGetRandomColor'

import axios from 'axios'
import ObjectID from 'bson-objectid'
import { toast } from 'react-toastify'

interface BoardColumnsProps {
  isSubmiting: boolean
  modalType: ModalTypeProps
  inputErrors: InputErrorProps
}

const BoardColumns = ({
  isSubmiting,
  inputErrors,
  modalType,
}: BoardColumnsProps) => {
  const router = useRouter()
  const [itemID, setItemID] = useState(1)
  const { randomColor } = useGetRandomColor()

  const { columns } = useGlobalContext()
  const [excludeCols, setExcludeCols] = useState<ColumnsProps[]>([])
  const [formatedArr, setFormatedArr] = useState<ColumnsProps[]>([])

  let objectID = ''
  const generateObjectID = () => (objectID = ObjectID().toHexString())

  const { fields, update, insert, append, remove } = useFieldArray({
    name: 'boardColumns',
  })

  useMemo(() => {
    if (modalType === 'add') {
      append({
        columnName: '',
        itemID,
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
      } else {
        generateObjectID()
        update(0, {
          id: objectID,
          columnName: '1',
          itemID,
          color: randomColor,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insert, formatedArr])

  useEffect(() => {
    if (isSubmiting && excludeCols.length > 0) {
      axios
        .delete(`/api/columns`, { data: { columns: excludeCols } })
        .then(() => {
          router.refresh()
          setTimeout(() => {
            toast.success('Column deleted successfully!')
          }, 2000)
        })
        .catch(() => {
          toast.error('Something went wrong')
        })
    }
  }, [isSubmiting, excludeCols, columns, router])

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
                onClick={() => {
                  remove(index)
                  const updateArr = [...excludeCols]
                  columns[index] !== undefined && updateArr.push(columns[index])
                  setExcludeCols(updateArr)
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
