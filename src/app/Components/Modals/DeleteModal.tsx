import React, { useCallback, useEffect, useState } from 'react'
import ModalBackground from '../ModalBackground'
import Button from '../Button'

import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import useSaveCurrentTask from '@/app/hooks/useSaveCurrentTask'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'
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
  const [deleteTask, setDeleteTask] = useState<TaskProps>()
  const [deleteBoard, setDeleteBoard] = useState<BoardProps>()
  const [deleteCols, setDeleteCols] = useState<ColumnsProps[]>([])

  const { currentTask } = useSaveCurrentTask()
  const { currentColumn } = useSaveCurrentColumn()

  const { URL } = useGetCurrentURL()
  const { boards, columns, tasks } = useGlobalContext()
  const { onOpenDeleteBoard, onOpenDeleteTask } = useOpenDeleteModal()

  // Boards
  useEffect(() => {
    boards.map((board) => {
      const formatBoard = board.boardName.replace(/\s/g, '')
      if (formatBoard === URL) {
        setDeleteBoard(board)
        const newArr = [...deleteCols]
        columns.map((col) => col.fromBoard === formatBoard && newArr.push(col))
        setDeleteCols(newArr)
      }
      return board
    })
  }, [URL, boards, columns, currentColumn])

  // Tasks
  useEffect(() => {
    if (deleteType === 'task') {
      tasks.map((task) => {
        if (task.title === currentTask && task.fromColumn === currentColumn) {
          setDeleteTask(task)
        }
        return task
      })
    }
  }, [currentTask, tasks, currentColumn, deleteType])

  function axiosRequest(url: string) {
    if (deleteType === 'board') {
      axios
        .delete(url, {
          data: { board: deleteBoard, columns: deleteCols },
        })
        .then(() => {
          router.push('/')
          onOpenDeleteBoard(false)
          setTimeout(() => {
            toast.success('Board deleted successfully!')
          }, 1500)
        })
        .catch(() => {
          toast.error('Something went wrong')
        })
    }

    if (deleteType === 'task') {
      axios
        .delete(url, {
          data: { task: deleteTask },
        })
        .then(() => {
          router.refresh()
          onOpenDeleteTask(false)
          setTimeout(() => {
            toast.success('Task deleted successfully!')
          }, 1500)
        })
        .catch(() => {
          toast.error('Something went wrong')
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
        px-4
      "
    >
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      <ModalBackground />
      <section
        className="
          absolute 
          z-50 
          flex 
          h-auto 
          w-auto 
          flex-col
          gap-y-6 
          rounded-md 
          bg-dark-gray 
          p-8 
          sm:h-[229px] 
          sm:w-[480px]
        "
      >
        <h2 className="text-heading-l text-red">
          {`Delete this ${deleteType === 'board' ? 'board?' : 'task?'}`}
        </h2>

        <p className="text-body-l text-medium-gray">
          {deleteType === 'board'
            ? `Are you sure you want to delete the ‘${deleteBoard?.boardName}’ board? This
            action will remove all columns and tasks and cannot be reversed.`
            : `Are you sure you want to delete the ‘${currentTask}’ task
              and its subtasks? This action cannot be reversed.`}
        </p>

        <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-y-4">
          <Button
            onClick={() => {
              if (deleteType === 'board') axiosRequest(`/api/board/delete`)
              if (deleteType === 'task') axiosRequest(`/api/tasks/delete`)
            }}
            style={'destroyer'}
          >
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
