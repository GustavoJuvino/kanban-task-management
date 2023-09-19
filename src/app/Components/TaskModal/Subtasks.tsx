import React, { useCallback, useState } from 'react'
import { Close } from '../../../../public/modal'
import Button from '../Button'
import axios from 'axios'

const Subtasks = () => {
  const [subtasks, setSubtasks] = useState([
    { id: 1, desc: 'e.g. Make coffee' },
    { id: 2, desc: 'e.g. Drink coffee & smile' },
  ])
  const [placeholders, setPlaceholders] = useState<string>(
    'Take a coffee break',
  )

  const getPlaceholders = useCallback(() => {
    axios({
      method: 'get',
      url: 'https://api.api-ninjas.com/v1/bucketlist',
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    }).then((response) => {
      setPlaceholders(response.data.item)
    })
  }, [])

  const createNewSubtask = useCallback(() => {
    const lastID = subtasks[subtasks.length - 1]
    getPlaceholders()

    subtasks.push({ id: lastID.id + 1, desc: `e.g ${placeholders}` })
  }, [getPlaceholders, placeholders, subtasks])

  const removeSubtask = useCallback(
    (index: number) => {
      const updateSubtasks = [...subtasks]

      if (index > -1) {
        updateSubtasks.splice(index, 1)
        setSubtasks(updateSubtasks)
      }
    },
    [subtasks],
  )

  return (
    <section className="flex flex-col gap-y-3">
      <h6 className="text-body-m text-white">Subtasks</h6>

      <div
        id="subtasks_list"
        className={`
          flex 
          max-h-[144px] 
          scroll-m-1 
          flex-col 
          gap-y-2
          overflow-auto
        `}
      >
        {subtasks.map((task, index) => (
          <fieldset key={task.id} className="flex items-center gap-x-4 pr-4">
            <input
              id="task_input"
              name="titles"
              type="text"
              placeholder={task.desc}
              className="
                h-10
                w-full
                rounded-[4px]
                border-[1px]
                border-[#828FA3]
                border-opacity-25
                bg-transparent
                py-2
                pl-4
                text-body-l
                text-white
                outline-none
                duration-300
                focus:border-main-purple
            "
            />
            <Close
              onClick={() => removeSubtask(index)}
              className="
                cursor-pointer 
                fill-[#828FA3] 
                duration-300 
                hover:fill-red
              "
            />
          </fieldset>
        ))}
      </div>

      <Button type="button" onClick={() => createNewSubtask()} style={'light'}>
        {' '}
        + Add New Subtask
      </Button>
    </section>
  )
}

export default Subtasks
