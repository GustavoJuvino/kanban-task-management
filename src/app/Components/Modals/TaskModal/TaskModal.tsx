import React, { useEffect, useMemo, useRef, useState } from 'react'
import { EditMenuIcon } from '../../../../../public/svgs'
import CheckIcon from '@mui/icons-material/Check'
import StatusMenu from '../StatusMenu'
import EditMenu from '../../Header/EditMenu'
import ModalBackground from '../../ModalBackground'
import useClickOutside from '@/app/hooks/useClickOutside'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../../form'
import { useGlobalContext } from '@/app/context/store'

const TaskModal = () => {
  const [check, setCheck] = useState(false)
  const [columnName, setColumnName] = useState([''])

  const editMenuRef = useRef(null)
  const { clickOutside } = useClickOutside()
  const { tasks, columns } = useGlobalContext()
  const [openEditMenu, setOpenEditMenu] = useState(false)

  const createEditTaskForm = useForm<TaskFormInputs>({
    defaultValues: {
      task: { status: 'Doing' },
      subtasks: [{ name: '', complete: false }],
    },
  })

  // console.log(tasks)

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = createEditTaskForm

  useEffect(() => {
    if (editMenuRef) clickOutside(editMenuRef, setOpenEditMenu)
  }, [clickOutside])

  useMemo(() => {
    const newArr = columns.map((col) => col.columnName)
    setColumnName(newArr)
  }, [columns])

  return (
    <>
      {tasks.map(
        (task) =>
          columnName.includes(task.status) && (
            <section
              key={task.id}
              className="
        absolute
        z-50
        flex 
        h-full 
        w-full 
        flex-col
        items-center
        justify-center
      "
            >
              <ModalBackground />
              <section
                className="
          z-50
          flex 
          h-[523px] 
          w-[480px] 
          flex-col 
          gap-y-6 
          rounded-md 
          bg-dark-gray 
          p-8
        "
              >
                <div className="flex items-center justify-between">
                  <h2 className="w-[345px] text-heading-l text-white">
                    {task.title}
                  </h2>
                  <div ref={editMenuRef} className="relative">
                    <EditMenuIcon
                      onClick={() => setOpenEditMenu(!openEditMenu)}
                      className="
                cursor-pointer 
                fill-medium-gray 
                duration-300 
                hover:fill-main-purple
              "
                    />
                    <EditMenu
                      className="right-[-6.2rem]"
                      open={openEditMenu}
                      menuType="task"
                    />
                  </div>
                </div>

                <p className="text-body-l text-medium-gray">
                  We know what we&apos;re planning to build for version one. Now
                  we need to finalise the first pricing model we&apos;ll use.
                  Keep iterating the subtasks until we have a coherent
                  proposition.
                </p>

                <FormProvider {...createEditTaskForm}>
                  <form>
                    <h6 className="text-body-m text-white">
                      Subtasks {`(2 of 3)`}
                    </h6>
                    <Form.Field className="mt-4 flex flex-col gap-y-2">
                      <Form.LabelCheck
                        className={` ${check && 'line-through'}`}
                      >
                        <div className="relative">
                          <Form.InputCheck
                            type="checkbox"
                            name="teste"
                            onClick={() => setCheck(!check)}
                            className={`${check && `bg-main-purple`}`}
                          />
                          {check && (
                            <CheckIcon
                              className="absolute left-0 top-0"
                              sx={{ fontSize: 16, color: 'white' }}
                            />
                          )}
                        </div>
                        Research competitor pricing and business models
                      </Form.LabelCheck>
                    </Form.Field>
                  </form>
                  <StatusMenu />
                </FormProvider>
              </section>
            </section>
          ),
      )}
    </>
  )
}

export default TaskModal
