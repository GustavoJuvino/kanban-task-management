import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Cross } from '../../../../../public/modal'
import Button from '../../Button'
import { SubtasksErrorsProps } from '@/app/types/errors'

import { useGlobalContext } from '@/app/context/store'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'

import axios from 'axios'
import { Form } from '../../form'
import { useFieldArray } from 'react-hook-form'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'
import { useRouter } from 'next/navigation'
import ObjectID from 'bson-objectid'
import { toast } from 'react-toastify'

interface SubtasksModalProps {
  modalType: ModalTypeProps
  isSubmitting: boolean
  subtasksErrors: SubtasksErrorsProps
}

const SubtasksModal = ({
  modalType,
  isSubmitting,
  subtasksErrors,
}: SubtasksModalProps) => {
  const [itemID, setItemID] = useState(0)
  const [excludeSubs, setExcludeSubs] = useState<Record<'key', string>[]>([])

  const router = useRouter()
  const { subtasks } = useGlobalContext()
  const { currentTask } = useSaveCurrentTask()
  const { currentColumn } = useSaveCurrentColumn()

  let objectID = ''
  const generateObjectID = () => (objectID = ObjectID().toHexString())

  const { fields, append, remove, insert } = useFieldArray({
    name: 'subtasks',
    keyName: 'key',
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

  // Add Subtasks
  useMemo(() => {
    if (modalType === 'add') {
      getPlaceholders()
      setItemID(itemID + 1)
      append({
        name: '',
        subtaskID: itemID + 1,
        completed: false,
      })
    } else getPlaceholders()
  }, [modalType, append])

  //  Edit Subtasks
  useEffect(() => {
    const currentSubs = subtasks.map(
      (sub) =>
        sub.fromColumn === currentColumn &&
        sub.fromTask === currentTask.taskTitle &&
        sub.fromBoard === currentTask.taskBoard &&
        sub,
    )
    currentSubs.filter((sub) => sub !== false)

    if (modalType === 'edit' && currentSubs.length > 1) {
      const newArr: SubtaskProps[] = []
      currentSubs.map((sub) => {
        if (sub) newArr.push(sub)
        return sub
      })

      newArr.sort((a, b) => Number(a.subtaskID) - Number(b.subtaskID)).shift()

      insert(
        1,
        newArr.map((sub) => ({
          id: sub.id,
          name: sub.name,
          subtaskID: sub.subtaskID,
          fromTask: sub.fromTask,
          fromColumn: sub.fromColumn,
          completed: sub.completed,
        })),
      )
    }
  }, [modalType, insert, currentTask])

  // Exclude subtasks in Edit Subtasks modal
  useEffect(() => {
    if (isSubmitting && excludeSubs.length > 0) {
      axios
        .delete(`/api/subtasks`, {
          data: { subtasks: excludeSubs },
        })
        .then(() => {
          router.refresh()
          toast.success('Subtask(s) deleted successfully!')
        })
        .catch(() => {
          toast.error('Something went wrong')
        })
    }
  }, [isSubmitting, excludeSubs, router])

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
            key={field.key}
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
              onClick={() => {
                remove(index)
                if (modalType === 'edit') {
                  const newArr = [...excludeSubs]
                  newArr.push(field)
                  setExcludeSubs(newArr)
                }
              }}
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
          if (modalType === 'add') {
            append({
              name: '',
              completed: false,
              subtaskID: itemID + 1,
            })
          } else {
            generateObjectID()
            append({
              name: '',
              id: objectID,
              completed: false,
              subtaskID: itemID + 1,
            })
          }
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
