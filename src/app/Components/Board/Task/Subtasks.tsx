/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { Form } from '../../form'
import CheckIcon from '@mui/icons-material/Check'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'

const Subtasks = () => {
  const [subsChecked, setSubsChecked] = useState<boolean[]>()
  const [formatedArr, setFormatedArr] = useState<SubtaskProps[]>()

  const { URL } = useGetCurrentURL()
  const { subtasks } = useGlobalContext()
  const { currentTask } = useSaveCurrentTask()
  const { currentColumn } = useSaveCurrentColumn()

  const { setValue } = useForm<TaskFormInputs>()
  const { fields, update, insert } = useFieldArray({
    name: 'subtasks',
  })

  useEffect(() => {
    const newArr: SubtaskProps[] = []
    if (subtasks.length > 0) {
      subtasks
        .sort((a, b) => Number(a.subtaskID) - Number(b.subtaskID))
        .map(
          (sub) =>
            sub.fromTask === currentTask.taskTitle &&
            sub.fromColumn === currentColumn &&
            sub.fromBoard.replace(/\s/g, '') === URL &&
            newArr.push(sub),
        )
      if (newArr.length > 0) {
        setFormatedArr(newArr)
      }
    }
  }, [URL, currentColumn, currentTask])

  useEffect(() => {
    if (formatedArr !== undefined) {
      const newArr = [...formatedArr]
      newArr.shift()

      update(0, {
        id: formatedArr[0].id,
        name: formatedArr[0].name,
        fromTask: formatedArr[0].fromTask,
        subtaskID: formatedArr[0].subtaskID,
        completed: formatedArr[0].completed,
        fromColumn: formatedArr[0].fromColumn,
      })

      if (newArr !== undefined)
        insert(
          1,
          newArr.map((sub) => ({
            id: sub.id,
            name: sub.name,
            fromTask: sub.fromTask,
            subtaskID: sub.subtaskID,
            completed: sub.completed,
            fromColumn: sub.fromColumn,
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
        <h6 className="text-body-m text-medium-gray dark:text-white">
          {`Subtasks (${subsChecked?.length} of ${formatedArr.length})`}
        </h6>
        <Form.Field className="mb-6 mt-4 flex max-h-[90px] flex-col gap-y-2 overflow-auto pr-4 sm:max-h-[185px]">
          {fields.map((field, index) => (
            <Form.LabelCheck
              key={field.id}
              className={
                value[index] &&
                `${value[index].completed === true && `line-through`}`
              }
            >
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
