import React, { useCallback, useEffect, useState } from 'react'
import ModalBackground from '../ModalBackground'
import Button from '../Button'

import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import useOpenDeleteModal from '@/app/hooks/ModalHooks/useOpenDeleteModal'

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type DelteTypeProps = 'board' | 'task'

interface DeleteModalProps {
  deleteType: DelteTypeProps
}

const DeleteModal = ({ deleteType }: DeleteModalProps) => {
  const router = useRouter()
  const [currentBoard, setCurrentBoard] = useState<BoardProps>()
  const { URL } = useGetCurrentURL()
  const { boards } = useGlobalContext()
  const { onOpenDeleteBoard, onOpenDeleteTask } = useOpenDeleteModal()

  useEffect(() => {
    boards.map((board) => {
      const formatBoard = board.boardName.replace(/\s/g, '')
      if (formatBoard === URL) setCurrentBoard(board)
      return board
    })
  }, [URL, boards])

  const destroyBoard = useCallback(() => {
    axios
      .delete(`/api/board/delete`, { data: { board: currentBoard } })
      .then(() => {
        router.push('/')
        deleteType === 'board'
          ? onOpenDeleteBoard(false)
          : onOpenDeleteTask(false)
        setTimeout(() => {
          toast.success('Board deleted successfully!')
        }, 2000)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }, [currentBoard, router, deleteType, onOpenDeleteBoard, onOpenDeleteTask])

  return (
    <section
      className="
        absolute
        left-0
        top-0
        z-50
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center 
        max-sm:p-4
      "
    >
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      <ModalBackground />
      <section className="absolute z-50 flex h-auto w-auto flex-col gap-y-6 rounded-md bg-dark-gray p-8 sm:h-[229px] sm:w-[480px]">
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

        <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-y-4">
          <Button onClick={destroyBoard} style={'destroyer'}>
            Delete
          </Button>
          <Button
            onClick={() =>
              deleteType === 'board'
                ? onOpenDeleteBoard(false)
                : onOpenDeleteTask(false)
            }
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
