'use client'

import React, { useEffect } from 'react'
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

interface MainProps {
  boardURL: string
  currentBoards: BoardProps[]
  currentTasks: TaskProps[]
  currentColumns: ColumnsProps[]
  currentSubtasks: SubtaskProps[]
}

const Main = ({
  boardURL,
  currentBoards,
  currentColumns,
  currentTasks,
  currentSubtasks,
}: MainProps) => {
  const { openEditTask } = useOpenTaskModal()
  const { openNewBoard, openEditBoard } = useOpenBoardModal()
  const { openDeleteBoard, openDeleteTask } = useOpenDeleteModal()

  const { setURL } = useGetCurrentURL()
  const { boards, setBoards, setColumns, setTasks, setSubTasks } =
    useGlobalContext()

  useEffect(() => {
    setURL(boardURL)
    setBoards(currentBoards)
    setColumns(currentColumns)
    setTasks(currentTasks)
    setSubTasks(currentSubtasks)
  }, [
    boardURL,
    setURL,
    currentBoards,
    setBoards,
    currentColumns,
    setColumns,
    currentTasks,
    setTasks,
    currentSubtasks,
    setSubTasks,
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

      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
      {openEditTask && <TaskModal modalType="edit" />}

      {openEditBoard && <BoardModal modalType="edit" />}
      {openNewBoard && <BoardModal modalType="add" />}

      {openDeleteBoard && <DeleteModal deleteType="board" />}
      {openDeleteTask && <DeleteModal deleteType="task" />}

      <section className="flex h-full w-full flex-col overflow-x-hidden">
        <Header />
        {isBoard(boardURL) ? <BoardContent /> : <h1>Board not founded</h1>}
      </section>
    </>
  )
}

export default Main
