import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../Button'
import BoardColumns from './BoardColumns'
import ModalBackground from '../../ModalBackground'
import { Close } from '../../../../../public/modal'
import HashLoader from 'react-spinners/HashLoader'
import 'react-toastify/dist/ReactToastify.css'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import { useGetRandomColor } from '@/app/helper/useGetRandomColor'
import useOpenBoardModal from '@/app/helper/ModalHooks/useOpenBoardModal'

import axios from 'axios'
import { Form } from '../../form'
import { toast } from 'react-toastify'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

interface BoardModalProps {
  modalType: ModalTypeProps
}

const BoardModal = ({ modalType }: BoardModalProps) => {
  const { theme } = useTheme()
  const router = useRouter()
  const { URL } = useGetCurrentURL()
  const { randomColor } = useGetRandomColor()
  const [loading, setLoading] = useState(false)
  const { onOpenNewBoard, onOpenEditBoard } = useOpenBoardModal()
  const { boards, columns, tasks, subtasks } = useGlobalContext()

  const createBoardForm = useForm<BoardFormInputs>({
    defaultValues: {
      board: { name: '', currentBoard: '' },
      boardColumns: [
        {
          id: '',
          itemID: 0,
          boardID: '',
          columnName: '',
          color: randomColor,
          updateColumnName: '',
        },
      ],
      tasks: [{ id: '', fromColumn: '', title: '', itemID: '' }],
      subtasks: [{ id: '', name: '', fromTask: '', fromColumn: '' }],
    },
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = createBoardForm

  useMemo(() => {
    if (Object.keys(errors).length > 0) toast.error('Something went wrong')
  }, [errors])

  useEffect(() => {
    if (modalType === 'edit') {
      boards.map((board) => {
        const formatBoard = board.boardName.replace(/\s/g, '')
        if (formatBoard === URL) {
          setValue('board.id', board.id)
          setValue('board.name', board.boardName, { shouldValidate: true })
          setValue('board.currentBoard', board.boardName, {
            shouldValidate: true,
          })
        }
        return board
      })
    }
  }, [modalType, boards, URL, setValue])

  useEffect(() => {
    if (modalType === 'edit') {
      tasks.map((task, index) => {
        setValue(`tasks.${index}.id`, task.id)
        setValue(`tasks.${index}.title`, task.title)
        setValue(`tasks.${index}.taskItemID`, task.taskItemID)
        setValue(`tasks.${index}.fromColumn`, task.fromColumn)
        return task
      })

      subtasks.map((sub, index) => {
        setValue(`subtasks.${index}.id`, sub.id)
        setValue(`subtasks.${index}.name`, sub.name)
        setValue(`subtasks.${index}.fromTask`, sub.fromTask)
        setValue(`subtasks.${index}.fromColumn`, sub.fromColumn)

        return sub
      })
    }
  }, [modalType, setValue, tasks, subtasks, columns])

  function axiosRequest(url: string, data: BoardFormInputs) {
    axios
      .post(url, data)
      .then(() => {
        if (modalType === 'add') {
          router.refresh()
          router.push(data.board.name.replace(/\s/g, ''))
          onOpenNewBoard(false)
          toast.success('Board created successfully!')
        }

        if (modalType === 'edit') {
          router.refresh()
          onOpenEditBoard(false)
          toast.success('Board updated successfully!')
        }
      })
      .catch((error) => {
        if (error.request.status === 409)
          toast.error(error.response.data.message)
        else toast.error('Something went wrong')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onSubmit: SubmitHandler<BoardFormInputs> = (data) => {
    setLoading(true)
    if (modalType === 'add') axiosRequest('/api/board', data)
    if (modalType === 'edit') {
      const checkCols = data.boardColumns.map((col) => {
        const test = columns.map((currentCol) => {
          if (
            !col.columnName &&
            currentCol.columnName === col.updateColumnName
          ) {
            return true
          } else return false
        })

        if (test.some((x) => x)) return true
        else return false
      })

      if (!checkCols.some((x) => x)) {
        axiosRequest('/api/board/update', data)
      } else {
        toast.error('Column already exists')
        setLoading(false)
      }
    }
  }

  return (
    <section
      className="
        absolute
        left-0
        top-0
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        max-sm:px-4
      "
    >
      <ModalBackground />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="
          absolute 
          z-50
          h-[429px] 
          w-[80%] 
          rounded-md 
          bg-white p-8 
          dark:bg-dark-gray 
          sm:w-[480px]
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-heading-l text-black dark:text-white">
            {`${modalType === 'add' ? 'Add New' : 'Edit'} Board`}
          </h2>
          <Close
            onClick={() =>
              modalType === 'add'
                ? onOpenNewBoard(false)
                : onOpenEditBoard(false)
            }
            className="
              cursor-pointer 
              fill-[#828FA3] 
              duration-300 
              hover:fill-red
            "
          />
        </div>

        <FormProvider {...createBoardForm}>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="mt-6 flex flex-col gap-y-6"
          >
            <Form.Field className="flex flex-col gap-y-2">
              <Form.Label htmlFor="form_input">Board Name</Form.Label>
              <Form.Input
                id={theme === 'light' ? 'form_input_light' : 'form_input_dark'}
                name="board.name"
                type="text"
                placeholder="e.g Web Design"
                error={errors.board?.name?.message}
                className={`${errors.board && 'border-opacity-100'}`}
              />
            </Form.Field>

            <BoardColumns
              inputErrors={errors.boardColumns}
              isSubmitting={isSubmitting}
              modalType={modalType === 'add' ? 'add' : 'edit'}
            />

            {loading ? (
              <span className="flex w-full justify-center">
                <HashLoader color="#635FC7" />
              </span>
            ) : (
              <Button
                type="submit"
                className={`${loading && 'cursor-wait opacity-40'}`}
              >
                {modalType === 'add' ? 'Create New Board' : 'Save Changes'}
              </Button>
            )}
          </form>
        </FormProvider>
      </motion.div>
    </section>
  )
}

export default BoardModal
