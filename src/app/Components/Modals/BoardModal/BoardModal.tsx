import React, { useMemo, useState } from 'react'
import { Close } from '../../../../../public/modal'
import Button from '../../Button'
import BoardColumns from './BoardColumns'
import ModalBackground from '../../ModalBackground'
import useOpenBoardModal from '@/app/hooks/ModalHooks/useOpenBoardModal'
import { Form } from '../../form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

interface BoardModalProps {
  modalType: ModalTypeProps
}

const BoardModal = ({ modalType }: BoardModalProps) => {
  const router = useRouter()
  const { onOpenNewBoard, onOpenEditBoard } = useOpenBoardModal()
  const [loading, setLoading] = useState(false)

  const createBoardForm = useForm<BoardFormInputs>({
    defaultValues: {
      boardName: '',
      boardColumns: [{ columnName: '' }],
    },
  })

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = createBoardForm

  useMemo(() => {
    if (Object.keys(errors).length > 0) toast.error('Something went wrong :(')
  }, [errors])

  const onSubmit: SubmitHandler<BoardFormInputs> = (data) => {
    setLoading(true)
    axios
      .post('/api/board', data)
      .then(() => {
        toast.success('Board created successfully!')
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
              <Form.Label htmlFor="task_input">Board Name</Form.Label>
              <Form.Input
                id="task_input"
                name="boardName"
                type="text"
                placeholder="e.g. Web Design"
                error={errors.boardName?.message}
              />
            </Form.Field>

            <BoardColumns
              inputError={
                errors.boardColumns?.length &&
                errors.boardColumns[0]?.columnName?.message
              }
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
