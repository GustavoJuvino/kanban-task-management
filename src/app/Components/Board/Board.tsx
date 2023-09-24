'use client'

// import { signOut } from 'next-auth/react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
// import TaskModal from '../Modals/TaskModal/TaskModal'
import NewTaskModal from '../Modals/TaskModal/NewTaskModal'
import useOpenTaskModal from '../../hooks/useOpenTaskModal'
import useOpenBoardModal from '../../hooks/useOpenBoardModal'
import useOpenDeleteModal from '../../hooks/useOpenDeleteModal'
import BoardModal from '../Modals/BoardModal/BoardModal'
import DeleteModal from '../Modals/DeleteModal'
import BoardContent from './BoardContent'

export default function Board() {
  const { openEditTask } = useOpenTaskModal()
  const { openEditBoard } = useOpenBoardModal()
  const { openDeleteBoard, openDeleteTask } = useOpenDeleteModal()

  return (
    <main className="flex h-full w-full overflow-hidden bg-very-dark-gray max-sm:flex-col">
      <section className="flex h-auto w-auto max-sm:justify-center">
        <Sidebar />
      </section>

      {/* <TaskModal /> */}

      {openEditTask && <NewTaskModal modalType="edit" />}
      {openEditBoard && <BoardModal modalType="edit" />}
      {openDeleteBoard && <DeleteModal deleteType="board" />}
      {openDeleteTask && <DeleteModal deleteType="task" />}

      <section className="flex w-full flex-col">
        <Header />
        <BoardContent />
      </section>
    </main>
  )
}
