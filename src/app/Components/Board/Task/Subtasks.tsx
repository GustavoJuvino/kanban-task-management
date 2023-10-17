import React, { useCallback, useEffect, useState } from 'react'
import { Form } from '../../form'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useGlobalContext } from '@/app/context/store'
import CheckIcon from '@mui/icons-material/Check'

interface SubtasksProps {
  currentTask: string
}

const Subtasks = ({ currentTask }: SubtasksProps) => {
  const [formatedArr, setFormatedArr] = useState<SubtaskProps[]>()
  const { subtasks } = useGlobalContext()

  const { setValue, getValues } = useForm<TaskFormInputs>()

  const { fields, update, insert } = useFieldArray({
    name: 'subtasks',
  })

  useEffect(() => {
    const newArr: SubtaskProps[] = []
    if (subtasks.length > 0) {
      subtasks.map((sub) => sub.fromTask === currentTask && newArr.push(sub))
      if (newArr.length > 0) {
        setFormatedArr(
          newArr.sort((a, b) => Number(a.subtaskID) - Number(b.subtaskID)),
        )
      }
    }
  }, [subtasks, currentTask])

  useEffect(() => {
    if (formatedArr !== undefined) {
      const newArr = [...formatedArr]
      newArr.shift()

      update(0, { name: formatedArr[0].name, completed: false })
      if (newArr !== undefined)
        insert(
          1,
          newArr.map((sub) => ({
            name: sub.name,
            completed: sub.completed,
          })),
        )
    }
  }, [update, formatedArr, insert])

  const value = useWatch({
    name: 'subtasks',
    defaultValue: false,
  })

  if (formatedArr !== undefined)
    return (
      <Form.Field className="flex flex-col gap-y-2 py-6">
        {fields.map((field, index) => (
          <Form.LabelCheck key={field.id}>
            <div className="relative">
              <Form.InputCheck
                type="checkbox"
                name={`subtasks.${index}.completed` as const}
                onClick={() => {
                  if (value[index]) {
                    setValue(`subtasks.${index}.completed`, true)
                  }
                }}
                className={
                  value[index] &&
                  `${value[index].completed === true && `bg-main-purple`}`
                }
              />
              {value[index] && value[index].completed === true && (
                <CheckIcon
                  className="absolute left-0 top-0"
                  sx={{ fontSize: 16, color: 'white' }}
                />
              )}
            </div>
            {formatedArr?.length !== undefined && formatedArr[index]?.name}
          </Form.LabelCheck>
        ))}
      </Form.Field>
    )
}

export default Subtasks
