import React from 'react'
import { Close } from '../../../../../public/modal'
import Button from '../../Button'
import BoardColumns from './BoardColumns'
import ModalBackground from '../../ModalBackground'
import useOpenBoardModal from '@/app/hooks/useOpenBoardModal'
import { Form } from '../../form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

interface BoardModalProps {
  modalType: ModalTypeProps
}

interface BoardFormInputs {
  boardName: string
  boardColumns: {
    columName: string
  }[]
}

const BoardModal = ({ modalType }: BoardModalProps) => {
  const { onOpenNewBoard, onOpenEditBoard } = useOpenBoardModal()

  const createBoardForm = useForm<BoardFormInputs>({
    defaultValues: {
      boardName: '',
      boardColumns: [{ columName: '' }],
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createBoardForm

  // const onSubmit: SubmitHandler<BoardFormInputs> = (data) => {
  //   axios
  //     .post('/api/board', data)
  //     .then(() => {
  //       console.log('success', data)
  //     })
  //     .catch((error: any) => {
  //       console.log(error)
  //     })
  //     .finally(() => {
  //       console.log('finished')
  //     })
  // }

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
            onSubmit={handleSubmit((data) => console.log(data))}
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
                errors.boardColumns[0]?.columName?.message
              }
            />
            <Button>
              {modalType === 'add' ? 'Create New Board' : 'Save Changes'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

export default BoardModal
