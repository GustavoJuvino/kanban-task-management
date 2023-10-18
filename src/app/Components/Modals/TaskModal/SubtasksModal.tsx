import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Cross } from '../../../../../public/modal'
import Button from '../../Button'
import { SubtasksErrorsProps } from '@/app/types/errors'

import { useGlobalContext } from '@/app/context/store'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'

import axios from 'axios'
import { Form } from '../../form'
import { useFieldArray } from 'react-hook-form'

interface SubtasksModalProps {
  modalType: ModalTypeProps
  subtasksErrors: SubtasksErrorsProps
}

const SubtasksModal = ({ modalType, subtasksErrors }: SubtasksModalProps) => {
  const [itemID, setItemID] = useState(0)
  const { subtasks } = useGlobalContext()
  const { currentTask } = useSaveCurrentTask()

  const { fields, append, remove, insert, update } = useFieldArray({
    name: 'subtasks',
  })

  const [placeholders, setPlaceholders] = useState<string[]>([
    'e.g Make coffee',
  ])

  const getPlaceholders = useCallback(() => {
    axios({
      method: 'get',
      url: 'https://api.api-ninjas.com/v1/bucketlist',
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    }).then((response) => {
      const newArr = [...placeholders]
      newArr.push(response.data.item)
      setPlaceholders(newArr)
    })
  }, [placeholders])

  useEffect(() => {
    if (modalType === 'add') {
      getPlaceholders()
      setItemID(itemID + 1)
      append({
        name: '',
        subtaskID: itemID + 1,
        completed: false,
      })
    }
  }, [modalType, append])

  useMemo(() => {
    if (modalType === 'edit') {
      subtasks.map((sub) => {
        if (sub.subtaskID === '0' && sub.fromTask === currentTask) {
          update(0, { name: sub.name })
        }
        return sub
      })
    }
  }, [modalType, update, subtasks, currentTask])

  useEffect(() => {
    if (modalType === 'edit') {
      const newArr: SubtaskProps[] = []
      subtasks.map((sub) => {
        if (sub.fromTask === currentTask && sub.subtaskID !== '0') {
          sub.fromTask === currentTask && newArr.push(sub)
        }
        return sub
      })
      newArr.sort((a, b) => Number(a.subtaskID) - Number(b.subtaskID))

      insert(
        1,
        newArr.map((sub) => ({
          name: sub.name,
          // id: col.id,
          // color: col.color,
          // itemID: col.itemID,
          // boardID: col.boardID,
          // oldName: col.columnName,
          // columnName: col.columnName,
        })),
      )
    }
  }, [modalType, subtasks, insert, currentTask])

  return (
    <section className="flex flex-col gap-y-3">
      <div className="flex items-center gap-x-2">
        <h6 className="text-body-m text-white">Subtasks</h6>
        {subtasksErrors !== undefined && (
          <span className="text-[12px] text-red sm:text-body-l">
            Can&apos;t be empty
          </span>
        )}
      </div>

      <div
        className={`
          flex 
          max-h-12
          scroll-m-1 
          flex-col 
          gap-y-2 
          overflow-auto
          mobile:max-h-[90px]
        `}
      >
        {fields.map((field, index) => (
          <Form.Field
            key={field.id}
            className="flex items-center gap-x-2 pr-4 sm:gap-x-4"
          >
            <Form.Input
              type="text"
              placeholder={placeholders[index]}
              name={`subtasks.${index}.name` as const}
              className={`
                ${
                  subtasksErrors !== undefined &&
                  subtasksErrors[index]?.name?.message &&
                  'border-red border-opacity-100 focus:border-red'
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
                  subtasksErrors !== undefined &&
                  subtasksErrors[index]?.name?.message &&
                  'fill-red'
                }
              `}
            />
          </Form.Field>
        ))}
      </div>

      <Button
        onClick={() => {
          getPlaceholders()
          setItemID(itemID + 1)
          append({
            name: '',
            subtaskID: itemID + 1,
            completed: false,
          })
        }}
        type="button"
        style={'light'}
      >
        + Add New Subtask
      </Button>
    </section>
  )
}

export default SubtasksModal
