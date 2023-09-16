import { redirect } from 'next/navigation'
import getCurrentUser from './actions/getCurrentUser'
import Board from './Components/Board'

export default async function Home() {
  const currentUser = await getCurrentUser()

  if (currentUser) return <Board />
  else redirect('/login')
}
