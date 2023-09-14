'use client'

import { signOut } from 'next-auth/react'

export default function Dashboard() {
  return (
    <main>
      <h1>Admin Page</h1>
      <button onClick={() => signOut({ callbackUrl: '/login' })}>
        Sign out
      </button>
    </main>
  )
}
