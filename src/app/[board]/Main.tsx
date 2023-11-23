/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react'
import Task from '../Components/Board/Task/Task'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import DeleteModal from '../Components/Modals/DeleteModal'
import BoardContent from '../Components/Board/BoardContent'
import ModalBackground from '../Components/ModalBackground'
import TaskModal from '../Components/Modals/TaskModal/TaskModal'
import BoardModal from '../Components/Modals/BoardModal/BoardModal'

import { useGlobalContext } from '../context/store'
import useGetCurrentURL from '../hooks/useGetCurrentURL'
import useOpenTask from '../helper/ModalHooks/useOpenTask'
import useSaveCurrentUser from '../hooks/useSaveCurrentUser'
import useOpenTaskModal from '../helper/ModalHooks/useOpenTaskModal'
import useOpenBoardModal from '../helper/ModalHooks/useOpenBoardModal'
import useOpenDeleteModal from '../helper/ModalHooks/useOpenDeleteModal'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface MainProps {
  boardURL: string
  currentBoards: BoardProps[]
  currentTasks: TaskProps[]
  currentColumns: ColumnsProps[]
  currentSubtasks: SubtaskProps[]
  currentUser: {
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
  const { openTask } = useOpenTask()
  const { openEditTask } = useOpenTaskModal()
  const { setCurrentUser } = useSaveCurrentUser()
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
    setCurrentUser(currentUser)
  }, [
    boardURL,
    currentBoards,
    currentColumns,
    currentTasks,
    currentSubtasks,
    currentUser,
  ])

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

      <ToastContainer position="top-center" autoClose={2000} theme={'dark'} />
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
          <Task />
          <ModalBackground />
        </section>
      )}

      <section className="flex h-full w-full flex-col overflow-x-hidden">
        <Header />
        {isBoard(boardURL) ? (
          <BoardContent />
        ) : (
          <span className="relative flex h-52 w-full items-center justify-center">
            <h2 className="text-center text-heading-m text-medium-gray sm:text-heading-l">
              Board Not Founded
            </h2>
          </span>
        )}
      </section>
    </>
  )
}

export default Main
