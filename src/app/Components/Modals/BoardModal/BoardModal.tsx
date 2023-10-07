import React, { useMemo, useState } from 'react'
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
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface BoardModalProps {
  modalType: ModalTypeProps
}

const BoardModal = ({ modalType }: BoardModalProps) => {
  const router = useRouter()
  const { randomColor } = useGetRandomColor()
  const [loading, setLoading] = useState(false)
  const { URL } = useGetCurrentURL()
  const { boards } = useGlobalContext()
  const [inputValue, setInputValue] = useState('')
  const { onOpenNewBoard, onOpenEditBoard } = useOpenBoardModal()

  const createBoardForm = useForm<BoardFormInputs>({
    defaultValues: {
      board: { name: '', currentBoard: '' },
      boardColumns: [{ columnName: '', id: 0, color: randomColor }],
    },
  })

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = createBoardForm

  useMemo(() => {
    if (Object.keys(errors).length > 0) toast.error('Something went wrong :(')
  }, [errors])

  useMemo(() => {
    if (modalType === 'edit') {
      boards.map((board) => {
        const formatBoard = board.replace(/\s/g, '')
        if (formatBoard === URL) {
          setValue('board.name', board, { shouldValidate: true })
          setValue('board.currentBoard', board, {
            shouldValidate: true,
          })
        }
        return board
      })
    }
  }, [modalType, boards, URL, setValue])

  const onSubmit: SubmitHandler<BoardFormInputs> = (data) => {
    console.log(data)
    setLoading(true)

    if (modalType === 'add') {
      axios
        .post('/api/board', data)
        .then(() => {
          toast.success('Board created successfully!')
          reset()
          router.refresh()
        })
        .catch((error) => {
          if (error.request.status === 409)
            toast.error(error.response.data.message)
          else toast.error('Something went wrong :(')
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (modalType === 'edit') {
      axios
        .post('/api/board/update', data)
        .then(() => {
          toast.success('Board updated successfully!')
          reset()
          router.refresh()
        })
        .catch(() => {
          toast.error('Something went wrong :(')
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
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
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
              />
            </Form.Field>

            <BoardColumns
              modalType={modalType === 'add' ? 'add' : 'edit'}
              inputErrors={errors.boardColumns}
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
