import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Cross } from '../../../../../public/modal'
import Button from '../../Button'

import axios from 'axios'
import { Form } from '../../form'
import { useFieldArray, useForm } from 'react-hook-form'
import { useGlobalContext } from '@/app/context/store'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'

interface SubtasksModalProps {
  modalType: ModalTypeProps
}

const SubtasksModal = ({ modalType }: SubtasksModalProps) => {
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

  // Edit Modal
  useMemo(() => {
    if (modalType === 'edit') update(0, { name: subtasks[0].name })
  }, [modalType, update, subtasks])

  useEffect(() => {
    if (modalType === 'edit') {
      const newArr = [...subtasks]
      newArr.shift()
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
  }, [modalType, subtasks, insert])

  return (
    <section className="flex flex-col gap-y-3">
      <h6 className="text-body-m text-white">Subtasks</h6>

      <div
        className={`
          flex 
          max-h-12
          scroll-m-1 
          flex-col 
          gap-y-2 
          overflow-auto
          sm:max-h-[90px]
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
            />
            <Cross
              onClick={() => remove(index)}
              className="
                cursor-pointer 
                fill-[#828FA3] 
                duration-300
                hover:fill-red
              "
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
