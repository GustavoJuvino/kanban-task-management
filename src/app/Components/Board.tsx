'use client'

// import { signOut } from 'next-auth/react'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'

export default function Board() {
  return (
    <main className="flex h-full w-full bg-very-dark-gray max-sm:flex-col">
      <section className="flex h-auto w-auto max-sm:justify-center">
        <Sidebar />
      </section>

      <Header />
    </main>
  )
}
