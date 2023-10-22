'use client'

import React, { useEffect } from 'react'
import Header from './Header/Header'
import Button from './Button'
import Sidebar from './Sidebar/Sidebar'
import BoardModal from './Modals/BoardModal/BoardModal'
import useOpenBoardModal from '../hooks/ModalHooks/useOpenBoardModal'
import { useGlobalContext } from '../context/store'
import { ToastContainer } from 'react-toastify'

interface HomePageProps {
  currentBoards: BoardProps[]
}

const HomePage = ({ currentBoards }: HomePageProps) => {
  const { openNewBoard, onOpenNewBoard } = useOpenBoardModal()
  const { setBoards } = useGlobalContext()

  useEffect(() => {
    setBoards(currentBoards)
  }, [currentBoards, setBoards])

  return (
    <>
      <section className="flex h-auto w-auto max-sm:justify-center">
        <Sidebar />
      </section>

      <ToastContainer position="top-center" autoClose={1500} theme="dark" />

      {openNewBoard && <BoardModal modalType="add" />}

      <section className="flex h-full w-full flex-col overflow-x-hidden">
        <Header />
        <section className="flex h-full w-full flex-col items-center justify-center text-center text-medium-gray">
          <h1 className="text-heading-xl">Welcome to Kanban task management</h1>
          <div className="mt-2 text-body-l">
            <p>You can start selecting a created board</p>
            <p>or if you want you can create a new one</p>
            <Button onClick={() => onOpenNewBoard(true)} className="mt-2">
              + Create new board
            </Button>
          </div>
        </section>
      </section>
    </>
  )
}

export default HomePage
