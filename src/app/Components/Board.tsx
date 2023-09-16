'use client'

// import { signOut } from 'next-auth/react'
import Sidebar from './Sidebar/Sidebar'

export default function Board() {
  return (
    <main className="flex h-full w-full bg-very-dark-gray">
      <Sidebar />
      <h1>Admin Page</h1>
    </main>
  )
}
