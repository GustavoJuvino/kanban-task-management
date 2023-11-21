'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Header from '../Components/Header/Header'
import BoardContent from '../Components/Board/BoardContent'
import DeleteModal from '../Components/Modals/DeleteModal'
import TaskModal from '../Components/Modals/TaskModal/TaskModal'
import BoardModal from '../Components/Modals/BoardModal/BoardModal'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGlobalContext } from '../context/store'
import useGetCurrentURL from '../hooks/useGetCurrentURL'
import useOpenTaskModal from '../helper/ModalHooks/useOpenTaskModal'
import useOpenBoardModal from '../helper/ModalHooks/useOpenBoardModal'
import useOpenDeleteModal from '../helper/ModalHooks/useOpenDeleteModal'
import useOpenTask from '../helper/ModalHooks/useOpenTask'
import Task from '../Components/Board/Task/Task'
import ModalBackground from '../Components/ModalBackground'
import useClickOutside from '../hooks/useClickOutside'

interface MainProps {
  boardURL: string
  currentBoards: BoardProps[]
  currentTasks: TaskProps[]
  currentColumns: ColumnsProps[]
  currentSubtasks: SubtaskProps[]
  currentUser: void | {
    id: string
    username: string
    email: string
    hashedPassword: string
  } | null
}

const Main = ({
  boardURL,
  currentBoards,
  currentColumns,
  currentTasks,
  currentSubtasks,
  currentUser,
}: MainProps) => {
  const [activeTask, setActiveTask] = useState(false)

  const taskRef = useRef(null)

  const { openEditTask } = useOpenTaskModal()
  const { openTask, onOpenTask } = useOpenTask()
  const { clickOutside } = useClickOutside()

  const { openNewBoard, openEditBoard } = useOpenBoardModal()
  const { openDeleteBoard, openDeleteTask } = useOpenDeleteModal()

  const { setURL } = useGetCurrentURL()
  const { boards, setBoards, setColumns, setTasks, setSubTasks } =
    useGlobalContext()

  useEffect(() => {
    setURL(boardURL)
    setBoards(currentBoards)
    setColumns(currentColumns)
    setTasks(
      currentTasks.sort((a, b) =>
        Number(a.itemID) === Number(b.itemID)
          ? Number(a.taskItemID) - Number(b.taskItemID)
          : Number(a.itemID) - Number(b.itemID),
      ),
    )
    setSubTasks(currentSubtasks)
  }, [
    boardURL,
    currentBoards,
    currentColumns,
    currentTasks,
    currentSubtasks,
    currentUser,
  ])

  useEffect(() => {
    if (taskRef) clickOutside(taskRef, onOpenTask)
  }, [clickOutside, onOpenTask])

  const currentBoardsURL = boards.map((board) =>
    board.boardName.replace(/\s/g, ''),
  )
  type Board = (typeof currentBoards)[number]

  // user-defined guard
  const isBoard = (value: any): value is Board =>
    currentBoardsURL.includes(value)

  return (
    <>
      <section className="flex h-auto w-auto max-sm:justify-center">
        <Sidebar />
      </section>

      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
      {openEditTask && <TaskModal modalType="edit" />}

      {openEditBoard && <BoardModal modalType="edit" />}
      {openNewBoard && <BoardModal modalType="add" />}

      {openDeleteBoard && <DeleteModal deleteType="board" />}
      {openDeleteTask && <DeleteModal deleteType="task" />}

      {openTask && !openDeleteTask && !openEditTask && (
        <section
          className="
            absolute
            left-0
            top-0
            flex
            h-full
            w-full
            cursor-default 
            flex-col
            items-center
            justify-center
            max-sm:px-4
          "
        >
          <div
            ref={taskRef}
            className="
              z-[500]
              flex 
              h-auto
              w-full 
              flex-col
              gap-y-6
              rounded-md 
              bg-white 
              p-6
              dark:bg-dark-gray
              sm:w-[480px] 
              sm:p-8
            "
          >
            <Task />
          </div>

          <ModalBackground />
        </section>
      )}

      <section className="flex h-full w-full flex-col overflow-x-hidden">
        <Header />
        {isBoard(boardURL) ? <BoardContent /> : <h1>Board not founded</h1>}
      </section>
    </>
  )
}

export default Main
