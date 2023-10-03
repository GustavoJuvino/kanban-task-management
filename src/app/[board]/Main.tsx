'use client'

import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Header from '../Components/Header/Header'
import BoardContent from '../Components/Board/BoardContent'
import NewTaskModal from '../Components/Modals/TaskModal/NewTaskModal'
import BoardModal from '../Components/Modals/BoardModal/BoardModal'
import DeleteModal from '../Components/Modals/DeleteModal'

import useOpenBoardModal from '../hooks/ModalHooks/useOpenBoardModal'
import useOpenDeleteModal from '../hooks/ModalHooks/useOpenDeleteModal'
import useOpenTaskModal from '../hooks/ModalHooks/useOpenTaskModal'
import { useGlobalContext } from '../context/store'
import useGetCurrentURL from '../hooks/useGetCurrentURL'
// import useGetAllBoards from '../hooks/useGetAllBoards'

interface MainProps {
  currentBoards: string[]
  boardURL: string
}

const Main = ({ currentBoards, boardURL }: MainProps) => {
  const { openNewBoard, openEditBoard } = useOpenBoardModal()
  const { openEditTask } = useOpenTaskModal()

  const { setURL } = useGetCurrentURL()
  const { openDeleteBoard, openDeleteTask } = useOpenDeleteModal()
  const { boards, setBoards } = useGlobalContext()

  useEffect(() => {
    setBoards(currentBoards)
    setURL(boardURL)
  }, [currentBoards, setBoards, setURL, boardURL])

  const currentBoardsURL = boards.map((board) => board.replace(/\s/g, ''))
  type Board = (typeof currentBoards)[number]

  // // user-defined guard
  const isBoard = (value: any): value is Board =>
    currentBoardsURL.includes(value)

  return (
    <>
      <section className="flex h-auto w-auto max-sm:justify-center">
        <Sidebar />
      </section>

      {/* <TaskModal /> */}

      {openEditTask && <NewTaskModal modalType="edit" />}
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
