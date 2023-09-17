'use client'

import ModalBackground from './ModalBackground'
import TaskModal from './TaskModal/TaskModal'
// import { signOut } from 'next-auth/react'
import Sidebar from './Sidebar/Sidebar'

export default function Board() {
  return (
    <main className="flex h-full w-full bg-very-dark-gray max-sm:flex-col">
      <ModalBackground />
      <TaskModal />
      <div className="relative flex h-auto w-auto max-sm:justify-center">
        <Sidebar />
      </div>
      <h1>Admin Page</h1>
    </main>
  )
}
