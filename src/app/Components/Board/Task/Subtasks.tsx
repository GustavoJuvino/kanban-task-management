import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Form } from '../../form'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useGlobalContext } from '@/app/context/store'
import CheckIcon from '@mui/icons-material/Check'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'

interface SubtasksProps {
  currentTaskTitle: string
}

const Subtasks = ({ currentTaskTitle }: SubtasksProps) => {
  const [subsChecked, setSubsChecked] = useState<boolean[]>()
  const [formatedArr, setFormatedArr] = useState<SubtaskProps[]>()

  const { tasks, subtasks } = useGlobalContext()
  const { currentColumn } = useSaveCurrentColumn()

  const { setValue } = useForm<TaskFormInputs>()
  const { fields, update, insert } = useFieldArray({
    name: 'subtasks',
  })

  useEffect(() => {
    const newArr: SubtaskProps[] = []
    if (subtasks.length > 0) {
      subtasks.map(
        (sub) =>
          sub.fromTask === currentTaskTitle &&
          sub.fromColumn === currentColumn &&
          newArr.push(sub),
      )
      if (newArr.length > 0) {
        setFormatedArr(
          newArr.sort((a, b) => Number(a.subtaskID) - Number(b.subtaskID)),
        )
      }
    }
  }, [subtasks, tasks, currentTaskTitle, currentColumn])

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

  useMemo(() => {
    if (value) {
      const newArr: boolean[] = []
      value.map((sub: any) => newArr.push(sub.completed))
      setSubsChecked(newArr.filter(Boolean))
    }
  }, [value])

  if (formatedArr !== undefined)
    return (
      <>
        <h6 className="text-body-m text-white">
          {`Subtasks (${subsChecked?.length} of ${formatedArr.length})`}
        </h6>
        <Form.Field className="mb-6 mt-4 flex max-h-[90px] flex-col gap-y-2 overflow-auto pr-4 sm:max-h-[185px]">
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
                    `outline-none ${
                      value[index].completed === true && `bg-main-purple`
                    }`
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
      </>
    )
}

export default Subtasks
