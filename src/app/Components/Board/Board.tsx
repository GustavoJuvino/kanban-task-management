'use client'

// import { signOut } from 'next-auth/react'
// import TaskModal from '../Modals/TaskModal/TaskModal'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import BoardContent from './BoardContent'
import DeleteModal from '../Modals/DeleteModal'
import BoardModal from '../Modals/BoardModal/BoardModal'
import NewTaskModal from '../Modals/TaskModal/NewTaskModal'
import useOpenTaskModal from '../../hooks/useOpenTaskModal'
import useOpenBoardModal from '../../hooks/useOpenBoardModal'
import useOpenDeleteModal from '../../hooks/useOpenDeleteModal'

export default function Board() {
  const { openEditTask } = useOpenTaskModal()
  const { openEditBoard } = useOpenBoardModal()
  const { openDeleteBoard, openDeleteTask } = useOpenDeleteModal()

  return (
    <main className="flex h-full w-full bg-very-dark-gray max-sm:flex-col">
      <section className="flex h-auto w-auto max-sm:justify-center">
        <Sidebar />
      </section>

      {/* <TaskModal /> */}

      {openEditTask && <NewTaskModal modalType="edit" />}
      {openEditBoard && <BoardModal modalType="edit" />}
      {openDeleteBoard && <DeleteModal deleteType="board" />}
      {openDeleteTask && <DeleteModal deleteType="task" />}

      <section className="flex h-full w-full flex-col overflow-x-hidden">
        <Header />
        <BoardContent />
      </section>
    </main>
  )
}
