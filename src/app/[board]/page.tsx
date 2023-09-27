'use client'

import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import BoardContent from '../Components/Board/BoardContent'
import BoardModal from '../Components/Modals/BoardModal/BoardModal'
import DeleteModal from '../Components/Modals/DeleteModal'
import NewTaskModal from '../Components/Modals/TaskModal/NewTaskModal'
import useOpenBoardModal from '../hooks/useOpenBoardModal'
import useOpenDeleteModal from '../hooks/useOpenDeleteModal'
import useOpenTaskModal from '../hooks/useOpenTaskModal'

// import { signOut } from 'next-auth/react'
// import TaskModal from '../Modals/TaskModal/TaskModal'

export default function Page({ params }: { params: { board: string } }) {
  const { openEditTask } = useOpenTaskModal()
  const { openEditBoard } = useOpenBoardModal()
  const { openDeleteBoard, openDeleteTask } = useOpenDeleteModal()

  return (
    <>
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
    </>
  )
}
