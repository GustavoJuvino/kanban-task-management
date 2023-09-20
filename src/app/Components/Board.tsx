'use client'

import ModalBackground from './ModalBackground'
import TaskModal from './TaskModal/TaskModal'
// import { signOut } from 'next-auth/react'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import { useState } from 'react'
import { useHideSidebar } from '../store/useHideSidebar'

export default function Board() {
  const { hidden } = useHideSidebar()
  // const [openTaskModal, setOpenTaskModal] = useState(false)

  return (
    <main className="flex h-full w-full bg-very-dark-gray max-sm:flex-col">
      {/* <TaskModal /> */}
      <section className="flex h-auto w-auto max-sm:justify-center">
        <Sidebar />
        {/* <ModalBackground /> */}
      </section>
      <Header />
    </main>
  )
}
