import React from 'react'
import ModalBackground from '../ModalBackground'
import Button from '../Button'
import useOpenDeleteModal from '@/app/hooks/useOpenDeleteModal'

type DelteTypeProps = 'board' | 'task'

interface DeleteModalProps {
  deleteType: DelteTypeProps
}

const DeleteModal = ({ deleteType }: DeleteModalProps) => {
  const { onOpenDeleteBoard } = useOpenDeleteModal()

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
      "
    >
      <ModalBackground />
      <section className="absolute z-50 flex h-[229px] w-[480px] flex-col gap-y-6 rounded-md bg-dark-gray p-8">
        <h2 className="text-heading-l text-red">
          {`Delete this ${deleteType === 'board' ? 'board?' : 'task?'}`}
        </h2>

        <p className="text-body-l text-medium-gray">
          {deleteType === 'board'
            ? `Are you sure you want to delete the ‘Platform Launch’ board? This
            action will remove all columns and tasks and cannot be reversed.`
            : `Are you sure you want to delete the ‘Build settings UI’ task
              and its subtasks? This action cannot be reversed.`}
        </p>

        <div className="flex justify-between">
          <Button style={'destroyer'}> Delete </Button>
          <Button
            onClick={() => onOpenDeleteBoard(false)}
            style={'light'}
            className="w-[200px]"
          >
            Cancel
          </Button>
        </div>
      </section>
    </section>
  )
}

export default DeleteModal
