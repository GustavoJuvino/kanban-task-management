import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../Button'
import BoardColumns from './BoardColumns'
import ModalBackground from '../../ModalBackground'
import { Close } from '../../../../../public/modal'

import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import { useGetRandomColor } from '@/app/hooks/useGetRandomColor'
import useOpenBoardModal from '@/app/hooks/ModalHooks/useOpenBoardModal'

import axios from 'axios'
import { Form } from '../../form'
import { toast } from 'react-toastify'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'

interface BoardModalProps {
  modalType: ModalTypeProps
}

const BoardModal = ({ modalType }: BoardModalProps) => {
  const router = useRouter()
  const { URL } = useGetCurrentURL()
  const { randomColor } = useGetRandomColor()
  const [loading, setLoading] = useState(false)
  const { onOpenNewBoard, onOpenEditBoard } = useOpenBoardModal()
  const { boards, columns, tasks, deleteCols } = useGlobalContext()

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
        },
      ],
      tasks: [{ id: '', status: '', title: '', itemID: '' }],
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
        setValue(`tasks.${index}.status`, task.status)
        setValue(`tasks.${index}.itemID`, task.itemID)
        return task
      })
    }
  }, [modalType, setValue, tasks, columns])

  function axiosRequest(url: string, data: BoardFormInputs) {
    axios
      .post(url, data)
      .then(() => {
        modalType === 'add' ? onOpenNewBoard(false) : onOpenEditBoard(false)
        router.push(`${data.board.name.replace(/\s/g, '')}`)
        setTimeout(() => {
          modalType === 'add'
            ? toast.success('Board created successfully!')
            : toast.success('Board updated successfully!')
        }, 2000)
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

  // const onSubmit: SubmitHandler<BoardFormInputs> = (data) => {
  //   setLoading(true)
  //   if (modalType === 'add') axiosRequest('/api/board', data)
  //   if (modalType === 'edit') axiosRequest('/api/board/update', data)
  // }

  const onSubmit: SubmitHandler<BoardFormInputs> = (data) => {
    console.log(data)
    setLoading(true)
    if (modalType === 'add') {
      axios
        .post('/api/board', data)
        .then(() => {
          onOpenNewBoard(false)
          router.push(`${data.board.name.replace(/\s/g, '')}`)
          setTimeout(() => {
            toast.success('Board created successfully!')
          }, 2000)
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

    if (modalType === 'edit') {
      axios
        .post('/api/board/update', data)
        .then(() => {
          onOpenEditBoard(false)
          router.refresh()
          router.push(`${data.board.name.replace(/\s/g, '')}`)
          setTimeout(() => {
            toast.success('Board updated successfully!')
          }, 2000)
        })
        .catch(() => {
          toast.error('Something went wrong')
        })
        .finally(() => {
          setLoading(false)
        })
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
      <div className="absolute z-50 h-[429px] w-[80%] rounded-md bg-dark-gray p-8 sm:w-[480px]">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-l text-white">
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
                id="form_input"
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
            <Button
              type="submit"
              disabled={!!loading}
              className={`${loading && 'cursor-wait opacity-40'}`}
            >
              {modalType === 'add' ? 'Create New Board' : 'Save Changes'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

export default BoardModal
