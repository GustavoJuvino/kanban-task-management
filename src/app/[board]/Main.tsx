'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Header from '../Components/Header/Header'
import BoardContent from '../Components/Board/BoardContent'
import NewTaskModal from '../Components/Modals/TaskModal/NewTaskModal'
import BoardModal from '../Components/Modals/BoardModal/BoardModal'
import DeleteModal from '../Components/Modals/DeleteModal'

import useOpenBoardModal from '../hooks/ModalHooks/useOpenBoardModal'
import useOpenDeleteModal from '../hooks/ModalHooks/useOpenDeleteModal'
import useOpenTaskModal from '../hooks/ModalHooks/useOpenTaskModal'
import useGetAllBoards from '../hooks/useGetAllBoards'

interface MainProps {
  boards: string[]
}

const Main = ({ boards }: MainProps) => {
  const { openNewBoard, openEditBoard } = useOpenBoardModal()
  const { openEditTask } = useOpenTaskModal()
  const { openDeleteBoard, openDeleteTask } = useOpenDeleteModal()

  const { currentBoards, setBoards } = useGetAllBoards()

  useEffect(() => {
    const udpateBoards = [...boards]
    setBoards(['1', '2'])
  }, [boards, currentBoards, setBoards])

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
        <BoardContent />
      </section>
    </>
  )
}

export default Main
